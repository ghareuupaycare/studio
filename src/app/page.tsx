'use client';

import React, { useState } from 'react';
import { TopBar } from '@/components/gharelu/top-bar';
import { BottomNav } from '@/components/gharelu/bottom-nav';
import { HomeView } from '@/components/gharelu/home-view';
import { CategoryDetailView } from '@/components/gharelu/category-detail-view';
import { AIConsultant } from '@/components/gharelu/ai-consultant';
import { FavoritesView } from '@/components/gharelu/favorites-view';
import { cn } from '@/lib/utils';
import { Remedy } from '@/lib/remedy-data';

export type Language = 'hi' | 'en';
export type Theme = 'cream' | 'night';

export default function GhareluUpayApp() {
  const [view, setView] = useState<'home' | 'ai' | 'favorites'>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>('hi');
  const [theme, setTheme] = useState<Theme>('cream');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleLanguage = () => setLang((prev) => (prev === 'hi' ? 'en' : 'hi'));
  const toggleTheme = () => setTheme((prev) => (prev === 'cream' ? 'night' : 'cream'));

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

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
    setSelectedCategoryId(null); 
  };

  const handleSelectRemedyFromFavorites = (remedy: Remedy) => {
    // Navigate to the remedy's category and show its detail
    setSelectedCategoryId(remedy.illnessId === 'general-fever' ? 'fever' : remedy.illnessId);
    setView('home');
    // Note: In a real app we'd pass the specific remedy ID to CategoryDetailView
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
        onShowFavorites={() => setView('favorites')}
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
          ) : view === 'favorites' ? (
            <FavoritesView 
              favorites={favorites} 
              onToggleFavorite={toggleFavorite}
              onSelectRemedy={handleSelectRemedyFromFavorites}
            />
          ) : selectedCategoryId ? (
            <CategoryDetailView 
              categoryId={selectedCategoryId} 
              lang={lang} 
              theme={theme} 
              onBack={handleBackToCategories} 
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
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
        currentView={view === 'favorites' ? 'home' : view} 
        onViewChange={handleViewChange} 
      />
    </div>
  );
}
