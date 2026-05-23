'use client';

import React, { useState } from 'react';
import { TopBar } from '@/components/gharelu/top-bar';
import { BottomNav } from '@/components/gharelu/bottom-nav';
import { HomeView } from '@/components/gharelu/home-view';
import { cn } from '@/lib/utils';

export type Language = 'hi' | 'en';
export type Theme = 'cream' | 'night';

export default function GhareluUpayApp() {
  const [view, setView] = useState<'home' | 'ai'>('home');
  const [lang, setLang] = useState<Language>('hi');
  const [theme, setTheme] = useState<Theme>('cream');

  const toggleLanguage = () => setLang((prev) => (prev === 'hi' ? 'en' : 'hi'));
  const toggleTheme = () => setTheme((prev) => (prev === 'cream' ? 'night' : 'cream'));

  const isNight = theme === 'night';

  return (
    <div className={cn(
      "min-h-screen flex flex-col transition-colors duration-500",
      isNight ? "bg-black text-white" : "bg-[#FDFBF7] text-foreground"
    )}>
      <TopBar 
        lang={lang} 
        theme={theme} 
        onToggleLanguage={toggleLanguage} 
        onToggleTheme={toggleTheme} 
      />
      
      {/* Middle section with dynamic background */}
      <main 
        className={cn(
          "flex-1 w-full transition-colors duration-500",
          isNight ? "bg-black" : "bg-[#FDFBF7]"
        )}
      >
        <div className="max-w-2xl mx-auto px-6 py-12">
          {view === 'home' ? (
            <HomeView lang={lang} theme={theme} />
          ) : (
            <div className="text-center py-20 opacity-50">
              <p className={isNight ? "text-white/60" : "text-muted-foreground"}>
                {lang === 'hi' ? 'सामग्री जल्द आ रही है' : 'Content coming soon'}
              </p>
            </div>
          )}
        </div>
        {/* Spacer to prevent content from being hidden behind the mega-footer and bottom bar */}
        <div className="h-[400px]" />
      </main>

      <BottomNav lang={lang} theme={theme} currentView={view} onViewChange={setView} />
    </div>
  );
}
