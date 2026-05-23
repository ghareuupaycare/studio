import React from 'react';
import { Language, Theme } from '@/app/page';

interface HomeViewProps {
  lang: Language;
  theme: Theme;
}

export const HomeView = ({ lang, theme }: HomeViewProps) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Main Banner Placeholder - Completely empty */}
      <section className="w-full h-56 rounded-[2rem] shadow-sm herbal-gradient overflow-hidden" />
    </div>
  );
};
