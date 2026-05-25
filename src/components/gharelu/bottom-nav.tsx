
import React from 'react';
import { Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Language, Theme } from '@/app/page';

interface BottomNavProps {
  lang: Language;
  theme: Theme;
  currentView: 'home' | 'ai';
  onViewChange: (view: 'home' | 'ai') => void;
}

export const BottomNav = ({ lang, theme, currentView, onViewChange }: BottomNavProps) => {
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full flex flex-col pointer-events-none">
      {/* Mega Footer Section removed from here to allow natural positioning in page flow */}
      
      {/* Bottom Navigation Bar */}
      <div className={cn(
        "h-20 w-full flex items-center justify-start px-8 pointer-events-auto border-t transition-colors duration-500 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]",
        isNight ? "bg-[#0A0A0A] border-white/10" : "bg-[#0F2F1D] border-white/5"
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
      </div>
    </nav>
  );
};
