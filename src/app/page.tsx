'use client';

import React, { useState, useEffect, useMemo, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { TopBar } from '@/components/gharelu/top-bar';
import { BottomNav } from '@/components/gharelu/bottom-nav';
import { HomeView } from '@/components/gharelu/home-view';
import { CategoryDetailView } from '@/components/gharelu/category-detail-view';
import { FavoritesOverlay } from '@/components/gharelu/favorites-overlay';
import { NotificationsOverlay } from '@/components/gharelu/notifications-overlay';
import { AppSplashScreen } from '@/components/gharelu/app-splash-screen';
import { cn } from '@/lib/utils';
import { REMEDIES as STATIC_REMEDIES, Remedy } from '@/lib/remedy-data';
import { useFirestore } from '@/firebase';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';

export type Language = 'hi' | 'en';
export type Theme = 'cream' | 'night';

function GhareluUpayAppContent() {
  const db = useFirestore();
  const searchParams = useSearchParams();
  const urlRemedyId = searchParams.get('remedyId');
  
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedIllnessId, setSelectedIllnessId] = useState<string | null>(null);
  const [selectedRemedyId, setSelectedRemedyId] = useState<string | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [lang, setLang] = useState<Language>('hi');
  const [theme, setTheme] = useState<Theme>('cream');
  
  const [liveRecipes, setLiveRecipes] = useState<Remedy[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [readRemedyIds, setReadRemedyIds] = useState<string[]>([]);
  const [lastCheckedTime, setLastCheckedTime] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const [userId, setUserId] = useState<string>('');
  const [privateAnswers, setPrivateAnswers] = useState<any[]>([]);

  // Overlay States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const initialDeepLinkProcessed = useRef(false);

  const allRemedies = useMemo(() => {
    return [...STATIC_REMEDIES, ...liveRecipes];
  }, [liveRecipes]);

  // Robust History Sync - History state is the single source of truth after initial load
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      try {
        const state = event.state || {};
        
        // Synchronize all navigation states strictly from history state
        setSelectedCategoryId(state.categoryId || null);
        setSelectedIllnessId(state.illnessId || null);
        setSelectedRemedyId(state.remedyId || null);
        setIsDetailView(!!state.remedyId);

        setIsSearchOpen(state.overlay === 'search');
        setIsFavoritesOpen(state.overlay === 'favorites');
        setIsNotificationsOpen(state.overlay === 'notifications');
        setIsSidebarOpen(state.overlay === 'sidebar');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (e) {
        console.error("Back button handling failed", e);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Ensure Baseline Home Entry
    if (isLoaded) {
      if (!window.history.state || window.history.state.categoryId === undefined) {
        window.history.replaceState({ 
          categoryId: null, illnessId: null, remedyId: null, overlay: null 
        }, '', '/');
      }
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, [isLoaded]);

  // Handle Deep Link Landing with atomic multi-step stack building
  useEffect(() => {
    if (isLoaded && urlRemedyId && allRemedies.length > 0 && !initialDeepLinkProcessed.current) {
      const remedy = allRemedies.find(r => r.id === urlRemedyId);
      if (remedy) {
        initialDeepLinkProcessed.current = true;
        
        // Reset and build the stack from bottom up
        window.history.replaceState({ categoryId: null, illnessId: null, remedyId: null, overlay: null }, '', '/');
        
        // Level 1: Category
        window.history.pushState({ 
          categoryId: remedy.categoryId, illnessId: null, remedyId: null, overlay: null 
        }, '', '/');
        
        // Level 2: Remedy List
        window.history.pushState({ 
          categoryId: remedy.categoryId, illnessId: remedy.illnessId, remedyId: null, overlay: null 
        }, '', '/');
        
        // Level 3: Remedy Detail (Final destination)
        window.history.pushState({ 
          categoryId: remedy.categoryId, illnessId: remedy.illnessId, remedyId: remedy.id, overlay: null 
        }, '', `?remedyId=${remedy.id}`);

        setSelectedCategoryId(remedy.categoryId);
        setSelectedIllnessId(remedy.illnessId);
        setSelectedRemedyId(remedy.id);
        setIsDetailView(true);
      }
    }
  }, [urlRemedyId, allRemedies, isLoaded]);

  // User ID Initialization
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      let uid = localStorage.getItem('gharelu_user_id');
      if (!uid) {
        uid = 'user_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('gharelu_user_id', uid);
      }
      setUserId(uid);
    } catch (e) {
      console.error("User ID setup failed", e);
    }
  }, []);

  // Listen for recipes
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
          timestamp: data.timestamp?.toMillis() || Date.now(),
          image: data.image
        } as Remedy;
      });
      setLiveRecipes(docs);
    });

    return () => unsubscribe();
  }, [db]);

  // Private Q&A Notifications
  useEffect(() => {
    if (!db || !userId) return;
    const q = query(
      collection(db, 'questions'),
      where('userId', '==', userId),
      where('hasAnswer', '==', true),
      where('isRead', '==', false)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPrivateAnswers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [db, userId]);

  // Initial Data Loading
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const savedFavs = localStorage.getItem('gharelu-favorites');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
    } catch (e) { console.error("Favs load error", e); }

    try {
      const savedReadIds = localStorage.getItem('gharelu-read-remedy-ids');
      if (savedReadIds) setReadRemedyIds(JSON.parse(savedReadIds));
    } catch (e) { console.error("Read IDs load error", e); }

    try {
      const savedLastCheck = localStorage.getItem('gharelu-last-check-time');
      if (savedLastCheck) setLastCheckedTime(parseInt(savedLastCheck));
    } catch (e) { console.error("Last check load error", e); }
    
    setIsLoaded(true);
  }, []);

  // Save changes
  useEffect(() => {
    if (isLoaded) {
      try { localStorage.setItem('gharelu-favorites', JSON.stringify(favorites)); } catch (e) {}
    }
  }, [favorites, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      try { localStorage.setItem('gharelu-read-remedy-ids', JSON.stringify(readRemedyIds)); } catch (e) {}
    }
  }, [readRemedyIds, isLoaded]);

  const latestRemedyTime = useMemo(() => {
    if (liveRecipes.length === 0) return 0;
    return Math.max(...liveRecipes.map(r => (r as any).timestamp || 0));
  }, [liveRecipes]);

  const hasNewNotifications = (isLoaded && latestRemedyTime > lastCheckedTime) || privateAnswers.length > 0;
  const unreadRemedies = allRemedies.filter(r => !readRemedyIds.includes(r.id)).reverse();

  const toggleLanguage = () => setLang((prev) => (prev === 'hi' ? 'en' : 'hi'));
  const toggleTheme = () => setTheme((prev) => (prev === 'cream' ? 'night' : 'cream'));

  const isNight = theme === 'night';

  // Navigation Handlers
  const handleSelectCategory = (id: string) => {
    setIsSearchOpen(false);
    setIsFavoritesOpen(false);
    setIsNotificationsOpen(false);
    setIsSidebarOpen(false);
    setSelectedCategoryId(id);
    setSelectedIllnessId(null);
    setSelectedRemedyId(null);
    setIsDetailView(false);
    window.history.pushState({ categoryId: id, illnessId: null, remedyId: null, overlay: null }, '', '/');
  };

  const handleSelectIllness = (illnessId: string) => {
    setIsSearchOpen(false);
    setIsFavoritesOpen(false);
    setIsNotificationsOpen(false);
    setIsSidebarOpen(false);
    setSelectedIllnessId(illnessId);
    setSelectedRemedyId(null);
    setIsDetailView(false);
    window.history.pushState({ categoryId: selectedCategoryId, illnessId: illnessId, remedyId: null, overlay: null }, '', '/');
  };

  const handleSelectRemedy = (remedyId: string, categoryId: string) => {
    const remedy = allRemedies.find(r => r.id === remedyId);
    if (!remedy) return;

    // Manually ensure overlays are visually closed before pushing content stack
    setIsSearchOpen(false);
    setIsFavoritesOpen(false);
    setIsNotificationsOpen(false);
    setIsSidebarOpen(false);

    const iId = remedy.illnessId || null;
    
    // Check where we are. If coming from Home or Search (Level 0), push intermediate levels first.
    if (!selectedCategoryId) {
       // Push Level 1 (Category List)
       window.history.pushState({ categoryId, illnessId: null, remedyId: null, overlay: null }, '', '/');
       // Push Level 2 (Remedy List)
       window.history.pushState({ categoryId, illnessId: iId, remedyId: null, overlay: null }, '', '/');
    } else if (!selectedIllnessId && selectedCategoryId === categoryId) {
       // At Level 1 (Category List), push Level 2 (Remedy List)
       window.history.pushState({ categoryId, illnessId: iId, remedyId: null, overlay: null }, '', '/');
    }

    setSelectedCategoryId(categoryId);
    setSelectedIllnessId(iId);
    setSelectedRemedyId(remedyId);
    setIsDetailView(true);
    
    // Push Level 3: Remedy Detail
    window.history.pushState({ categoryId, illnessId: iId, remedyId, overlay: null }, '', `?remedyId=${remedyId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Overlay Handlers
  const handleOpenSearch = () => {
    setIsSearchOpen(true);
    window.history.pushState({ categoryId: selectedCategoryId, illnessId: selectedIllnessId, remedyId: selectedRemedyId, overlay: 'search' }, '', '');
  };

  const handleOpenFavorites = () => {
    setIsFavoritesOpen(true);
    window.history.pushState({ categoryId: selectedCategoryId, illnessId: selectedIllnessId, remedyId: selectedRemedyId, overlay: 'favorites' }, '', '');
  };

  const handleOpenNotifications = () => {
    setIsNotificationsOpen(true);
    const now = Date.now();
    setLastCheckedTime(now);
    try { localStorage.setItem('gharelu-last-check-time', now.toString()); } catch(e) {}
    window.history.pushState({ categoryId: selectedCategoryId, illnessId: selectedIllnessId, remedyId: selectedRemedyId, overlay: 'notifications' }, '', '');
  };

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
    window.history.pushState({ categoryId: selectedCategoryId, illnessId: selectedIllnessId, remedyId: selectedRemedyId, overlay: 'sidebar' }, '', '');
  };

  const handleCloseOverlay = () => {
    try {
      if (typeof window !== 'undefined') {
        window.history.back();
      }
    } catch (e) {
      console.error("Back navigation failed", e);
    }
  };

  const handleToggleFavorite = (remedyId: string) => {
    setFavorites(prev => prev.includes(remedyId) ? prev.filter(id => id !== remedyId) : [...prev, remedyId]);
  };

  const handleMarkAsRead = (remedyId: string) => {
    if (!readRemedyIds.includes(remedyId)) {
      setReadRemedyIds(prev => [...prev, remedyId]);
    }
  };

  const handleGoHome = () => {
    setIsSearchOpen(false);
    setIsFavoritesOpen(false);
    setIsNotificationsOpen(false);
    setIsSidebarOpen(false);
    if (!selectedCategoryId) return;
    setSelectedCategoryId(null);
    setSelectedIllnessId(null);
    setSelectedRemedyId(null);
    setIsDetailView(false);
    window.history.pushState({ categoryId: null, illnessId: null, remedyId: null, overlay: null }, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isLoaded) return <div className="min-h-screen bg-[#FDFBF7]" />;

  return (
    <div className={cn("min-h-screen flex flex-col transition-colors duration-500", isNight ? "bg-black text-white" : "bg-[#FDFBF7] text-foreground")}>
      <AppSplashScreen />
      <TopBar 
        lang={lang} theme={theme} onToggleLanguage={toggleLanguage} onToggleTheme={toggleTheme} 
        onSelectRemedy={handleSelectRemedy} onOpenFavorites={handleOpenFavorites} onOpenNotifications={handleOpenNotifications}
        onOpenSidebar={handleOpenSidebar} isSidebarOpen={isSidebarOpen} onSidebarOpenChange={(open) => {
          if (!open && isSidebarOpen) handleCloseOverlay();
        }}
        hasFavorites={favorites.length > 0} hasNotifications={hasNewNotifications} allRemedies={allRemedies}
        onOpenSearch={handleOpenSearch} isSearchOpen={isSearchOpen} onCloseSearch={handleCloseOverlay}
      />
      
      <main className={cn("flex-1 w-full transition-colors duration-500 relative pt-20 pb-24", isNight ? "bg-black" : "bg-[#FDFBF7]")}>
        <div className="w-full">
          {selectedCategoryId ? (
            <div className="max-w-2xl mx-auto px-6">
              <CategoryDetailView 
                categoryId={selectedCategoryId} lang={lang} theme={theme} onBack={handleCloseOverlay} 
                favorites={favorites} onToggleFavorite={handleToggleFavorite} initialRemedyId={selectedRemedyId}
                initialIllnessId={selectedIllnessId} onSelectRemedyId={(id) => id && handleSelectRemedy(id, selectedCategoryId)}
                onSelectIllnessId={handleSelectIllness} onLevelChange={(level) => setIsDetailView(level === 3)} allRemedies={allRemedies}
              />
            </div>
          ) : (
            <HomeView lang={lang} theme={theme} onSelectCategory={handleSelectCategory} allRemedies={allRemedies} />
          )}
        </div>
      </main>

      <FavoritesOverlay isOpen={isFavoritesOpen} onClose={handleCloseOverlay} lang={lang} theme={theme} favorites={favorites} onSelectRemedy={handleSelectRemedy} allRemedies={allRemedies} />
      <NotificationsOverlay isOpen={isNotificationsOpen} onClose={handleCloseOverlay} lang={lang} theme={theme} unreadRemedies={unreadRemedies} onMarkAsRead={handleMarkAsRead} onSelectRemedy={handleSelectRemedy} privateAnswers={privateAnswers} db={db} />
      <BottomNav lang={lang} theme={theme} currentView={!selectedCategoryId ? 'home' : 'details'} onViewChange={handleGoHome} onOpenSearch={handleOpenSearch} enableScrollHide={isDetailView} />
    </div>
  );
}

export default function GhareluUpayApp() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFBF7]" />}>
      <GhareluUpayAppContent />
    </Suspense>
  );
}
