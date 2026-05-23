import React from 'react';
import { Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Language } from '@/app/page';

interface BottomNavProps {
  lang: Language;
  currentView: 'home' | 'ai';
  onViewChange: (view: 'home' | 'ai') => void;
}

export const BottomNav = ({ lang, currentView, onViewChange }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full flex flex-col shadow-2xl">
      {/* Mega Footer Section - Pure Placeholder */}
      <div className="bg-primary h-80 w-full" />
      
      {/* Bottom Patti (Bar) */}
      <div className="bg-primary border-t border-white/5 h-20 w-full flex items-center px-8">
        <button
          onClick={() => onViewChange('home')}
          className={cn(
            "flex items-center gap-3 transition-all duration-300",
            currentView === 'home' ? "text-accent" : "text-white/60 hover:text-white"
          )}
        >
          <div className={cn(
            "p-2.5 rounded-xl transition-colors",
            currentView === 'home' ? "bg-accent/20" : "bg-white/5"
          )}>
            <Home className="w-6 h-6" />
          </div>
          <span className="text-sm font-bold tracking-wider">
            {lang === 'hi' ? 'मुख्य पेज' : 'Home'}
          </span>
        </button>
        
        {/* Remaining space on the right is kept empty */}
        <div className="flex-1" />
      </div>
    </nav>
  );
};
