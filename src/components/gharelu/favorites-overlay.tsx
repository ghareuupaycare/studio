'use client';

import React, { useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Heart, X, ChevronRight, HeartOff } from 'lucide-react';
import { REMEDIES } from '@/lib/remedy-data';
import { Language, Theme } from '@/app/page';
import { cn, toEnglishDigits } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FavoritesOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  theme: Theme;
  favorites: string[];
  onSelectRemedy: (remedyId: string, categoryId: string) => void;
}

export const FavoritesOverlay = ({ isOpen, onClose, lang, theme, favorites, onSelectRemedy }: FavoritesOverlayProps) => {
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';

  const favoriteRemedies = useMemo(() => {
    return REMEDIES.filter(r => favorites.includes(r.id));
  }, [favorites]);

  const handleResultClick = (remedyId: string) => {
    // Standardize category lookup: Currently all fever, cold, and cough remedies belong to fever_flu
    const categoryId = 'fever_flu';
    onSelectRemedy(remedyId, categoryId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "fixed top-0 left-0 translate-x-0 translate-y-0 w-full h-[50vh] max-w-none p-0 border-none flex flex-col transition-all duration-300 ease-in-out rounded-none shadow-2xl z-[100]",
          "active:ring-0 focus:ring-0 focus-visible:ring-0 outline-none",
          "[&>button]:text-accent [&>button]:opacity-100 [&>button]:hover:text-accent [&>button]:scale-125 [&>button]:transition-all [&>button]:duration-200",
          isNight ? "bg-[#0a110d] text-white" : "bg-[#FDFBF7] text-foreground"
        )}
      >
        <div className={cn(
          "shrink-0 p-6 pt-8",
          isNight ? "bg-black/40 border-b border-white/10" : "bg-primary border-b border-white/10"
        )}>
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-accent fill-current" />
            <DialogTitle className="text-white text-xl font-headline font-black">
              {isHindi ? 'पसंदीदा नुस्खे' : 'Favorite Remedies'}
            </DialogTitle>
          </div>
          <p className="text-white/60 text-xs mt-2 font-medium">
            {isHindi ? 'आपके द्वारा सहेजे गए बेहतरीन घरेलू उपाय' : 'Your saved traditional home remedies'}
          </p>
        </div>

        <ScrollArea className="flex-1 w-full bg-transparent">
          <div className="p-4 w-full max-w-2xl mx-auto">
            {favoriteRemedies.length > 0 ? (
              <div className="space-y-2 pb-6">
                {favoriteRemedies.map((remedy) => (
                  <button
                    key={remedy.id}
                    onClick={() => handleResultClick(remedy.id)}
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
                        {toEnglishDigits(remedy.name[lang])}
                      </h4>
                      <p className="text-[11px] opacity-60 truncate mt-0.5 font-medium">
                        {toEnglishDigits(Array.isArray(remedy.introduction[lang]) ? remedy.introduction[lang][0] : remedy.introduction[lang])}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:text-accent" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 opacity-40">
                <HeartOff className="w-16 h-16" />
                <div className="space-y-1">
                  <p className="font-black text-lg">
                    {isHindi ? 'अभी कोई पसंदीदा नुस्खा सेव नहीं है।' : 'No favorites saved yet.'}
                  </p>
                  <p className="text-xs">
                    {isHindi ? 'नुस्खों के विवरण पेज पर दिल (Heart) के बटन को दबाकर उन्हें यहाँ जोड़ें।' : 'Click the heart button on remedy details to save them here.'}
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
