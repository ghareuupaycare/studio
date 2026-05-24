import React, { useState } from 'react';
import { Remedy } from '@/lib/remedy-data';
import { Language, Theme } from '@/app/page';
import { 
  Info, 
  CheckCircle, 
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

  // GLOBAL TYPOGRAPHY REFACTOR & LOCK
  // Section Headings: 16pt / 1.15rem (Bold), Deep high-contrast dark green or crisp white
  const headingClass = cn(
    "text-[1.15rem] font-bold mb-3 flex items-center gap-2",
    isNight ? "text-white" : "text-[#14532D]"
  );

  // Body/Description Text: 12pt / 1.05rem (Medium/Regular), Line Height 1.5
  const bodyTextClass = cn(
    "text-[1.05rem] leading-[1.5] font-medium",
    isNight ? "text-white" : "text-[#2D3748]"
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* 1. EMPTY IMAGE CONTAINER REMOVED AS PER REQUEST */}

      {/* 2. Introduction Section */}
      <div className={cn(
        "p-6 rounded-3xl border transition-colors",
        isNight ? "bg-white/5 border-white/10" : "bg-primary/5 border-primary/10"
      )}>
        <h3 className={headingClass}>
          <Info className="w-5 h-5 shrink-0" /> {isHindi ? 'बीमारी का परिचय' : 'Introduction'}
        </h3>
        <p className={bodyTextClass}>
          {remedy.introduction}
        </p>
      </div>

      {/* 3. Smart Dose Selector Section */}
      <div className={cn(
        "p-6 rounded-[2rem] border overflow-hidden",
        isNight ? "bg-black border-white" : "bg-white border-[#14532D]"
      )}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={headingClass}>{isHindi ? 'स्मार्ट खुराक और मात्रा' : 'Smart Dose'}</h3>
          <Stethoscope className="w-6 h-6 opacity-40 shrink-0" />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {remedy.doses.map((dose) => (
            <button
              key={dose.ageRange}
              onClick={() => setSelectedAgeRange(dose.ageRange)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-bold transition-all border",
                selectedAgeRange === dose.ageRange
                  ? (isNight ? "bg-white text-black" : "bg-accent text-white border-accent shadow-md")
                  : (isNight ? "bg-black text-white border-white/20" : "bg-transparent text-primary border-primary/20")
              )}
            >
              {dose.ageRange}
            </button>
          ))}
        </div>

        <div className={cn(
          "p-5 rounded-2xl flex items-center justify-center text-center",
          isNight ? "bg-white/10" : "bg-accent/10"
        )}>
          <span className={cn(
            "text-[1.15rem] font-bold", // Smart Dosage: 14pt approx 1.15rem
            isNight ? "text-white" : "text-[#14532D]"
          )}>
            {currentDose?.dose}
          </span>
        </div>
      </div>

      {/* 4. Ingredients & Prep Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={cn(
          "p-6 rounded-3xl border",
          isNight ? "bg-black border-white/20" : "bg-[#FDF6E2] border-primary/10"
        )}>
          <h3 className={cn(headingClass, "text-accent")}>{isHindi ? 'आवश्यक सामग्री' : 'Ingredients'}</h3>
          <ul className="space-y-3">
            {remedy.ingredients.map((item, i) => (
              <li key={i} className={cn(bodyTextClass, "flex items-start gap-3")}>
                <CheckCircle className="w-5 h-5 mt-1 text-accent shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={cn(
          "p-6 rounded-3xl border",
          isNight ? "bg-black border-white/20" : "bg-[#FDF6E2] border-primary/10"
        )}>
          <h3 className={cn(headingClass, "text-accent")}>{isHindi ? 'बनाने की विधि' : 'Preparation'}</h3>
          <p className={bodyTextClass}>{remedy.preparation}</p>
        </div>
      </div>

      {/* 5. Usage Section */}
      <div className={cn(
        "p-8 rounded-[2.5rem] border-2 shadow-xl",
        isNight ? "bg-white text-black" : "bg-[#14532D] text-white"
      )}>
        <h3 className={cn("text-xs font-black uppercase tracking-[0.3em] mb-4", isNight ? "text-black" : "text-white")}>
          {isHindi ? 'सेवन विधि' : 'Usage Instructions'}
        </h3>
        <p className="text-[1.15rem] font-bold leading-[1.5]">
          "{remedy.usage}"
        </p>
      </div>

      {/* 6. Diet Plan Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={cn(
          "p-6 rounded-3xl border border-green-500/20 shadow-sm",
          isNight ? "bg-green-500/10" : "bg-green-50"
        )}>
          <h3 className={cn(headingClass, "text-green-700")}>
            <CheckCircle className="w-5 h-5 shrink-0" /> {isHindi ? 'क्या खाएं' : 'What to Eat'}
          </h3>
          <p className={cn(bodyTextClass, "text-green-900 dark:text-green-100")}>{remedy.dietEat}</p>
        </div>
        <div className={cn(
          "p-6 rounded-3xl border border-red-500/20 shadow-sm",
          isNight ? "bg-red-500/10" : "bg-red-50"
        )}>
          <h3 className={cn(headingClass, "text-red-700")}>
            <XCircle className="w-5 h-5 shrink-0" /> {isHindi ? 'क्या न खाएं' : 'What to Avoid'}
          </h3>
          <p className={cn(bodyTextClass, "text-red-900 dark:text-red-100")}>{remedy.dietAvoid}</p>
          <div className="mt-4 pt-4 border-t border-red-200/30">
            <p className="text-[10px] font-black uppercase text-red-600 mb-2">{isHindi ? 'सख्त परहेज़' : 'Strict Avoid'}</p>
            <p className="text-sm font-bold text-red-800 dark:text-red-200">{remedy.strictAvoid}</p>
          </div>
        </div>
      </div>

      {/* 7. Routine Section */}
      <div className={cn(
        "p-8 rounded-[2.5rem] border shadow-md",
        isNight ? "bg-black border-white/20" : "bg-[#FDF6E2] border-primary/10"
      )}>
        <h3 className={headingClass}>
          <Utensils className="w-5 h-5 shrink-0" /> {isHindi ? 'दिनचर्या' : 'Daily Routine'}
        </h3>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="p-3 rounded-full bg-accent/10 text-accent h-fit shrink-0"><Sun className="w-5 h-5" /></div>
            <div>
              <h4 className="text-xs font-black uppercase text-accent mb-1">{isHindi ? 'सुबह' : 'Morning'}</h4>
              <p className={bodyTextClass}>{remedy.routine.morning}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary h-fit shrink-0"><Coffee className="w-5 h-5" /></div>
            <div>
              <h4 className="text-xs font-black uppercase text-primary mb-1">{isHindi ? 'दोपहर' : 'Afternoon'}</h4>
              <p className={bodyTextClass}>{remedy.routine.afternoon}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="p-3 rounded-full bg-slate-400/10 text-slate-500 h-fit shrink-0"><Moon className="w-5 h-5" /></div>
            <div>
              <h4 className="text-xs font-black uppercase text-slate-500 mb-1">{isHindi ? 'शाम/रात' : 'Evening/Night'}</h4>
              <p className={bodyTextClass}>{remedy.routine.evening}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Safety & Disclaimer Section */}
      <div className="space-y-4">
        <div className={cn(
          "p-6 rounded-3xl border border-accent/40 shadow-sm",
          isNight ? "bg-accent/10" : "bg-accent/5"
        )}>
          <h4 className={cn(headingClass, "text-accent mb-3")}>
            <AlertTriangle className="w-5 h-5 shrink-0" /> {isHindi ? 'सुरक्षा सूचना' : 'Safety Info'}
          </h4>
          <p className={cn(
            "text-[1.05rem] leading-[1.5] font-bold",
            isNight ? "text-accent" : "text-[#9B2C2C]"
          )}>
            {remedy.safetyAdvice}
          </p>
        </div>
        
        <div className="text-center px-8">
          <p className={cn(
            "text-[9.5pt] uppercase tracking-widest opacity-60 leading-relaxed font-medium",
            isNight ? "text-white" : "text-primary"
          )}>
            "{remedy.disclaimer}"
          </p>
        </div>
      </div>
    </div>
  );
};