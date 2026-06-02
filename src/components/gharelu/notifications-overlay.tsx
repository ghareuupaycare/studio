'use client';

import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Bell, ChevronRight, Sparkles, MessageCircleOff } from 'lucide-react';
import { Remedy } from '@/lib/remedy-data';
import { Language, Theme } from '@/app/page';
import { cn, toEnglishDigits } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NotificationsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  theme: Theme;
  unreadRemedies: Remedy[];
  onMarkAsRead: (id: string) => void;
  onSelectRemedy: (remedyId: string, categoryId: string) => void;
}

export const NotificationsOverlay = ({ 
  isOpen, 
  onClose, 
  lang, 
  theme, 
  unreadRemedies,
  onMarkAsRead,
  onSelectRemedy 
}: NotificationsOverlayProps) => {
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';

  const handleResultClick = (remedyId: string) => {
    // Currently all remedies belong to fever_flu
    const categoryId = 'fever_flu';
    onMarkAsRead(remedyId);
    onSelectRemedy(remedyId, categoryId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "fixed top-0 left-0 translate-x-0 translate-y-0 w-full h-[60vh] max-w-none p-0 border-none flex flex-col transition-all duration-300 ease-in-out rounded-none shadow-2xl z-[100]",
          "active:ring-0 focus:ring-0 focus-visible:ring-0 outline-none",
          "[&>button]:text-amber-400 [&>button]:opacity-100 [&>button]:scale-125",
          isNight ? "bg-[#0a110d] text-white" : "bg-[#FDFBF7] text-foreground"
        )}
      >
        <div className={cn(
          "shrink-0 p-6 pt-8",
          isNight ? "bg-black/40 border-b border-white/10" : "bg-[#14532D] border-b border-white/10"
        )}>
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-amber-400" />
            <DialogTitle className="text-white text-xl font-headline font-black">
              {isHindi ? 'क्या नया है?' : "What's New?"}
            </DialogTitle>
          </div>
          <p className="text-white/60 text-xs mt-2 font-medium">
            {isHindi ? 'नवीनतम पारंपरिक स्वास्थ्य अपडेट' : 'Latest traditional health updates'}
          </p>
        </div>

        <ScrollArea className="flex-1 w-full bg-transparent">
          <div className="p-4 w-full max-w-2xl mx-auto">
            {unreadRemedies.length > 0 ? (
              <div className="space-y-4 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 px-2 py-1 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-60">
                    {isHindi ? 'अपठित नुस्खे और अपडेट' : 'Unread Remedies & Updates'}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {unreadRemedies.map((remedy) => (
                    <button
                      key={remedy.id}
                      onClick={() => handleResultClick(remedy.id)}
                      className={cn(
                        "w-full p-5 rounded-2xl border transition-all text-left flex items-center gap-5 group cursor-pointer active:scale-[0.98] shadow-sm",
                        isNight 
                          ? "bg-white/5 border-white/5 hover:border-amber-400/50 text-white" 
                          : "bg-white border-primary/5 hover:border-amber-400/50 text-primary"
                      )}
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shrink-0 transition-colors duration-500",
                        isNight ? "bg-white/5 text-amber-400" : "bg-amber-400/10 text-amber-400"
                      )}>
                        {toEnglishDigits(remedy.serialNumber)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-lg leading-tight truncate mb-1">
                          {toEnglishDigits(remedy.name?.[lang] || '')}
                        </h4>
                        <p className="text-[12px] opacity-70 truncate font-medium">
                          {toEnglishDigits(Array.isArray(remedy.introduction[lang]) ? remedy.introduction[lang][0] : remedy.introduction[lang])}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 opacity-30 group-hover:opacity-100 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 opacity-40">
                <MessageCircleOff className="w-20 h-20" />
                <div className="space-y-1">
                  <p className="font-black text-xl">
                    {isHindi ? 'अभी कोई नया अपडेट नहीं है' : 'No new updates right now'}
                  </p>
                  <p className="text-sm">
                    {isHindi ? 'वैद्य जी जल्द ही नए नुस्खे और अपडेट यहाँ जोड़ेंगे।' : 'Vaidya Ji will add new remedies and updates here soon.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
