'use client';

import React, { useState } from 'react';
import { Language, Theme } from '@/app/page';
import { cn } from '@/lib/utils';
import { ChevronLeft, Stethoscope, ArrowRight } from 'lucide-react';

interface CategoryDetailViewProps {
  categoryId: string;
  lang: Language;
  theme: Theme;
  onBack: () => void;
}

export const CategoryDetailView = ({ categoryId, lang, theme, onBack }: CategoryDetailViewProps) => {
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | null>(null);
  
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

  if (!activeCategory) return null;

  // Function to handle back button logic
  const handleInternalBack = () => {
    if (selectedSubCategoryId) {
      setSelectedSubCategoryId(null);
    } else {
      onBack();
    }
  };

  const selectedSubCategory = activeCategory.illnesses.find(i => i.id === selectedSubCategoryId);

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      {/* Header with Back Button */}
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
            {selectedSubCategoryId ? selectedSubCategory?.title : activeCategory.title}
          </h2>
          {selectedSubCategoryId && (
            <span className={cn(
              "text-xs font-bold uppercase tracking-widest opacity-60",
              isNight ? "text-white" : "text-[#14532D]"
            )}>
              {activeCategory.title}
            </span>
          )}
        </div>
      </div>

      {!selectedSubCategoryId ? (
        /* Level 1: List of Illnesses */
        <div className="grid grid-cols-1 gap-4">
          {activeCategory.illnesses.map((illness) => (
            <button
              key={illness.id}
              onClick={() => setSelectedSubCategoryId(illness.id)}
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
      ) : (
        /* Level 2: Remedy List Placeholder */
        <div className="space-y-6">
          <div className={cn(
            "p-10 rounded-[2.5rem] border-2 border-dashed flex flex-col items-center justify-center text-center space-y-4",
            isNight ? "border-white/20 text-white/40" : "border-primary/10 text-[#1E293B]/40"
          )}>
            <Stethoscope className="w-12 h-12 opacity-20" />
            <p className="font-bold text-lg">
              {isHindi 
                ? 'इस श्रेणी के लिए नुस्खे जल्द ही जोड़े जाएंगे।' 
                : 'Remedies for this category will be added soon.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
