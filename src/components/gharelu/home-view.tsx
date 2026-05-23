'use client';

import React from 'react';
import { Language, Theme } from '@/app/page';
import { cn } from '@/lib/utils';

interface HomeViewProps {
  lang: Language;
  theme: Theme;
}

export const HomeView = ({ lang, theme }: HomeViewProps) => {
  const isHindi = lang === 'hi';
  const isNight = theme === 'night';

  const categories = [
    {
      id: 'fever',
      title: 'मौसमी बुखार एवं फ्लू',
      subtitle: 'बुखार, मलेरिया, डेंगू, चिकनगुनिया, लू लगना',
    },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Main Banner with 16:9 Aspect Ratio and Premium Typographic Contrast */}
      <section className={cn(
        "w-full aspect-video rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col items-center justify-center p-6 sm:p-10 text-center transition-all duration-500",
        isNight 
          ? "bg-[#0F172A] border-2 border-white/30" 
          : "herbal-gradient border-2 border-[#14532D]"
      )}>
        
        {/* Line 1: Bold & Highly Visible Label */}
        <p className={cn(
          "text-xl sm:text-2xl font-black tracking-[0.2em] uppercase mb-4 drop-shadow-sm transition-colors duration-500",
          isNight ? "text-white" : "text-[#FDFBF7]"
        )}>
          {isHindi ? 'आयुर्वेदिक समाधान' : 'Ayurvedic Solutions'}
        </p>

        {/* Line 2: Prominent, Extra Bold Header Sync Slogan */}
        <h2 className={cn(
          "text-3xl sm:text-5xl font-black leading-[1.1] max-w-xl mx-auto mb-4 drop-shadow-sm transition-colors duration-500",
          isNight ? "text-white" : "text-[#14532D]"
        )}>
          {isHindi 
            ? 'भारतीय घरेलू उपाय और वैद्य जी द्वारा संचालित आयुर्वेदिक स्वास्थ्य' 
            : 'Indian Home Remedies & Vaidya-led Ayurvedic Health'}
        </h2>

        {/* Line 3: Bold & Large Charcoal Description for High Readability */}
        <p className={cn(
          "text-xl sm:text-3xl font-bold max-w-2xl mx-auto leading-relaxed mb-6 italic transition-colors duration-500",
          isNight ? "text-white/90" : "text-[#1E293B]"
        )}>
          {isHindi 
            ? 'शास्त्रों पर आधारित पारंपरिक घरेलू उपाय, जो आपकी रसोई में छिपे स्वस्थ्य रहने का खज़ाना हैं' 
            : 'Traditional shastra-based remedies, the hidden treasure of health in your kitchen'}
        </p>

        {/* Line 4: Prominent Ivory Footer Slogan with increased word spacing */}
        <p className={cn(
          "text-2xl sm:text-4xl font-black [word-spacing:0.25rem] transition-colors duration-500",
          isNight ? "text-white" : "text-[#FDFBF7]"
        )}>
          {isHindi ? 'बिना दवा घर बैठे पाएं संपूर्ण स्वास्थ्य' : 'Complete Health at Home Without Medicine'}
        </p>
      </section>

      {/* Categories Grid */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              className={cn(
                "group relative w-full p-10 rounded-[2.5rem] border transition-all duration-500",
                "flex flex-col items-center justify-center text-center space-y-5 shadow-2xl hover:-translate-y-1 active:scale-[0.98]",
                isNight 
                  ? "bg-[#1F2937] border-white/20 text-white" 
                  : "bg-[#FDF6E2] border-primary/10 hover:border-accent/40 text-[#1E293B]"
              )}
            >
              <h3 className={cn(
                "text-3xl sm:text-4xl font-black transition-colors leading-tight",
                isNight ? "text-white" : "text-[#1E293B]"
              )}>
                {category.title}
              </h3>
              <p className={cn(
                "text-lg sm:text-xl font-bold tracking-tight leading-relaxed max-w-[90%] mx-auto transition-colors",
                isNight ? "text-white/80" : "text-[#1E293B]"
              )}>
                {category.subtitle}
              </p>
              
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 rounded-[2.5rem] transition-opacity duration-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
