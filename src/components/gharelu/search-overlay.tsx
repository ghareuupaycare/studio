'use client';

import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, X, ChevronRight } from 'lucide-react';
import { REMEDIES } from '@/lib/remedy-data';
import { Language, Theme } from '@/app/page';
import { cn, toEnglishDigits } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  theme: Theme;
  onSelectRemedy: (remedyId: string, categoryId: string) => void;
}

export const SearchOverlay = ({ isOpen, onClose, lang, theme, onSelectRemedy }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';

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

  /**
   * Helper function to highlight matching text query within a string.
   * Supports Light and Night mode themes.
   */
  const highlightMatchText = (text: string, currentQuery: string) => {
    if (!currentQuery.trim()) return toEnglishDigits(text);

    // Convert text to English digits first to ensure consistency in matching
    const displayStr = toEnglishDigits(text);
    
    // Escape special characters for regex
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
                  ? "bg-yellow-500/30 text-yellow-300 border border-yellow-500/20" 
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "max-w-2xl w-[95vw] h-[80vh] flex flex-col p-0 border-none overflow-hidden transition-colors duration-500 rounded-b-none rounded-t-[2.5rem] sm:rounded-t-[2.5rem] sm:rounded-b-[2.5rem] top-auto bottom-0 translate-y-0 sm:top-[50%] sm:bottom-auto sm:-translate-y-1/2",
        isNight ? "bg-[#121b15] text-white" : "bg-[#FDFBF7] text-foreground"
      )}>
        <DialogHeader className={cn(
          "p-6 border-b transition-colors duration-500 shrink-0",
          isNight ? "bg-black border-white/10" : "bg-primary border-white/10"
        )}>
          <DialogTitle className="text-white text-xl font-headline font-black mb-4">
            {isHindi ? 'बीमारी या नुस्खा खोजें' : 'Search Remedy or Illness'}
          </DialogTitle>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <Input
              autoFocus
              placeholder={isHindi ? "जैसे: बुखार, fever, bukhar..." : "e.g., fever, cold, acidity..."}
              className={cn(
                "pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-accent text-lg",
                "rounded-2xl transition-all"
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
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="p-4">
            {!query.trim() ? (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-40">
                <Search className="w-16 h-16" />
                <p className="font-bold text-lg">
                  {isHindi ? 'खोजना शुरू करें...' : 'Start typing to search...'}
                </p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-3">
                <p className="text-xs font-black uppercase tracking-[0.2em] opacity-40 px-2 mb-4">
                  {isHindi ? `${results.length} परिणाम मिले` : `${results.length} results found`}
                </p>
                {results.map((remedy) => (
                  <button
                    key={remedy.id}
                    onClick={() => {
                      // Logic to find category based on ID prefix or explicit mapping
                      const catId = remedy.illnessId.includes('fever') ? 'fever' : 'fever'; 
                      onSelectRemedy(remedy.id, catId);
                      onClose();
                    }}
                    className={cn(
                      "w-full p-5 rounded-2xl border transition-all text-left flex items-center gap-4 group",
                      isNight 
                        ? "bg-black border-white/10 hover:border-accent text-white" 
                        : "bg-white border-primary/5 hover:border-accent text-primary shadow-sm"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shrink-0 transition-colors duration-500",
                      isNight ? "bg-white/5 text-accent" : "bg-accent/5 text-accent"
                    )}>
                      {toEnglishDigits(remedy.serialNumber)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-lg leading-tight truncate">
                        {highlightMatchText(remedy.name[lang], query)}
                      </h4>
                      <p className="text-sm opacity-60 truncate mt-0.5">
                        {highlightMatchText(remedy.introduction[lang], query)}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:text-accent transition-all" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="p-5 rounded-full bg-red-500/10 text-red-500">
                  <X className="w-12 h-12" />
                </div>
                <div className="space-y-1">
                  <p className="font-black text-xl">
                    {isHindi ? 'कोई परिणाम नहीं मिला' : 'No results found'}
                  </p>
                  <p className="text-sm opacity-60">
                    {isHindi ? 'कृपया कोई और शब्द लिखकर देखें।' : 'Try searching for something else.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};