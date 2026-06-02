'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, ChevronRight, MessageCircleOff, Send, CheckCircle2 } from 'lucide-react';
import { REMEDIES } from '@/lib/remedy-data';
import { Language, Theme } from '@/app/page';
import { cn, toEnglishDigits } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useFirestore } from '@/firebase';
import { doc, setDoc, increment, serverTimestamp } from 'firebase/firestore';
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
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';
  const db = useFirestore();
  const logTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const normalizedQuery = query.toLowerCase().trim();
    return REMEDIES.filter(remedy => {
      const keywordsStr = Array.isArray(remedy.keywords) 
        ? remedy.keywords.join(' ') 
        : remedy.keywords || '';

      const searchableText = [
        remedy.name.hi,
        remedy.name.en,
        keywordsStr,
        toEnglishDigits(remedy.name.hi)
      ].join(' ').toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [query]);

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
            } satisfies SecurityRuleContext);
            errorEmitter.emit('permission-error', permissionError);
          });
      }, 3000);
    }

    return () => {
      if (logTimeoutRef.current) clearTimeout(logTimeoutRef.current);
    };
  }, [query, results.length, db]);

  const handleManualRequest = () => {
    if (!manualRequest.trim() || !db) return;

    const currentRequest = manualRequest.trim();
    const sanitizedQuery = currentRequest.toLowerCase().replace(/[/\\#?]/g, '');
    const docRef = doc(db, 'requested_remedies', sanitizedQuery);

    setManualRequest('');

    setDoc(docRef, {
      searchQuery: currentRequest,
      count: increment(1),
      timestamp: serverTimestamp(),
      isManualRequest: true
    }, { merge: true })
      .then(() => {
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 5000);
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'write',
          requestResourceData: { searchQuery: currentRequest }
        } satisfies SecurityRuleContext);
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
    // Correct mapping to match home-view categories
    let catId = 'fever_flu'; 
    if (illnessId.includes('joint')) catId = 'joints';
    if (illnessId.includes('cough') || illnessId.includes('respiratory')) catId = 'fever_flu';
    if (illnessId.includes('digestion') || illnessId.includes('acidity')) catId = 'digestion';
    if (illnessId === 'general-fever' || illnessId === 'common-cold') catId = 'fever_flu';

    onSelectRemedy(remedyId, catId);
    onClose();
    setQuery('');
  };

  return (
    <div className={cn("fixed inset-0 z-[100] transition-all duration-500", isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent 
          className={cn(
            "fixed top-0 left-0 translate-x-0 translate-y-0 w-full h-[50vh] max-w-none p-0 border-none flex flex-col transition-all duration-300 ease-in-out rounded-none shadow-2xl z-[100]",
            "[&>button]:text-amber-400 [&>button]:opacity-100 [&>button]:scale-125 [&>button]:transition-all [&>button]:duration-200",
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
                  "pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-amber-400 text-lg rounded-2xl"
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
              {showSuccessAlert && (
                <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="bg-emerald-600 text-white p-5 rounded-2xl shadow-[0_10px_40px_rgba(5,150,105,0.4)] flex items-start gap-4 border-2 border-emerald-400/30">
                    <CheckCircle2 className="w-8 h-8 shrink-0 mt-0.5 text-emerald-100" />
                    <div className="space-y-1">
                      <p className="font-black text-lg uppercase tracking-wider">
                        {isHindi ? 'सफलतापूर्वक भेजा गया!' : 'Successfully Sent!'}
                      </p>
                      <p className="text-sm font-bold leading-relaxed opacity-95">
                        {isHindi 
                          ? 'आपका संदेश वैद्य जी के पास सुरक्षित पहुंच गया है। जल्द ही इसका प्रामाणिक नुस्खा ऐप में जोड़ दिया जाएगा।' 
                          : 'Your request has reached Vaidya Ji securely. The authentic remedy will be added to the app soon.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

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
                          ? "bg-white/5 border-white/5 hover:border-amber-400 text-white" 
                          : "bg-white border-primary/5 hover:border-amber-400 text-primary shadow-sm"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm shrink-0 transition-colors duration-500",
                        isNight ? "bg-white/5 text-amber-400" : "bg-amber-400/5 text-amber-400"
                      )}>
                        {toEnglishDigits(remedy.serialNumber)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-base leading-tight truncate">
                          {highlightMatchText(remedy.name[lang], query)}
                        </h4>
                        <p className="text-[11px] opacity-60 truncate mt-0.5 font-medium">
                          {highlightMatchText(Array.isArray(remedy.introduction[lang]) ? remedy.introduction[lang][0] : remedy.introduction[lang], query)}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:text-amber-400" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center space-y-6 max-w-sm mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
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

                  <div className="w-full space-y-3 pt-4 border-t border-emerald-500/10">
                    <Input
                      placeholder={isHindi ? "अपनी बीमारी या समस्या का नाम यहाँ लिखें..." : "Enter your health concern here..."}
                      className={cn(
                        "h-12 border-emerald-500/20 rounded-xl focus-visible:ring-emerald-600 transition-colors",
                        isNight 
                          ? "bg-white/5 text-white placeholder:text-zinc-400" 
                          : "bg-white text-foreground placeholder:text-muted-foreground/50"
                      )}
                      value={manualRequest}
                      onChange={(e) => setManualRequest(e.target.value)}
                    />
                    <Button
                      onClick={handleManualRequest}
                      disabled={!manualRequest.trim()}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-black uppercase tracking-[0.1em] py-6 px-4 rounded-xl w-full transition-all text-base flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
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
    </div>
  );
};