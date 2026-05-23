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
      <section className="w-full aspect-video rounded-[2.5rem] shadow-2xl herbal-gradient overflow-hidden flex flex-col items-center justify-center p-6 sm:p-10 text-center border-2 border-[#14532D]">
        
        {/* Line 1: Bold & Highly Visible Label */}
        <p className="text-xl sm:text-2xl font-black tracking-[0.2em] text-[#FDFBF7] uppercase mb-4 drop-shadow-sm">
          {isHindi ? 'आयुर्वेदिक समाधान' : 'Ayurvedic Solutions'}
        </p>

        {/* Line 2: Prominent, Extra Bold Neem Green Slogan */}
        <h2 className="text-3xl sm:text-5xl font-black text-[#14532D] leading-[1.1] max-w-xl mx-auto mb-4 drop-shadow-sm">
          {isHindi 
            ? 'भारतीय घरेलू उपाय और वैद्य जी द्वारा संचालित आयुर्वेदिक स्वास्थ्य' 
            : 'Indian Home Remedies & Vaidya-led Ayurvedic Health'}
        </h2>

        {/* Line 3: Bold & Large Charcoal Description for High Readability */}
        <p className="text-xl sm:text-3xl font-bold text-[#1E293B] max-w-2xl mx-auto leading-relaxed mb-6 italic">
          {isHindi 
            ? 'शास्त्रों पर आधारित पारंपरिक घरेलू उपाय, जो आपकी रसोई में छिपे स्वस्थ्य रहने का खज़ाना हैं' 
            : 'Traditional shastra-based remedies, the hidden treasure of health in your kitchen'}
        </p>

        {/* Line 4: Prominent Ivory Footer Slogan with increased word spacing */}
        <p className="text-2xl sm:text-4xl font-black text-[#FDFBF7] [word-spacing:0.25rem]">
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
                "group relative w-full p-10 rounded-[2rem] border transition-all duration-300",
                "bg-white border-primary/10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]",
                "hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1 active:scale-[0.98]",
                "flex flex-col items-center justify-center text-center space-y-4",
                "hover:border-accent/40"
              )}
            >
              <h3 className="text-2xl sm:text-3xl font-black text-primary group-hover:text-accent transition-colors leading-tight">
                {category.title}
              </h3>
              <p className="text-base sm:text-lg font-bold text-[#1E293B] tracking-tight leading-relaxed max-w-[90%] mx-auto">
                {category.subtitle}
              </p>
              
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity duration-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
