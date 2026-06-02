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
      {/* Home Banner - Premium Redesign */}
      <section className={cn(
        "w-full rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col items-center justify-center py-4 px-3 text-center transition-all duration-500 border border-amber-400/40",
        "aspect-video max-h-[220px] relative",
        isNight ? "bg-black" : "bg-[#14532D]"
      )}>
        <div className="space-y-1 z-10 w-full">
          <h2 className="text-[24px] font-bold leading-tight text-white">
            {isHindi ? 'आयुर्वेदिक समाधान' : 'Ayurvedic Solutions'}
          </h2>
          <div className="flex flex-col gap-0">
            <p className="text-[16px] font-semibold text-amber-400 leading-tight">
              {isHindi ? 'भारतीय घरेलू उपाय और वैद्य जी' : 'Indian Home Remedies & Vaidya Ji'}
            </p>
            <p className="text-[16px] font-semibold text-amber-400 leading-tight">
              {isHindi ? 'द्वारा संचालित आयुर्वेदिक स्वास्थ्य' : 'Managed by Ayurvedic Health'}
            </p>
          </div>
          <p className={cn(
            "text-[13px] font-medium max-w-[300px] mx-auto leading-relaxed mt-1",
            isNight ? "text-white/80" : "text-slate-100"
          )}>
            {isHindi 
              ? 'शास्त्रों पर आधारित पारंपरिक घरेलू उपाय, जो आपकी रसोई में छिपे स्वास्थ्य रहने का खज़ाना हैं' 
              : 'Traditional remedies based on scriptures, the hidden treasure of health in your kitchen'}
          </p>
          <div className="pt-2">
            <button className={cn(
              "inline-block px-4 py-2 rounded-full font-bold text-[13px] shadow-lg active:scale-95 transition-all duration-200 cursor-pointer", 
              isNight ? "bg-white text-black" : "bg-accent text-white"
            )}>
              {isHindi ? 'बिना दवा घर बैठे पाएं संपूर्ण स्वास्थ्य' : 'Get perfect health at home without medicines'}
            </button>
          </div>
        </div>
        
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />
      </section>

      {/* Category Cards */}
      <div className="space-y-8 w-full text-left">
        <div className="grid grid-cols-1 gap-6 w-full">
          {categories.map((category) => {
            const content = category.translations[lang];
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={cn(
                  "group relative w-full p-6 sm:p-8 rounded-[2rem] border transition-all duration-500 flex flex-col items-start justify-center text-left space-y-1 shadow-xl hover:-translate-y-1 active:scale-[0.98]",
                  isNight 
                    ? "bg-black border-white text-white active:bg-white active:text-black" 
                    : "bg-[#FDF6E2] border-primary/10 hover:border-accent/40 text-[#1E293B] active:bg-[#B45309] active:text-[#FDFBF7]",
                  "border-amber-100/40 shadow-sm shadow-amber-950/5"
                )}
              >
                <h3 className={cn(
                  "text-[20px] font-semibold transition-colors leading-tight",
                  isNight ? "text-white group-active:text-black" : "text-[#1E293B] group-active:text-white"
                )}>
                  {content.title}
                </h3>
                <p className={cn(
                  "text-[14px] font-normal tracking-tight leading-relaxed max-w-[95%] transition-colors",
                  isNight ? "text-white/60 group-active:text-black/60" : "text-muted-foreground group-active:text-white/80"
                )}>
                  {content.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};