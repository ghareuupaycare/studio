
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
  Share2,
  Copy
} from 'lucide-react';
import { cn, toEnglishDigits } from '@/lib/utils';
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

  const headingClass = cn(
    "text-xl font-bold mb-3 flex items-center gap-3 leading-[1.6]",
    isNight ? "text-white" : "text-[#14532D]"
  );

  const bodyTextClass = cn(
    "text-lg leading-loose font-medium",
    isNight ? "text-[#E5E7EB]" : "text-[#1E293B]"
  );

  const listTextClass = cn(
    "text-lg leading-relaxed font-medium",
    isNight ? "text-[#E5E7EB]" : "text-[#1E293B]"
  );

  const getPromoFooter = () => {
    const baseUrl = "https://ghareluupaycare.app";
    const deepLink = `${baseUrl}/remedy/${remedy.id}`;
    
    if (isHindi) {
      return `\n\n📄 पूरा नुस्खा, उचित खुराक और परहेज़ देखने के लिए हमारी साइट पर जाएँ:\n👉 ${deepLink}`;
    }
    return `\n\n📄 To view the full remedy, dosage, and precautions, visit our site:\n👉 ${deepLink}`;
  };

  const handleShare = async () => {
    if (typeof navigator === 'undefined' || !navigator.share) {
      handleCopy();
      return;
    }

    const title = toEnglishDigits(remedy.name[lang]);
    const ingredients = remedy.ingredients[lang].map(toEnglishDigits).join(', ');
    const prep = toEnglishDigits(remedy.preparation[lang]);
    
    const shareText = (isHindi 
      ? `*घरेलू उपाय केयर*\n🌿 *${title}*\n\n📦 *आवश्यक सामग्री:*\n${ingredients}\n\n🥣 *बनाने की विधि:*\n${prep}`
      : `*Gharelu Upay Care*\n🌿 *${title}*\n\n📦 *Ingredients:*\n${ingredients}\n\n🥣 *Preparation:*\n${prep}`) + getPromoFooter();

    try {
      await navigator.share({
        title: title,
        text: shareText,
      });
    } catch (error) {
      if ((error as any).name !== 'AbortError') {
        console.error("Sharing failed", error);
      }
    }
  };

  const handleCopy = async () => {
    const title = toEnglishDigits(remedy.name[lang]);
    const ingredients = remedy.ingredients[lang].map(toEnglishDigits).join(', ');
    const prep = toEnglishDigits(remedy.preparation[lang]);

    const textToCopy = (isHindi
      ? `🌿 ${title}\n\n📦 आवश्यक सामग्री:\n${ingredients}\n\n🥣 बनाने की विधि:\n${prep}`
      : `🌿 ${title}\n\n📦 Required Ingredients:\n${ingredients}\n\n🥣 Preparation:\n${prep}`) + getPromoFooter();

    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({
        description: isHindi ? "नुस्खा सफलतापूर्वक कॉपी हो गया है!" : "Remedy copied successfully!",
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-24 relative overflow-y-auto h-auto">
      <div className="flex items-center justify-between mb-4">
        <div className={cn(
          "px-5 py-2 rounded-full text-sm font-black uppercase tracking-widest",
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
            "rounded-full transition-all active:scale-90 h-14 w-14",
            isFavorite ? "text-accent fill-accent" : "text-muted-foreground"
          )}
        >
          <Heart className={cn("w-8 h-8", isFavorite && "fill-current")} />
        </Button>
      </div>

      {/* Title */}
      <h2 className={cn(
        "text-3xl font-black tracking-wide leading-tight mb-8",
        isNight ? "text-white" : "text-[#14532D]"
      )}>
        {toEnglishDigits(remedy.name[lang])}
      </h2>

      <div className={cn(
        "p-8 rounded-[2.5rem] border transition-colors shadow-sm",
        isNight ? "bg-white/5 border-white/10" : "bg-primary/5 border-primary/10"
      )}>
        <h3 className={headingClass}>
          <Info className="w-8 h-8 shrink-0" /> {isHindi ? 'बीमारी का परिचय' : 'Introduction'}
        </h3>
        <p className={bodyTextClass}>
          {remedy.introduction[lang]}
        </p>
      </div>

      <div className={cn(
        "p-8 rounded-[2.5rem] border overflow-hidden shadow-sm",
        isNight ? "bg-black border-white" : "bg-white border-[#14532D]"
      )}>
        <div className="flex flex-col mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className={headingClass}>{isHindi ? 'स्मार्ट खुराक और मात्रा' : 'Smart Dose'}</h3>
            <Stethoscope className="w-8 h-8 opacity-40 shrink-0" />
          </div>
          <p className={cn(
            "text-base font-bold opacity-80 leading-relaxed mb-4",
            isNight ? "text-white/80" : "text-primary/70"
          )}>
            {isHindi 
              ? 'उपरोक्त कुल सामग्री में से अपनी उम्र के अनुसार केवल नीचे चुनी गई खुराक ही लें:' 
              : 'From the total ingredients above, consume only the specific dosage selected for your age below:'}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-8">
          {remedy.doses.map((dose) => (
            <button
              key={dose.ageRange.hi}
              onClick={() => setSelectedAgeRangeKey(dose.ageRange.hi)}
              className={cn(
                "px-6 py-3 rounded-2xl text-lg font-bold transition-all border",
                selectedAgeRangeKey === dose.ageRange.hi
                  ? (isNight ? "bg-white text-black" : "bg-accent text-white border-accent shadow-md")
                  : (isNight ? "bg-black text-white border-white/20" : "bg-transparent text-primary border-primary/20")
              )}
            >
              {toEnglishDigits(dose.ageRange[lang])}
            </button>
          ))}
        </div>

        <div className={cn(
          "p-8 rounded-3xl flex items-center justify-center text-center",
          isNight ? "bg-white/10" : "bg-accent/10"
        )}>
          <span className={cn(
            "text-lg font-semibold leading-loose",
            isNight ? "text-white" : "text-[#14532D]"
          )}>
            {toEnglishDigits(currentDose?.dose[lang] || '')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={cn(
          "p-8 rounded-[2.5rem] border shadow-sm",
          isNight ? "bg-black border-white/20" : "bg-[#FDF6E2] border-primary/10"
        )}>
          <h3 className={cn(headingClass, "text-accent")}>
            {isHindi ? 'आवश्यक सामग्री (कुल स्टॉक या बनाने के लिए)' : 'Required Ingredients (Total Stock / Base Quantity)'}
          </h3>
          <ul className="space-y-5">
            {remedy.ingredients[lang].map((item, i) => (
              <li key={i} className={cn(listTextClass, "flex items-start gap-3")}>
                <CheckCircle className="w-7 h-7 mt-1 text-accent shrink-0" />
                <span>{toEnglishDigits(item)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={cn(
          "p-8 rounded-[2.5rem] border shadow-sm",
          isNight ? "bg-black border-white/20" : "bg-[#FDF6E2] border-primary/10"
        )}>
          <h3 className={cn(headingClass, "text-accent")}>{isHindi ? 'बनाने की विधि' : 'Preparation'}</h3>
          <p className={bodyTextClass}>{toEnglishDigits(remedy.preparation[lang])}</p>
        </div>
      </div>

      <div className={cn(
        "p-10 rounded-[3rem] border-2 shadow-xl transition-all duration-500",
        isNight 
          ? "bg-zinc-950 border-white/20" 
          : "bg-[#14532D] border-[#14532D]"
      )}>
        <h3 className={cn(
          headingClass,
          isNight ? "text-[#FBBF24]" : "text-white/80"
        )}>
          {isHindi ? 'सेवन विधि' : 'Usage Instructions'}
        </h3>
        <p className={cn(
          bodyTextClass,
          "leading-loose transition-colors",
          "text-white"
        )}>
          "{toEnglishDigits(remedy.usage[lang])}"
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={cn(
          "p-8 rounded-[2.5rem] border border-green-500/20 shadow-sm transition-colors duration-500",
          isNight ? "bg-green-950/50 border-green-500/30" : "bg-green-50"
        )}>
          <h3 className={headingClass}>
            <CheckCircle className={cn("w-8 h-8 shrink-0", isNight ? "text-[#A7F3D0]" : "text-green-700")} /> 
            <span className={isNight ? "text-[#A7F3D0]" : "text-green-700"}>{isHindi ? 'क्या खाएं' : 'What to Eat'}</span>
          </h3>
          <p className={cn(
            "text-lg leading-loose font-medium transition-colors",
            isNight ? "text-[#A7F3D0]" : "text-green-900"
          )}>
            {toEnglishDigits(remedy.dietEat[lang])}
          </p>
        </div>
        <div className={cn(
          "p-8 rounded-[2.5rem] border border-red-500/20 shadow-sm transition-colors duration-500",
          isNight ? "bg-red-950/50 border-red-500/30" : "bg-red-50"
        )}>
          <h3 className={headingClass}>
            <XCircle className={cn("w-8 h-8 shrink-0", isNight ? "text-[#FECDD3]" : "text-red-700")} />
            <span className={isNight ? "text-[#FECDD3]" : "text-red-700"}>{isHindi ? 'क्या न खाएं' : 'What to Avoid'}</span>
          </h3>
          <p className={cn(
            "text-lg leading-loose font-medium transition-colors",
            isNight ? "text-[#FECDD3]" : "text-red-900"
          )}>
            {toEnglishDigits(remedy.dietAvoid[lang])}
          </p>
          <div className={cn(
            "mt-6 pt-6 border-t",
            isNight ? "border-red-500/20" : "border-red-200/30"
          )}>
            <p className={cn(
              "text-base font-black uppercase mb-3",
              isNight ? "text-[#FEF08A]" : "text-red-600"
            )}>
              {isHindi ? 'सख्त परहेज़' : 'Strict Avoid'}
            </p>
            <p className={cn(
              "text-lg font-bold leading-loose transition-colors",
              isNight ? "text-[#FECDD3]" : "text-red-800"
            )}>
              {toEnglishDigits(remedy.strictAvoid[lang])}
            </p>
          </div>
        </div>
      </div>

      <div className={cn(
        "p-10 rounded-[3rem] border shadow-md",
        isNight ? "bg-black border-white/20" : "bg-[#FDF6E2] border-primary/10"
      )}>
        <h3 className={headingClass}>
          <Utensils className="w-8 h-8 shrink-0" /> {isHindi ? 'दिनचर्या' : 'Daily Routine'}
        </h3>
        <div className="space-y-10">
          <div className="flex gap-6">
            <div className="p-5 rounded-full bg-accent/10 text-accent h-fit shrink-0"><Sun className="w-8 h-8" /></div>
            <div>
              <h4 className="text-sm font-black uppercase text-accent mb-2">{isHindi ? 'सुबह' : 'Morning'}</h4>
              <p className={bodyTextClass}>{toEnglishDigits(remedy.routine.morning[lang])}</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="p-5 rounded-full bg-primary/10 text-primary h-fit shrink-0"><Coffee className="w-8 h-8" /></div>
            <div>
              <h4 className="text-sm font-black uppercase text-primary mb-2">{isHindi ? 'दोपहर' : 'Afternoon'}</h4>
              <p className={bodyTextClass}>{toEnglishDigits(remedy.routine.afternoon[lang])}</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="p-5 rounded-full bg-slate-400/10 text-slate-500 h-fit shrink-0"><Moon className="w-8 h-8" /></div>
            <div>
              <h4 className="text-sm font-black uppercase text-slate-500 mb-2">{isHindi ? 'शाम/रात' : 'Evening/Night'}</h4>
              <p className={bodyTextClass}>{toEnglishDigits(remedy.routine.evening[lang])}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className={cn(
          "p-8 rounded-[3rem] border border-accent/40 shadow-sm",
          isNight ? "bg-accent/10" : "bg-accent/5"
        )}>
          <h4 className={headingClass}>
            <AlertTriangle className="w-8 h-8 shrink-0 text-accent" /> 
            <span className={cn("font-bold", isNight ? "text-accent" : "text-[#9B2C2C]")}>{isHindi ? 'सुरक्षा सूचना' : 'Safety Info'}</span>
          </h4>
          <p className={cn(
            "text-lg leading-loose font-bold",
            isNight ? "text-accent brightness-110" : "text-[#9B2C2C]"
          )}>
            {toEnglishDigits(remedy.safetyAdvice[lang])}
          </p>
          <p className={cn(
            "text-sm uppercase tracking-widest opacity-60 leading-loose font-medium mt-8 border-t border-accent/20 pt-8 italic",
            isNight ? "text-white" : "text-primary"
          )}>
            "{toEnglishDigits(remedy.disclaimer[lang])}"
          </p>
        </div>
      </div>

      {/* Action Buttons Container */}
      <div className="pt-8 flex flex-col items-center justify-center gap-4 px-6 w-full mx-auto">
        <Button
          onClick={handleShare}
          className={cn(
            "w-full max-w-sm h-18 py-8 rounded-[2rem] flex items-center justify-center gap-4 font-black uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl text-xl",
            isNight 
              ? "bg-transparent border-2 border-white text-white hover:bg-white/10" 
              : "bg-accent text-white hover:bg-accent/90"
          )}
        >
          <Share2 className="w-8 h-8" />
          {isHindi ? 'नुस्खा शेयर करें' : 'Share Remedy'}
        </Button>
        <Button
          onClick={handleCopy}
          className={cn(
            "w-full max-w-sm h-18 py-8 rounded-[2rem] flex items-center justify-center gap-4 font-black uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl text-xl border-2",
            isNight 
              ? "bg-transparent border-2 border-white text-white hover:bg-white/10" 
              : "bg-transparent border-[#14532D] text-[#14532D] hover:bg-primary/5"
          )}
        >
          <Copy className="w-8 h-8" />
          {isHindi ? 'नुस्खा कॉपी करें' : 'Copy'}
        </Button>
      </div>
    </div>
  );
};
