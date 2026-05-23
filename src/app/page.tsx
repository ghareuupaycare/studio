'use client';

import React, { useState } from 'react';
import { TopBar } from '@/components/gharelu/top-bar';
import { BottomNav } from '@/components/gharelu/bottom-nav';
import { HomeView } from '@/components/gharelu/home-view';
import { AIConsultant } from '@/components/gharelu/ai-consultant';

export default function GhareluUpayApp() {
  const [view, setView] = useState<'home' | 'ai'>('home');

  return (
    <div className="min-h-screen bg-[#F0F9F4] flex flex-col selection:bg-primary selection:text-primary-foreground">
      <TopBar />
      
      {/* Middle section with soothing Cream background (#FDFBF7) */}
      <main className="flex-1 w-full bg-[#FDFBF7]">
        <div className="max-w-2xl mx-auto px-6 py-12">
          {view === 'home' ? (
            <HomeView />
          ) : (
            <AIConsultant />
          )}
        </div>
        {/* Spacer to prevent content from being hidden behind the mega-footer and bottom bar */}
        <div className="h-[400px]" />
      </main>

      <BottomNav currentView={view} onViewChange={setView} />
    </div>
  );
}
