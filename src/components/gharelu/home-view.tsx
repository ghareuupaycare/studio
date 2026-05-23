import React from 'react';
import { Accessibility, Wind, Droplet } from 'lucide-react';

export const HomeView = () => {
  const categories = [
    { id: 'joints', label: 'घुटनों का दर्द', icon: Accessibility },
    { id: 'respiratory', label: 'खांसी और सर्दी', icon: Wind },
    { id: 'digestion', label: 'पाचन स्वास्थ्य', icon: Droplet },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Main Banner */}
      <section className="relative h-64 rounded-[2.5rem] overflow-hidden border border-white/5 bg-gradient-to-br from-card to-background shadow-2xl flex items-center px-10">
        <div className="relative z-10 max-w-sm space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase">
            आपका स्वास्थ्य, हमारी प्राथमिकता
          </div>
          <h2 className="text-4xl font-headline font-bold leading-tight text-white">
            प्राकृतिक तरीकों से <br /> स्वस्थ रहें
          </h2>
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-l from-primary/20 to-transparent" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-end px-2">
          <h3 className="text-2xl font-headline font-bold text-foreground">श्रेणियां</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div 
                key={cat.id}
                className="group flex items-center gap-4 p-5 rounded-[1.75rem] border border-white/5 bg-card/40 emerald-card-hover cursor-pointer"
              >
                <div className="p-3.5 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="font-headline font-semibold text-lg text-foreground/90">{cat.label}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
