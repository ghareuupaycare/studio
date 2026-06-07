'use client';

import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Language, Theme } from '@/app/page';
import { cn } from '@/lib/utils';
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { SidebarMenu } from './sidebar-menu';
import { HeaderActions } from './header-actions';
import { SearchOverlay } from './search-overlay';
import { Remedy } from '@/lib/remedy-data';

interface TopBarProps {
  lang: Language;
  theme: Theme;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  onSelectRemedy?: (remedyId: string, categoryId: string) => void;
  onOpenFavorites?: () => void;
  onOpenNotifications?: () => void;
  hasFavorites?: boolean;
  hasNotifications?: boolean;
  allRemedies: Remedy[];
}

export const TopBar = ({ 
  lang, 
  theme, 
  onToggleLanguage, 
  onToggleTheme, 
  onSelectRemedy, 
  onOpenFavorites,
  onOpenNotifications,
  hasFavorites,
  hasNotifications,
  allRemedies
}: TopBarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';

  useEffect(() => {
    const handleOpenSearch = () => setIsSearchOpen(true);
    window.addEventListener('open-gharelu-search', handleOpenSearch);
    return () => window.removeEventListener('open-gharelu-search', handleOpenSearch);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 w-full h-14 flex items-center px-4 sm:px-6 shadow-lg transition-all duration-500",
      isNight ? "bg-black/95 backdrop-blur-md border-b border-white/20" : "bg-[#14532D]/95 backdrop-blur-md border-b border-white/10"
    )}>
      <div className="flex items-center gap-1 sm:gap-4 flex-1 min-w-0">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white/90 hover:bg-white/5 h-10 w-10 p-0 rounded-full">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SidebarMenu lang={lang} theme={theme} />
        </Sheet>
        <h1 className="text-lg font-bold text-[#FDFBF7] truncate">{isHindi ? 'घरेलू उपाय केयर' : 'Gharelu Upay Care'}</h1>
      </div>
      
      <HeaderActions 
        lang={lang}
        theme={theme}
        onToggleLanguage={onToggleLanguage}
        onToggleTheme={onToggleTheme}
        onOpenFavorites={onOpenFavorites || (() => {})}
        onOpenNotifications={onOpenNotifications || (() => {})}
        onOpenSearch={() => setIsSearchOpen(true)}
        hasFavorites={!!hasFavorites}
        hasNotifications={!!hasNotifications}
      />

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        lang={lang} 
        theme={theme} 
        onSelectRemedy={(rId, cId) => onSelectRemedy?.(rId, cId)} 
        allRemedies={allRemedies}
      />
    </header>
  );
};
