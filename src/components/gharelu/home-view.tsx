'use client';

import React from 'react';
import { Language, Theme } from '@/app/page';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface HomeViewProps {
  lang: Language;
  theme: Theme;
  onSelectCategory: (id: string) => void;
}

export const HomeView = ({ lang, theme, onSelectCategory }: HomeViewProps) => {
  const isHindi = lang === 'hi';
  const isNight = theme === 'night';

  // Master Data Template for Categories
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
    <div className="space-y-10 animate-in fade-in duration-700 w-full max-w-2xl px-4 sm:px-6 mx-auto">
      {/* Home Banner - Premium 16:9 Layout with Shiny Gold Border */}
      <section className={cn(
        "w-full aspect-video rounded-[2.5rem] shadow-[0_0_40px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col items-center justify-center px-6 text-center transition-all duration-500 relative border-[3.5px]",
        isNight 
          ? "bg-black border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.3)]" 
          : "bg-[#14532D] border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.3)]"
      )}>
        {/* Subtle Shine Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
        
        <div className="space-y-3 z-10 w-full flex flex-col items-center">
          <h2 className="text-[22px] sm:text-[30px] font-black leading-tight text-white max-w-[320px] drop-shadow-md">
            {isHindi ? 'आयुर्वेदिक समाधान' : 'Ayurvedic Solutions'}
          </h2>
          
          <p className="text-[14px] sm:text-[17px] font-bold text-amber-400 leading-tight max-w-[90%] uppercase tracking-wide">
            भारतीय घरेलू उपाय और वैद्य जी द्वारा संचालित आयुर्वेदिक स्वास्थ्य
          </p>
          
          <p className={cn(
            "text-[12px] sm:text-[14px] font-medium max-w-[280px] mx-auto leading-relaxed opacity-90",
            isNight ? "text-white/80" : "text-slate-100"
          )}>
            शास्त्रों पर आधारित पारंपरिक घरेलू उपाय, जो आपकी रसोई में छिपे स्वास्थ्य रहने का ख़ज़ाना हैं
          </p>

          <button className="mt-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-full font-black text-[12px] uppercase tracking-wider shadow-xl transition-all active:scale-95 border-b-[3px] border-amber-700">
            बिना दवा घर बैठे पाएं संपूर्ण स्वास्थ्य
          </button>
        </div>
      </section>

      {/* Dynamic Master Template for Category Cards */}
      <div className="space-y-4 w-full text-left pb-12">
        <div className="flex items-center gap-3 px-2 mb-2">
          <div className="w-2 h-7 bg-[#14532D] rounded-full" />
          <h3 className={cn("text-[15px] font-black uppercase tracking-[0.2em]", isNight ? "text-white/60" : "text-[#14532D]/60")}>
            {isHindi ? 'उपचार श्रेणियां' : 'Remedy Categories'}
          </h3>
        </div>

        {/* Master Map Loop - Strictly Locked Template */}
        <div className="grid grid-cols-1 gap-3 w-full max-w-xl mx-auto">
          {categories.map((category) => {
            const content = category.translations[lang];
            return (
              <div
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={cn(
                  "group relative w-full p-4 sm:p-5 rounded-[2rem] border-[1.5px] transition-all duration-500 flex flex-row items-center justify-between text-left cursor-pointer shadow-lg active:scale-[0.98]",
                  isNight 
                    ? "bg-black border-white/20 text-white" 
                    : "bg-[#FDFBF7] border-[#14532D] text-[#1E293B] hover:border-[#14532D]/80"
                )}
              >
                <div className="flex-1 pr-4">
                  <h3 className={cn(
                    "text-[18px] sm:text-[20px] font-black transition-colors leading-tight",
                    isNight ? "text-white" : "text-[#14532D]"
                  )}>
                    {content.title}
                  </h3>
                  <p className={cn(
                    "text-[12px] sm:text-[13px] font-medium tracking-tight leading-snug mt-1 transition-colors",
                    isNight ? "text-white/60" : "text-muted-foreground"
                  )}>
                    {content.subtitle}
                  </p>
                </div>

                {/* Circular Neem Green Arrow Button */}
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 sm:w-11 h-11 rounded-full transition-all shrink-0 shadow-md",
                  isNight 
                    ? "bg-white text-black" 
                    : "bg-[#14532D] text-white"
                )}>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
