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

  const renderParam = (content: string | string[] | undefined, withQuotes = false) => {
    if (!content) return null;
    if (Array.isArray(content)) {
      return (
        <ul className="space-y-4 list-none m-0 p-0">
          {content.map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-accent mt-2 shrink-0 shadow-sm" />
              <span className={bodyTextClass}>{toEnglishDigits(item)}</span>
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
    const shareText = `*घरेलू उपाय केयर*\n🌿 *${title}*`;
    if (navigator.share) {
      try { await navigator.share({ title, text: shareText }); } catch (e) {}
    } else {
      navigator.clipboard.writeText(shareText);
      toast({ description: "Copy ho gaya!" });
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-32">
      <div className="flex items-center justify-end mb-4">
        <Button variant="ghost" size="icon" onClick={onToggleFavorite} className={cn("rounded-full h-14 w-14", isFavorite ? "text-accent" : "text-muted-foreground")}>
          <Heart className={cn("w-8 h-8", isFavorite && "fill-current")} />
        </Button>
      </div>

      <h2 className={cn("text-[28px] font-black tracking-wide leading-tight mb-8", isNight ? "text-white" : "text-[#14532D]")}>
        {toEnglishDigits(remedy.name?.[lang] || '')}
      </h2>

      <div className={cn("p-6 rounded-[2rem] border shadow-sm", isNight ? "bg-white/5" : "bg-primary/5")}>
        <h3 className={headingClass}><Info className="w-6 h-6 shrink-0" /> {isHindi ? '1. बीमारी का परिचय' : '1. Introduction'}</h3>
        <div>{renderParam(remedy.introduction?.[lang])}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={cn("p-6 rounded-[2rem] border shadow-sm", isNight ? "bg-black" : "bg-[#FDF6E2]")}>
          <h3 className={cn(headingClass, "text-accent")}>{isHindi ? '3. आवश्यक सामग्री' : '3. Ingredients'}</h3>
          <ul className="space-y-4">
            {displayIngredients.map((item, i) => (
              <li key={i} className={cn("flex items-start gap-3", bodyTextClass)}>
                <CheckCircle className="w-6 h-6 mt-0.5 text-accent shrink-0" />
                <span>{toEnglishDigits(item)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={cn("p-8 rounded-[2.5rem] border border-accent/40 shadow-sm opacity-60 mt-10 text-center")}>
        <p className="text-[12px] italic uppercase tracking-widest">
          {toEnglishDigits(remedy.disclaimer?.[lang] || '')}
        </p>
      </div>

      <div className="pt-12 flex flex-col items-center gap-6 px-6">
        <Button onClick={handleShare} className="w-full max-w-sm h-16 rounded-full font-black uppercase tracking-[0.2em] shadow-xl text-lg bg-accent text-white">
          <Share2 className="w-6 h-6 mr-2" /> {isHindi ? 'शेयर करें' : 'Share'}
        </Button>
      </div>
    </div>
  );
};