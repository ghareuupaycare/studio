import React from 'react';
import { REMEDIES, Remedy } from '@/lib/remedy-data';
import { RemedyCard } from './remedy-card';
import { HeartOff } from 'lucide-react';
import { Language } from '@/app/page';

interface FavoritesViewProps {
  favorites: string[];
  lang: Language;
  onToggleFavorite: (id: string) => void;
  onSelectRemedy: (remedy: Remedy) => void;
}

export const FavoritesView = ({ favorites, lang, onToggleFavorite, onSelectRemedy }: FavoritesViewProps) => {
  // Robust data verification
  const favoriteRemedies = Array.isArray(favorites) 
    ? REMEDIES.filter(r => favorites.includes(r.id))
    : [];

  const isHindi = lang === 'hi';

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-headline font-bold text-primary">
          {isHindi ? 'पसंदीदा नुस्खे' : 'Favorite Remedies'}
        </h2>
        <p className="text-muted-foreground text-sm">
          {isHindi ? 'आपके द्वारा सहेजे गए बेहतरीन घरेलू उपाय।' : 'Best home remedies saved by you.'}
        </p>
      </div>

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
