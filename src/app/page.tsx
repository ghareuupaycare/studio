
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { TopBar } from '@/components/gharelu/top-bar';
import { BottomNav } from '@/components/gharelu/bottom-nav';
import { HomeView } from '@/components/gharelu/home-view';
import { CategoryDetailView } from '@/components/gharelu/category-detail-view';
import { FavoritesOverlay } from '@/components/gharelu/favorites-overlay';
import { NotificationsOverlay } from '@/components/gharelu/notifications-overlay';
import { cn } from '@/lib/utils';
import { REMEDIES as STATIC_REMEDIES, Remedy } from '@/lib/remedy-data';
import { useFirestore } from '@/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export type Language = 'hi' | 'en';
export type Theme = 'cream' | 'night';

export default function GhareluUpayApp() {
  const db = useFirestore();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedRemedyId, setSelectedRemedyId] = useState<string | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [lang, setLang] = useState<Language>('hi');
  const [theme, setTheme] = useState<Theme>('cream');
  
  const [liveRecipes, setLiveRecipes] = useState<Remedy[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [readRemedyIds, setReadRemedyIds] = useState<string[]>([]);
  const [lastCheckedTime, setLastCheckedTime] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const allRemedies = useMemo(() => {
    return [...STATIC_REMEDIES, ...liveRecipes];
  }, [liveRecipes]);

  useEffect(() => {
    if (!db) return;
    const recipesRef = collection(db, 'recipes');
    const q = query(recipesRef, orderBy('timestamp', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          serialNumber: "Live",
          name: data.remedyTitle,
          diseaseName: data.diseaseName,
          illnessId: data.diseaseName?.en?.toLowerCase().replace(/\s+/g, '_') || 'live',
          categoryId: data.mainCategory?.en?.toLowerCase().replace(/\s+/g, '_') || 'live',
          mainCategory: data.mainCategory,
          introduction: data.introduction,
          doses: data.doses?.map((d: any) => ({
            ageRange: d.ageRange,
            dose: d.dose
          })) || [],
          ingredients: data.ingredients,
          preparation: data.preparation,
          usage: data.usage,
          dietEat: data.dietEat,
          dietAvoid: data.dietAvoid,
          routine: data.routine,
          safetyAdvice: data.safetyAdvice,
          disclaimer: { hi: "", en: "" },
          keywords: data.keywords || [],
          timestamp: data.timestamp?.toMillis() || Date.now()
        } as Remedy;
      });
      setLiveRecipes(docs);
    });

    return () => unsubscribe();
  }, [db]);

  useEffect(() => {
    const savedFavs = localStorage.getItem('gharelu-favorites');
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs));
      } catch (e) {
        console.error("Failed to load favorites", e);
      }
    }

    const savedReadIds = localStorage.getItem('gharelu-read-remedy-ids');
    if (savedReadIds) {
      try {
        setReadRemedyIds(JSON.parse(savedReadIds));
      } catch (e) {
        console.error("Failed to load read IDs", e);
      }
    }

    const savedLastCheck = localStorage.getItem('gharelu-last-check-time');
    if (savedLastCheck) {
      setLastCheckedTime(parseInt(savedLastCheck));
    }
    
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('gharelu-favorites', JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('gharelu-read-remedy-ids', JSON.stringify(readRemedyIds));
    }
  }, [readRemedyIds, isLoaded]);

  const latestRemedyTime = useMemo(() => {
    if (liveRecipes.length === 0) return 0;
    return Math.max(...liveRecipes.map(r => (r as any).timestamp || 0));
  }, [liveRecipes]);

  const hasNewNotifications = isLoaded && latestRemedyTime > lastCheckedTime;
  const unreadRemedies = allRemedies.filter(r => !readRemedyIds.includes(r.id)).reverse();

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
    if (!readRemedyIds.includes(remedyId)) {
      setReadRemedyIds(prev => [...prev, remedyId]);
    }
  };

  const handleOpenNotifications = () => {
    setIsNotificationsOpen(true);
    const now = Date.now();
    setLastCheckedTime(now);
    localStorage.setItem('gharelu-last-check-time', now.toString());
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
        allRemedies={allRemedies}
      />
      
      <main 
        className={cn(
          "flex-1 w-full transition-colors duration-500 relative pt-20 pb-24",
          isNight ? "bg-black" : "bg-[#FDFBF7]"
        )}
      >
        <div className="w-full">
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
                onSelectRemedyId={setSelectedRemedyId}
                onLevelChange={(level) => setIsDetailView(level === 3)}
                allRemedies={allRemedies}
              />
            </div>
          ) : (
            <HomeView 
              lang={lang} 
              theme={theme} 
              onSelectCategory={handleSelectCategory} 
              allRemedies={allRemedies}
            />
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
        allRemedies={allRemedies}
      />

      <NotificationsOverlay
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        lang={lang}
        theme={theme}
        unreadRemedies={unreadRemedies}
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
