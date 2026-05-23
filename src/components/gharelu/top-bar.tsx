import React from 'react';
import { Bell, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const TopBar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-border h-20 flex items-center px-6">
      <div className="flex items-center">
        <h1 className="text-2xl font-headline font-black tracking-tight text-primary">
          घरेलू उपाय केयर
        </h1>
      </div>
      
      <div className="flex-1" />
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/5">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/5">
          <Search className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/5">
          <Heart className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};
