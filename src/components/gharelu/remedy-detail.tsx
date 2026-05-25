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
  Stethoscope,
  Heart,
  Share2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface RemedyDetailProps {
  remedy: Remedy;
  theme: Theme;
  lang: Language;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export const RemedyDetail = ({ remedy, theme, lang, isFavorite, onToggleFavorite }: RemedyDetailProps) => {
  const [selectedAgeRangeKey, setSelectedAgeRangeKey] = useState(remedy.doses[1].ageRange.hi);
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';
  const { toast } = useToast();

  const currentDose = remedy.doses.find(d => d.ageRange.hi === selectedAgeRangeKey);

  // SECTION HEADINGS: 18pt, Bold, 1.4x leading
  const headingClass = cn(
    "text-[18px] font-bold mb-4 flex items-center gap-3 leading-[1.4]",
    isNight ? "text-white" : "text-[#14532D]"
  );

  // BODY TEXT & PARAGRAPHS: 16pt, Medium, 1.4x leading
  const bodyTextClass = cn(
    "text-[16px] leading-[1.4] font-medium",
    isNight ? "text-[#E5E7EB]" : "text-[#2D3748]"
  );

  // BULLET POINTS & GRID TEXT: 15pt, Medium, 1.4x leading
  const listTextClass = cn(
    "text-[15px] leading-[1.4] font-medium",
    isNight ? "text-[#E5E7EB]" : "text-[#2D3748]"
  );

  const handleShare = async () => {
    if (typeof navigator === 'undefined' || !navigator.share) {
      toast({
        title: isHindi ? 'साझेदारी समर्थित नहीं है' : 'Sharing Not Supported',
        description: isHindi 
          ? 'आपका ब्राउज़र सीधे मोबाइल ऐप्स के साथ साझा करने का समर्थन नहीं करता है।' 
          : 'Your browser does not support direct sharing with mobile apps.',
        variant: "destructive"
      });
      return;
    }

    const title = remedy.name[lang];
    const ingredients = remedy.ingredients[lang].join(', ');
    const prep = remedy.preparation[lang];
    
    const shareText = isHindi 
      ? `*घरेलू उपाय केयर - पसंदीदा नुस्खा*\n🌿 *${title}*\n\n📦 *आवश्यक सामग्री:*\n${ingredients}\n\n🥣 *बनाने की विधि:*\n${prep}\n\n📌 *पूरा विवरण देखने के लिए हमारी ऐप पर आएं!*`
      : `*Gharelu Upay Care - Favorite Remedy*\n🌿 *${title}*\n\n📦 *Ingredients:*\n${ingredients}\n\n🥣 *Preparation:*\n${prep}\n\n📌 *Visit our app for full details!*`;

    try {
      await navigator.share({
        title: title,
        text: shareText,
      });
    } catch (error) {
      if ((error as any).name !== 'AbortError') {
        toast({
          title: isHindi ? 'साझा करने में त्रुटि' : 'Sharing Error',
          description: isHindi ? 'साझाकरण पैनल खोलने में समस्या आई।' : 'Could not open the sharing panel.',
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-24 relative overflow-y-auto">
      {/* 1. Header with Favorite Button */}
      <div className="flex items-center justify-between mb-2">
        <div className={cn(
          "px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-widest",
          remedy.severity === 'mild' ? "bg-green-500/10 text-green-600" :
          remedy.severity === 'moderate' ? "bg-yellow-500/10 text-yellow-600" :
          "bg-red-500/10 text-red-600"
        )}>
          {remedy.severityLabel[lang]}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleFavorite}
          className={cn(
            "rounded-full transition-all active:scale-90 h-12 w-12",
            isFavorite ? "text-accent fill-accent" : "text-muted-foreground"
          )}
        >
          <Heart className={cn("w-7 h-7", isFavorite && "fill-current")} />
        </Button>
      </div>

      {/* 2. Introduction Section */}
      <div className={cn(
        "p-8 rounded-[2rem] border transition-colors shadow-sm",
        isNight ? "bg-white/5 border-white/10" : "bg-primary/5 border-primary/10"
      )}>
        <h3 className={headingClass}>
          <Info className="w-6 h-6 shrink-0" /> {isHindi ? 'बीमारी का परिचय' : 'Introduction'}
        </h3>
        <p className={bodyTextClass}>
          {remedy.introduction[lang]}
        </p>
      </div>

      {/* 3. Smart Dose Selector Section */}
      <div className={cn(
        "p-8 rounded-[2rem] border overflow-hidden shadow-sm",
        isNight ? "bg-black border-white" : "bg-white border-[#14532D]"
      )}>
        <div className="flex items-center justify-between mb-8">
          <h3 className={headingClass}>{isHindi ? 'स्मार्ट खुराक और मात्रा' : 'Smart Dose'}</h3>
          <Stethoscope className="w-7 h-7 opacity-40 shrink-0" />
        </div>
        
        <div className="flex flex-wrap gap-3 mb-8">
          {remedy.doses.map((dose) => (
            <button
              key={dose.ageRange.hi}
              onClick={() => setSelectedAgeRangeKey(dose.ageRange.hi)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-[15px] font-bold transition-all border",
                selectedAgeRangeKey === dose.ageRange.hi
                  ? (isNight ? "bg-white text-black" : "bg-accent text-white border-accent shadow-md")
                  : (isNight ? "bg-black text-white border-white/20" : "bg-transparent text-primary border-primary/20")
              )}
            >
              {dose.ageRange[lang]}
            </button>
          ))}
        </div>

        <div className={cn(
          "p-6 rounded-2xl flex items-center justify-center text-center",
          isNight ? "bg-white/10" : "bg-accent/10"
        )}>
          <span className={cn(
            "text-[18px] font-bold leading-[1.4]",
            isNight ? "text-white" : "text-[#14532D]"
          )}>
            {currentDose?.dose[lang]}
          </span>
        </div>
      </div>

      {/* 4. Ingredients & Prep Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={cn(
          "p-8 rounded-[2rem] border shadow-sm",
          isNight ? "bg-black border-white/20" : "bg-[#FDF6E2] border-primary/10"
        )}>
          <h3 className={cn(headingClass, "text-accent")}>{isHindi ? 'आवश्यक सामग्री' : 'Ingredients'}</h3>
          <ul className="space-y-4">
            {remedy.ingredients[lang].map((item, i) => (
              <li key={i} className={cn(listTextClass, "flex items-start gap-3")}>
                <CheckCircle className="w-5 h-5 mt-1 text-accent shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={cn(
          "p-8 rounded-[2rem] border shadow-sm",
          isNight ? "bg-black border-white/20" : "bg-[#FDF6E2] border-primary/10"
        )}>
          <h3 className={cn(headingClass, "text-accent")}>{isHindi ? 'बनाने की विधि' : 'Preparation'}</h3>
          <p className={bodyTextClass}>{remedy.preparation[lang]}</p>
        </div>
      </div>

      {/* 5. Usage Section */}
      <div className={cn(
        "p-10 rounded-[2.5rem] border-2 shadow-xl transition-all duration-500",
        isNight 
          ? "bg-zinc-950 border-white/20" 
          : "bg-[#14532D] border-[#14532D]"
      )}>
        <h3 className={cn(
          "text-[12px] font-black uppercase tracking-[0.3em] mb-6",
          isNight ? "text-[#FBBF24]" : "text-white/80"
        )}>
          {isHindi ? 'सेवन विधि' : 'Usage Instructions'}
        </h3>
        <p className={cn(
          "text-[18px] font-bold leading-[1.5] transition-colors",
          "text-white"
        )}>
          "{remedy.usage[lang]}"
        </p>
      </div>

      {/* 6. Diet Plan Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={cn(
          "p-8 rounded-[2rem] border border-green-500/20 shadow-sm transition-colors duration-500",
          isNight ? "bg-green-950/50 border-green-500/30" : "bg-green-50"
        )}>
          <h3 className={headingClass}>
            <CheckCircle className={cn("w-6 h-6 shrink-0", isNight ? "text-[#A7F3D0]" : "text-green-700")} /> 
            <span className={isNight ? "text-[#A7F3D0]" : "text-green-700"}>{isHindi ? 'क्या खाएं' : 'What to Eat'}</span>
          </h3>
          <p className={cn(
            "text-[16px] leading-[1.4] font-medium transition-colors",
            isNight ? "text-[#A7F3D0]" : "text-green-900"
          )}>
            {remedy.dietEat[lang]}
          </p>
        </div>
        <div className={cn(
          "p-8 rounded-[2rem] border border-red-500/20 shadow-sm transition-colors duration-500",
          isNight ? "bg-red-950/50 border-red-500/30" : "bg-red-50"
        )}>
          <h3 className={headingClass}>
            <XCircle className={cn("w-6 h-6 shrink-0", isNight ? "text-[#FECDD3]" : "text-red-700")} />
            <span className={isNight ? "text-[#FECDD3]" : "text-red-700"}>{isHindi ? 'क्या न खाएं' : 'What to Avoid'}</span>
          </h3>
          <p className={cn(
            "text-[16px] leading-[1.4] font-medium transition-colors",
            isNight ? "text-[#FECDD3]" : "text-red-900"
          )}>
            {remedy.dietAvoid[lang]}
          </p>
          <div className={cn(
            "mt-6 pt-6 border-t",
            isNight ? "border-red-500/20" : "border-red-200/30"
          )}>
            <p className={cn(
              "text-[12px] font-black uppercase mb-3",
              isNight ? "text-[#FEF08A]" : "text-red-600"
            )}>
              {isHindi ? 'सख्त परहेज़' : 'Strict Avoid'}
            </p>
            <p className={cn(
              "text-[15px] font-bold leading-[1.4] transition-colors",
              isNight ? "text-[#FECDD3]" : "text-red-800"
            )}>
              {remedy.strictAvoid[lang]}
            </p>
          </div>
        </div>
      </div>

      {/* 7. Routine Section */}
      <div className={cn(
        "p-10 rounded-[2.5rem] border shadow-md",
        isNight ? "bg-black border-white/20" : "bg-[#FDF6E2] border-primary/10"
      )}>
        <h3 className={headingClass}>
          <Utensils className="w-6 h-6 shrink-0" /> {isHindi ? 'दिनचर्या' : 'Daily Routine'}
        </h3>
        <div className="space-y-8">
          <div className="flex gap-5">
            <div className="p-4 rounded-full bg-accent/10 text-accent h-fit shrink-0"><Sun className="w-6 h-6" /></div>
            <div>
              <h4 className="text-[12px] font-black uppercase text-accent mb-2">{isHindi ? 'सुबह' : 'Morning'}</h4>
              <p className={bodyTextClass}>{remedy.routine.morning[lang]}</p>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="p-4 rounded-full bg-primary/10 text-primary h-fit shrink-0"><Coffee className="w-6 h-6" /></div>
            <div>
              <h4 className="text-[12px] font-black uppercase text-primary mb-2">{isHindi ? 'दोपहर' : 'Afternoon'}</h4>
              <p className={bodyTextClass}>{remedy.routine.afternoon[lang]}</p>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="p-4 rounded-full bg-slate-400/10 text-slate-500 h-fit shrink-0"><Moon className="w-6 h-6" /></div>
            <div>
              <h4 className="text-[12px] font-black uppercase text-slate-500 mb-2">{isHindi ? 'शाम/रात' : 'Evening/Night'}</h4>
              <p className={bodyTextClass}>{remedy.routine.evening[lang]}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Safety & Disclaimer Section */}
      <div className="space-y-6">
        <div className={cn(
          "p-8 rounded-[2.5rem] border border-accent/40 shadow-sm",
          isNight ? "bg-accent/10" : "bg-accent/5"
        )}>
          <h4 className={headingClass}>
            <AlertTriangle className="w-6 h-6 shrink-0 text-accent" /> 
            <span className={cn("font-bold", isNight ? "text-accent" : "text-[#9B2C2C]")}>{isHindi ? 'सुरक्षा सूचना' : 'Safety Info'}</span>
          </h4>
          <p className={cn(
            "text-[16px] leading-[1.5] font-bold",
            isNight ? "text-accent brightness-110" : "text-[#9B2C2C]"
          )}>
            {remedy.safetyAdvice[lang]}
          </p>
          <p className={cn(
            "text-[12px] uppercase tracking-widest opacity-60 leading-[1.4] font-medium mt-6 border-t border-accent/20 pt-6 italic",
            isNight ? "text-white" : "text-primary"
          )}>
            "{remedy.disclaimer[lang]}"
          </p>
        </div>
      </div>

      {/* 9. Native Share Button */}
      <div className="pt-6 pb-12 flex justify-center">
        <Button
          onClick={handleShare}
          className={cn(
            "w-full max-w-sm h-16 rounded-[1.5rem] flex items-center justify-center gap-4 font-black uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl text-[16px]",
            isNight ? "bg-white text-black hover:bg-white/90" : "bg-accent text-white hover:bg-accent/90"
          )}
        >
          <Share2 className="w-6 h-6" />
          {isHindi ? 'नुस्खा शेयर करें' : 'Share Remedy'}
        </Button>
      </div>
    </div>
  );
};