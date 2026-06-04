
'use client';

import React, { useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Heart, X, ChevronRight, HeartOff } from 'lucide-react';
import { Remedy } from '@/lib/remedy-data';
import { Language, Theme } from '@/app/page';
import { cn, toEnglishDigits } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface FavoritesOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  theme: Theme;
  favorites: string[];
  onSelectRemedy: (remedyId: string, categoryId: string) => void;
  allRemedies: Remedy[];
}

export const FavoritesOverlay = ({ 
  isOpen, 
  onClose, 
  lang, 
  theme, 
  favorites, 
  onSelectRemedy, 
  allRemedies 
}: FavoritesOverlayProps) => {
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';

  const favoriteRemedies = useMemo(() => {
    return allRemedies.filter(r => favorites.includes(r.id));
  }, [favorites, allRemedies]);

  const handleResultClick = (remedy: Remedy) => {
    const categoryId = remedy.categoryId || 'fever_flu';
    onSelectRemedy(remedy.id, categoryId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "fixed top-0 left-0 translate-x-0 translate-y-0 w-full h-[50vh] max-w-none p-0 border-none flex flex-col rounded-none shadow-2xl z-[100] outline-none transition-all duration-300 ease-in-out [&>button]:hidden",
          isNight ? "bg-[#0a110d] text-white" : "bg-[#FDFBF7] text-foreground"
        )}
      >
        {/* Header */}
        <div className={cn(
          "shrink-0 p-6 pt-10 pb-6 relative",
          isNight ? "bg-black/80 border-b border-white/10" : "bg-[#14532D] border-b border-white/10"
        )}>
          {/* Custom Golden Close Button */}
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

          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-accent fill-current" />
            <DialogTitle className="text-white text-xl font-headline font-black">
              {isHindi ? 'पसंदीदा नुस्खे' : 'Favorite Remedies'}
            </DialogTitle>
          </div>
          <p className="text-white/60 text-xs mt-1 font-medium">
            {isHindi ? 'आपके द्वारा सहेजे गए स्वास्थ्य समाधान' : 'Your saved health solutions'}
          </p>
        </div>

        {/* Scrollable List Content */}
        <ScrollArea className="flex-1 w-full bg-transparent">
          <div className="p-4 max-w-2xl mx-auto w-full pb-10">
            {favoriteRemedies.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {favoriteRemedies.map((remedy) => (
                  <button 
                    key={remedy.id} 
                    onClick={() => handleResultClick(remedy)} 
                    className={cn(
                      "w-full p-5 rounded-2xl border flex items-center gap-5 text-left transition-all active:scale-[0.98] group shadow-sm",
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
                      <h4 className="font-bold text-lg leading-tight truncate">
                        {toEnglishDigits(remedy.name[lang])}
                      </h4>
                      <p className="text-xs opacity-60 mt-1 font-medium">
                        {isHindi ? 'विवरण देखने के लिए क्लिक करें' : 'Click to view details'}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 opacity-30 text-center space-y-4">
                <HeartOff className="w-16 h-16" />
                <div className="space-y-1">
                  <p className="font-black text-lg">
                    {isHindi ? 'अभी कोई पसंदीदा नुस्खा नहीं है' : 'No favorites yet'}
                  </p>
                  <p className="text-xs">
                    {isHindi ? 'नुस्खों को सहेजने के लिए दिल (Heart) आइकन पर क्लिक करें।' : 'Click the heart icon to save remedies.'}
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
