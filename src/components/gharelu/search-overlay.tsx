'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, ChevronRight, X, Mic, MicOff, Loader2 } from 'lucide-react';
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

// Stop words to be ignored for better relevance
const STOP_WORDS = new Set([
  'मुझे', 'दिन', 'से', 'और', 'है', 'हैं', 'था', 'थी', 'के', 'का', 'की', 'में', 'पर', 'को', 'ने', 'हो', 'गया',
  'i', 'have', 'for', 'since', 'the', 'a', 'an', 'is', 'am', 'are', 'was', 'were', 'to', 'in', 'on', 'at',
  'with', 'me', 'my', 'been', 'has', 'had', 'feeling'
]);

export const SearchOverlay = ({ isOpen, onClose, lang, theme, onSelectRemedy, allRemedies }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';
  const db = useFirestore();
  const logTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).webkitSpeechRecognition) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';

      recognitionInstance.onstart = () => setIsListening(true);
      recognitionInstance.onend = () => setIsListening(false);
      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
      };

      setRecognition(recognitionInstance);
    }
  }, [lang]);

  const toggleVoiceSearch = () => {
    if (isListening) {
      recognition?.stop();
    } else {
      recognition?.start();
    }
  };

  // Smart Keyword Matching with Relevance Ranking
  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const normalizedQuery = query.toLowerCase().trim();
    const queryTokens = normalizedQuery.split(/\s+/)
      .filter(t => t.length > 1 && !STOP_WORDS.has(t)); // Filter out stop words and single characters

    if (queryTokens.length === 0 && normalizedQuery.length > 0) {
      // If all words were stop words, just use the original query as one token
      queryTokens.push(normalizedQuery);
    }

    return allRemedies
      .map(remedy => {
        let score = 0;
        const nameStr = (remedy.name.hi + ' ' + remedy.name.en).toLowerCase();
        const keywordsStr = (Array.isArray(remedy.keywords) ? remedy.keywords.join(' ') : (remedy.keywords || '')).toLowerCase();
        const introStr = (Array.isArray(remedy.introduction[lang]) 
          ? (remedy.introduction[lang] as string[]).join(' ') 
          : (remedy.introduction[lang] as string)).toLowerCase();

        // 1. Exact Full Phrase Match (Highest Score)
        if (nameStr.includes(normalizedQuery)) score += 100;
        if (keywordsStr.includes(normalizedQuery)) score += 80;

        // 2. Token Matching Score
        queryTokens.forEach(token => {
          if (nameStr.includes(token)) score += 40;
          if (keywordsStr.includes(token)) score += 30;
          if (introStr.includes(token)) score += 10;
        });

        return { remedy, score };
      })
      .filter(item => item.score > 0) // Only keep items with a score
      .sort((a, b) => b.score - a.score) // Sort by highest relevance score
      .map(item => item.remedy)
      .slice(0, 6); // Limit to top 6 highly relevant results
  }, [query, allRemedies, lang]);

  // Log missed queries for analytics
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

  // Utility to highlight matching words in text
  const highlightMatchText = (text: string | string[], currentQuery: string) => {
    const displayStr = toEnglishDigits(Array.isArray(text) ? text[0] : text);
    if (!currentQuery.trim()) return displayStr;

    // Get significant tokens for highlighting
    const tokens = currentQuery.toLowerCase().trim().split(/\s+/)
      .filter(t => t.length > 1 && !STOP_WORDS.has(t));
    
    if (tokens.length === 0) tokens.push(currentQuery.toLowerCase().trim());

    // Create a regex to match any of the tokens (case-insensitive)
    const pattern = tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    if (!pattern) return displayStr;
    
    const regex = new RegExp(`(${pattern})`, 'gi');
    const parts = displayStr.split(regex);

    return (
      <>
        {parts.map((part, i) => 
          regex.test(part) ? (
            <mark key={i} className="bg-[#FBBF24] text-black rounded-sm px-1 font-black shadow-sm">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "fixed top-0 left-0 translate-x-0 translate-y-0 w-full h-[85vh] max-w-none p-0 border-none flex flex-col rounded-none shadow-2xl z-[100] outline-none [&>button]:hidden",
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

          <DialogTitle className="text-white text-xl font-headline font-black mb-4 flex items-center gap-2">
            <Search className="w-5 h-5" />
            {isHindi ? 'अपनी समस्या बोलें या खोजें' : 'Speak or Search your Symptom'}
          </DialogTitle>
          
          <div className="relative group">
            <Input
              autoFocus
              placeholder={isHindi ? "जैसे: मुझे तीन दिन से बुखार है..." : "e.g., I have fever since 3 days..."}
              className="pl-4 pr-14 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-2xl focus-visible:ring-accent"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {query.trim() && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setQuery('')}
                  className="h-10 w-10 text-white/50 hover:text-white hover:bg-white/10 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              )}
              <Button 
                onClick={toggleVoiceSearch}
                className={cn(
                  "h-10 w-10 p-0 rounded-full transition-all duration-300",
                  isListening 
                    ? "bg-red-500 hover:bg-red-600 animate-pulse text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]" 
                    : "bg-accent hover:bg-accent/90 text-white"
                )}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
            </div>
          </div>
          
          {isListening && (
            <div className="mt-2 text-center text-[10px] text-accent font-black uppercase tracking-[0.2em] animate-bounce">
              {isHindi ? 'वैद्य जी सुन रहे हैं...' : 'Vaidya Ji is Listening...'}
            </div>
          )}
        </div>

        <ScrollArea className="flex-1 w-full bg-transparent">
          <div className="p-4 max-w-2xl mx-auto w-full">
            {results.length > 0 ? (
              <div className="space-y-3 pb-10">
                <div className="flex items-center gap-2 px-2 py-1 mb-2">
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-60">
                    {isHindi ? `सबसे सटीक ${results.length} परिणाम` : `Top ${results.length} Best Results`}
                  </span>
                </div>
                {results.map((remedy) => (
                  <button 
                    key={remedy.id} 
                    onClick={() => handleResultClick(remedy)} 
                    className={cn(
                      "w-full p-5 rounded-2xl border flex items-center gap-5 group text-left transition-all active:scale-[0.98] shadow-sm",
                      isNight ? "bg-white/5 border-white/5" : "bg-white border-primary/5 hover:border-accent/40"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shrink-0",
                      isNight ? "bg-white/5 text-accent" : "bg-accent/10 text-accent"
                    )}>
                      {toEnglishDigits(remedy.serialNumber === "Live" ? "★" : remedy.serialNumber)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-lg leading-tight mb-1 whitespace-normal break-words">
                        {highlightMatchText(remedy.name[lang], query)}
                      </h4>
                      <p className="text-[12px] opacity-60 font-medium whitespace-normal break-words line-clamp-2">
                        {highlightMatchText(remedy.introduction[lang], query)}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            ) : query.trim() ? (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 opacity-40">
                <Loader2 className="w-10 h-10 animate-spin text-accent" />
                <div className="space-y-1">
                  <p className="font-black text-lg">
                    {isHindi ? 'क्षमा करें, कोई सटीक नुस्खा नहीं मिला' : 'No exact remedy found'}
                  </p>
                  <p className="text-sm px-10">
                    {isHindi 
                      ? 'कृपया अपनी समस्या के मुख्य शब्द बोलें (जैसे: बुखार, सर्दी, खांसी)' 
                      : 'Try speaking core symptoms (e.g., Fever, Cold, Cough)'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
                <div className={cn(
                  "p-6 rounded-full",
                  isNight ? "bg-white/5" : "bg-primary/5"
                )}>
                  <Mic className={cn("w-12 h-12 opacity-20", isNight ? "text-white" : "text-primary")} />
                </div>
                <div className="space-y-2">
                  <p className="font-black text-lg opacity-40">
                    {isHindi ? 'वैद्य जी से सीधे बात करें' : 'Talk to Vaidya Ji directly'}
                  </p>
                  <p className="text-[11px] font-bold uppercase tracking-widest opacity-30">
                    {isHindi ? 'ऊपर माइक बटन दबाकर अपनी समस्या बोलें' : 'Press mic button above to speak symptoms'}
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