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
      ? 'भारतीय घरेलू उपाय और वैद्य जी द्वारा संचालित आयुर्वेदिक स्वास्थ्य' 
      : 'Indian Home Remedies & Vaidya-led Ayurvedic Health',
    line3: isHindi 
      ? 'शास्त्रों पर आधारित पारंपरिक घरेलू उपाय, जो आपकी रसोई में छिपे स्वस्थ्य रहने का खज़ाना हैं' 
      : 'Traditional shastra-based remedies, the hidden treasure of health in your kitchen',
    line4: isHindi ? 'बिना दवा घर बैठे पाएं संपूर्ण स्वास्थ्य' : 'Complete Health at Home Without Medicine'
  };

  const categories = [
    {
      id: 'fever',
      translations: {
        hi: {
          title: 'मौसमी बुखार एवं फ्लू',
          subtitle: 'बुखार, मलेरिया, डेंगू, चिकनगुनिया, लू लगना',
        },
        en: {
          title: 'Seasonal Fever & Flu',
          subtitle: 'Fever, Malaria, Dengue, Chikungunya, Heat Stroke',
        }
      }
    },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <section className={cn(
        "w-full aspect-video rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col items-center justify-center p-6 sm:p-10 text-center transition-all duration-500",
        isNight 
          ? "bg-black border-2 border-white" 
          : "herbal-gradient border-2 border-[#14532D]"
      )}>
        
        <p className={cn(
          "text-xl sm:text-2xl font-black tracking-[0.2em] uppercase mb-4 transition-colors duration-500 text-white"
        )}>
          {bannerContent.line1}
        </p>

        <h2 className={cn(
          "text-3xl sm:text-5xl font-black leading-[1.1] max-w-xl mx-auto mb-4 transition-colors duration-500",
          isNight ? "text-white" : "text-[#14532D]"
        )}>
          {bannerContent.line2}
        </h2>

        <p className={cn(
          "text-xl sm:text-3xl font-bold max-w-2xl mx-auto leading-relaxed mb-6 italic transition-colors duration-500",
          isNight ? "text-white" : "text-[#1E293B]"
        )}>
          {bannerContent.line3}
        </p>

        <p className={cn(
          "text-2xl sm:text-4xl font-black [word-spacing:0.25rem] transition-colors duration-500 text-white"
        )}>
          {bannerContent.line4}
        </p>
      </section>

      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((category) => {
            const content = category.translations[lang];
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={cn(
                  "group relative w-full p-10 rounded-[2.5rem] border transition-all duration-500",
                  "flex flex-col items-start justify-center text-left space-y-4 shadow-2xl hover:-translate-y-1 active:scale-[0.98]",
                  isNight 
                    ? "bg-black border-white text-white active:bg-white active:text-black" 
                    : "bg-[#FDF6E2] border-primary/10 hover:border-accent/40 text-[#1E293B] active:bg-[#B45309] active:text-[#FDFBF7]"
                )}
              >
                <h3 className={cn(
                  "text-3xl font-black transition-colors leading-tight",
                  isNight ? "text-white group-active:text-black" : "text-[#1E293B] group-active:text-white"
                )}>
                  {content.title}
                </h3>
                <p className={cn(
                  "text-lg font-bold tracking-tight leading-relaxed max-w-[95%] transition-colors",
                  isNight ? "text-white group-active:text-black" : "text-[#1E293B] group-active:text-white"
                )}>
                  {content.subtitle}
                </p>
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 rounded-[2.5rem] transition-opacity duration-300" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
