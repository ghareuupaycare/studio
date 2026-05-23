'use client';

import React from 'react';
import { TopBar } from '@/components/gharelu/top-bar';
import { BottomNav } from '@/components/gharelu/bottom-nav';
import { HomeView } from '@/components/gharelu/home-view';

export default function GhareluUpayApp() {
  return (
    <div className="min-h-screen bg-[#F0F9F4] flex flex-col selection:bg-primary selection:text-primary-foreground">
      <TopBar />
      
      {/* Middle section with soothing Cream background (#FDFBF7) */}
      <main className="flex-1 w-full bg-[#FDFBF7]">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <HomeView />
        </div>
        {/* Spacer to prevent content from being hidden behind the large footer */}
        <div className="h-40" />
      </main>

      <BottomNav />
    </div>
  );
}
