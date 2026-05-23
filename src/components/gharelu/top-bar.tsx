import React from 'react';
import { Bell, Search, Heart, Languages, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Language, Theme } from '@/app/page';

interface TopBarProps {
  lang: Language;
  theme: Theme;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
}

export const TopBar = ({ lang, theme, onToggleLanguage, onToggleTheme }: TopBarProps) => {
  const isNight = theme === 'night';

  // Premium interactive button styles: No opacity fade, deep amber highlight on active
  const headerBtnClass = "text-white/90 hover:bg-white/5 hover:text-[#FBBF24] active:text-[#B45309] active:scale-95 transition-all duration-200 border-none shadow-none focus-visible:ring-0";

  return (
    <header className="sticky top-0 z-50 w-full bg-[#14532D] border-b border-white/10 h-20 flex items-center px-6 shadow-md">
      <div className="flex items-center">
        <h1 className="text-2xl font-headline font-black tracking-tight text-[#FDFBF7]">
          {lang === 'hi' ? 'घरेलू उपाय केयर' : 'Gharelu Upay Care'}
        </h1>
      </div>
      
      <div className="flex-1" />
      
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Language Switcher */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleLanguage}
          className={headerBtnClass}
        >
          <Languages className="w-5 h-5" />
        </Button>

        {/* Theme Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleTheme}
          className={headerBtnClass}
        >
          {isNight ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        {/* Existing Icons */}
        <Button variant="ghost" size="icon" className={headerBtnClass}>
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className={headerBtnClass}>
          <Search className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className={headerBtnClass}>
          <Heart className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};
