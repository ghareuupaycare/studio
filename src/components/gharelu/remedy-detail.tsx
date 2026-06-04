'use client';

import React from 'react';
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
  ShieldCheck
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
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';
  const { toast } = useToast();

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
    ? "(उपरोक्त कुल सामग्री में से अपनी उम्र के अनुसार केवल नीचे चुनी गई खुराक ही लें:)"
    : "(From the above ingredients, take only the dosage selected below according to your age:)";

  const renderSection = (icon: React.ReactNode, title: string, content: any, customHeader?: string) => {
    if (!content) return null;

    return (
      <div className={cn(
        "p-6 rounded-[2rem] border shadow-sm space-y-4 mb-6",
        isNight ? "bg-white/5 border-white/10" : "bg-white border-primary/10"
      )}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-accent/10 text-accent">
            {icon}
          </div>
          <div className="flex flex-col">
            <h3 className={cn("text-[18px] font-bold leading-tight", isNight ? "text-white" : "text-[#14532D]")}>
              {title}
            </h3>
            {customHeader && (
              <p className="text-[11px] font-bold text-accent mt-0.5 leading-tight">{customHeader}</p>
            )}
          </div>
        </div>
        <div className={cn("text-[15px] leading-relaxed font-medium space-y-2", isNight ? "text-[#E5E7EB]" : "text-[#1E293B]")}>
          {Array.isArray(content) ? (
            <ul className="space-y-3 list-none p-0 m-0">
              {content.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
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
        {renderSection(<Info className="w-5 h-5" />, labels.introduction, remedy.introduction[lang])}
        {renderSection(<Beaker className="w-5 h-5" />, labels.ingredients, remedy.ingredients[lang])}
        {renderSection(<ChefHat className="w-5 h-5" />, labels.preparation, remedy.preparation[lang])}
        
        {/* Dosage Section */}
        {remedy.doses && remedy.doses.length > 0 && (
          <div className={cn(
            "p-6 rounded-[2rem] border shadow-sm space-y-4 mb-6",
            isNight ? "bg-white/5 border-white/10" : "bg-white border-primary/10"
          )}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-accent/10 text-accent"><Stethoscope className="w-5 h-5" /></div>
              <div className="flex flex-col">
                <h3 className={cn("text-[18px] font-bold leading-tight", isNight ? "text-white" : "text-[#14532D]")}>
                  {labels.dosage}
                </h3>
                <p className="text-[11px] font-bold text-accent mt-0.5 leading-tight">{dosageWarning}</p>
              </div>
            </div>
            <div className="space-y-4">
              {remedy.doses.map((dose, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-accent/5 border border-accent/10">
                  <span className="font-bold text-sm">{toEnglishDigits(dose.ageRange[lang])}</span>
                  <span className="text-sm font-medium">{toEnglishDigits(dose.dose[lang])}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {renderSection(<Activity className="w-5 h-5" />, labels.usage, remedy.usage[lang])}
        {renderSection(<Apple className="w-5 h-5" />, labels.dietEat, remedy.dietEat[lang])}
        {renderSection(<AlertTriangle className="w-5 h-5" />, labels.dietAvoid, remedy.dietAvoid[lang])}
        
        {/* Routine Section */}
        {remedy.routine && (
          <div className={cn(
            "p-6 rounded-[2rem] border shadow-sm space-y-4 mb-6",
            isNight ? "bg-white/5 border-white/10" : "bg-white border-primary/10"
          )}>
             <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-accent/10 text-accent"><Clock className="w-5 h-5" /></div>
              <h3 className={cn("text-[18px] font-bold leading-tight", isNight ? "text-white" : "text-[#14532D]")}>
                {labels.routine}
              </h3>
            </div>
            <div className="space-y-3">
              {['morning', 'afternoon', 'evening'].map((time) => (
                remedy.routine[time as keyof typeof remedy.routine] && (
                  <div key={time} className="flex items-start gap-3">
                    <span className="text-[11px] font-black uppercase tracking-widest text-accent w-16 pt-1">{time}</span>
                    <p className="text-[14px] flex-1 font-medium">{toEnglishDigits(remedy.routine[time as keyof typeof remedy.routine][lang])}</p>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {renderSection(<ShieldCheck className="w-5 h-5" />, labels.safety, remedy.safetyAdvice[lang])}
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
