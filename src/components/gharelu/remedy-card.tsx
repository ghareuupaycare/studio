import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ChevronRight, Clock, ShieldCheck } from "lucide-react";
import { Remedy } from '@/lib/remedy-data';
import { cn } from '@/lib/utils';
import { Language } from '@/app/page';

interface RemedyCardProps {
  remedy: Remedy;
  isFavorite: boolean;
  lang: Language;
  onToggleFavorite: (e: React.MouseEvent) => void;
  onClick: () => void;
}

export const RemedyCard = ({ remedy, isFavorite, lang, onToggleFavorite, onClick }: RemedyCardProps) => {
  return (
    <Card 
      className="overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all cursor-pointer group shadow-lg"
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
          <h3 className="font-headline text-xl font-bold text-primary leading-tight group-hover:text-accent transition-colors">
            {remedy.name[lang]}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 mt-3 leading-relaxed">
            {remedy.introduction[lang]}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-primary/5">
          <div className="flex items-center gap-4 text-[10px] uppercase font-black tracking-[0.15em] text-primary/60">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Quick</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Safe</span>
          </div>
          <div className="p-2 rounded-full bg-primary/5 group-hover:bg-accent group-hover:text-white transition-all">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
