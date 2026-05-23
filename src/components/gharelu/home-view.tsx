import React from 'react';

export const HomeView = () => {
  return (
    <div className="space-y-12">
      {/* Main Banner Placeholder */}
      <section className="w-full h-56 rounded-[2rem] shadow-sm herbal-gradient overflow-hidden">
        {/* Empty Banner Space */}
      </section>

      {/* Categories Section */}
      <section className="space-y-6">
        <div className="px-2">
          <h3 className="text-2xl font-headline font-bold text-primary">श्रेणियां</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="h-20 w-full rounded-2xl placeholder-card" />
          <div className="h-20 w-full rounded-2xl placeholder-card" />
          <div className="h-20 w-full rounded-2xl placeholder-card" />
          <div className="h-20 w-full rounded-2xl placeholder-card" />
        </div>
      </section>
    </div>
  );
};
