'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Search, Languages, Moon, Sun, Menu, Heart, Info, Mail, ShieldCheck, FileText, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Language, Theme } from '@/app/page';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchOverlay } from './search-overlay';

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
  hasNotifications
}: TopBarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';

  useEffect(() => {
    const handleOpenSearch = () => setIsSearchOpen(true);
    window.addEventListener('open-gharelu-search', handleOpenSearch);
    return () => window.removeEventListener('open-gharelu-search', handleOpenSearch);
  }, []);

  const headerBtnClass = "text-white/90 hover:bg-white/5 hover:text-[#FBBF24] active:text-[#B45309] active:scale-95 transition-all duration-200 border-none shadow-none focus-visible:ring-0";

  const legalPages = [
    {
      id: 'about',
      icon: <Info className="w-5 h-5" />,
      title: isHindi ? 'हमारे बारे में' : 'About Us',
      content: isHindi 
        ? "'घरेलू उपाय केयर' पारंपरिक भारतीय आयुर्वेद और सदियों पुराने अचूक घरेलू नुस्खों को पुनर्जीवित करने का एक पावन डिजिटल संग्रह है। हमारा एकमात्र मिशन इंटरनेट पर फैली गलत जानकारियों को हटाकर, आप तक ऋषियों-मुनियों के बताए वो सच्चे, प्रामाणिक और परखे हुए उपाय पहुंचाना है जो आपकी रसोई में ही छिपे हैं। हमारा लक्ष्य बिना किसी रासायनिक दवाओं या साइड-इफेक्ट के, शुद्ध और प्राकृतिक घरेलू पद्धतियों के माध्यम से हर परिवार को एक स्वस्थ, समृद्ध और रोगमुक्त जीवनशैली देना है।"
        : "Gharelu Upay Care is a sacred digital collection dedicated to reviving traditional Indian Ayurveda and centuries-old home remedies."
    },
    {
      id: 'contact',
      icon: <Mail className="w-5 h-5" />,
      title: isHindi ? 'हमसे संपर्क करें' : 'Contact Us',
      content: isHindi
        ? "हम अपने पाठकों की मदद के लिए हमेशा तत्पर हैं। यदि आपके पास कोई सुझाव या प्रतिक्रिया है, तो आप हमसे बेझिझक संपर्क कर सकते हैं।"
        : "We are always ready to help our readers. If you have any questions or suggestions, please feel free to contact us."
    },
    {
      id: 'privacy',
      icon: <ShieldCheck className="w-5 h-5" />,
      title: isHindi ? 'गोपनीयता नीति' : 'Privacy Policy',
      content: isHindi
        ? "हमारे लिए आपकी गोपनीयता सबसे बढ़कर है। 'घरेलू उपाय केयर' वेबसाइट का उपयोग करने के लिए आपको कोई भी लॉग-इन (Login) करने की ज़रूरत नहीं है।"
        : "Your privacy is paramount. You don't need to log in to use our site. We do not collect personal data."
    },
    {
      id: 'terms',
      icon: <FileText className="w-5 h-5" />,
      title: isHindi ? 'नियम और शर्तें' : 'Terms & Conditions',
      content: isHindi
        ? "इस वेबसाइट पर दी गई सभी सामग्रियां केवल आपकी सामान्य जानकारी के लिए हैं। यहाँ दी गई किसी भी जानकारी का उपयोग आप अपनी स्वेच्छा पर करते हैं।"
        : "All materials on this site are for general information only. Use the information provided at your own discretion."
    },
    {
      id: 'disclaimer',
      icon: <AlertTriangle className="w-5 h-5" />,
      title: isHindi ? 'महत्वपूर्ण चेतावनी' : 'Disclaimer',
      content: isHindi
        ? "इस वेबसाइट पर दिए गए सभी घरेलू नुस्खे पारंपरिक ज्ञान पर आधारित हैं। किसी भी बड़े नुस्खे को आजमाने से पहले डॉक्टर से सलाह ज़रूर लें।"
        : "These remedies are based on traditional knowledge. Consult a qualified Vaidya or doctor before trying any major remedy."
    }
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full h-20 flex items-center px-6 shadow-md transition-colors duration-500",
      isNight ? "bg-black border-b border-white/20" : "bg-[#14532D] border-b border-white/10"
    )}>
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className={headerBtnClass}>
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className={cn(
              "w-[70%] sm:w-[350px] p-0 overflow-hidden border-none transition-colors duration-500",
              isNight ? "bg-[#121b15]" : "bg-[#FDFBF7]"
            )}
          >
            <div className="flex flex-col h-full">
              <SheetHeader className={cn(
                "p-8 text-white transition-colors duration-500",
                isNight ? "bg-black border-b border-white/10" : "bg-primary"
              )}>
                <SheetTitle className="text-2xl font-headline font-black text-white">
                  {isHindi ? 'घरेलू उपाय केयर' : 'Gharelu Upay Care'}
                </SheetTitle>
              </SheetHeader>
              
              <ScrollArea className="flex-1 p-6">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {legalPages.map((page) => (
                    <AccordionItem key={page.id} value={page.id}>
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2 rounded-xl",
                            isNight ? "bg-white/10 text-white" : "bg-primary/5 text-primary"
                          )}>
                            {page.icon}
                          </div>
                          <span className={cn(
                            "font-bold text-lg",
                            isNight ? "text-zinc-100" : "text-foreground"
                          )}>
                            {page.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className={cn(
                        "leading-relaxed text-base pt-2 pb-6 px-2",
                        isNight ? "text-zinc-400" : "text-muted-foreground"
                      )}>
                        {page.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                <div className="mt-12 p-6 rounded-[2rem] border transition-colors opacity-60">
                  <p className="text-[12px] text-center uppercase tracking-widest">
                    © 2024 GHARELU UPAY CARE
                  </p>
                </div>
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>

        <h1 className={cn(
          "text-lg font-bold whitespace-nowrap text-[#FDFBF7]",
          "transition-all duration-300"
        )}>
          {isHindi ? 'घरेलू उपाय केयर' : 'Gharelu Upay Care'}
        </h1>
      </div>
      
      <div className="flex-1" />
      
      <div className="flex items-center gap-1 sm:gap-2">
        <Button variant="ghost" size="icon" onClick={onOpenFavorites} className={cn(headerBtnClass, hasFavorites && "text-accent fill-accent")}>
          <Heart className={cn("w-5 h-5", hasFavorites && "fill-current")} />
        </Button>

        <Button variant="ghost" size="icon" onClick={onToggleLanguage} className={headerBtnClass}>
          <Languages className="w-5 h-5" />
        </Button>

        <Button variant="ghost" size="icon" onClick={onToggleTheme} className={headerBtnClass}>
          {isNight ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        <Button variant="ghost" size="icon" className={headerBtnClass} onClick={() => setIsSearchOpen(true)}>
          <Search className="w-5 h-5" />
        </Button>
      </div>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} lang={lang} theme={theme} onSelectRemedy={(rId, cId) => onSelectRemedy?.(rId, cId)} />
    </header>
  );
};