'use client';

import React, { useState, useEffect } from 'react';
import { TopBar } from '@/components/gharelu/top-bar';
import { BottomNav, TabType } from '@/components/gharelu/bottom-nav';
import { HomeView } from '@/components/gharelu/home-view';
import { FavoritesView } from '@/components/gharelu/favorites-view';
import { AIConsultant } from '@/components/gharelu/ai-consultant';
import { RemedyDetail } from '@/components/gharelu/remedy-detail';
import { Remedy } from '@/lib/remedy-data';

export default function GhareluUpayApp() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedRemedy, setSelectedRemedy] = useState<Remedy | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Persistence of favorites
  useEffect(() => {
    const saved = localStorage.getItem('gharelu_favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('gharelu_favorites', JSON.stringify(next));
      return next;
    });
  };

  const handleSelectRemedy = (remedy: Remedy) => {
    setSelectedRemedy(remedy);
    setIsDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      
      <main className="flex-1 w-full max-w-lg mx-auto p-4 pt-6">
        {activeTab === 'home' && (
          <HomeView 
            onSelectRemedy={handleSelectRemedy} 
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}
        {activeTab === 'favorites' && (
          <FavoritesView 
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSelectRemedy={handleSelectRemedy}
          />
        )}
        {activeTab === 'info' && (
          <AIConsultant />
        )}
      </main>

      <RemedyDetail 
        remedy={selectedRemedy} 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
      />

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Safe padding for bottom nav */}
      <div className="h-16" />
    </div>
  );
}
