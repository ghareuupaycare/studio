
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

    // Updated Metadata with specific disease examples
    const categoryMetadata: Record<string, any> = {
      fever_flu: {
        hi: { title: 'मौसमी बीमारियां', subtitle: 'बुखार, सर्दी-जुकाम, वायरल, गले की खराश' },
        en: { title: 'Seasonal Fever & Flu', subtitle: 'Fever, Cold & Cough, Viral, Sore Throat' }
      },
      stomach_ailments: {
        hi: { title: 'पेट के रोग', subtitle: 'गैस, कब्ज़, एसिडिटी, अपच' },
        en: { title: 'Stomach Ailments', subtitle: 'Gas, Constipation, Acidity, Indigestion' }
      },
      lifestyle_diseases: {
        hi: { title: 'असाध्य एवं जीवनशैली के रोग', subtitle: 'डायबिटीज, बीपी, दमा, थायरॉइड' },
        en: { title: 'Lifestyle Diseases', subtitle: 'Diabetes, BP, Asthma, Thyroid' }
      },
      women_diseases: {
        hi: { title: 'महिला के रोग', subtitle: 'मासिक धर्म, पीसीओडी, कमजोरी' },
        en: { title: 'Women Health', subtitle: 'Periods, PCOD, Weakness' }
      },
      detox: {
        hi: { title: 'संपूर्ण शरीर शुद्धि', subtitle: 'रक्त शुद्धि, लिवर डिटॉक्स, हल्कापन, ऊर्जा' },
        en: { title: 'Whole Body Detox', subtitle: 'Blood Detox, Liver Cleanse, Lightness, Energy' }
      },
      men_diseases: {
        hi: { title: 'पुरुषों के रोग', subtitle: 'थकान, कमजोरी, जोश, स्टैमिना' },
        en: { title: 'Men Health', subtitle: 'Fatigue, Weakness, Vitality, Stamina' }
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
