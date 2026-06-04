'use client';

import React, { useState } from 'react';
import { Remedy } from '@/lib/remedy-types';
import { Language, Theme } from '@/app/page';
import { 
  Heart,
  Share2,
  Info,
  Beaker,
  ChefHat,
  Stethoscope,
  Activity,
  Apple,
  AlertTriangle,
  Clock,
  ShieldCheck,
  User
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

type SectionVariant = 'green' | 'yellow' | 'red';

export const RemedyDetail = ({ remedy, theme, lang, isFavorite, onToggleFavorite }: RemedyDetailProps) => {
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';
  const { toast } = useToast();
  const [selectedDoseIndex, setSelectedDoseIndex] = useState(0);

  const labels = {
    introduction: isHindi ? '1. बीमारी का परिचय' : '1. Introduction',
    ingredients: isHindi ? '2. आवश्यक सामग्री (कुल स्टॉक या बनाने के लिए)' : '2. Required Ingredients',
    preparation: isHindi ? '3. बनाने की विधि' : '3. Preparation Method',
    dosage: isHindi ? '4. स्मार्ट खुराक और मात्रा' : '4. Smart Dosage & Quantity',
    usage: isHindi ? '5. सेवन विधि' : '5. Consumption Method',
    dietEat: isHindi ? '6. क्या खाएं' : '6. What to Eat',
    dietAvoid: isHindi ? '7. क्या न खाएं (सख़्त परहेज़)' : '7. What to Avoid (Strict)',
    routine: isHindi ? '8. दिनचर्या' : '8. Daily Routine',
    safety: isHindi ? '9. सुरक्षा सूचना' : '9. Safety Information',
  };

  const dosageWarning = isHindi 
    ? "उपरोक्त कुल सामग्री में से अपनी उम्र के अनुसार केवल नीचे चुनी गई खुराक ही लें:"
    : "From the above ingredients, take only the dosage selected below according to your age:";

  const getVariantStyles = (variant: SectionVariant) => {
    if (isNight) {
      return "bg-white/5 border-white/10 text-white";
    }
    switch (variant) {
      case 'green':
        return "bg-[#E6F4EA] border-[#B2D8B9] text-[#0D3B2E]";
      case 'red':
        return "bg-[#FDF2F2] border-[#F8D7DA] text-[#721C24]";
      case 'yellow':
      default:
        return "bg-[#FFF9E6] border-[#FCE8B2] text-[#5F4B1A]";
    }
  };

  const renderSection = (icon: React.ReactNode, title: string, content: any, variant: SectionVariant, customHeader?: string) => {
    if (!content) return null;

    return (
      <div className={cn(
        "p-6 rounded-[2rem] border shadow-md space-y-4 mb-6 transition-all duration-300",
        getVariantStyles(variant)
      )}>
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-xl",
            variant === 'green' ? "bg-emerald-500/10 text-emerald-700" :
            variant === 'red' ? "bg-red-500/10 text-red-700" :
            "bg-amber-500/10 text-amber-700"
          )}>
            {icon}
          </div>
          <div className="flex flex-col">
            <h3 className="text-[18px] font-bold leading-tight">
              {title}
            </h3>
            {customHeader && (
              <p className="text-[11px] font-bold mt-0.5 leading-tight opacity-80">{customHeader}</p>
            )}
          </div>
        </div>
        <div className="text-[15px] leading-relaxed font-medium space-y-2">
          {Array.isArray(content) ? (
            <ul className="space-y-3 list-none p-0 m-0">
              {content.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full mt-2 shrink-0",
                    variant === 'green' ? "bg-emerald-600" :
                    variant === 'red' ? "bg-red-600" :
                    "bg-amber-600"
                  )} />
                  <span>{toEnglishDigits(item)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>{toEnglishDigits(content)}</p>
          )}
        </div>
      </div>
    );
  };

  const handleShare = async () => {
    const title = toEnglishDigits(remedy.name[lang]);
    const deepLink = `${window.location.origin}?remedyId=${remedy.id}`;
    const shareText = `🌿 *${title}* 🌿\n\nपूरी जानकारी और बनाने की विधि यहाँ देखें: \n${deepLink}`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text: shareText });
      } catch (error) {
        if ((error as any).name !== 'AbortError') console.error(error);
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast({ description: isHindi ? "लिंक कॉपी हो गया है!" : "Link copied!" });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-32 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className={cn("text-[26px] font-black tracking-wide leading-tight flex-1", isNight ? "text-white" : "text-[#14532D]")}>
          {toEnglishDigits(remedy.name[lang])}
        </h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleFavorite} 
          className={cn("rounded-full h-12 w-12", isFavorite ? "text-accent" : "text-muted-foreground")}
        >
          <Heart className={cn("w-7 h-7", isFavorite && "fill-current")} />
        </Button>
      </div>

      <div className="space-y-0">
        {/* 1. Introduction - Green */}
        {renderSection(<Info className="w-5 h-5" />, labels.introduction, remedy.introduction[lang], 'green')}
        
        {/* 2. Ingredients - Yellow */}
        {renderSection(<Beaker className="w-5 h-5" />, labels.ingredients, remedy.ingredients[lang], 'yellow')}
        
        {/* 3. Preparation - Yellow */}
        {renderSection(<ChefHat className="w-5 h-5" />, labels.preparation, remedy.preparation[lang], 'yellow')}
        
        {/* 4. Smart Dosage - Yellow Interactive */}
        {remedy.doses && remedy.doses.length > 0 && (
          <div className={cn(
            "p-6 rounded-[2rem] border shadow-md space-y-6 mb-6 transition-all duration-300",
            getVariantStyles('yellow')
          )}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[18px] font-bold leading-tight">{labels.dosage}</h3>
                <p className="text-[11px] font-bold mt-0.5 leading-tight opacity-80">{dosageWarning}</p>
              </div>
            </div>

            {/* Age Selection Buttons */}
            <div className="grid grid-cols-2 gap-2">
              {remedy.doses.map((dose, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDoseIndex(i)}
                  className={cn(
                    "px-4 py-3 rounded-2xl text-[13px] font-bold transition-all border flex items-center justify-center gap-2",
                    selectedDoseIndex === i 
                      ? "bg-accent border-accent text-white shadow-lg scale-95" 
                      : (isNight ? "bg-white/5 border-white/10 text-white" : "bg-white border-amber-200 text-[#5F4B1A] hover:bg-amber-50")
                  )}
                >
                  <User className="w-3.5 h-3.5" />
                  {toEnglishDigits(dose.ageRange[lang])}
                </button>
              ))}
            </div>

            {/* Dynamic Content Display */}
            <div className={cn(
              "p-5 rounded-2xl border-l-4 transition-all duration-500 animate-in fade-in slide-in-from-top-2",
              isNight ? "bg-white/5 border-accent" : "bg-white/60 border-accent"
            )}>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-black tracking-widest opacity-60">
                  {isHindi ? 'निर्धारित खुराक' : 'Prescribed Dosage'}
                </span>
                <p className="text-[16px] font-bold leading-relaxed">
                  {toEnglishDigits(remedy.doses[selectedDoseIndex].dose[lang])}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 5. Usage - Yellow */}
        {renderSection(<Activity className="w-5 h-5" />, labels.usage, remedy.usage[lang], 'yellow')}
        
        {/* 6. What to Eat - Green */}
        {renderSection(<Apple className="w-5 h-5" />, labels.dietEat, remedy.dietEat[lang], 'green')}
        
        {/* 7. What NOT to Eat - Red */}
        {renderSection(<AlertTriangle className="w-5 h-5" />, labels.dietAvoid, remedy.dietAvoid[lang], 'red')}
        
        {/* 8. Routine - Yellow */}
        {remedy.routine && (
          <div className={cn(
            "p-6 rounded-[2rem] border shadow-sm space-y-4 mb-6 transition-all duration-300",
            getVariantStyles('yellow')
          )}>
             <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-[18px] font-bold leading-tight">{labels.routine}</h3>
            </div>
            <div className="space-y-3">
              {['morning', 'afternoon', 'evening'].map((time) => (
                remedy.routine[time as keyof typeof remedy.routine] && (
                  <div key={time} className="flex items-start gap-3">
                    <span className="text-[11px] font-black uppercase tracking-widest text-accent w-16 pt-1 shrink-0">{time}</span>
                    <p className="text-[14px] flex-1 font-medium">{toEnglishDigits(remedy.routine[time as keyof typeof remedy.routine][lang])}</p>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* 9. Safety Information - Red */}
        {renderSection(<ShieldCheck className="w-5 h-5" />, labels.safety, remedy.safetyAdvice[lang], 'red')}
      </div>

      <div className="pt-8 flex flex-col items-center gap-4">
        <Button 
          onClick={handleShare} 
          className="w-full h-14 rounded-full font-black uppercase tracking-widest shadow-xl bg-accent text-white active:scale-95 transition-all"
        >
          <Share2 className="w-5 h-5 mr-2" /> {isHindi ? 'शेयर करें' : 'Share'}
        </Button>
      </div>
    </div>
  );
};
