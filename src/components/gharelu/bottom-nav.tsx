import React from 'react';
import { Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  currentView: 'home' | 'ai';
  onViewChange: (view: 'home' | 'ai') => void;
}

export const BottomNav = ({ currentView, onViewChange }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full bg-primary shadow-2xl h-80 pt-6">
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex justify-center">
          {/* Home Button */}
          <button
            onClick={() => onViewChange('home')}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300",
              currentView === 'home' ? "text-accent scale-110" : "text-white/60 hover:text-white"
            )}
          >
            <div className={cn(
              "p-3 rounded-2xl transition-colors",
              currentView === 'home' ? "bg-accent/20" : "bg-white/5"
            )}>
              <Home className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold tracking-wider">मुख्य पेज</span>
          </button>
        </div>

        {/* Large blank space for future digital library links */}
        <div className="mt-12 h-40" />
      </div>
    </nav>
  );
};
