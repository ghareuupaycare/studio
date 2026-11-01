'use client';

import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Bell, ChevronRight, Sparkles, MessageCircleOff, X, MessageCircle } from 'lucide-react';
import { Remedy } from '@/lib/remedy-data';
import { Language, Theme } from '@/app/page';
import { cn, toEnglishDigits } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { doc, updateDoc } from 'firebase/firestore';

interface NotificationsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  theme: Theme;
  unreadRemedies: Remedy[];
  onMarkAsRead: (id: string) => void;
  onSelectRemedy: (remedyId: string, categoryId: string) => void;
  privateAnswers: any[];
  db: any;
}

export const NotificationsOverlay = ({ 
  isOpen, 
  onClose, 
  lang, 
  theme, 
  unreadRemedies,
  onMarkAsRead,
  onSelectRemedy,
  privateAnswers = [],
  db
}: NotificationsOverlayProps) => {
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';

  const handleResultClick = (remedy: Remedy) => {
    const categoryId = remedy.categoryId || 'fever_flu';
    onMarkAsRead(remedy.id);
    onSelectRemedy(remedy.id, categoryId);
    onClose();
  };

  const handlePrivateClick = async (item: any) => {
    if (db) {
      await updateDoc(doc(db, 'questions', item.id), { isRead: true });
    }
    onSelectRemedy(item.remedyId, 'live');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "fixed top-0 left-0 translate-x-0 translate-y-0 w-full h-[80vh] max-w-none p-0 border-none flex flex-col rounded-none shadow-2xl z-[100] outline-none [&>button]:hidden",
          isNight ? "bg-[#0a110d] text-white" : "bg-[#FDFBF7] text-foreground"
        )}
      >
        <div className={cn("shrink-0 p-6 pt-10 relative", isNight ? "bg-black/60 border-b border-white/10" : "bg-[#14532D] border-b border-white/10")}>
          <div className="absolute top-4 right-6">
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full text-accent h-10 w-10"><X className="w-8 h-8 stroke-[3]" /></Button>
            </DialogClose>
          </div>
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-accent" />
            <DialogTitle className="text-white text-xl font-headline font-black">{isHindi ? 'क्या नया है?' : "What's New?"}</DialogTitle>
          </div>
        </div>

        <ScrollArea className="flex-1 w-full bg-transparent">
          <div className="p-4 w-full max-w-2xl mx-auto space-y-8">
            {/* Private Answers Section */}
            {privateAnswers.length > 0 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center gap-2 px-2 py-1">
                  <MessageCircle className="w-4 h-4 text-accent" />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-accent">
                    {isHindi ? 'वैद्य जी के जवाब' : 'Vaidya Ji Replies'}
                  </span>
                </div>
                {privateAnswers.map((item) => (
                  <button key={item.id} onClick={() => handlePrivateClick(item)} className={cn("w-full p-5 rounded-2xl border-2 border-accent/40 bg-accent/5 flex items-center gap-4 text-left shadow-lg")}>
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white shrink-0"><Sparkles className="w-5 h-5" /></div>
                    <div className="flex-1">
                      <p className="text-xs font-black text-accent uppercase mb-1">{item.remedyName?.hi}</p>
                      <p className="font-bold text-sm line-clamp-2">{item.answer}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-accent" />
                  </button>
                ))}
              </div>
            )}

            {/* Remedies Section */}
            {unreadRemedies.length > 0 ? (
              <div className="space-y-4 pb-12">
                <div className="flex items-center gap-2 px-2 py-1">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-60">{isHindi ? 'नए नुस्खे' : 'New Remedies'}</span>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {unreadRemedies.map((remedy) => (
                    <button key={remedy.id} onClick={() => handleResultClick(remedy)} className={cn("w-full p-5 rounded-2xl border transition-all text-left flex items-center gap-5 group shadow-sm", isNight ? "bg-white/5 border-white/5" : "bg-white border-primary/5")}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shrink-0 bg-accent/10 text-accent">{toEnglishDigits(remedy.serialNumber === "Live" ? "★" : remedy.serialNumber)}</div>
                      <div className="flex-1 min-w-0"><h4 className="font-bold text-lg leading-tight truncate">{toEnglishDigits(remedy.name?.[lang] || '')}</h4></div>
                      <ChevronRight className="w-5 h-5 opacity-30 group-hover:opacity-100 group-hover:text-accent group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </div>
            ) : privateAnswers.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 opacity-40 text-center space-y-4">
                <MessageCircleOff className="w-20 h-20" />
                <p className="font-black text-xl">{isHindi ? 'कोई नया अपडेट नहीं है' : 'No new updates'}</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
