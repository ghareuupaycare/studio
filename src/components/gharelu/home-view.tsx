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
    title: isHindi ? 'आयुर्वेदिक समाधान' : 'Ayurvedic Solutions',
    sub1: isHindi 
      ? 'भारतीय घरेलू उपाय और वैद्य जी द्वारा संचालित आयुर्वेदिक स्वास्थ्य' 
      : 'Indian Home Remedies & Ayurvedic Health directed by Vaidya Ji',
    sub2: isHindi 
      ? 'शास्त्रों पर आधारित पारंपरिक घरेलू उपाय, जो आपकी रसोई में छिपे स्वस्थ्य रहने का खज़ाना हैं' 
      : 'Traditional shastra-based remedies, the hidden treasure of health in your kitchen',
    tagline: isHindi ? 'बिना दवा घर बैठे पाएं संपूर्ण स्वास्थ्य' : 'Complete health at home without medicine'
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
    <div className="space-y-12 animate-in fade-in duration-700 w-full max-w-2xl px-4 sm:px-6 text-left">
      {/* Top Premium Brand Banner */}
      <section className={cn(
        "w-full rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col items-start justify-center p-8 sm:p-12 text-left transition-all duration-500 border-2",
        isNight 
          ? "bg-black border-white" 
          : "bg-[#14532D] border-[#14532D]"
      )}>
        
        <h2 className={cn(
          "text-4xl sm:text-6xl font-black leading-tight mb-6 transition-colors duration-500",
          isNight ? "text-white" : "text-white"
        )}>
          {bannerContent.title}
        </h2>

        <p className={cn(
          "text-xl sm:text-2xl font-bold mb-4 transition-colors duration-500",
          isNight ? "text-accent" : "text-accent"
        )}>
          {bannerContent.sub1}
        </p>

        <p className={cn(
          "text-lg sm:text-xl font-bold leading-loose mb-8 transition-colors duration-500",
          isNight ? "text-white/80" : "text-white/90"
        )}>
          {bannerContent.sub2}
        </p>

        <div className={cn(
          "px-8 py-4 rounded-full font-black text-xl sm:text-2xl transition-all shadow-lg",
          isNight ? "bg-white text-black" : "bg-accent text-white"
        )}>
          {bannerContent.tagline}
        </div>
      </section>

      {/* Categories List - Strictly Left Aligned */}
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
