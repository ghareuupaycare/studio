'use client';

import React from 'react';
import { Language, Theme } from '@/app/page';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

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
    },
    {
      id: 'stomach_diseases',
      translations: {
        hi: {
          title: '2. पेट रोग',
          subtitle: 'पाचन, गैस और पेट की समस्याओं के लिए घरेलू उपाय',
        },
        en: {
          title: '2. Stomach Diseases',
          subtitle: 'Home remedies for digestion, gas and stomach issues',
        }
      }
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 w-full max-w-2xl px-4 sm:px-6 mx-auto">
      {/* Home Banner */}
      <section className={cn(
        "w-full rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col items-center justify-center py-8 px-6 text-center transition-all duration-500 border border-amber-400/40 relative",
        isNight ? "bg-black" : "bg-[#14532D]"
      )}>
        <div className="space-y-4 z-10 w-full flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-400 text-[10px] font-black uppercase tracking-widest border border-amber-400/30">
            <Sparkles className="w-3 h-3" />
            {isHindi ? 'शुद्ध आयुर्वेद' : 'Pure Ayurveda'}
          </div>
          
          <h2 className="text-[24px] sm:text-[28px] font-bold leading-tight text-white max-w-[300px]">
            {isHindi ? 'आयुर्वेदिक समाधान' : 'Ayurvedic Solutions'}
          </h2>
          
          <p className="text-[16px] font-semibold text-amber-400 leading-tight">
            {isHindi ? 'भारतीय घरेलू उपाय और वैद्य जी' : 'Indian Home Remedies & Vaidya Ji'}
          </p>
          
          <p className={cn(
            "text-[13px] font-medium max-w-[280px] mx-auto leading-relaxed",
            isNight ? "text-white/80" : "text-slate-100"
          )}>
            {isHindi 
              ? 'शास्त्रों पर आधारित पारंपरिक घरेलू उपाय, जो आपकी रसोई में छिपे स्वास्थ्य रहने का खज़ाना हैं' 
              : 'Traditional remedies based on scriptures, the hidden treasure of health in your kitchen'}
          </p>

          <button className="mt-4 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-full font-black text-[13px] uppercase tracking-wider shadow-xl transition-all active:scale-95 border-b-4 border-amber-700">
            {isHindi ? 'बिना डॉक्टर भेंट पाएँ संपूर्ण स्वास्थ्य' : 'Get Complete Health Naturally'}
          </button>
        </div>
      </section>

      {/* Category Cards */}
      <div className="space-y-8 w-full text-left pb-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-6 bg-accent rounded-full" />
          <h3 className={cn("text-lg font-black uppercase tracking-widest", isNight ? "text-white/60" : "text-primary/60")}>
            {isHindi ? 'उपचार श्रेणियां' : 'Remedy Categories'}
          </h3>
        </div>
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
                  "border-amber-100/40"
                )}
              >
                <h3 className={cn(
                  "text-[18px] font-semibold transition-colors leading-tight",
                  isNight ? "text-white group-active:text-black" : "text-[#1E293B] group-active:text-white"
                )}>
                  {content.title}
                </h3>
                <p className={cn(
                  "text-[13px] font-normal tracking-tight leading-relaxed max-w-[95%] transition-colors",
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
