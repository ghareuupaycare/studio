'use client';

import React from 'react';
import { Language, Theme } from '@/app/page';

interface HomeViewProps {
  lang: Language;
  theme: Theme;
}

export const HomeView = ({ lang, theme }: HomeViewProps) => {
  const isHindi = lang === 'hi';

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Main Banner with 16:9 Aspect Ratio and Premium Typographic Contrast */}
      <section className="w-full aspect-video rounded-[2.5rem] shadow-2xl herbal-gradient overflow-hidden flex flex-col items-center justify-center p-6 sm:p-10 text-center border border-white/20">
        
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

        {/* Line 4: Prominent Ivory Footer Slogan */}
        <p className="text-2xl sm:text-4xl font-black text-[#FDFBF7] tracking-tight">
          {isHindi ? 'बिना दवा घर बैठे पाएं संपूर्ण स्वास्थ्य' : 'Complete Health at Home Without Medicine'}
        </p>
        
      </section>
    </div>
  );
};
