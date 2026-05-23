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
      {/* Main Banner with Premium Typography */}
      <section className="w-full min-h-[18rem] rounded-[2rem] shadow-lg herbal-gradient overflow-hidden flex flex-col items-center justify-center p-10 text-center text-[#FDFBF7] border border-white/10">
        <div className="space-y-2 mb-6">
          <p className="text-sm font-medium tracking-[0.2em] opacity-90 uppercase">
            {isHindi ? 'आयुर्वेदिक समाधान' : 'Ayurvedic Solutions'}
          </p>
          <p className="text-base font-semibold max-w-md mx-auto leading-tight">
            {isHindi 
              ? 'भारतीय घरेलू उपाय और वैद्य जी द्वारा संचालित आयुर्वेदिक स्वास्थ्य' 
              : 'Indian Home Remedies & Vaidya-led Ayurvedic Health'}
          </p>
          <p className="text-xs opacity-80 max-w-lg mx-auto leading-relaxed italic">
            {isHindi 
              ? 'शास्त्रों पर आधारित पारंपरिक घरेलू उपाय, जो आपकी रसोई में छिपे स्वस्थ्य रहने का खज़ाना हैं' 
              : 'Traditional shastra-based remedies, the hidden treasure of health in your kitchen'}
          </p>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight drop-shadow-sm">
          {isHindi ? 'बिना दवा घर बैठे पाएं संपूर्ण स्वास्थ्य' : 'Complete Health at Home Without Medicine'}
        </h2>
      </section>
    </div>
  );
};
