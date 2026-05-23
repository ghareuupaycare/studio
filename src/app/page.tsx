'use client';

import React, { useState } from 'react';
import { TopBar } from '@/components/gharelu/top-bar';
import { BottomNav } from '@/components/gharelu/bottom-nav';
import { HomeView } from '@/components/gharelu/home-view';
import { CategoryDetailView } from '@/components/gharelu/category-detail-view';
import { AIConsultant } from '@/components/gharelu/ai-consultant';
import { cn } from '@/lib/utils';

export type Language = 'hi' | 'en';
export type Theme = 'cream' | 'night';

export default function GhareluUpayApp() {
  const [view, setView] = useState<'home' | 'ai'>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>('hi');
  const [theme, setTheme] = useState<Theme>('cream');

  const toggleLanguage = () => setLang((prev) => (prev === 'hi' ? 'en' : 'hi'));
  const toggleTheme = () => setTheme((prev) => (prev === 'cream' ? 'night' : 'cream'));

  const isNight = theme === 'night';

  const handleSelectCategory = (id: string) => {
    setSelectedCategoryId(id);
    setView('home'); 
  };

  const handleBackToCategories = () => {
    setSelectedCategoryId(null);
  };

  const handleViewChange = (v: 'home' | 'ai') => {
    setView(v);
    setSelectedCategoryId(null); // Reset navigation state when switching via bottom nav
  };

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
      
      <main 
        className={cn(
          "flex-1 w-full transition-colors duration-500",
          isNight ? "bg-black" : "bg-[#FDFBF7]"
        )}
      >
        <div className="max-w-2xl mx-auto px-6 py-12">
          {view === 'ai' ? (
            <AIConsultant />
          ) : selectedCategoryId ? (
            <CategoryDetailView 
              categoryId={selectedCategoryId} 
              lang={lang} 
              theme={theme} 
              onBack={handleBackToCategories} 
            />
          ) : (
            <HomeView lang={lang} theme={theme} onSelectCategory={handleSelectCategory} />
          )}
        </div>
        <div className="h-[400px]" />
      </main>

      <BottomNav 
        lang={lang} 
        theme={theme} 
        currentView={view} 
        onViewChange={handleViewChange} 
      />
    </div>
  );
}
