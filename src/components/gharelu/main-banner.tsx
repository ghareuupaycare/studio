'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Language, Theme } from '@/app/page';

interface MainBannerProps {
  lang: Language;
  theme: Theme;
}

export const MainBanner = ({ lang, theme }: MainBannerProps) => {
  const isHindi = lang === 'hi';
  const isNight = theme === 'night';

  const content = {
    title: isHindi ? 'आयुर्वेदिक समाधान' : 'Ayurvedic Solutions',
    subtitle: isHindi 
      ? 'भारतीय घरेलू उपाय और वैद्य जी द्वारा संचालित आयुर्वेदिक स्वास्थ्य' 
      : 'Indian Home Remedies & Ayurvedic Health powered by Vaidya Ji',
    description: isHindi
      ? 'शास्त्रों पर आधारित पारंपरिक घरेलू उपाय, जो आपकी रसोई में छिपे स्वास्थ्य रहने का ख़ज़ाना हैं'
      : 'Traditional scripture-based remedies, the hidden treasure of health in your kitchen',
    button: isHindi
      ? 'बिना दवा घर बैठे पाएं संपूर्ण स्वास्थ्य'
      : 'Achieve complete health at home without medicines'
  };

  return (
    <section className={cn(
      "w-full aspect-[16/9] rounded-[2.5rem] shadow-[0_0_40px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col items-center justify-center px-4 text-center transition-all duration-500 relative border-[3px]",
      isNight 
        ? "bg-black border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.3)]" 
        : "bg-[#14532D] border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.3)]"
    )}>
      {/* Shiny Golden Gradient Border is handled by the 'border-amber-400' above with gradient logic */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
      
      <div className="space-y-1 z-10 w-full flex flex-col items-center pt-4 pb-2">
        <h2 className="text-[20px] sm:text-[28px] font-black leading-[1.4] text-white max-w-[320px] drop-shadow-md">
          {content.title}
        </h2>
        
        <p className="text-[12px] sm:text-[15px] font-bold text-amber-400 leading-tight max-w-[90%] uppercase tracking-wide">
          {content.subtitle}
        </p>
        
        <p className={cn(
          "text-[10px] sm:text-[12px] font-medium max-w-[280px] mx-auto leading-tight opacity-90",
          isNight ? "text-white/80" : "text-slate-100"
        )}>
          {content.description}
        </p>

        <div className="pt-2">
          <button className="bg-accent hover:bg-accent/90 text-white px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-wider shadow-xl transition-all active:scale-95 border-b-[3px] border-amber-700 whitespace-nowrap">
            {content.button}
          </button>
        </div>
      </div>
    </section>
  );
};
