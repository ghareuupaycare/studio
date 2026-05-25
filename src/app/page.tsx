'use client';

import React, { useState, useEffect } from 'react';
import { TopBar } from '@/components/gharelu/top-bar';
import { BottomNav } from '@/components/gharelu/bottom-nav';
import { HomeView } from '@/components/gharelu/home-view';
import { CategoryDetailView } from '@/components/gharelu/category-detail-view';
import { FavoritesOverlay } from '@/components/gharelu/favorites-overlay';
import { cn } from '@/lib/utils';

export type Language = 'hi' | 'en';
export type Theme = 'cream' | 'night';

export default function GhareluUpayApp() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedRemedyId, setSelectedRemedyId] = useState<string | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [lang, setLang] = useState<Language>('hi');
  const [theme, setTheme] = useState<Theme>('cream');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Load favorites from local storage
  useEffect(() => {
    const saved = localStorage.getItem('gharelu-favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load favorites", e);
      }
    }
  }, []);

  // Save favorites to local storage
  useEffect(() => {
    localStorage.setItem('gharelu-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleLanguage = () => setLang((prev) => (prev === 'hi' ? 'en' : 'hi'));
  const toggleTheme = () => setTheme((prev) => (prev === 'cream' ? 'night' : 'cream'));

  const isNight = theme === 'night';

  const handleSelectCategory = (id: string) => {
    setSelectedCategoryId(id);
    setSelectedRemedyId(null);
    setIsDetailView(false);
  };

  const handleSelectRemedy = (remedyId: string, categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedRemedyId(remedyId);
    setIsDetailView(true);
    setIsFavoritesOpen(false);
    // Smooth scroll to top when selecting a remedy
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = (remedyId: string) => {
    setFavorites(prev => 
      prev.includes(remedyId) 
        ? prev.filter(id => id !== remedyId) 
        : [...prev, remedyId]
    );
  };

  const handleBackToCategories = () => {
    setSelectedCategoryId(null);
    setSelectedRemedyId(null);
    setIsDetailView(false);
  };

  const handleGoHome = () => {
    setSelectedCategoryId(null);
    setSelectedRemedyId(null);
    setIsDetailView(false);
    // Smooth scroll to top when returning home
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        onSelectRemedy={handleSelectRemedy}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        hasFavorites={favorites.length > 0}
      />
      
      <main 
        className={cn(
          "flex-1 w-full transition-colors duration-500 relative",
          isNight ? "bg-black" : "bg-[#FDFBF7]"
        )}
      >
        <div className="w-full py-8 pb-40">
          {selectedCategoryId ? (
            <div className="max-w-2xl mx-auto px-6">
              <CategoryDetailView 
                categoryId={selectedCategoryId} 
                lang={lang} 
                theme={theme} 
                onBack={handleBackToCategories} 
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                initialRemedyId={selectedRemedyId}
                onLevelChange={(level) => setIsDetailView(level === 3)}
              />
            </div>
          ) : (
            <HomeView lang={lang} theme={theme} onSelectCategory={handleSelectCategory} />
          )}
        </div>
      </main>

      <FavoritesOverlay 
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        lang={lang}
        theme={theme}
        favorites={favorites}
        onSelectRemedy={handleSelectRemedy}
      />

      <BottomNav 
        lang={lang} 
        theme={theme} 
        currentView={!selectedCategoryId ? 'home' : 'details'} 
        onViewChange={handleGoHome} 
        enableScrollHide={isDetailView}
      />
    </div>
  );
}
