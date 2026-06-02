'use client';

import React, { useState, useEffect } from 'react';
import { Home, Share2, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Language, Theme } from '@/app/page';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  
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

  const handleShare = async () => {
    const shareText = `🌿 *घरेलू उपाय केयर (Gharelu Upay Care)* 🌿

क्या आप बिना दवा घर बैठे संपूर्ण स्वास्थ्य पाना चाहते हैं? पाइए शास्त्रों पर आधारित पारंपरिक घरेलू उपाय और वैद्य जी द्वारा संचालित आयुर्वेदिक स्वास्थ्य समाधान!

आज ही नीचे दिए गए लिंक पर क्लिक करें और स्वस्थ जीवन की शुरुआत करें: 👇

${window.location.origin}`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'घरेलू उपाय केयर',
          text: shareText,
          url: window.location.origin,
        });
      } catch (error) {
        if ((error as any).name !== 'AbortError') {
          console.error("Sharing failed", error);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        toast({
          description: isHindi ? "लिंक कॉपी हो गया है!" : "Link copied to clipboard!",
        });
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 z-50 h-16 sm:h-20 w-full grid grid-cols-3 items-center px-4 sm:px-8 border-t transition-all duration-300 shadow-[0_-10px_30px_rgba(0,0,0,0.15)]",
      isNight ? "bg-black border-white/20" : "bg-[#14532D] border-white/10",
      isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
    )}>
      {/* Home Button */}
      <button
        onClick={() => onViewChange('home')}
        className={cn(
          "flex flex-col items-center gap-0.5 transition-all duration-200 group outline-none cursor-pointer active:opacity-80 justify-self-center",
          currentView === 'home' ? "text-accent" : "text-white/60 hover:text-white"
        )}
      >
        <div className={cn(
          "p-1.5 sm:p-2 rounded-xl transition-all duration-200",
          currentView === 'home' 
            ? "bg-accent/20 text-accent" 
            : "bg-white/5 hover:bg-white/10"
        )}>
          <Home className="w-5 h-5 sm:w-6 h-6" />
        </div>
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] transition-colors">
          {isHindi ? 'होम' : 'Home'}
        </span>
      </button>

      {/* Search Button (Center) */}
      <button
        onClick={() => {
          window.dispatchEvent(new CustomEvent('open-gharelu-search'));
        }}
        className={cn(
          "flex flex-col items-center gap-0.5 transition-all duration-200 group outline-none cursor-pointer active:opacity-80 justify-self-center -mt-6 sm:-mt-8"
        )}
      >
        <div className={cn(
          "p-3 sm:p-4 rounded-full transition-all duration-200 bg-accent text-white shadow-lg border-4 border-[#FDFBF7]",
          isNight && "border-black"
        )}>
          <Search className="w-5 h-5 sm:w-6 h-6" />
        </div>
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] text-accent mt-0.5">
          {isHindi ? 'घरेलू सर्च' : 'Search'}
        </span>
      </button>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className={cn(
          "flex flex-col items-center gap-0.5 transition-all duration-200 group outline-none cursor-pointer active:opacity-80 justify-self-center text-white/60 hover:text-white"
        )}
      >
        <div className={cn(
          "p-1.5 sm:p-2 rounded-xl transition-all duration-200 bg-white/5 hover:bg-white/10"
        )}>
          <Share2 className="w-5 h-5 sm:w-6 h-6" />
        </div>
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] transition-colors">
          {isHindi ? 'शेयर' : 'Share'}
        </span>
      </button>
    </nav>
  );
};
