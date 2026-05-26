'use client';

import React, { useState, useEffect } from 'react';
import { TopBar } from '@/components/gharelu/top-bar';
import { BottomNav } from '@/components/gharelu/bottom-nav';
import { HomeView } from '@/components/gharelu/home-view';
import { CategoryDetailView } from '@/components/gharelu/category-detail-view';
import { FavoritesOverlay } from '@/components/gharelu/favorites-overlay';
import { NotificationsOverlay } from '@/components/gharelu/notifications-overlay';
import { cn } from '@/lib/utils';
import { REMEDIES } from '@/lib/remedy-data';

export type Language = 'hi' | 'en';
export type Theme = 'cream' | 'night';

export default function GhareluUpayApp() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedRemedyId, setSelectedRemedyId] = useState<string | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [lang, setLang] = useState<Language>('hi');
  const [theme, setTheme] = useState<Theme>('cream');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [readNotifications, setReadNotifications] = useState<string[]>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Load favorites and read notifications from local storage
  useEffect(() => {
    const savedFavs = localStorage.getItem('gharelu-favorites');
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs));
      } catch (e) {
        console.error("Failed to load favorites", e);
      }
    }

    const savedRead = localStorage.getItem('gharelu-read-notifications');
    if (savedRead) {
      try {
        setReadNotifications(JSON.parse(savedRead));
      } catch (e) {
        console.error("Failed to load read notifications", e);
      }
    }
  }, []);

  // Save state changes to local storage
  useEffect(() => {
    localStorage.setItem('gharelu-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('gharelu-read-notifications', JSON.stringify(readNotifications));
  }, [readNotifications]);

  const latestRemedy = REMEDIES[REMEDIES.length - 1];
  const hasNewNotifications = latestRemedy && !readNotifications.includes(latestRemedy.id);

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
    setIsNotificationsOpen(false);
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

  const handleMarkAsRead = (remedyId: string) => {
    setReadNotifications(prev => {
      if (prev.includes(remedyId)) return prev;
      return [...prev, remedyId];
    });
  };

  const handleOpenNotifications = () => {
    setIsNotificationsOpen(true);
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
        onOpenNotifications={handleOpenNotifications}
        hasFavorites={favorites.length > 0}
        hasNotifications={hasNewNotifications}
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

      <NotificationsOverlay
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        lang={lang}
        theme={theme}
        readNotifications={readNotifications}
        onMarkAsRead={handleMarkAsRead}
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
