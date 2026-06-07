'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, ChevronRight, X } from 'lucide-react';
import { Remedy } from '@/lib/remedy-data';
import { Language, Theme } from '@/app/page';
import { cn, toEnglishDigits } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useFirestore } from '@/firebase';
import { doc, setDoc, increment, serverTimestamp } from 'firebase/firestore';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  theme: Theme;
  onSelectRemedy: (remedyId: string, categoryId: string) => void;
  allRemedies: Remedy[];
}

export const SearchOverlay = ({ isOpen, onClose, lang, theme, onSelectRemedy, allRemedies }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';
  const db = useFirestore();
  const logTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const normalizedQuery = query.toLowerCase().trim();
    return allRemedies.filter(remedy => {
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
  }, [query, allRemedies]);

  useEffect(() => {
    if (logTimeoutRef.current) clearTimeout(logTimeoutRef.current);
    if (query.trim() && results.length === 0) {
      logTimeoutRef.current = setTimeout(() => {
        if (!db) return;
        const sanitizedQuery = query.toLowerCase().trim().replace(/[/\\#?]/g, '');
        if (!sanitizedQuery) return;
        const docRef = doc(db, 'requested_remedies', sanitizedQuery);
        setDoc(docRef, { searchQuery: query.trim(), count: increment(1), timestamp: serverTimestamp() }, { merge: true });
      }, 3000);
    }
    return () => { if (logTimeoutRef.current) clearTimeout(logTimeoutRef.current); };
  }, [query, results.length, db]);

  const handleResultClick = (remedy: Remedy) => {
    const categoryId = remedy.categoryId || 'fever_flu';
    onSelectRemedy(remedy.id, categoryId);
    onClose();
    setQuery('');
  };

  const highlightMatchText = (text: string | string[], currentQuery: string) => {
    const displayStr = toEnglishDigits(Array.isArray(text) ? text[0] : text);
    if (!currentQuery.trim()) return displayStr;
    const parts = displayStr.split(new RegExp(`(${currentQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === currentQuery.toLowerCase().trim() ? (
        <span key={i} className="font-bold text-accent">{part}</span>
      ) : <span key={i}>{part}</span>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "fixed top-0 left-0 translate-x-0 translate-y-0 w-full h-[70vh] max-w-none p-0 border-none flex flex-col rounded-none shadow-2xl z-[100] outline-none [&>button]:hidden",
          isNight ? "bg-[#0a110d] text-white" : "bg-[#FDFBF7] text-foreground"
        )}
      >
        <div className={cn(
          "shrink-0 p-6 pt-10 relative",
          isNight ? "bg-black/60 border-b border-white/10" : "bg-primary border-b border-white/10"
        )}>
          <div className="absolute top-4 right-6">
            <DialogClose asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-white/10 text-accent transition-all active:scale-90 h-10 w-10"
              >
                <X className="w-8 h-8 stroke-[3]" />
              </Button>
            </DialogClose>
          </div>

          <DialogTitle className="text-white text-xl font-headline font-black mb-4">
            {isHindi ? 'बीमारी या नुस्खा खोजें' : 'Search Remedy or Illness'}
          </DialogTitle>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <Input
              autoFocus
              placeholder={isHindi ? "जैसे: बुखार, sardi..." : "e.g., fever, cough..."}
              className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-2xl"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="flex-1 w-full bg-transparent">
          <div className="p-4 max-w-2xl mx-auto w-full">
            {results.length > 0 ? (
              <div className="space-y-2">
                {results.map((remedy) => (
                  <button 
                    key={remedy.id} 
                    onClick={() => handleResultClick(remedy)} 
                    className={cn(
                      "w-full p-4 rounded-xl border flex items-center gap-4 group text-left transition-all active:scale-[0.98]",
                      isNight ? "bg-white/5 border-white/5" : "bg-white border-primary/5"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center font-black",
                      isNight ? "bg-white/5 text-accent" : "bg-accent/10 text-accent"
                    )}>
                      {toEnglishDigits(remedy.serialNumber === "Live" ? "★" : remedy.serialNumber)}
                    </div>
                    <div className="flex-1 min-w-0 truncate">
                      <h4 className="font-bold text-base truncate">
                        {highlightMatchText(remedy.name[lang], query)}
                      </h4>
                      <p className="text-[11px] opacity-60 truncate">
                        {highlightMatchText(remedy.introduction[lang], query)}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-30" />
                  </button>
                ))}
              </div>
            ) : query.trim() ? (
              <div className="text-center py-10 opacity-40 italic">
                {isHindi ? 'कोई परिणाम नहीं मिला' : 'No results found'}
              </div>
            ) : (
              <div className="text-center py-10 opacity-30 italic text-sm">
                {isHindi ? 'खोजने के लिए ऊपर टाइप करें...' : 'Type above to search...'}
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};