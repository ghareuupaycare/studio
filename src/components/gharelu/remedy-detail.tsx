'use client';

import React, { useState } from 'react';
import { Remedy } from '@/lib/remedy-types';
import { Language, Theme } from '@/app/page';
import { 
  Info, 
  CheckCircle, 
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
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';
  const { toast } = useToast();

  const currentDose = remedy.doses?.[0];
  const displayIngredients = remedy.ingredients?.[lang] || [];

  const headingClass = cn(
    "text-[18px] font-bold mb-4 flex items-center gap-3 leading-[1.4]",
    isNight ? "text-white" : "text-[#14532D]"
  );

  const bodyTextClass = cn(
    "text-[16px] leading-relaxed font-medium",
    isNight ? "text-[#E5E7EB]" : "text-[#1E293B]"
  );

  const renderParam = (content: string | string[] | undefined) => {
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
    return <span className={bodyTextClass}>{toEnglishDigits(content)}</span>;
  };

  const getShareableText = () => {
    const title = toEnglishDigits(remedy.name?.[lang] || '');
    const introContent = remedy.introduction?.[lang];
    const intro = toEnglishDigits(Array.isArray(introContent) ? introContent[0] : introContent);
    const ingredientsList = displayIngredients.map(item => `- ${toEnglishDigits(item)}`).join('\n');
    
    const cta = isHindi 
      ? "पूरा नुस्खा, बनाने की विधि और सही खुराक जानने के लिए नीचे दिए गए लिंक पर क्लिक करें👇"
      : "To know the full recipe, preparation method, and correct dosage, click the link below👇";
    
    const introLabel = isHindi ? 'बीमारी का परिचय' : 'Introduction';
    const ingredientsLabel = isHindi ? 'आवश्यक सामग्री' : 'Key Ingredients';

    // Generate dynamic deep link for the specific remedy
    const deepLink = `${window.location.origin}?remedyId=${remedy.id}`;

    return `🌿 *${title}* 🌿\n\n*${introLabel}:*\n${intro}\n\n*${ingredientsLabel}:*\n${ingredientsList}\n\n${cta}\n${deepLink}`;
  };

  const handleShare = async () => {
    const shareText = getShareableText();
    const title = toEnglishDigits(remedy.name?.[lang] || '');

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Gharelu Upay Care - ${title}`,
          text: shareText,
          // url is omitted or set to empty string to prevent link duplication in apps like WhatsApp
          url: '', 
        });
      } catch (error) {
        if ((error as any).name !== 'AbortError') {
          console.error("Sharing failed", error);
        }
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = async () => {
    const shareText = getShareableText();
    try {
      await navigator.clipboard.writeText(shareText);
      toast({
        description: isHindi ? "नुस्खा विवरण कॉपी हो गया है!" : "Remedy details copied!",
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-32">
      <div className="flex items-center justify-end mb-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleFavorite} 
          className={cn("rounded-full h-14 w-14 active:scale-90 transition-all duration-200", isFavorite ? "text-accent" : "text-muted-foreground")}
        >
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

      <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-4 px-6">
        <Button 
          onClick={handleShare} 
          className="w-full sm:w-auto min-w-[160px] h-14 rounded-full font-black uppercase tracking-[0.15em] shadow-xl text-base bg-accent text-white active:scale-95 transition-all duration-200"
        >
          <Share2 className="w-5 h-5 mr-2" /> {isHindi ? 'शेयर करें' : 'Share'}
        </Button>
        <Button 
          onClick={handleCopy} 
          variant="outline"
          className={cn(
            "w-full sm:w-auto min-w-[160px] h-14 rounded-full font-black uppercase tracking-[0.15em] shadow-lg text-base active:scale-95 transition-all duration-200",
            isNight ? "border-white/20 text-white hover:bg-white/10" : "border-primary/20 text-primary hover:bg-primary/5"
          )}
        >
          <Copy className="w-5 h-5 mr-2" /> {isHindi ? 'कॉपी करें' : 'Copy'}
        </Button>
      </div>
    </div>
  );
};