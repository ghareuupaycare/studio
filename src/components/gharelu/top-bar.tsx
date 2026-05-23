import React from 'react';
import { Leaf } from 'lucide-react';

export const TopBar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-primary/20 h-16 flex items-center px-4 justify-between shadow-lg">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-full bg-primary/10">
          <Leaf className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-xl font-headline font-bold text-primary tracking-wide amber-glow">
          घरेलू उपाय केयर
        </h1>
      </div>
      <div className="text-xs font-medium text-primary/60 italic hidden sm:block">
        आयुर्वेद ही जीवन है
      </div>
    </header>
  );
};
