'use client';

import React from 'react';
import { Bell, Languages, Moon, Sun, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Language, Theme } from '@/app/page';

interface HeaderActionsProps {
  lang: Language;
  theme: Theme;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  onOpenFavorites: () => void;
  onOpenNotifications: () => void;
  hasFavorites: boolean;
  hasNotifications: boolean;
}

export const HeaderActions = ({
  lang,
  theme,
  onToggleLanguage,
  onToggleTheme,
  onOpenFavorites,
  onOpenNotifications,
  hasFavorites,
  hasNotifications
}: HeaderActionsProps) => {
  const isNight = theme === 'night';
  const headerBtnClass = "text-white/90 hover:bg-white/5 hover:text-[#FBBF24] active:text-[#B45309] active:scale-90 transition-all duration-200 border-none shadow-none focus-visible:ring-0 flex items-center justify-center h-10 w-10 p-0 rounded-full";

  return (
    <div className="flex items-center gap-1 sm:gap-2 shrink-0">
      <Button variant="ghost" size="icon" onClick={onOpenFavorites} className={cn(headerBtnClass, hasFavorites && "text-accent")}>
        <Heart className={cn("w-5 h-5", hasFavorites && "fill-current")} />
      </Button>
      <Button variant="ghost" size="icon" onClick={onOpenNotifications} className={headerBtnClass}>
        <Bell className={cn("w-5 h-5 text-white", hasNotifications && "fill-current")} />
      </Button>
      <Button variant="ghost" size="icon" onClick={onToggleLanguage} className={headerBtnClass}>
        <Languages className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onToggleTheme} className={headerBtnClass}>
        {isNight ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </Button>
    </div>
  );
};
