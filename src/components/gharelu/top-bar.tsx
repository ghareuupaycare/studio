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

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-border h-20 flex items-center px-6">
      <div className="flex items-center">
        <h1 className="text-2xl font-headline font-black tracking-tight text-primary">
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
          className="text-primary hover:bg-primary/5 flex flex-col items-center gap-0"
        >
          <Languages className="w-5 h-5" />
          <span className="text-[8px] font-bold uppercase mt-0.5">{lang === 'hi' ? 'EN' : 'हिं'}</span>
        </Button>

        {/* Theme Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleTheme}
          className="text-primary hover:bg-primary/5"
        >
          {isNight ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        {/* Existing Icons */}
        <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/5">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/5">
          <Search className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/5">
          <Heart className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};
