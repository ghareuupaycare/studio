import React from 'react';
import { Home, Heart, Info, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TabType = 'home' | 'favorites' | 'info';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: 'home', label: 'मुख्य पेज', icon: Home },
    { id: 'favorites', label: 'पसंदीदा', icon: Heart },
    { id: 'info', label: 'वैद्य जी सलाह', icon: Info },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-primary/20 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 transition-all duration-300 relative group",
                isActive ? "text-primary" : "text-muted-foreground hover:text-primary/70"
              )}
            >
              <div className={cn(
                "p-1 rounded-xl transition-all duration-300",
                isActive ? "bg-primary/10 shadow-[0_0_15px_rgba(225,175,49,0.2)]" : ""
              )}>
                <Icon className={cn("w-6 h-6", isActive ? "stroke-[2.5px]" : "stroke-[1.5px]")} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
              {isActive && (
                <div className="absolute -top-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary))]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
