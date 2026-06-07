'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Language, Theme } from '@/app/page';

interface Category {
  id: string;
  title: string;
  subtitle: string;
}

interface CategoryCardsProps {
  categories: Category[];
  lang: Language;
  theme: Theme;
  onSelectCategory: (id: string) => void;
}

export const CategoryCards = ({ categories, lang, theme, onSelectCategory }: CategoryCardsProps) => {
  const isHindi = lang === 'hi';
  const isNight = theme === 'night';

  return (
    <div className="space-y-3 w-full max-w-xl mx-auto pb-12">
      <div className="flex items-center gap-3 px-2 mb-1">
        <div className="w-2 h-7 bg-[#14532D] rounded-full" />
        <h3 className={cn("text-[14px] font-black uppercase tracking-[0.2em]", isNight ? "text-white/60" : "text-[#14532D]/60")}>
          {isHindi ? 'उपचार श्रेणियां' : 'Remedy Categories'}
        </h3>
      </div>

      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={cn(
            "group relative w-full p-4 sm:p-5 rounded-[2rem] border-[1.5px] transition-all duration-500 flex flex-row items-center justify-between text-left cursor-pointer shadow-md active:scale-[0.98]",
            isNight 
              ? "bg-black border-white/20 text-white" 
              : "bg-[#FDFBF7] border-[#14532D] text-[#1E293B] hover:border-[#14532D]/80"
          )}
        >
          <div className="flex-1 pr-4">
            <h3 className={cn(
              "text-[17px] sm:text-[19px] font-black leading-tight",
              isNight ? "text-white" : "text-[#14532D]"
            )}>
              {category.title}
            </h3>
            <p className={cn(
              "text-[11px] sm:text-[12px] font-medium tracking-tight leading-snug mt-1",
              isNight ? "text-white/60" : "text-muted-foreground"
            )}>
              {category.subtitle}
            </p>
          </div>

          <div className={cn(
            "flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all shrink-0 shadow-sm bg-[#14532D] text-white",
            isNight && "bg-white text-black"
          )}>
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      ))}
    </div>
  );
};
