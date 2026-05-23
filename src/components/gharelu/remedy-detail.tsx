import React from 'react';
import { Remedy } from '@/lib/remedy-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { ShieldAlert, Info, Clock, CheckCircle, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RemedyDetailProps {
  remedy: Remedy | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RemedyDetail = ({ remedy, isOpen, onClose }: RemedyDetailProps) => {
  if (!remedy) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-background border-primary/20 sm:rounded-3xl">
        <ScrollArea className="max-h-[90vh]">
          <div className="relative h-64 w-full">
            <Image 
              src={remedy.image} 
              alt={remedy.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <button 
              onClick={onClose}
              className="absolute top-4 left-4 p-2 rounded-full bg-background/50 backdrop-blur-md text-white hover:bg-primary transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-primary">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                पारंपरिक उपाय
              </div>
              <h2 className="text-3xl font-headline font-bold text-primary">{remedy.name}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-card/50 p-3 rounded-2xl border border-primary/5">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">समय</span>
                  <span className="text-xs font-bold">10-15 मिनट</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-card/50 p-3 rounded-2xl border border-primary/5">
                <div className="p-2 rounded-xl bg-accent/10 text-accent">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">सुरक्षा</span>
                  <span className="text-xs font-bold">100% प्राकृतिक</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-headline font-bold text-primary flex items-center gap-2">
                <Info className="w-5 h-5" /> आवश्यक सामग्री
              </h3>
              <ul className="space-y-2">
                {remedy.ingredients.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground group">
                    <CheckCircle className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-headline font-bold text-primary">बनाने की विधि</h3>
              <p className="text-muted-foreground leading-relaxed bg-card/30 p-4 rounded-2xl border border-primary/5 border-l-4 border-l-primary italic">
                {remedy.preparation}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-headline font-bold text-primary">प्रयोग कैसे करें</h3>
              <p className="text-muted-foreground leading-relaxed">
                {remedy.usage}
              </p>
            </div>

            <div className="bg-accent/10 p-5 rounded-2xl border border-accent/20 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" /> महत्वपूर्ण सलाह
              </h4>
              <p className="text-sm text-accent-foreground/90 leading-relaxed">
                {remedy.safetyAdvice}
              </p>
            </div>

            <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest pb-6 opacity-50">
              यह जानकारी केवल सूचना के लिए है। गंभीर स्थिति में विशेषज्ञ से सलाह लें।
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
