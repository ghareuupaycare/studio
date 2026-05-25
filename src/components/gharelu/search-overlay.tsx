
'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, ChevronRight, MessageCircleOff, Send } from 'lucide-react';
import { REMEDIES } from '@/lib/remedy-data';
import { Language, Theme } from '@/app/page';
import { cn, toEnglishDigits } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useFirestore } from '@/firebase';
import { doc, setDoc, increment, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  theme: Theme;
  onSelectRemedy: (remedyId: string, categoryId: string) => void;
}

export const SearchOverlay = ({ isOpen, onClose, lang, theme, onSelectRemedy }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const [manualRequest, setManualRequest] = useState('');
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';
  const db = useFirestore();
  const { toast } = useToast();
  const logTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const normalizedQuery = query.toLowerCase().trim();
    return REMEDIES.filter(remedy => {
      const searchableText = [
        remedy.name.hi,
        remedy.name.en,
        remedy.keywords,
        remedy.introduction.hi,
        remedy.introduction.en,
        toEnglishDigits(remedy.name.hi),
        toEnglishDigits(remedy.introduction.hi)
      ].join(' ').toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [query]);

  // Automatic logging logic for unresolved searches (Analytics)
  useEffect(() => {
    if (logTimeoutRef.current) clearTimeout(logTimeoutRef.current);

    if (query.trim() && results.length === 0) {
      logTimeoutRef.current = setTimeout(() => {
        if (!db) return;
        
        const sanitizedQuery = query.toLowerCase().trim().replace(/[/\\#?]/g, '');
        if (!sanitizedQuery) return;

        const docRef = doc(db, 'requested_remedies', sanitizedQuery);
        
        setDoc(docRef, {
          searchQuery: query.trim(),
          count: increment(1),
          timestamp: serverTimestamp(),
          isAutoLog: true
        }, { merge: true })
          .catch(async (error) => {
            const permissionError = new FirestorePermissionError({
              path: docRef.path,
              operation: 'write',
              requestResourceData: { searchQuery: query.trim() }
            });
            errorEmitter.emit('permission-error', permissionError);
          });
      }, 3000); // 3 second debounce for automatic logging
    }

    return () => {
      if (logTimeoutRef.current) clearTimeout(logTimeoutRef.current);
    };
  }, [query, results.length, db]);

  const handleManualRequest = () => {
    if (!manualRequest.trim() || !db) return;

    const sanitizedQuery = manualRequest.toLowerCase().trim().replace(/[/\\#?]/g, '');
    const docRef = doc(db, 'requested_remedies', sanitizedQuery);

    setDoc(docRef, {
      searchQuery: manualRequest.trim(),
      count: increment(1),
      timestamp: serverTimestamp(),
      isManualRequest: true
    }, { merge: true })
      .then(() => {
        toast({
          description: isHindi 
            ? "आपका संदेश वैद्य जी के पास सुरक्षित पहुंच गया है। जल्द ही नुस्खा अपलोड किया जाएगा!" 
            : "Your request has reached Vaidya Ji. The remedy will be uploaded soon!",
        });
        setManualRequest('');
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'write',
          requestResourceData: { searchQuery: manualRequest.trim() }
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  const highlightMatchText = (text: string, currentQuery: string) => {
    if (!currentQuery.trim()) return toEnglishDigits(text);

    const displayStr = toEnglishDigits(text);
    const escapedQuery = currentQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = displayStr.split(new RegExp(`(${escapedQuery})`, 'gi'));

    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === currentQuery.toLowerCase().trim() ? (
            <span 
              key={i} 
              className={cn(
                "px-0.5 rounded font-bold transition-colors duration-300",
                isNight 
                  ? "bg-yellow-500/30 text-yellow-300" 
                  : "bg-yellow-200 text-black"
              )}
            >
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  const handleResultClick = (remedyId: string, illnessId: string) => {
    let catId = 'fever'; 
    if (illnessId.includes('joint')) catId = 'joints';
    if (illnessId.includes('cough') || illnessId.includes('respiratory')) catId = 'respiratory';
    if (illnessId.includes('digestion') || illnessId.includes('acidity')) catId = 'digestion';

    onSelectRemedy(remedyId, catId);
    onClose();
    setQuery('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "fixed top-0 left-0 translate-x-0 translate-y-0 w-full h-[50vh] max-w-none p-0 border-none flex flex-col transition-all duration-300 ease-in-out rounded-none shadow-2xl z-[100]",
          isNight ? "bg-[#0a110d] text-white" : "bg-[#FDFBF7] text-foreground"
        )}
      >
        <div className={cn(
          "shrink-0 p-6 pt-8",
          isNight ? "bg-black/40 border-b border-white/10" : "bg-primary border-b border-white/10"
        )}>
          <div className="flex items-center justify-between mb-4">
            <DialogTitle className="text-white text-xl font-headline font-black">
              {isHindi ? 'बीमारी या नुस्खा खोजें' : 'Search Remedy or Illness'}
            </DialogTitle>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <Input
              autoFocus
              placeholder={isHindi ? "जैसे: बुखार, fever, bukhar..." : "e.g., fever, cold, acidity..."}
              className={cn(
                "pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-accent text-lg rounded-2xl"
              )}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
            )}
          </div>
        </div>

        <ScrollArea className="flex-1 w-full bg-transparent">
          <div className="p-4 w-full max-w-2xl mx-auto">
            {!query.trim() ? (
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-3 opacity-30">
                <Search className="w-12 h-12" />
                <p className="font-bold">
                  {isHindi ? 'खोजना शुरू करें...' : 'Start typing to search...'}
                </p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-2 pb-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 px-2 mb-2">
                  {isHindi ? `${results.length} परिणाम मिले` : `${results.length} results found`}
                </p>
                {results.map((remedy) => (
                  <button
                    key={remedy.id}
                    onClick={() => handleResultClick(remedy.id, remedy.illnessId)}
                    className={cn(
                      "w-full p-4 rounded-xl border transition-all text-left flex items-center gap-4 group cursor-pointer active:scale-[0.98]",
                      isNight 
                        ? "bg-white/5 border-white/5 hover:border-accent text-white" 
                        : "bg-white border-primary/5 hover:border-accent text-primary shadow-sm"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm shrink-0 transition-colors duration-500",
                      isNight ? "bg-white/5 text-accent" : "bg-accent/5 text-accent"
                    )}>
                      {toEnglishDigits(remedy.serialNumber)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-base leading-tight truncate">
                        {highlightMatchText(remedy.name[lang], query)}
                      </h4>
                      <p className="text-[11px] opacity-60 truncate mt-0.5 font-medium">
                        {highlightMatchText(remedy.introduction[lang], query)}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:text-accent" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-6 max-w-sm mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className={cn(
                  "p-5 rounded-full",
                  isNight ? "bg-emerald-900/20 text-emerald-400" : "bg-emerald-50 text-emerald-600"
                )}>
                  <MessageCircleOff className="w-10 h-10" />
                </div>
                <div className="space-y-3">
                  <h3 className={cn(
                    "text-xl font-headline font-black",
                    isNight ? "text-white" : "text-emerald-800"
                  )}>
                    {isHindi ? 'अभी यह नुस्खा उपलब्ध नहीं है' : 'Remedy Not Available Yet'}
                  </h3>
                  <p className={cn(
                    "text-sm leading-relaxed font-medium opacity-80",
                    isNight ? "text-zinc-400" : "text-muted-foreground"
                  )}>
                    {isHindi 
                      ? "क्षमा करें! वैद्य जी जल्द ही आपकी खोजी गई बीमारी का सटीक और प्रामाणिक घरेलू उपचार यहाँ अपलोड करेंगे। स्वस्थ रहें, सुखी रहें!"
                      : "Sorry! Vaidya Ji will soon upload accurate and authentic home remedies for your searched illness. Stay healthy, stay happy!"}
                  </p>
                </div>

                {/* Manual Request Form */}
                <div className="w-full space-y-3 pt-4 border-t border-emerald-500/10">
                  <Input
                    placeholder={isHindi ? "अपनी बीमारी या समस्या का नाम यहाँ लिखें..." : "Enter your health concern here..."}
                    className={cn(
                      "h-12 border-emerald-500/20 text-foreground placeholder:text-muted-foreground/50 rounded-xl",
                      isNight ? "bg-white/5" : "bg-white"
                    )}
                    value={manualRequest}
                    onChange={(e) => setManualRequest(e.target.value)}
                  />
                  <Button
                    onClick={handleManualRequest}
                    disabled={!manualRequest.trim()}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-6 px-4 rounded-xl w-full transition-all text-base flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" />
                    {isHindi ? 'वैद्य जी से इस नुस्खे की मांग करें' : 'Request this Remedy from Vaidya Ji'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
