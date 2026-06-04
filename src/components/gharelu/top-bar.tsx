
'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Languages, Moon, Sun, Menu, Heart, Info, Mail, ShieldCheck, FileText, AlertTriangle, Lock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Language, Theme } from '@/app/page';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchOverlay } from './search-overlay';
import { Remedy } from '@/lib/remedy-data';

interface TopBarProps {
  lang: Language;
  theme: Theme;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  onSelectRemedy?: (remedyId: string, categoryId: string) => void;
  onOpenFavorites?: () => void;
  onOpenNotifications?: () => void;
  hasFavorites?: boolean;
  hasNotifications?: boolean;
  allRemedies: Remedy[];
}

export const TopBar = ({ 
  lang, 
  theme, 
  onToggleLanguage, 
  onToggleTheme, 
  onSelectRemedy, 
  onOpenFavorites,
  onOpenNotifications,
  hasFavorites,
  hasNotifications,
  allRemedies
}: TopBarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';
  const router = useRouter();

  useEffect(() => {
    const handleOpenSearch = () => setIsSearchOpen(true);
    window.addEventListener('open-gharelu-search', handleOpenSearch);
    return () => window.removeEventListener('open-gharelu-search', handleOpenSearch);
  }, []);

  const headerBtnClass = "text-white/90 hover:bg-white/5 hover:text-[#FBBF24] active:text-[#B45309] active:scale-90 transition-all duration-200 border-none shadow-none focus-visible:ring-0 flex items-center justify-center h-10 w-10 p-0 rounded-full";

  const legalPages = [
    { id: 'about', icon: <Info className="w-4 h-4" />, title: isHindi ? 'हमारे बारे में' : 'About Us', content: isHindi ? "घरेलू उपाय केयर में आपका स्वागत है। हमारा उद्देश्य आयुर्वेद को आधुनिक तरीके से आप तक पहुंचाना है।" : "Welcome to Gharelu Upay Care. Our mission is to bring Ayurveda to you in a modern way." },
    { id: 'contact', icon: <Mail className="w-4 h-4" />, title: isHindi ? 'हमसे संपर्क करें' : 'Contact Us', content: isHindi ? "आप हमसे कभी भी संपर्क कर सकते हैं।" : "You can contact us anytime." },
    { id: 'privacy', icon: <ShieldCheck className="w-4 h-4" />, title: isHindi ? 'गोपनीयता नीति' : 'Privacy Policy', content: isHindi ? "आपकी गोपनीयता हमारे लिए महत्वपूर्ण है।" : "Your privacy is important to us." },
    { id: 'disclaimer', icon: <AlertTriangle className="w-4 h-4" />, title: isHindi ? 'महत्वपूर्ण चेतावनी' : 'Disclaimer', content: isHindi ? "यह चिकित्सा सलाह नहीं है।" : "This is not medical advice." }
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 w-full h-14 flex items-center px-4 sm:px-6 shadow-lg transition-all duration-500",
      isNight ? "bg-black/95 backdrop-blur-md border-b border-white/20" : "bg-[#14532D]/95 backdrop-blur-md border-b border-white/10"
    )}>
      <div className="flex items-center gap-1 sm:gap-4 flex-1 min-w-0">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className={headerBtnClass}><Menu className="w-6 h-6" /></Button>
          </SheetTrigger>
          <SheetContent side="left" className={cn("w-[85%] sm:w-[350px] p-0 border-none transition-colors", isNight ? "bg-[#121b15]" : "bg-[#FDFBF7]")}>
            <div className="flex flex-col h-full">
              <SheetHeader className={cn("p-6 text-white transition-colors", isNight ? "bg-black border-b border-white/10" : "bg-[#14532D]")}>
                <SheetTitle className="text-lg font-headline font-black text-white">{isHindi ? 'घरेलू उपाय केयर' : 'Gharelu Upay Care'}</SheetTitle>
              </SheetHeader>
              <ScrollArea className="flex-1 p-5">
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {legalPages.map((page) => (
                    <AccordionItem key={page.id} value={page.id} className="border-none">
                      <AccordionTrigger className="hover:no-underline py-3">
                        <div className="flex items-center gap-3">
                          <div className={cn("p-1.5 rounded-lg", isNight ? "bg-white/10 text-white" : "bg-primary/5 text-primary")}>{page.icon}</div>
                          <span className={cn("font-bold text-sm", isNight ? "text-zinc-100" : "text-foreground")}>{page.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="opacity-90 px-1">{page.content}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <div className="mt-6">
                  <SheetClose asChild>
                    <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl font-bold text-sm" onClick={() => router.push('/admin-login')}>
                      <Lock className="w-4 h-4" /> {isHindi ? 'एडमिन लॉगिन' : 'Admin Login'}
                    </Button>
                  </SheetClose>
                </div>
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-bold text-[#FDFBF7] truncate">{isHindi ? 'घरेलू उपाय केयर' : 'Gharelu Upay Care'}</h1>
      </div>
      
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <Button variant="ghost" size="icon" onClick={onOpenFavorites} className={cn(headerBtnClass, hasFavorites && "text-accent")}>
          <Heart className={cn("w-5 h-5", hasFavorites && "fill-current")} />
        </Button>
        <Button variant="ghost" size="icon" onClick={onOpenNotifications} className={headerBtnClass}>
          <Bell className={cn("w-5 h-5 text-white", hasNotifications && "fill-current")} />
        </Button>
        <Button variant="ghost" size="icon" onClick={onToggleLanguage} className={headerBtnClass}><Languages className="w-5 h-5" /></Button>
        <Button variant="ghost" size="icon" onClick={onToggleTheme} className={headerBtnClass}>{isNight ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</Button>
      </div>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        lang={lang} 
        theme={theme} 
        onSelectRemedy={(rId, cId) => onSelectRemedy?.(rId, cId)} 
        allRemedies={allRemedies}
      />
    </header>
  );
};
