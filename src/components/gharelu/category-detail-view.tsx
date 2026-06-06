'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Language, Theme } from '@/app/page';
import { cn, toEnglishDigits } from '@/lib/utils';
import { ChevronLeft, ArrowRight, BookOpen } from 'lucide-react';
import { Remedy } from '@/lib/remedy-data';
import { RemedyDetail } from './remedy-detail';

interface CategoryDetailViewProps {
  categoryId: string;
  lang: Language;
  theme: Theme;
  onBack: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  initialRemedyId?: string | null;
  onSelectRemedyId?: (id: string | null) => void;
  onLevelChange?: (level: 1 | 2 | 3) => void;
  allRemedies: Remedy[];
}

export const CategoryDetailView = ({ 
  categoryId, 
  lang, 
  theme, 
  onBack, 
  favorites, 
  onToggleFavorite,
  initialRemedyId,
  onSelectRemedyId,
  onLevelChange,
  allRemedies
}: CategoryDetailViewProps) => {
  const [selectedIllnessId, setSelectedIllnessId] = useState<string | null>(null);
  const [selectedRemedy, setSelectedRemedy] = useState<Remedy | null>(null);
  
  const isHindi = lang === 'hi';
  const isNight = theme === 'night';

  useEffect(() => {
    if (initialRemedyId) {
      const remedy = allRemedies.find(r => r.id === initialRemedyId);
      if (remedy) {
        setSelectedRemedy(remedy);
        setSelectedIllnessId(remedy.illnessId);
      }
    }
  }, [initialRemedyId, allRemedies]);

  useEffect(() => {
    if (onLevelChange) {
      if (selectedRemedy) onLevelChange(3);
      else if (selectedIllnessId) onLevelChange(2);
      else onLevelChange(1);
    }
  }, [selectedRemedy, selectedIllnessId, onLevelChange]);

  const categoryContent = {
    fever_flu: {
      title: isHindi ? '1. मौसमी बुखार एवं फ्लू' : '1. Seasonal Fever & Flu',
      illnesses: [
        { id: 'general-fever', title: isHindi ? '1. सामान्य बुखार' : '1. General Fever' },
        { id: 'common-cold', title: isHindi ? '2. नजला और जुकाम' : '2. Cold & Flu' },
        { id: 'cough', title: isHindi ? '3. सूखी एवं बलगम वाली खांसी' : '3. Cough' }
      ]
    },
    stomach_diseases: {
      title: isHindi ? '2. पेट रोग' : '2. Stomach Diseases',
      illnesses: [
        { id: 'gas_acidity', title: isHindi ? '1. गैस और एसिडिटी' : '1. Gas & Acidity' },
        { id: 'indigestion', title: isHindi ? '2. अपच' : '2. Indigestion' }
      ]
    }
  };

  const activeCategory = categoryContent[categoryId as keyof typeof categoryContent];
  
  const illnessList = useMemo(() => {
    if (!activeCategory) return [];
    
    const dynamicIllnesses = allRemedies
      .filter(r => r.categoryId === categoryId || (r.illnessId === 'live' && r.categoryId === categoryId))
      .map(r => ({ id: r.illnessId, title: r.name[lang] }));

    const merged = [...activeCategory.illnesses];
    dynamicIllnesses.forEach(di => {
      if (!merged.find(m => m.id === di.id)) merged.push(di);
    });
    
    return merged;
  }, [activeCategory, allRemedies, categoryId, lang]);

  const illnessRemedies = useMemo(() => {
    return allRemedies.filter(r => r.illnessId === selectedIllnessId || (r.categoryId === categoryId && selectedIllnessId === r.illnessId));
  }, [allRemedies, selectedIllnessId, categoryId]);

  if (!activeCategory) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
        <p className="text-xl font-bold">{isHindi ? 'यह श्रेणी जल्द ही आ रही है' : 'Category coming soon'}</p>
        <button onClick={onBack} className="mt-4 text-accent font-bold underline">
          {isHindi ? 'वापस जाएं' : 'Go back'}
        </button>
      </div>
    );
  }

  const handleInternalBack = () => {
    if (selectedRemedy) {
      setSelectedRemedy(null);
      if (onSelectRemedyId) onSelectRemedyId(null);
    } else if (selectedIllnessId) {
      setSelectedIllnessId(null);
    } else {
      onBack();
    }
  };

  const currentIllness = illnessList.find(i => i.id === selectedIllnessId);

  return (
    <div className="space-y-10 animate-in slide-in-from-right-4 duration-500 pb-10 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={handleInternalBack}
          className={cn(
            "p-3 rounded-full transition-all active:scale-95 shadow-md cursor-pointer",
            isNight ? "bg-white text-black" : "bg-[#14532D] text-white"
          )}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex flex-col text-left">
          <h2 className={cn(
            "font-black font-headline leading-tight tracking-wide text-2xl",
            isNight ? "text-white" : "text-[#14532D]"
          )}>
            {toEnglishDigits(selectedRemedy ? selectedRemedy.name[lang] : (selectedIllnessId ? (currentIllness?.title || '') : activeCategory.title))}
          </h2>
        </div>
      </div>

      {!selectedIllnessId ? (
        <div className="grid grid-cols-1 gap-3">
          {illnessList.map((illness) => (
            <div
              key={illness.id}
              onClick={() => setSelectedIllnessId(illness.id)}
              className={cn(
                "group relative w-full p-5 sm:p-6 rounded-[2rem] border-[1.5px] transition-all duration-500 flex flex-row items-center justify-between text-left cursor-pointer shadow-lg active:scale-[0.98]",
                isNight 
                  ? "bg-black border-white/20 text-white" 
                  : "bg-[#FDFBF7] border-[#14532D] text-[#1E293B] hover:border-[#14532D]/80"
              )}
            >
              <div className="flex-1 pr-4">
                <h3 className={cn(
                  "text-[19px] sm:text-[21px] font-black leading-tight",
                  isNight ? "text-white" : "text-[#14532D]"
                )}>
                  {toEnglishDigits(illness.title)}
                </h3>
              </div>
              <div className={cn(
                "flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full transition-all shrink-0 shadow-md",
                isNight 
                  ? "bg-white text-black" 
                  : "bg-[#14532D] text-white"
              )}>
                <ArrowRight className="w-5 h-5 sm:w-6 h-6" />
              </div>
            </div>
          ))}
        </div>
      ) : !selectedRemedy ? (
        <div className="grid grid-cols-1 gap-3">
          {illnessRemedies.map((remedy) => (
            <div
              key={remedy.id}
              onClick={() => {
                setSelectedRemedy(remedy);
                if (onSelectRemedyId) onSelectRemedyId(remedy.id);
              }}
              className={cn(
                "group relative w-full p-5 sm:p-6 rounded-[2rem] border-[1.5px] transition-all duration-500 flex flex-row items-center justify-between text-left cursor-pointer shadow-lg active:scale-[0.98]",
                isNight 
                  ? "bg-black border-white/20 text-white" 
                  : "bg-[#FDFBF7] border-[#14532D] text-[#1E293B] hover:border-[#14532D]/80"
              )}
            >
              <div className="flex-1 pr-4">
                <h3 className={cn(
                  "text-[18px] sm:text-[20px] font-black leading-tight",
                  isNight ? "text-white" : "text-[#14532D]"
                )}>
                  {toEnglishDigits(remedy.name[lang])}
                </h3>
              </div>
              <div className={cn(
                "flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full transition-all shrink-0 shadow-md",
                isNight 
                  ? "bg-white text-black" 
                  : "bg-[#14532D] text-white"
              )}>
                <ArrowRight className="w-5 h-5 sm:w-6 h-6" />
              </div>
            </div>
          ))}
          {illnessRemedies.length === 0 && (
            <p className="text-center opacity-50 py-10 italic">
              {isHindi ? 'अभी कोई नुस्खा उपलब्ध नहीं है' : 'No recipes available yet'}
            </p>
          )}
        </div>
      ) : (
        <RemedyDetail 
          remedy={selectedRemedy} 
          theme={theme} 
          lang={lang} 
          isFavorite={favorites.includes(selectedRemedy.id)}
          onToggleFavorite={() => onToggleFavorite(selectedRemedy.id)}
        />
      )}
    </div>
  );
};