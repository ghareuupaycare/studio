'use client';

import React from 'react';
import { Language, Theme } from '@/app/page';
import { cn } from '@/lib/utils';
import { ChevronLeft, Stethoscope, Clock, ShieldCheck } from 'lucide-react';

interface CategoryDetailViewProps {
  categoryId: string;
  lang: Language;
  theme: Theme;
  onBack: () => void;
}

export const CategoryDetailView = ({ categoryId, lang, theme, onBack }: CategoryDetailViewProps) => {
  const isHindi = lang === 'hi';
  const isNight = theme === 'night';

  const content = {
    fever: {
      title: isHindi ? 'मौसमी बुखार एवं फ्लू' : 'Seasonal Fever & Flu',
      sections: [
        {
          id: 'general-fever',
          title: isHindi ? '1. सामान्य बुखार' : '1. General Fever',
          remedies: [
            {
              name: isHindi ? 'तुलसी और काली मिर्च का काढ़ा' : 'Tulsi & Black Pepper Decoction',
              description: isHindi 
                ? 'यह काढ़ा शरीर की रोग प्रतिरोधक क्षमता बढ़ाता है और बुखार को कम करने में मदद करता है।' 
                : 'This decoction boosts immunity and helps in reducing fever naturally.',
              ingredients: isHindi 
                ? ['10-12 तुलसी के पत्ते', '3-4 काली मिर्च', 'एक छोटा टुकड़ा अदरक', '1 गिलास पानी'] 
                : ['10-12 Tulsi leaves', '3-4 Black peppercorns', 'Small piece of ginger', '1 glass water'],
              method: isHindi 
                ? 'पानी में सभी सामग्री डालकर तब तक उबालें जब तक पानी आधा न रह जाए।' 
                : 'Boil all ingredients in water until the quantity reduces to half.',
              usage: isHindi 
                ? 'दिन में 2 बार गुनगुना पिएं।' 
                : 'Drink it lukewarm twice a day.'
            }
          ]
        }
      ]
    }
  };

  const activeCategory = content[categoryId as keyof typeof content];

  if (!activeCategory) return null;

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className={cn(
            "p-3 rounded-full transition-all active:scale-95",
            isNight ? "bg-white text-black hover:bg-white/90" : "bg-[#14532D] text-white hover:bg-[#166534]"
          )}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className={cn(
          "text-3xl font-black font-headline",
          isNight ? "text-white" : "text-[#14532D]"
        )}>
          {activeCategory.title}
        </h2>
      </div>

      {/* Sections Grid */}
      <div className="space-y-12">
        {activeCategory.sections.map((section) => (
          <div key={section.id} className="space-y-6">
            <h3 className={cn(
              "text-2xl font-black border-b-4 pb-2 inline-block",
              isNight ? "text-white border-white" : "text-[#1E293B] border-accent"
            )}>
              {section.title}
            </h3>

            <div className="grid grid-cols-1 gap-6">
              {section.remedies.map((remedy, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "p-8 rounded-[2rem] border-2 shadow-xl space-y-6 transition-all",
                    isNight ? "bg-black border-white text-white" : "bg-white border-primary/5 text-[#1E293B]"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="text-2xl font-black flex items-center gap-3">
                      <Stethoscope className="text-accent" />
                      {remedy.name}
                    </h4>
                  </div>

                  <p className="text-lg leading-relaxed italic opacity-80">
                    {remedy.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-4">
                      <p className="text-xs font-black uppercase tracking-widest text-accent">सामग्री / Ingredients</p>
                      <ul className="space-y-2">
                        {remedy.ingredients.map((ing, i) => (
                          <li key={i} className="flex items-center gap-3 font-bold">
                            <span className="w-2 h-2 rounded-full bg-accent" />
                            {ing}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <p className="text-xs font-black uppercase tracking-widest text-accent flex items-center gap-2">
                          <Clock className="w-4 h-4" /> बनाने की विधि
                        </p>
                        <p className="font-bold leading-relaxed">{remedy.method}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-black uppercase tracking-widest text-accent flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4" /> उपयोग
                        </p>
                        <p className="font-bold leading-relaxed">{remedy.usage}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
