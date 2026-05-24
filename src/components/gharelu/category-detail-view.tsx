
'use client';

import React, { useState } from 'react';
import { Language, Theme } from '@/app/page';
import { cn } from '@/lib/utils';
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
}

export const CategoryDetailView = ({ 
  categoryId, 
  lang, 
  theme, 
  onBack, 
  favorites, 
  onToggleFavorite,
  initialRemedyId
}: CategoryDetailViewProps) => {
  const [selectedIllnessId, setSelectedIllnessId] = useState<string | null>(() => {
    if (initialRemedyId) {
      const remedy = REMEDIES.find(r => r.id === initialRemedyId);
      return remedy ? remedy.illnessId : null;
    }
    return null;
  });
  
  const [selectedRemedy, setSelectedRemedy] = useState<Remedy | null>(() => {
    if (initialRemedyId) {
      return REMEDIES.find(r => r.id === initialRemedyId) || null;
    }
    return null;
  });
  
  const isHindi = lang === 'hi';
  const isNight = theme === 'night';

  const categoryContent = {
    fever: {
      title: isHindi ? 'मौसमी बुखार एवं फ्लू' : 'Seasonal Fever & Flu',
      illnesses: [
        {
          id: 'general-fever',
          title: isHindi ? '१. सामान्य बुखार' : '1. General Fever',
          description: isHindi 
            ? 'हल्के बुखार और शारीरिक थकान के लिए प्राकृतिक उपचार' 
            : 'Natural treatments for mild fever and physical fatigue'
        }
      ]
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
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 pb-32">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={handleInternalBack}
          className={cn(
            "p-3 rounded-full transition-all active:scale-95",
            isNight ? "bg-white text-black hover:bg-white/90" : "bg-[#14532D] text-white hover:bg-[#166534]"
          )}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex flex-col">
          <h2 className={cn(
            "text-2xl sm:text-3xl font-black font-headline leading-tight",
            isNight ? "text-white" : "text-[#14532D]"
          )}>
            {selectedRemedy ? selectedRemedy.name[lang] : (selectedIllnessId ? currentIllness?.title : activeCategory.title)}
          </h2>
          {(selectedIllnessId || selectedRemedy) && (
            <span className={cn(
              "text-xs font-bold uppercase tracking-widest opacity-60",
              isNight ? "text-white" : "text-[#14532D]"
            )}>
              {selectedRemedy ? (isHindi ? 'नुस्खा विवरण' : 'Remedy Detail') : activeCategory.title}
            </span>
          )}
        </div>
      </div>

      {!selectedIllnessId ? (
        /* Level 1: List of Illnesses */
        <div className="grid grid-cols-1 gap-4">
          {activeCategory.illnesses.map((illness) => (
            <button
              key={illness.id}
              onClick={() => setSelectedIllnessId(illness.id)}
              className={cn(
                "group relative w-full p-8 rounded-[2rem] border transition-all duration-300 text-left",
                "flex items-center justify-between shadow-xl hover:-translate-y-1 active:scale-[0.98]",
                isNight 
                  ? "bg-black border-white text-white active:bg-white active:text-black" 
                  : "bg-[#FDF6E2] border-primary/10 hover:border-accent/40 text-[#1E293B] active:bg-[#B45309] active:text-[#FDFBF7]"
              )}
            >
              <div className="space-y-2">
                <h3 className={cn(
                  "text-2xl font-black transition-colors leading-tight",
                  isNight ? "text-white group-active:text-black" : "text-[#1E293B] group-active:text-white"
                )}>
                  {illness.title}
                </h3>
                <p className={cn(
                  "text-sm font-bold opacity-70 transition-colors",
                  isNight ? "text-white group-active:text-black" : "text-[#1E293B] group-active:text-white"
                )}>
                  {illness.description}
                </p>
              </div>
              <div className={cn(
                "p-4 rounded-full transition-all",
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
          ))}
        </div>
      ) : !selectedRemedy ? (
        /* Level 2: Remedy List */
        <div className="space-y-4">
          {illnessRemedies.map((remedy) => (
            <button
              key={remedy.id}
              onClick={() => setSelectedRemedy(remedy)}
              className={cn(
                "w-full p-6 rounded-2xl border transition-all duration-200 text-left flex items-center gap-4 group",
                isNight 
                  ? "bg-black border-white/20 text-white hover:border-white" 
                  : "bg-white border-primary/10 hover:border-primary/30 text-primary shadow-md"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shrink-0",
                isNight ? "bg-white/10 text-white" : "bg-primary/5 text-primary"
              )}>
                {remedy.serialNumber}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg leading-snug">{remedy.name[lang]}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                    remedy.severity === 'mild' ? "bg-green-500/10 text-green-600" :
                    remedy.severity === 'moderate' ? "bg-yellow-500/10 text-yellow-600" :
                    "bg-red-500/10 text-red-600"
                  )}>
                    {remedy.severityLabel[lang]}
                  </span>
                </div>
              </div>
              <BookOpen className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
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
