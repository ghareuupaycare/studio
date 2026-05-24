import React from 'react';
import { REMEDIES, Remedy } from '@/lib/remedy-data';
import { RemedyCard } from './remedy-card';
import { HeartOff, ChevronLeft } from 'lucide-react';
import { Language, Theme } from '@/app/page';
import { cn } from '@/lib/utils';

interface FavoritesViewProps {
  favorites: string[];
  lang: Language;
  theme: Theme;
  onToggleFavorite: (id: string) => void;
  onSelectRemedy: (remedy: Remedy) => void;
  onBack: () => void;
}

export const FavoritesView = ({ favorites, lang, theme, onToggleFavorite, onSelectRemedy, onBack }: FavoritesViewProps) => {
  const favoriteRemedies = Array.isArray(favorites) 
    ? REMEDIES.filter(r => favorites.includes(r.id))
    : [];

  const isHindi = lang === 'hi';
  const isNight = theme === 'night';

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className={cn(
            "p-3 rounded-full transition-all active:scale-95",
            isNight ? "bg-white/10 text-white hover:bg-white/20" : "bg-primary/5 text-primary hover:bg-primary/10"
          )}
          aria-label={isHindi ? 'पीछे जाएं' : 'Go back'}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex flex-col">
          <h2 className={cn(
            "text-2xl font-headline font-bold",
            isNight ? "text-white" : "text-primary"
          )}>
            {isHindi ? 'पसंदीदा नुस्खे' : 'Favorite Remedies'}
          </h2>
          <p className="text-xs font-bold uppercase tracking-widest opacity-60">
            {isHindi ? 'आपके सहेजे गए उपाय' : 'Your saved remedies'}
          </p>
        </div>
      </div>

      <p className="text-muted-foreground text-sm text-center sm:text-left px-2">
        {isHindi ? 'आपके द्वारा सहेजे गए बेहतरीन घरेलू उपाय।' : 'Best home remedies saved by you.'}
      </p>

      {favoriteRemedies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {favoriteRemedies.map((remedy) => (
            <RemedyCard 
              key={remedy.id} 
              remedy={remedy} 
              isFavorite={true}
              lang={lang}
              onToggleFavorite={(e) => {
                e.stopPropagation();
                onToggleFavorite(remedy.id);
              }}
              onClick={() => onSelectRemedy(remedy)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-6 opacity-60">
          <div className="p-6 rounded-full bg-primary/5 border border-primary/10">
            <HeartOff className="w-16 h-16 text-primary/30" />
          </div>
          <p className="text-muted-foreground font-headline text-lg max-w-[280px] leading-relaxed">
            {isHindi 
              ? 'अभी तक कोई नुस्खा पसंदीदा सूची में नहीं जोड़ा गया है।' 
              : 'No remedies added to favorites yet.'}
          </p>
        </div>
      )}
    </div>
  );
};
