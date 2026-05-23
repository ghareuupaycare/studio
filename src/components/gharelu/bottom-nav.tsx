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

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full flex flex-col shadow-2xl pointer-events-none">
      {/* Mega Footer Section - Pure Placeholder for future digital library */}
      <div className={cn(
        "h-80 w-full pointer-events-auto border-t transition-colors duration-500",
        isNight ? "bg-black border-white/10" : "bg-[#14532D] border-white/5"
      )} />
      
      {/* Bottom Patti (Bar) */}
      <div className={cn(
        "h-20 w-full flex items-center px-8 pointer-events-auto border-t transition-colors duration-500",
        isNight ? "bg-[#0A0A0A] border-white/10" : "bg-[#0F2F1D] border-white/5"
      )}>
        <button
          onClick={() => onViewChange('home')}
          className={cn(
            "flex items-center gap-3 transition-all duration-200 group outline-none",
            currentView === 'home' ? "text-accent" : "text-white/60 hover:text-white"
          )}
        >
          <div className={cn(
            "p-2.5 rounded-xl transition-all duration-200",
            currentView === 'home' 
              ? "bg-[#D97706]/20 text-[#D97706]" 
              : "bg-white/5 group-active:bg-[#B45309] group-active:text-[#FDFBF7]"
          )}>
            <Home className={cn(
              "w-6 h-6",
              currentView === 'home' ? "text-accent" : "group-active:text-[#FDFBF7]"
            )} />
          </div>
        </button>
        
        {/* Remaining space on the right is kept empty */}
        <div className="flex-1" />
      </div>
    </nav>
  );
};
