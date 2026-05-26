'use client';

import React, { useState, useEffect } from 'react';
import { Language, Theme } from '@/app/page';
import { cn, toEnglishDigits } from '@/lib/utils';
import { ChevronLeft, ArrowRight, BookOpen } from 'lucide-react';
import { REMEDIES, Remedy } from '@/lib/remedy-data';
import { RemedyDetail } from './remedy-detail';

interface CategoryDetailViewProps {
  categoryId: string;
  lang: Language;
  theme: Theme;
  onBack: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  initialRemedyId?: string | null;
  onLevelChange?: (level: 1 | 2 | 3) => void;
}

export const CategoryDetailView = ({ 
  categoryId, 
  lang, 
  theme, 
  onBack, 
  favorites, 
  onToggleFavorite,
  initialRemedyId,
  onLevelChange
}: CategoryDetailViewProps) => {
  const [selectedIllnessId, setSelectedIllnessId] = useState<string | null>(null);
  const [selectedRemedy, setSelectedRemedy] = useState<Remedy | null>(null);
  
  const isHindi = lang === 'hi';
  const isNight = theme === 'night';

  /**
   * Arrest Sub-Page Routing Conflicts:
   * Reactively updates the view when initialRemedyId changes from the search overlay.
   * This ensures absolute navigation works even if the component is already mounted.
   */
  useEffect(() => {
    if (initialRemedyId) {
      const remedy = REMEDIES.find(r => r.id === initialRemedyId);
      if (remedy) {
        setSelectedRemedy(remedy);
        setSelectedIllnessId(remedy.illnessId);
      }
    } else {
      setSelectedRemedy(null);
      setSelectedIllnessId(null);
    }
  }, [initialRemedyId, categoryId]);

  useEffect(() => {
    if (onLevelChange) {
      if (selectedRemedy) onLevelChange(3);
      else if (selectedIllnessId) onLevelChange(2);
      else onLevelChange(1);
    }
  }, [selectedRemedy, selectedIllnessId, onLevelChange]);

  const categoryContent = {
    fever: {
      title: isHindi ? '1. मौसमी बुखार एवं फ्लू' : '1. Seasonal Fever & Flu',
      illnesses: [
        {
          id: 'general-fever',
          title: isHindi ? '1. सामान्य बुखार' : '1. General Fever',
          description: isHindi 
            ? 'हल्के बुखार और शारीरिक थकान के लिए प्राकृतिक उपचार' 
            : 'Natural treatments for mild fever and physical fatigue'
        },
        {
          id: 'common-cold',
          title: isHindi ? '2. नजला और जुकाम' : '2. Chronic Cold & Flu',
          description: isHindi 
            ? 'नाक बहना, निरंतर छींकें आना और बंद नाक के लिए अचूक घरेलू उपचार' 
            : 'Effective home remedies for runny nose, continuous sneezing, and nasal congestion'
        }
      ]
    },
    joints: {
      title: isHindi ? '2. घुटनों का दर्द' : '2. Joint Pain',
      illnesses: [] // Add future illnesses here
    },
    respiratory: {
      title: isHindi ? '3. खांसी और सर्दी' : '3. Cough & Cold',
      illnesses: []
    },
    digestion: {
      title: isHindi ? '4. पाचन' : '4. Digestion',
      illnesses: []
    }
  };

  const activeCategory = categoryContent[categoryId as keyof typeof categoryContent];
  const illnessRemedies = REMEDIES.filter(r => r.illnessId === selectedIllnessId);

  if (!activeCategory) return null;

  const handleInternalBack = () => {
    if (selectedRemedy) {
      setSelectedRemedy(null);
    } else if (selectedIllnessId) {
      setSelectedIllnessId(null);
    } else {
      onBack();
    }
  };

  const currentIllness = activeCategory.illnesses.find(i => i.id === selectedIllnessId);

  return (
    <div className="space-y-10 animate-in slide-in-from-right-4 duration-500 pb-10">
      {/* Header */}
      <div className="flex items-center gap-5">
        <button 
          onClick={handleInternalBack}
          className={cn(
            "p-4 rounded-full transition-all active:scale-95 shadow-lg cursor-pointer",
            isNight ? "bg-white text-black hover:bg-white/90" : "bg-[#14532D] text-white hover:bg-[#166534]"
          )}
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
        <div className="flex flex-col text-left">
          <h2 className={cn(
            "font-black font-headline leading-tight tracking-wide text-3xl sm:text-4xl",
            isNight ? "text-white" : "text-[#14532D]"
          )}>
            {toEnglishDigits(selectedRemedy ? selectedRemedy.name[lang] : (selectedIllnessId ? (currentIllness?.title || '') : activeCategory.title))}
          </h2>
          {(selectedIllnessId || selectedRemedy) && (
            <span className={cn(
              "text-[14px] font-bold uppercase tracking-[0.2em] opacity-60 mt-1",
              isNight ? "text-white" : "text-[#14532D]"
            )}>
              {selectedRemedy ? (isHindi ? 'नुस्खा विवरण' : 'Remedy Detail') : activeCategory.title}
            </span>
          )}
        </div>
      </div>

      {!selectedIllnessId ? (
        /* Level 1: List of Illnesses */
        <div className="grid grid-cols-1 gap-6">
          {activeCategory.illnesses.length > 0 ? (
            activeCategory.illnesses.map((illness) => (
              <button
                key={illness.id}
                onClick={() => setSelectedIllnessId(illness.id)}
                className={cn(
                  "group relative w-full p-8 rounded-[2.5rem] border transition-all duration-300 text-left cursor-pointer",
                  "flex items-center justify-between shadow-xl hover:-translate-y-1 active:scale-[0.98]",
                  isNight 
                    ? "bg-black border-white text-white active:bg-white active:text-black" 
                    : "bg-white border-primary/10 hover:border-accent/40 text-[#1E293B] active:bg-[#B45309] active:text-[#FDFBF7]"
                )}
              >
                <div className="space-y-2">
                  <h3 className={cn(
                    "text-2xl font-black transition-colors leading-tight",
                    isNight ? "text-white group-active:text-black" : "text-[#1E293B] group-active:text-white"
                  )}>
                    {toEnglishDigits(illness.title)}
                  </h3>
                  <p className={cn(
                    "text-base font-bold opacity-70 transition-colors leading-relaxed",
                    isNight ? "text-white group-active:text-black" : "text-[#1E293B] group-active:text-white"
                  )}>
                    {toEnglishDigits(illness.description)}
                  </p>
                </div>
                <div className={cn(
                  "p-4 rounded-full transition-all shadow-md ml-4 shrink-0",
                  isNight 
                    ? "bg-white/10 group-active:bg-black/20" 
                    : "bg-accent/10 group-active:bg-white/20"
                )}>
                  <ArrowRight className={cn(
                    "w-6 h-6",
                    isNight ? "text-white group-active:text-black" : "text-accent group-active:text-white"
                  )} />
                </div>
              </button>
            ))
          ) : (
            <div className="p-12 text-center rounded-[2.5rem] border border-dashed border-muted-foreground/30 opacity-50">
              {isHindi ? 'जल्द आ रहा है...' : 'Coming soon...'}
            </div>
          )}
        </div>
      ) : !selectedRemedy ? (
        /* Level 2: Remedy List */
        <div className="space-y-4">
          {illnessRemedies.map((remedy) => (
            <button
              key={remedy.id}
              onClick={() => setSelectedRemedy(remedy)}
              className={cn(
                "w-full p-6 rounded-3xl border transition-all duration-200 text-left flex items-center gap-5 group cursor-pointer active:scale-[0.98]",
                isNight 
                  ? "bg-black border-white/20 text-white hover:border-white shadow-none" 
                  : "bg-white border-primary/10 hover:border-primary/30 text-primary shadow-xl"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 shadow-inner",
                isNight ? "bg-white/10 text-white" : "bg-primary/5 text-primary"
              )}>
                {remedy.serialNumber}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[24px] leading-snug">{toEnglishDigits(remedy.name[lang])}</h4>
              </div>
              <BookOpen className="w-6 h-6 opacity-40 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
          {illnessRemedies.length === 0 && (
            <div className="p-12 text-center rounded-[2.5rem] border border-dashed border-muted-foreground/30 opacity-50">
              {isHindi ? 'जल्द आ रहा है...' : 'Coming soon...'}
            </div>
          )}
        </div>
      ) : (
        /* Level 3: Remedy Detail Matrix */
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