import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export const TopBar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-white/5 h-20 flex items-center px-6 justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-headline font-black tracking-tight premium-gold-text">
          घरेलू उपाय केयर
        </h1>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="p-2.5 rounded-full hover:bg-white/5 text-foreground/80 transition-colors">
          <Bell className="w-5 h-5 stroke-[1.5]" />
        </button>
        <button className="p-2.5 rounded-full hover:bg-white/5 text-foreground/80 transition-colors">
          <Search className="w-5 h-5 stroke-[1.5]" />
        </button>
        <button className="p-2.5 rounded-full hover:bg-white/5 text-foreground/80 transition-colors">
          <User className="w-5 h-5 stroke-[1.5]" />
        </button>
      </div>
    </header>
  );
};
