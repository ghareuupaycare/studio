
'use client';

import React, { useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Heart, X, ChevronRight, HeartOff } from 'lucide-react';
import { Remedy } from '@/lib/remedy-data';
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
  allRemedies: Remedy[];
}

export const FavoritesOverlay = ({ isOpen, onClose, lang, theme, favorites, onSelectRemedy, allRemedies }: FavoritesOverlayProps) => {
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';

  const favoriteRemedies = useMemo(() => {
    return allRemedies.filter(r => favorites.includes(r.id));
  }, [favorites, allRemedies]);

  const handleResultClick = (remedy: Remedy) => {
    onSelectRemedy(remedy.id, remedy.illnessId === 'live' ? 'live' : 'fever_flu');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("fixed top-0 left-0 w-full h-[60vh] p-0 border-none flex flex-col rounded-none shadow-2xl z-[100]", isNight ? "bg-[#0a110d] text-white" : "bg-[#FDFBF7] text-foreground")}>
        <div className={cn("shrink-0 p-6 pt-8", isNight ? "bg-black/40 border-b border-white/10" : "bg-primary border-b border-white/10")}>
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-accent fill-current" />
            <DialogTitle className="text-white text-xl font-headline font-black">{isHindi ? 'पसंदीदा नुस्खे' : 'Favorite Remedies'}</DialogTitle>
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 max-w-2xl mx-auto">
            {favoriteRemedies.length > 0 ? (
              <div className="space-y-2">
                {favoriteRemedies.map((remedy) => (
                  <button key={remedy.id} onClick={() => handleResultClick(remedy)} className={cn("w-full p-4 rounded-xl border flex items-center gap-4 text-left", isNight ? "bg-white/5 border-white/5" : "bg-white border-primary/5")}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-accent/10 text-accent font-black">{toEnglishDigits(remedy.serialNumber)}</div>
                    <div className="flex-1 truncate">
                      <h4 className="font-bold text-base">{toEnglishDigits(remedy.name[lang])}</h4>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-30" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 opacity-30 text-center">
                <HeartOff className="w-16 h-16 mb-4" />
                <p>{isHindi ? 'अभी कोई पसंदीदा नुस्खा नहीं है' : 'No favorites yet'}</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
