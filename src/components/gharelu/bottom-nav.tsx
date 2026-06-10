'use client';

import React, { useState, useEffect } from 'react';
import { Home, Search, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Language, Theme } from '@/app/page';

interface BottomNavProps {
  lang: Language;
  theme: Theme;
  currentView: 'home' | 'details' | string;
  onViewChange: (view: 'home') => void;
  enableScrollHide?: boolean;
}

export const BottomNav = ({ lang, theme, currentView, onViewChange, enableScrollHide = false }: BottomNavProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';

  useEffect(() => {
    if (!enableScrollHide) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, enableScrollHide]);

  const handleShareWebsite = () => {
    const title = isHindi ? 'घरेलू उपाय केयर (Gharelu Upay Care)' : 'Gharelu Upay Care';
    const message = `🌿 *${title}* 🌿\nआयुर्वेदिक घरेलू उपचार और प्रामाणिक नुस्खों के लिए हमारी वेबसाइट पर जाएँ:\nhttps://studio-xi-mocha.vercel.app/`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 z-50 h-14 sm:h-16 w-full flex items-center justify-around px-2 sm:px-12 border-t transition-all duration-300 shadow-[0_-10px_30px_rgba(0,0,0,0.15)]",
      isNight ? "bg-black/90 backdrop-blur-md border-white/20" : "bg-[#14532D]/95 backdrop-blur-md border-white/10",
      isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
    )}>
      {/* Home Button (Left) */}
      <button
        onClick={() => onViewChange('home')}
        className={cn(
          "flex flex-col items-center gap-0.5 transition-all duration-200 group outline-none cursor-pointer active:scale-90 w-1/3",
          currentView === 'home' ? "text-accent" : "text-white/60 hover:text-white"
        )}
      >
        <div className={cn(
          "p-1 sm:p-1.5 rounded-xl transition-all duration-200",
          currentView === 'home' 
            ? "bg-accent/20 text-accent" 
            : "bg-white/5 hover:bg-white/10"
        )}>
          <Home className="w-5 h-5 sm:w-6 h-6" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.1em]">
          {isHindi ? 'होम' : 'Home'}
        </span>
      </button>

      {/* Search Button (Center) */}
      <button
        onClick={() => {
          window.dispatchEvent(new CustomEvent('open-gharelu-search'));
        }}
        className={cn(
          "flex flex-col items-center gap-0.5 transition-all duration-200 group outline-none cursor-pointer active:scale-95 w-1/3"
        )}
      >
        <div className={cn(
          "h-12 w-12 sm:h-14 sm:w-14 rounded-full flex items-center justify-center transition-all duration-200 bg-accent text-white shadow-lg border-4 border-[#FDFBF7] -mt-6",
          isNight ? "border-black" : "border-[#14532D]/95"
        )}>
          <Search className="w-6 h-6 sm:w-7 h-7" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.1em] text-amber-400 mt-0.5">
          {isHindi ? 'खोजें' : 'Search'}
        </span>
      </button>

      {/* Share Button (Right) */}
      <button
        onClick={handleShareWebsite}
        className={cn(
          "flex flex-col items-center gap-0.5 transition-all duration-200 group outline-none cursor-pointer active:scale-90 w-1/3",
          "text-white/60 hover:text-white"
        )}
      >
        <div className={cn(
          "p-1 sm:p-1.5 rounded-xl transition-all duration-200 bg-white/5 hover:bg-white/10"
        )}>
          <Share2 className="w-5 h-5 sm:w-6 h-6" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.1em]">
          {isHindi ? 'शेयर करें' : 'Share'}
        </span>
      </button>
    </nav>
  );
};
