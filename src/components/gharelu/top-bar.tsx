import React from 'react';

export const TopBar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-border h-20 flex items-center px-6">
      <div className="flex items-center">
        <h1 className="text-2xl font-headline font-black tracking-tight text-primary">
          घरेलू उपाय केयर
        </h1>
      </div>
      <div className="flex-1" />
    </header>
  );
};
