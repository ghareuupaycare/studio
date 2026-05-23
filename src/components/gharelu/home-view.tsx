import React, { useState } from 'react';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CATEGORIES, REMEDIES, Remedy } from '@/lib/remedy-data';
import { RemedyCard } from './remedy-card';
import Image from 'next/image';

interface HomeViewProps {
  onSelectRemedy: (remedy: Remedy) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const HomeView = ({ onSelectRemedy, favorites, onToggleFavorite }: HomeViewProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredRemedies = REMEDIES.filter((remedy) => {
    const matchesSearch = 
      remedy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      remedy.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory ? remedy.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Search Section */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50 group-focus-within:text-primary transition-colors" />
        <Input 
          className="h-14 pl-12 pr-4 bg-card/50 border-primary/20 rounded-2xl text-lg font-headline placeholder:text-muted-foreground/50 focus-visible:ring-primary/40 focus-visible:border-primary/40"
          placeholder="क्या तकलीफ है? (उदा: खांसी)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories Carousel */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-xl font-headline font-bold text-primary">श्रेणियां</h2>
          <button className="text-xs font-bold uppercase tracking-widest text-primary/60 flex items-center gap-1">
            सब देखें <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-1 -mx-4 px-4">
          <button 
            onClick={() => setSelectedCategory(null)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
              !selectedCategory 
                ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20' 
                : 'bg-card/50 text-muted-foreground border-primary/10'
            }`}
          >
            सभी
          </button>
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all border whitespace-nowrap ${
                selectedCategory === cat.id 
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20' 
                  : 'bg-card/50 text-muted-foreground border-primary/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Banner (Conditional) */}
      {!searchQuery && !selectedCategory && (
        <div className="relative h-48 rounded-3xl overflow-hidden shadow-2xl group border border-primary/10">
          <Image 
            src="https://picsum.photos/seed/home1/800/400" 
            alt="Ayurveda Banner" 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            data-ai-hint="ayurvedic products"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent flex flex-col justify-center px-6">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary mb-1">विशेष सुझाव</span>
            <h3 className="text-2xl font-headline font-bold text-white max-w-[200px] leading-tight mb-3">
              प्राकृतिक तरीकों से स्वस्थ रहें
            </h3>
            <button className="self-start px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full hover:bg-primary/90 transition-colors">
              अभी जानें
            </button>
          </div>
        </div>
      )}

      {/* Remedies Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-headline font-bold text-primary px-1">घरेलू नुस्खे</h2>
        {filteredRemedies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredRemedies.map((remedy) => (
              <RemedyCard 
                key={remedy.id} 
                remedy={remedy} 
                isFavorite={favorites.includes(remedy.id)}
                onToggleFavorite={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(remedy.id);
                }}
                onClick={() => onSelectRemedy(remedy)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card/20 rounded-3xl border border-dashed border-primary/20">
            <p className="text-muted-foreground font-headline text-lg">कोई परिणाम नहीं मिला</p>
          </div>
        )}
      </div>
    </div>
  );
};
