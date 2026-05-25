'use client';

import React from 'react';
import { Language, Theme } from '@/app/page';
import { cn } from '@/lib/utils';

interface HomeViewProps {
  lang: Language;
  theme: Theme;
  onSelectCategory: (id: string) => void;
}

export const HomeView = ({ lang, theme, onSelectCategory }: HomeViewProps) => {
  const isHindi = lang === 'hi';
  const isNight = theme === 'night';

  const bannerContent = {
    line1: isHindi ? 'आयुर्वेदिक समाधान' : 'Ayurvedic Solutions',
    line2: isHindi 
      ? 'भारतीय घरेलू उपाय' 
      : 'Indian Home Remedies',
    line3: isHindi 
      ? 'शास्त्रों पर आधारित पारंपरिक घरेलू उपाय' 
      : 'Traditional shastra-based remedies',
    line4: isHindi ? 'बिना दवा घर बैठे स्वास्थ्य' : 'Health at Home'
  };

  const categories = [
    {
      id: 'fever',
      translations: {
        hi: {
          title: '1. मौसमी बुखार एवं फ्लू',
          subtitle: 'बुखार, मलेरिया, डेंगू, चिकनगुनिया',
        },
        en: {
          title: '1. Seasonal Fever & Flu',
          subtitle: 'Fever, Malaria, Dengue, Chikungunya',
        }
      }
    },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 w-full">
      {/* Top Green Banner */}
      <section className={cn(
        "w-full aspect-[2/1] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col items-start justify-center p-8 sm:p-12 text-left transition-all duration-500",
        isNight 
          ? "bg-black border-2 border-white" 
          : "herbal-gradient border-2 border-[#14532D]"
      )}>
        
        <p className={cn(
          "text-sm sm:text-base font-black tracking-[0.2em] uppercase mb-2 transition-colors duration-500 text-white opacity-80"
        )}>
          {bannerContent.line1}
        </p>

        <h2 className={cn(
          "text-2xl sm:text-4xl font-black leading-tight max-w-xl mb-3 transition-colors duration-500 text-white"
        )}>
          {bannerContent.line2}
        </h2>

        <p className={cn(
          "text-base sm:text-lg font-bold max-w-md leading-relaxed mb-4 italic transition-colors duration-500 text-white/90"
        )}>
          {bannerContent.line3}
        </p>

        <p className={cn(
          "text-lg sm:text-xl font-black transition-colors duration-500 text-accent"
        )}>
          {bannerContent.line4}
        </p>
      </section>

      {/* Categories List - Left Aligned */}
      <div className="space-y-8 w-full">
        <div className="grid grid-cols-1 gap-6 w-full">
          {categories.map((category) => {
            const content = category.translations[lang];
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={cn(
                  "group relative w-full p-8 rounded-[2rem] border transition-all duration-500",
                  "flex flex-col items-start justify-center text-left space-y-3 shadow-xl hover:-translate-y-1 active:scale-[0.98]",
                  isNight 
                    ? "bg-black border-white text-white active:bg-white active:text-black" 
                    : "bg-[#FDF6E2] border-primary/10 hover:border-accent/40 text-[#1E293B] active:bg-[#B45309] active:text-[#FDFBF7]"
                )}
              >
                <h3 className={cn(
                  "text-2xl font-black transition-colors leading-tight",
                  isNight ? "text-white group-active:text-black" : "text-[#1E293B] group-active:text-white"
                )}>
                  {content.title}
                </h3>
                <p className={cn(
                  "text-base font-bold tracking-tight leading-relaxed max-w-[95%] transition-colors",
                  isNight ? "text-white group-active:text-black" : "text-[#1E293B] group-active:text-white"
                )}>
                  {content.subtitle}
                </p>
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity duration-300" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
