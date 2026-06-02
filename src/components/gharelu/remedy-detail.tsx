import React, { useState } from 'react';
import { Remedy } from '@/lib/remedy-types';
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
  const [selectedAgeRangeKey, setSelectedAgeRangeKey] = useState(
    remedy.doses?.[0]?.ageRange?.[lang] || ''
  );
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';
  const { toast } = useToast();

  const currentDose = remedy.doses?.find(d => d.ageRange?.[lang] === selectedAgeRangeKey) || remedy.doses?.[0];
  
  const displayIngredients = currentDose?.ingredients?.[lang] || remedy.ingredients?.[lang] || [];

  const headingClass = cn(
    "text-[18px] font-bold mb-4 flex items-center gap-3 leading-[1.4]",
    isNight ? "text-white" : "text-[#14532D]"
  );

  const bodyTextClass = cn(
    "text-[16px] leading-relaxed font-medium",
    isNight ? "text-[#E5E7EB]" : "text-[#1E293B]"
  );

  const listTextClass = cn(
    "text-[16px] leading-relaxed font-medium",
    isNight ? "text-[#E5E7EB]" : "text-[#1E293B]"
  );

  const renderParam = (content: string | string[] | undefined, withQuotes = false) => {
    if (!content) return null;
    if (Array.isArray(content)) {
      return (
        <ul className="space-y-4 list-none m-0 p-0">
          {content.map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-accent mt-2 shrink-0 shadow-sm" />
              <span className={listTextClass}>{toEnglishDigits(item)}</span>
            </li>
          ))}
        </ul>
      );
    }
    const text = toEnglishDigits(content);
    return withQuotes ? `"${text}"` : <span className={bodyTextClass}>{text}</span>;
  };

  const handleShare = async () => {
    const title = toEnglishDigits(remedy.name?.[lang] || '');
    const ingredientsStr = displayIngredients.map(i => toEnglishDigits(i)).join(', ');
    const prepRaw = remedy.preparation?.[lang];
    const prep = Array.isArray(prepRaw) ? prepRaw.map(p => toEnglishDigits(p)).join(' ') : toEnglishDigits(prepRaw || '');
    
    const shareText = isHindi 
      ? `*घरेलू उपाय केयर*\n🌿 *${title}*\n\n📦 *सामग्री:*\n${ingredientsStr}\n\n🥣 *विधि:*\n${prep}`
      : `*Gharelu Upay Care*\n🌿 *${title}*\n\n📦 *Ingredients:*\n${ingredientsStr}\n\n🥣 *Preparation:*\n${prep}`;

    if (navigator.share) {
      try { await navigator.share({ title, text: shareText }); } catch (e) {}
    } else {
      handleCopy();
    }
  };

  const handleCopy = async () => {
    const title = toEnglishDigits(remedy.name?.[lang] || '');
    const ingredientsStr = displayIngredients.map(i => toEnglishDigits(i)).join(', ');
    const prepRaw = remedy.preparation?.[lang];
    const prep = Array.isArray(prepRaw) ? prepRaw.map(p => toEnglishDigits(p)).join(' ') : toEnglishDigits(prepRaw || '');

    const textToCopy = isHindi
      ? `🌿 ${title}\n\n📦 सामग्री:\n${ingredientsStr}\n\n🥣 विधि:\n${prep}`
      : `🌿 ${title}\n\n📦 Ingredients:\n${ingredientsStr}\n\n🥣 Preparation:\n${prep}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({ description: isHindi ? "कॉपी हो गया!" : "Copied!" });
    } catch (err) {}
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-32">
      <div className="flex items-center justify-end mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleFavorite}
          className={cn("rounded-full h-14 w-14", isFavorite ? "text-accent fill-accent" : "text-muted-foreground")}
        >
          <Heart className={cn("w-8 h-8", isFavorite && "fill-current")} />
        </Button>
      </div>

      <h2 className={cn("text-[28px] font-black tracking-wide leading-tight mb-8", isNight ? "text-white" : "text-[#14532D]")}>
        {toEnglishDigits(remedy.name?.[lang] || '')}
      </h2>

      <div className={cn("p-6 rounded-[2rem] border shadow-sm", isNight ? "bg-white/5 border-white/10" : "bg-primary/5 border-primary/10")}>
        <h3 className={headingClass}><Info className="w-6 h-6 shrink-0" /> {isHindi ? '1. बीमारी का परिचय' : '1. Introduction'}</h3>
        <div>{renderParam(remedy.introduction?.[lang])}</div>
      </div>

      {remedy.doses && remedy.doses.length > 0 && (
        <div className={cn("p-6 rounded-[2rem] border shadow-sm", isNight ? "bg-black border-white" : "bg-white border-[#14532D]")}>
          <h3 className={headingClass}>{isHindi ? '2. स्मार्ट कैलकुलेटर' : '2. Smart Calculator'}</h3>
          <div className="flex flex-wrap gap-3 mb-6">
            {remedy.doses.map((dose, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAgeRangeKey(dose.ageRange?.[lang] || '')}
                className={cn(
                  "px-4 py-2 rounded-xl text-[16px] font-bold transition-all border",
                  selectedAgeRangeKey === dose.ageRange?.[lang]
                    ? (isNight ? "bg-white text-black" : "bg-accent text-white border-accent shadow-md")
                    : (isNight ? "bg-black text-white border-white/20" : "bg-transparent text-primary border-primary/20")
                )}
              >
                {toEnglishDigits(dose.ageRange?.[lang] || '')}
              </button>
            ))}
          </div>
          <div className={cn("p-6 rounded-2xl text-center", isNight ? "bg-white/10" : "bg-accent/10")}>
            <span className={cn("text-[16px] font-semibold", isNight ? "text-white" : "text-[#14532D]")}>
              {toEnglishDigits(currentDose?.dose?.[lang] || '')}
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={cn("p-6 rounded-[2rem] border shadow-sm", isNight ? "bg-black border-white/20" : "bg-[#FDF6E2] border-primary/10")}>
          <h3 className={cn(headingClass, "text-accent")}>{isHindi ? '3. आवश्यक सामग्री' : '3. Ingredients'}</h3>
          <ul className="space-y-4">
            {displayIngredients.map((item, i) => (
              <li key={i} className={cn("flex items-start gap-3", listTextClass)}>
                <CheckCircle className="w-6 h-6 mt-0.5 text-accent shrink-0" />
                <span>{toEnglishDigits(item)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={cn("p-6 rounded-[2rem] border shadow-sm", isNight ? "bg-black border-white/20" : "bg-[#FDF6E2] border-primary/10")}>
          <h3 className={cn(headingClass, "text-accent")}>{isHindi ? '4. बनाने की विधि' : '4. Preparation'}</h3>
          <div>{renderParam(remedy.preparation?.[lang])}</div>
        </div>
      </div>

      <div className={cn("p-8 rounded-[2rem] border-2 shadow-xl", isNight ? "bg-zinc-950 border-white/20" : "bg-[#14532D] border-[#14532D]")}>
        <h3 className={cn(headingClass, "text-white/80")}>{isHindi ? '5. सेवन विधि' : '5. Usage'}</h3>
        <div className={cn("text-white italic", bodyTextClass)}>{renderParam(remedy.usage?.[lang], true)}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={cn("p-6 rounded-[2rem] border border-green-500/20 shadow-sm", isNight ? "bg-green-950/50" : "bg-green-50")}>
          <h3 className={headingClass}><CheckCircle className="w-6 h-6 text-green-700" /> {isHindi ? '6. क्या खाएं' : '6. Eat'}</h3>
          <div className={cn(isNight ? "text-[#A7F3D0]" : "text-green-900", bodyTextClass)}>{renderParam(remedy.dietEat?.[lang])}</div>
        </div>
        <div className={cn("p-6 rounded-[2rem] border border-red-500/20 shadow-sm", isNight ? "bg-red-950/50" : "bg-red-50")}>
          <h3 className={headingClass}><XCircle className="w-6 h-6 text-red-700" /> {isHindi ? '7. क्या न खाएं' : '7. Avoid'}</h3>
          <div className={cn(isNight ? "text-[#FECDD3]" : "text-red-900", bodyTextClass)}>{renderParam(remedy.dietAvoid?.[lang])}</div>
          {remedy.strictAvoid && (
            <div className="mt-6 pt-6 border-t border-red-500/20">
              <p className="text-[16px] font-black uppercase text-red-600 mb-2">{isHindi ? 'सख्त परहेज़' : 'Strict Avoid'}</p>
              <div className={bodyTextClass}>{renderParam(remedy.strictAvoid?.[lang])}</div>
            </div>
          )}
        </div>
      </div>

      {remedy.routine && (
        <div className={cn("p-8 rounded-[2.5rem] border shadow-md", isNight ? "bg-black border-white/20" : "bg-[#FDF6E2] border-primary/10")}>
          <h3 className={headingClass}><Utensils className="w-6 h-6 shrink-0" /> {isHindi ? '8. दिनचर्या' : '8. Routine'}</h3>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="p-4 rounded-full bg-accent/10 text-accent h-fit"><Sun className="w-6 h-6" /></div>
              <div><h4 className="text-[16px] font-black uppercase text-accent mb-2">{isHindi ? 'सुबह' : 'Morning'}</h4>{renderParam(remedy.routine.morning?.[lang])}</div>
            </div>
            <div className="flex gap-4">
              <div className="p-4 rounded-full bg-primary/10 text-primary h-fit"><Coffee className="w-6 h-6" /></div>
              <div><h4 className="text-[16px] font-black uppercase text-primary mb-2">{isHindi ? 'दोपहर' : 'Afternoon'}</h4>{renderParam(remedy.routine.afternoon?.[lang])}</div>
            </div>
            <div className="flex gap-4">
              <div className="p-4 rounded-full bg-slate-400/10 text-slate-500 h-fit"><Moon className="w-6 h-6" /></div>
              <div><h4 className="text-[16px] font-black uppercase text-slate-500 mb-2">{isHindi ? 'शाम/रात' : 'Night'}</h4>{renderParam(remedy.routine.evening?.[lang])}</div>
            </div>
          </div>
        </div>
      )}

      <div className={cn("p-8 rounded-[2.5rem] border border-accent/40 shadow-sm", isNight ? "bg-accent/10" : "bg-accent/5")}>
        <h4 className={headingClass}><AlertTriangle className="w-6 h-6 text-accent" /> {isHindi ? '9. सुरक्षा सूचना' : '9. Safety'}</h4>
        <div className={cn(isNight ? "text-accent brightness-110" : "text-[#9B2C2C]", bodyTextClass)}>{renderParam(remedy.safetyAdvice?.[lang])}</div>
        <div className={cn("text-[12px] uppercase tracking-widest opacity-60 mt-10 border-t border-accent/20 pt-8 italic text-center", isNight ? "text-white" : "text-primary")}>
          {renderParam(remedy.disclaimer?.[lang], true)}
        </div>
      </div>

      <div className="pt-12 flex flex-col items-center gap-6 px-6">
        <Button onClick={handleShare} className={cn("w-full max-w-sm h-16 rounded-full font-black uppercase tracking-[0.2em] shadow-xl text-lg", isNight ? "bg-transparent border-2 border-white text-white" : "bg-accent text-white")}>
          <Share2 className="w-6 h-6 mr-2" /> {isHindi ? 'शेयर करें' : 'Share'}
        </Button>
        <Button onClick={handleCopy} className={cn("w-full max-w-sm h-16 rounded-full font-black uppercase tracking-[0.2em] shadow-xl text-lg border-2", isNight ? "bg-transparent border-white text-white" : "bg-transparent border-primary text-primary")}>
          <Copy className="w-6 h-6 mr-2" /> {isHindi ? 'कॉपी करें' : 'Copy'}
        </Button>
      </div>
    </div>
  );
};