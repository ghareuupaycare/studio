
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
    // 1. Group unique illness display names by categoryId
    const illnessNamesMap = new Map<string, Set<string>>();
    
    allRemedies.forEach(remedy => {
      const cid = remedy.categoryId;
      if (!cid) return;
      
      if (!illnessNamesMap.has(cid)) {
        illnessNamesMap.set(cid, new Set<string>());
      }
      
      // Get display name for the illness (from diseaseName or fallback to name)
      const rawName = remedy.diseaseName?.[lang] || remedy.name[lang];
      if (rawName) {
        // Clean leading numbers (e.g. "1. Fever" -> "Fever")
        const cleanName = rawName.replace(/^\d+[\s.]*/, '').trim();
        if (cleanName) {
          illnessNamesMap.get(cid)?.add(cleanName);
        }
      }
    });

    const catMap = new Map<string, { id: string; title: string; subtitle: string }>();

    // Mapping for user-friendly titles since IDs might be messy or technical
    const categoryTitleMeta: Record<string, Record<string, string>> = {
      fever_flu: { hi: 'मौसमी बीमारियां', en: 'Seasonal Fever & Flu' },
      stomach_ailments: { hi: 'पेट के रोग', en: 'Stomach Ailments' },
      lifestyle_diseases: { hi: 'असाध्य एवं जीवनशैली के रोग', en: 'Lifestyle Diseases' },
      women_diseases: { hi: 'महिला के रोग', en: 'Women Health' },
      detox: { hi: 'संपूर्ण शरीर शुद्धि', en: 'Whole Body Detox' },
      men_diseases: { hi: 'पुरुषों के रोग', en: 'Men Health' }
    };

    // 2. Build final category card objects
    allRemedies.forEach(remedy => {
      const cid = remedy.categoryId;
      if (!cid || catMap.has(cid)) return;

      // Extract first 4 illness names for this category
      const illnesses = Array.from(illnessNamesMap.get(cid) || []);
      const dynamicSubtitle = illnesses.slice(0, 4).join(', ');
      
      const fallbackSubtitle = isHindi 
        ? 'आयुर्वेदिक घरेलू उपचार और नुस्खे' 
        : 'Ayurvedic home remedies and solutions';

      // Find best title: check meta map first, then fallback to remedy's mainCategory string
      const metaTitle = categoryTitleMeta[cid]?.[lang];
      const categoryTitle = metaTitle || (remedy.mainCategory?.[lang] || cid);

      catMap.set(cid, {
        id: cid,
        title: categoryTitle,
        subtitle: dynamicSubtitle || fallbackSubtitle
      });
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
