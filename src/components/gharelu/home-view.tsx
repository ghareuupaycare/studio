'use client';

import React, { useMemo } from 'react';
import { Language, Theme } from '@/app/page';
import { Remedy } from '@/lib/remedy-data';
import { MainBanner } from './main-banner';
import { CategoryCards } from './category-cards';

interface HomeViewProps {
  lang: Language;
  theme: Theme;
  onSelectCategory: (id: string) => void;
  allRemedies: Remedy[];
}

export const HomeView = ({ lang, theme, onSelectCategory, allRemedies }: HomeViewProps) => {
  const isHindi = lang === 'hi';

  const categories = useMemo(() => {
    const catMap = new Map<string, { id: string; title: string; subtitle: string }>();

    const categoryMetadata: Record<string, any> = {
      fever_flu: {
        hi: { title: '1. मौसमी बुखार एवं फ्लू', subtitle: 'बुखार, जुकाम और खांसी के लिए प्रामाणिक आयुर्वेदिक उपचार' },
        en: { title: '1. Seasonal Fever & Flu', subtitle: 'Authentic Ayurvedic remedies for fever, cold and cough' }
      }
    };

    allRemedies.forEach(remedy => {
      if (!remedy.categoryId) return;
      if (!catMap.has(remedy.categoryId)) {
        const meta = categoryMetadata[remedy.categoryId];
        if (meta) {
          catMap.set(remedy.categoryId, {
            id: remedy.categoryId,
            title: meta[lang].title,
            subtitle: meta[lang].subtitle
          });
        } else if (remedy.mainCategory) {
          catMap.set(remedy.categoryId, {
            id: remedy.categoryId,
            title: remedy.mainCategory[lang] || remedy.categoryId,
            subtitle: isHindi ? 'आयुर्वेदिक घरेलू उपचार और नुस्खे' : 'Ayurvedic home remedies and solutions'
          });
        }
      }
    });

    return Array.from(catMap.values());
  }, [allRemedies, lang, isHindi]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 w-full max-w-2xl px-4 sm:px-6 mx-auto">
      <MainBanner lang={lang} theme={theme} />
      <CategoryCards 
        categories={categories} 
        lang={lang} 
        theme={theme} 
        onSelectCategory={onSelectCategory} 
      />
    </div>
  );
};
