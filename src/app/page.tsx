'use client';

import React, { useState } from 'react';
import { TopBar } from '@/components/gharelu/top-bar';
import { BottomNav, TabType } from '@/components/gharelu/bottom-nav';
import { HomeView } from '@/components/gharelu/home-view';

export default function GhareluUpayApp() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary selection:text-primary-foreground">
      <TopBar />
      
      <main className="flex-1 w-full max-w-2xl mx-auto p-6">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'favorites' && (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <p className="font-headline text-xl">अभी कोई पसंदीदा नहीं है</p>
          </div>
        )}
        {activeTab === 'info' && (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <p className="font-headline text-xl">वैद्य जी सलाह जल्द आ रही है</p>
          </div>
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Safe padding for bottom nav */}
      <div className="h-20" />
    </div>
  );
}
