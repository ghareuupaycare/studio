import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Language, Theme } from '@/app/page';

interface BottomNavProps {
  lang: Language;
  theme: Theme;
  currentView: 'home';
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

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 z-50 h-20 w-full flex items-center justify-start px-12 border-t transition-all duration-300 shadow-[0_-10px_30px_rgba(0,0,0,0.15)]",
      isNight ? "bg-[#0A0A0A] border-white/10" : "bg-[#0F2F1D] border-white/5",
      isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
    )}>
      <button
        onClick={() => onViewChange('home')}
        className={cn(
          "flex flex-col items-center gap-1 transition-all duration-200 group outline-none",
          currentView === 'home' ? "text-accent" : "text-white/60 hover:text-white"
        )}
      >
        <div className={cn(
          "p-2 rounded-xl transition-all duration-200",
          currentView === 'home' 
            ? "bg-accent/20 text-accent" 
            : "bg-white/5 hover:bg-white/10"
        )}>
          <Home className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest transition-colors">
          {isHindi ? 'मुख्य पेज' : 'Home'}
        </span>
      </button>
    </nav>
  );
};
