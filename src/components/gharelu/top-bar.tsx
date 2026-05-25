import React from 'react';
import { Bell, Search, Languages, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Language, Theme } from '@/app/page';
import { cn } from '@/lib/utils';

interface TopBarProps {
  lang: Language;
  theme: Theme;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
}

export const TopBar = ({ lang, theme, onToggleLanguage, onToggleTheme }: TopBarProps) => {
  const isNight = theme === 'night';

  const headerBtnClass = "text-white/90 hover:bg-white/5 hover:text-[#FBBF24] active:text-[#B45309] active:scale-95 transition-all duration-200 border-none shadow-none focus-visible:ring-0";

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full h-20 flex items-center px-6 shadow-md transition-colors duration-500",
      isNight ? "bg-black border-b border-white/20" : "bg-[#14532D] border-b border-white/10"
    )}>
      <div className="flex items-center">
        <h1 className="text-2xl font-headline font-black tracking-tight text-[#FDFBF7]">
          {lang === 'hi' ? 'घरेलू उपाय केयर' : 'Gharelu Upay Care'}
        </h1>
      </div>
      
      <div className="flex-1" />
      
      <div className="flex items-center gap-1 sm:gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleLanguage}
          className={headerBtnClass}
        >
          <Languages className="w-5 h-5" />
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleTheme}
          className={headerBtnClass}
        >
          {isNight ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        <Button variant="ghost" size="icon" className={headerBtnClass}>
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className={headerBtnClass}>
          <Search className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};
