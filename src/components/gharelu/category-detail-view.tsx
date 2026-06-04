
'use client';

import React, { useState, useEffect } from 'react';
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
    } else if (!selectedRemedy && !initialRemedyId) {
       // Only clear if explicitly navigating away from a remedy
    }
  }, [initialRemedyId, categoryId, allRemedies]);

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
        {
          id: 'general-fever',
          title: isHindi ? '1. सामान्य बुखार' : '1. General Fever',
          description: isHindi ? 'हल्के बुखार और शारीरिक थकान के लिए प्राकृतिक उपचार' : 'Natural treatments for mild fever and physical fatigue'
        },
        {
          id: 'common-cold',
          title: isHindi ? '2. नजला और जुकाम' : '2. Cold & Flu',
          description: isHindi ? 'नाक बहना, छींकें और बंद नाक के लिए अचूक घरेलू उपचार' : 'Effective remedies for runny nose, sneezing and congestion'
        },
        {
          id: 'cough',
          title: isHindi ? '3. सूखी एवं बलगम वाली खांसी' : '3. Dry and Productive Cough',
          description: isHindi ? 'हर तरह की सूखी खांसी, बलगम और छाती में जकड़न से राहत के लिए अचूक घरेलू उपचार' : 'Effective remedies for dry cough, phlegm and chest congestion'
        }
      ]
    },
    live: {
      title: isHindi ? 'नवीनतम नुस्खे' : 'Latest Remedies',
      illnesses: [
        {
          id: 'live',
          title: isHindi ? 'हाल ही में जोड़े गए' : 'Recently Added',
          description: isHindi ? 'वैद्य जी द्वारा प्रमाणित नए पारंपरिक नुस्खे' : 'New traditional remedies certified by Vaidya Ji'
        }
      ]
    }
  };

  const activeCategory = categoryContent[categoryId as keyof typeof categoryContent];
  const illnessRemedies = allRemedies.filter(r => r.illnessId === selectedIllnessId);

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
            "font-black font-headline leading-tight tracking-wide text-2xl sm:text-3xl",
            isNight ? "text-white" : "text-[#14532D]"
          )}>
            {toEnglishDigits(selectedRemedy ? selectedRemedy.name[lang] : (selectedIllnessId ? (currentIllness?.title || '') : activeCategory.title))}
          </h2>
          {(selectedIllnessId || selectedRemedy) && (
            <span className={cn(
              "text-[12px] font-bold uppercase tracking-[0.2em] opacity-60 mt-1",
              isNight ? "text-white" : "text-[#14532D]"
            )}>
              {selectedRemedy ? (isHindi ? 'नुस्खा विवरण' : 'Remedy Detail') : activeCategory.title}
            </span>
          )}
        </div>
      </div>

      {!selectedIllnessId ? (
        <div className="grid grid-cols-1 gap-6">
          {activeCategory.illnesses.map((illness) => (
            <button
              key={illness.id}
              onClick={() => setSelectedIllnessId(illness.id)}
              className={cn(
                "group relative w-full p-8 rounded-[2.5rem] border transition-all duration-300 text-left cursor-pointer shadow-xl",
                isNight 
                  ? "bg-black border-white text-white active:bg-white active:text-black" 
                  : "bg-white border-primary/10 hover:border-accent/40 text-[#1E293B] active:bg-[#B45309] active:text-[#FDFBF7]"
              )}
            >
              <div className="space-y-2">
                <h3 className="text-[24px] font-black leading-tight">{toEnglishDigits(illness.title)}</h3>
                <p className="text-base font-bold opacity-70 leading-relaxed">{toEnglishDigits(illness.description)}</p>
              </div>
              <div className="p-4 rounded-full bg-accent/10 ml-4 shrink-0 shadow-md">
                <ArrowRight className="w-6 h-6 text-accent group-active:text-white" />
              </div>
            </button>
          ))}
        </div>
      ) : !selectedRemedy ? (
        <div className="space-y-4">
          {illnessRemedies.map((remedy) => (
            <button
              key={remedy.id}
              onClick={() => {
                setSelectedRemedy(remedy);
                if (onSelectRemedyId) onSelectRemedyId(remedy.id);
              }}
              className={cn(
                "w-full p-6 rounded-3xl border transition-all duration-200 text-left flex items-center gap-5 group cursor-pointer active:scale-[0.98] shadow-xl",
                isNight 
                  ? "bg-black border-white/20 text-white hover:border-white" 
                  : "bg-white border-primary/10 hover:border-primary/30 text-primary"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 shadow-inner",
                isNight ? "bg-white/10 text-white" : "bg-primary/5 text-primary"
              )}>
                {toEnglishDigits(remedy.serialNumber)}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[22px] leading-snug">{toEnglishDigits(remedy.name[lang])}</h4>
              </div>
              <BookOpen className="w-6 h-6 opacity-40 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
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
