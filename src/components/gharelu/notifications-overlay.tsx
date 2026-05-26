'use client';

import React, { useMemo } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Bell, ChevronRight, Sparkles, MessageCircleOff } from 'lucide-react';
import { REMEDIES } from '@/lib/remedy-data';
import { Language, Theme } from '@/app/page';
import { cn, toEnglishDigits } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NotificationsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  theme: Theme;
  readNotifications: string[];
  onMarkAsRead: (id: string) => void;
  onSelectRemedy: (remedyId: string, categoryId: string) => void;
}

export const NotificationsOverlay = ({ 
  isOpen, 
  onClose, 
  lang, 
  theme, 
  readNotifications,
  onMarkAsRead,
  onSelectRemedy 
}: NotificationsOverlayProps) => {
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';

  // Only display the single most recently added/updated remedy if it hasn't been read
  const unreadLatestRemedy = useMemo(() => {
    const latest = REMEDIES[REMEDIES.length - 1];
    if (!latest) return null;
    return readNotifications.includes(latest.id) ? null : latest;
  }, [readNotifications]);

  const handleResultClick = (remedyId: string, illnessId: string) => {
    let catId = 'fever'; 
    if (illnessId.includes('joint')) catId = 'joints';
    if (illnessId.includes('cough') || illnessId.includes('respiratory')) catId = 'respiratory';
    if (illnessId.includes('digestion') || illnessId.includes('acidity')) catId = 'digestion';

    // Mark as read and navigate
    onMarkAsRead(remedyId);
    onSelectRemedy(remedyId, catId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "fixed top-0 left-0 translate-x-0 translate-y-0 w-full h-[50vh] max-w-none p-0 border-none flex flex-col transition-all duration-300 ease-in-out rounded-none shadow-2xl z-[100]",
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
            {unreadLatestRemedy ? (
              <div className="space-y-4 pb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 px-2 py-1 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-60">
                    {isHindi ? 'नवीनतम नुस्खा' : 'Latest Remedy'}
                  </span>
                </div>

                <button
                  onClick={() => handleResultClick(unreadLatestRemedy.id, unreadLatestRemedy.illnessId)}
                  className={cn(
                    "w-full p-4 rounded-xl border transition-all text-left flex items-center gap-4 group cursor-pointer active:scale-[0.98]",
                    isNight 
                      ? "bg-white/5 border-white/5 hover:border-amber-400 text-white" 
                      : "bg-white border-primary/5 hover:border-amber-400 text-primary shadow-sm"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm shrink-0 transition-colors duration-500",
                    isNight ? "bg-white/5 text-amber-400" : "bg-amber-400/5 text-amber-400"
                  )}>
                    {toEnglishDigits(unreadLatestRemedy.serialNumber)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-base leading-tight truncate">
                      {toEnglishDigits(unreadLatestRemedy.name[lang])}
                    </h4>
                    <p className="text-[11px] opacity-60 truncate mt-0.5 font-medium">
                      {toEnglishDigits(unreadLatestRemedy.introduction[lang])}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:text-amber-400" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 opacity-40">
                <MessageCircleOff className="w-16 h-16" />
                <div className="space-y-1">
                  <p className="font-black text-lg">
                    {isHindi ? 'अभी कोई नया अपडेट नहीं है' : 'No new updates right now'}
                  </p>
                  <p className="text-xs">
                    {isHindi ? 'वैद्य जी जल्द ही नए नुस्खे यहाँ जोड़ेंगे।' : 'Vaidya Ji will add new remedies here soon.'}
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
