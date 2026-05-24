import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ChevronRight, Clock, ShieldCheck } from "lucide-react";
import { Remedy } from '@/lib/remedy-data';
import Image from 'next/image';
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
      className="overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all cursor-pointer group remedy-card-hover"
      onClick={onClick}
    >
      <div className="relative h-40 w-full overflow-hidden">
        <Image 
          src={remedy.image} 
          alt={remedy.name[lang]}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          data-ai-hint="ayurvedic remedy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        <button 
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/50 backdrop-blur-md border border-white/10 text-white hover:text-primary transition-colors z-10"
        >
          <Heart className={cn("w-5 h-5", isFavorite ? "fill-primary text-primary" : "text-white")} />
        </button>
      </div>
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-headline text-lg font-bold text-primary leading-tight">{remedy.name[lang]}</h3>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{remedy.preparation[lang]}</p>
        <div className="flex items-center gap-3 pt-2 text-[10px] uppercase font-bold tracking-widest text-primary/70">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Quick</span>
          <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Safe</span>
          <div className="ml-auto">
            <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
