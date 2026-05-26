import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ChevronRight, Clock, ShieldCheck } from "lucide-react";
import { Remedy } from '@/lib/remedy-data';
import { cn } from '@/lib/utils';
import { Language, Theme } from '@/app/page';

interface RemedyCardProps {
  remedy: Remedy;
  isFavorite: boolean;
  lang: Language;
  theme: Theme;
  onToggleFavorite: (e: React.MouseEvent) => void;
  onClick: () => void;
}

export const RemedyCard = ({ remedy, isFavorite, lang, theme, onToggleFavorite, onClick }: RemedyCardProps) => {
  const isNight = theme === 'night';

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all cursor-pointer group shadow-lg",
        isNight 
          ? "bg-black border-white/30 hover:border-white shadow-none" 
          : "border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/40"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6 space-y-4 relative">
        <button 
          onClick={onToggleFavorite}
          className={cn(
            "absolute top-4 right-4 p-2 rounded-full transition-all active:scale-90 z-10",
            isFavorite ? "text-accent" : "text-muted-foreground hover:text-accent"
          )}
        >
          <Heart className={cn("w-6 h-6", isFavorite && "fill-current")} />
        </button>

        <div className="pr-10">
          <h3 className={cn(
            "font-headline text-[24px] font-bold leading-tight transition-colors",
            isNight ? "text-[#34D399]" : "text-primary group-hover:text-accent"
          )}>
            {remedy.name[lang]}
          </h3>
          <p className={cn(
            "text-sm line-clamp-3 mt-3 leading-relaxed transition-colors font-medium",
            isNight ? "text-[#E5E7EB]" : "text-muted-foreground"
          )}>
            {remedy.introduction[lang]}
          </p>
        </div>

        <div className={cn(
          "flex items-center justify-between pt-4 border-t",
          isNight ? "border-white/10" : "border-primary/5"
        )}>
          <div className={cn(
            "flex items-center gap-4 text-[10px] uppercase font-black tracking-[0.15em] transition-colors",
            isNight ? "text-white/60" : "text-primary/60"
          )}>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Quick</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Safe</span>
          </div>
          <div className={cn(
            "p-2 rounded-full transition-all",
            isNight 
              ? "bg-white/10 text-white" 
              : "bg-primary/5 group-hover:bg-accent group-hover:text-white"
          )}>
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
