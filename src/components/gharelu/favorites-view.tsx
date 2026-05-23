import React from 'react';
import { REMEDIES, Remedy } from '@/lib/remedy-data';
import { RemedyCard } from './remedy-card';
import { HeartOff } from 'lucide-react';

interface FavoritesViewProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectRemedy: (remedy: Remedy) => void;
}

export const FavoritesView = ({ favorites, onToggleFavorite, onSelectRemedy }: FavoritesViewProps) => {
  const favoriteRemedies = REMEDIES.filter(r => favorites.includes(r.id));

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-headline font-bold text-primary">पसंदीदा नुस्खे</h2>
        <p className="text-muted-foreground text-sm">आपके द्वारा सहेजे गए बेहतरीन घरेलू उपाय।</p>
      </div>

      {favoriteRemedies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {favoriteRemedies.map((remedy) => (
            <RemedyCard 
              key={remedy.id} 
              remedy={remedy} 
              isFavorite={true}
              onToggleFavorite={(e) => {
                e.stopPropagation();
                onToggleFavorite(remedy.id);
              }}
              onClick={() => onSelectRemedy(remedy)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-4 opacity-50">
          <div className="p-4 rounded-full bg-primary/10">
            <HeartOff className="w-12 h-12 text-primary/40" />
          </div>
          <p className="text-muted-foreground font-headline text-lg">अभी तक कोई पसंदीदा नहीं है</p>
        </div>
      )}
    </div>
  );
};
