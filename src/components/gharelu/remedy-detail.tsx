import React, { useState } from 'react';
import { Remedy } from '@/lib/remedy-data';
import { Language, Theme } from '@/app/page';
import Image from 'next/image';
import { 
  ShieldAlert, 
  Info, 
  Clock, 
  CheckCircle, 
  Flame, 
  XCircle, 
  Utensils, 
  Sun, 
  Moon, 
  Coffee, 
  AlertTriangle,
  Stethoscope
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RemedyDetailProps {
  remedy: Remedy;
  theme: Theme;
  lang: Language;
}

export const RemedyDetail = ({ remedy, theme, lang }: RemedyDetailProps) => {
  const [selectedAgeRange, setSelectedAgeRange] = useState(remedy.doses[1].ageRange);
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';

  const currentDose = remedy.doses.find(d => d.ageRange === selectedAgeRange);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Image */}
      <div className="relative h-64 w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/10">
        <Image 
          src={remedy.image} 
          alt={remedy.name}
          fill
          className="object-cover"
          data-ai-hint="ayurvedic herbs"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(
              "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/20 backdrop-blur-md",
              remedy.severity === 'mild' ? "bg-green-500/40" :
              remedy.severity === 'moderate' ? "bg-yellow-500/40" :
              "bg-red-500/40"
            )}>
              {remedy.severityLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className={cn(
        "p-6 rounded-3xl border transition-colors",
        isNight ? "bg-white/5 border-white/10" : "bg-primary/5 border-primary/10"
      )}>
        <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
          <Info className="w-4 h-4" /> {isHindi ? 'बीमारी का परिचय' : 'Introduction'}
        </h3>
        <p className="text-sm leading-relaxed opacity-80 italic">
          {remedy.introduction}
        </p>
      </div>

      {/* Smart Dose Selector */}
      <div className={cn(
        "p-6 rounded-[2rem] border overflow-hidden",
        isNight ? "bg-black border-white" : "bg-white border-[#14532D]"
      )}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-black font-headline">{isHindi ? 'स्मार्ट खुराक और मात्रा' : 'Smart Dose'}</h3>
          <Stethoscope className="w-6 h-6 opacity-40" />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {remedy.doses.map((dose) => (
            <button
              key={dose.ageRange}
              onClick={() => setSelectedAgeRange(dose.ageRange)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                selectedAgeRange === dose.ageRange
                  ? (isNight ? "bg-white text-black" : "bg-accent text-white border-accent")
                  : (isNight ? "bg-black text-white border-white/20" : "bg-transparent text-primary border-primary/20")
              )}
            >
              {dose.ageRange}
            </button>
          ))}
        </div>

        <div className={cn(
          "p-4 rounded-2xl flex items-center justify-center text-center",
          isNight ? "bg-white/10" : "bg-accent/10"
        )}>
          <span className="text-xl font-black font-headline">
            {currentDose?.dose}
          </span>
        </div>
      </div>

      {/* Ingredients & Prep */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={cn(
          "p-6 rounded-3xl border",
          isNight ? "bg-black border-white/20" : "bg-[#FDF6E2] border-primary/10"
        )}>
          <h3 className="text-xs font-black uppercase tracking-widest mb-4 text-accent">{isHindi ? 'आवश्यक सामग्री' : 'Ingredients'}</h3>
          <ul className="space-y-3">
            {remedy.ingredients.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm font-bold">
                <CheckCircle className="w-4 h-4 mt-0.5 text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className={cn(
          "p-6 rounded-3xl border",
          isNight ? "bg-black border-white/20" : "bg-[#FDF6E2] border-primary/10"
        )}>
          <h3 className="text-xs font-black uppercase tracking-widest mb-4 text-accent">{isHindi ? 'बनाने की विधि' : 'Preparation'}</h3>
          <p className="text-sm leading-relaxed">{remedy.preparation}</p>
        </div>
      </div>

      {/* Usage */}
      <div className={cn(
        "p-8 rounded-[2.5rem] border-2",
        isNight ? "bg-white text-black" : "bg-[#14532D] text-white"
      )}>
        <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-70">{isHindi ? 'सेवन विधि' : 'Usage Instructions'}</h3>
        <p className="text-lg font-black leading-relaxed italic">
          "{remedy.usage}"
        </p>
      </div>

      {/* Diet Plan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={cn(
          "p-6 rounded-3xl border border-green-500/20",
          isNight ? "bg-green-500/5" : "bg-green-50"
        )}>
          <h3 className="text-xs font-black uppercase tracking-widest mb-4 text-green-700 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> {isHindi ? 'क्या खाएं' : 'What to Eat'}
          </h3>
          <p className="text-sm leading-relaxed text-green-900">{remedy.dietEat}</p>
        </div>
        <div className={cn(
          "p-6 rounded-3xl border border-red-500/20",
          isNight ? "bg-red-500/5" : "bg-red-50"
        )}>
          <h3 className="text-xs font-black uppercase tracking-widest mb-4 text-red-700 flex items-center gap-2">
            <XCircle className="w-4 h-4" /> {isHindi ? 'क्या न खाएं' : 'What to Avoid'}
          </h3>
          <p className="text-sm leading-relaxed text-red-900">{remedy.dietAvoid}</p>
          <div className="mt-4 pt-4 border-t border-red-200">
            <p className="text-[10px] font-black uppercase text-red-600 mb-1">{isHindi ? 'सख्त परहेज़' : 'Strict Avoid'}</p>
            <p className="text-xs text-red-800">{remedy.strictAvoid}</p>
          </div>
        </div>
      </div>

      {/* Routine */}
      <div className={cn(
        "p-8 rounded-[2.5rem] border",
        isNight ? "bg-black border-white/20" : "bg-[#FDF6E2] border-primary/10"
      )}>
        <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
          <Utensils className="w-5 h-5" /> {isHindi ? 'दिनचर्या' : 'Daily Routine'}
        </h3>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="p-3 rounded-full bg-accent/10 text-accent h-fit"><Sun className="w-5 h-5" /></div>
            <div>
              <h4 className="text-xs font-black uppercase text-accent mb-1">{isHindi ? 'सुबह' : 'Morning'}</h4>
              <p className="text-sm leading-relaxed">{remedy.routine.morning}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary h-fit"><Coffee className="w-5 h-5" /></div>
            <div>
              <h4 className="text-xs font-black uppercase text-primary mb-1">{isHindi ? 'दोपहर' : 'Afternoon'}</h4>
              <p className="text-sm leading-relaxed">{remedy.routine.afternoon}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="p-3 rounded-full bg-slate-400/10 text-slate-500 h-fit"><Moon className="w-5 h-5" /></div>
            <div>
              <h4 className="text-xs font-black uppercase text-slate-500 mb-1">{isHindi ? 'शाम/रात' : 'Evening/Night'}</h4>
              <p className="text-sm leading-relaxed">{remedy.routine.evening}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Safety & Disclaimer */}
      <div className="space-y-4">
        <div className={cn(
          "p-6 rounded-3xl border border-accent",
          isNight ? "bg-accent/10" : "bg-accent/5"
        )}>
          <h4 className="text-xs font-black uppercase tracking-widest text-accent flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4" /> {isHindi ? 'सुरक्षा सूचना' : 'Safety Info'}
          </h4>
          <p className="text-sm font-bold text-accent-foreground leading-relaxed">
            {remedy.safetyAdvice}
          </p>
        </div>
        
        <p className={cn(
          "text-[10px] text-center uppercase tracking-widest opacity-40 px-8",
          isNight ? "text-white" : "text-primary"
        )}>
          "{remedy.disclaimer}"
        </p>
      </div>
    </div>
  );
};
