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

  const categories = [
    {
      id: 'fever_flu',
      translations: {
        hi: {
          title: '1. मौसमी बुखार एवं फ्लू',
          subtitle: 'बुखार, जुकाम और खांसी के लिए प्रामाणिक आयुर्वेदिक उपचार',
        },
        en: {
          title: '1. Seasonal Fever & Flu',
          subtitle: 'Authentic Ayurvedic remedies for fever, cold and cough',
        }
      }
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 w-full max-w-2xl px-4 sm:px-6">
      {/* Top Premium Brand Banner */}
      <section className={cn(
        "w-full rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col items-center justify-center p-8 sm:p-12 text-center transition-all duration-500 border border-amber-400/40",
        "aspect-video max-h-[220px]",
        isNight 
          ? "bg-black" 
          : "bg-[#14532D]"
      )}>
        
        <h2 className={cn(
          "text-3xl sm:text-4xl font-black leading-tight mb-4 transition-colors duration-500 whitespace-nowrap",
          "text-white"
        )}>
          {isHindi ? 'आयुर्वेदिक समाधान' : 'Ayurvedic Solutions'}
        </h2>

        <p className={cn(
          "text-xl sm:text-2xl font-black mb-2 transition-colors duration-500 text-amber-400 text-center leading-tight",
          "max-w-prose"
        )}>
          {isHindi ? (
            <>
              भारतीय घरेलू उपाय और वैद्य जी <br />
              द्वारा संचालित आयुर्वेदिक स्वास्थ्य
            </>
          ) : (
            'Indian Home Remedies & Ayurvedic Health directed by Vaidya Ji'
          )}
        </p>

        <div className={cn(
          "px-6 py-3 rounded-full font-black text-lg sm:text-xl transition-all shadow-lg whitespace-nowrap",
          isNight ? "bg-white text-black" : "bg-accent text-white"
        )}>
          {isHindi ? 'बिना दवा घर बैठे पाएं स्वास्थ्य' : 'Health at home without medicine'}
        </div>
      </section>

      {/* Categories List */}
      <div className="space-y-8 w-full text-left">
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
                  "text-[20px] font-semibold transition-colors leading-tight",
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