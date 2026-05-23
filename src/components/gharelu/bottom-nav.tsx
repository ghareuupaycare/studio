import React from 'react';
import { Home, Heart, Sparkles } from 'lucide-react';
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
    { id: 'info', label: 'वैद्य जी सलाह', icon: Sparkles },
  ] as const;

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md bg-card/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl p-2">
      <div className="flex justify-around items-center h-14">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as TabType)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-300",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "stroke-[2.5]" : "stroke-[1.5]")} />
              {isActive && (
                <span className="text-xs font-bold whitespace-nowrap">{tab.label}</span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
