'use client';

import React from 'react';
import { TopBar } from '@/components/gharelu/top-bar';
import { BottomNav } from '@/components/gharelu/bottom-nav';
import { HomeView } from '@/components/gharelu/home-view';

export default function GhareluUpayApp() {
  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary selection:text-primary-foreground">
      <TopBar />
      
      <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-8">
        <HomeView />
      </main>

      <BottomNav />
      
      {/* Safe padding for bottom nav */}
      <div className="h-24" />
    </div>
  );
}
