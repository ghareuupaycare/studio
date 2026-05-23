import React from 'react';
import { Language, Theme } from '@/app/page';

interface HomeViewProps {
  lang: Language;
  theme: Theme;
}

export const HomeView = ({ lang, theme }: HomeViewProps) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Main Banner Placeholder */}
      <section className="w-full h-56 rounded-[2rem] shadow-sm herbal-gradient overflow-hidden flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-3xl font-headline font-bold text-white drop-shadow-md">
            {lang === 'hi' ? 'प्राकृतिक तरीकों से स्वस्थ रहें' : 'Stay Healthy Naturally'}
          </h2>
        </div>
      </section>
    </div>
  );
};
