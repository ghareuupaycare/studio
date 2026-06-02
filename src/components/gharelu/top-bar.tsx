'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Languages, Moon, Sun, Menu, Heart, Info, Mail, ShieldCheck, FileText, AlertTriangle } from 'lucide-react';
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

  const headerBtnClass = "text-white/90 hover:bg-white/5 hover:text-[#FBBF24] active:text-[#B45309] active:scale-90 transition-all duration-200 border-none shadow-none focus-visible:ring-0 flex items-center justify-center h-10 w-10 p-0 rounded-full";

  const legalPages = [
    {
      id: 'about',
      icon: <Info className="w-5 h-5" />,
      title: isHindi ? 'हमारे बारे में' : 'About Us',
      content: isHindi 
        ? "घरेलू उपाय केयर में आपका स्वागत है। हमारा यह प्रयास भारत के महान ऋषि-मुनियों की पावन परंपरा, वैद्य जी के दिव्य अनुभवों और शास्त्रों के उस अकाट्य ज्ञान का एक आधुनिक संकलन है, जो सदियों से हमारी रसोई के कोनों में छिपा था। हमारा एकमात्र उद्देश्य आपको रसायनों और कड़वी दवाइयों की दुनिया से दूर ले जाकर, प्रकृति की गोद में पूर्ण स्वास्थ्य और दीर्घायु प्रदान करना है। यह सिर्फ एक एप्लीकेशन नहीं, बल्कि आपके पूरे परिवार की निरोगी काया और खुशहाली के लिए समर्पित एक नि:स्वार्थ सेवा है।"
        : "Welcome to Gharelu Upay Care. This initiative is a humble digital compilation of the sacred heritage of ancient Indian Rishis, the profound clinical experiences of our revered Vaidya Ji, and the timeless wisdom of Ayurvedic scriptures. Our sole objective is to guide you away from chemical-laden synthetic drugs and back to the healing embrace of nature, ensuring absolute wellness and longevity. This is not just an application, but a selfless service dedicated to your family's health and happiness."
    },
    {
      id: 'contact',
      icon: <Mail className="w-5 h-5" />,
      title: isHindi ? 'हमसे संपर्क करें' : 'Contact Us',
      content: isHindi
        ? "हमारा यह मंच पूरी तरह से आपकी सेवा और सहायता के लिए हमेशा खुला है। यदि आपके पास हमारे लिए कोई अमूल्य सुझाव, मार्गदर्शन या स्वास्थ्य से जुड़ा कोई विचार है, तो आप हमसे सीधे संपर्क कर सकते हैं। आपके हर एक संदेश का हमारे इस परिवार में पूरे आदर के साथ स्वागत किया जाएगा और हमारी टीम आपकी सेवा में सदैव तत्पर रहेगी। (संपर्क माध्यम भविष्य के अपडेट के लिए सुरक्षित है)।"
        : "This platform is permanently open and dedicated to serving your wellness journey. If you have any invaluable suggestions, divine guidance, or health insights to share with us, you are most welcome to reach out. Every message from you will be received with the utmost respect within our family, and our team remains thoroughly committed to assisting you at all times. (Contact channel reserved for future updates)."
    },
    {
      id: 'privacy',
      icon: <ShieldCheck className="w-5 h-5" />,
      title: isHindi ? 'गोपनीयता नीति' : 'Privacy Policy',
      content: isHindi
        ? "आपकी गोपनीयता और सुरक्षा हमारे लिए उतनी ही पवित्र और महत्वपूर्ण है, जितने कि हमारे ये प्राचीन नुस्खे। सबसे विशेष बात यह है कि इस ऐप का उपयोग करने के लिए आपको किसी भी प्रकार के लॉगिन, रजिस्ट्रेशन या पासवर्ड की कोई आवश्यकता नहीं है। आप बिना किसी झंझट और बिना कोई व्यक्तिगत जानकारी साझा किए, पूरी तरह से स्वतंत्र होकर और एक सुरक्षित वातावरण में इस आयुर्वेद के महासागर का लाभ उठा सकते हैं।"
        : "Your privacy and digital security are as sacred and paramount to us as our traditional remedies. Most importantly, this application requires absolutely no login, registration, or password creation to access the data. You can explore this vast ocean of Ayurvedic wisdom with complete freedom, total peace of mind, and zero hassle, without ever sharing any personal credentials."
    },
    {
      id: 'terms',
      icon: <FileText className="w-5 h-5" />,
      title: isHindi ? 'नियम और शर्तें' : 'Terms & Conditions',
      content: isHindi
        ? "यह पावन मंच विशुद्ध रूप से आयुर्वेद के प्रचार, प्रसार और जन-कल्याण के उद्देश्य से बनाया गया है। इस ऐप का उपयोग करते समय आप हमारी प्राचीन चिकित्सा पद्धतियों के प्रति पूर्ण सम्मान प्रकट करने और इसके सात्विक दिशा-निर्देशों का पालन करने की सहमति देते हैं। बिना किसी व्यावसायिक रुकावट के, हमारा प्रयास आप तक बिना किसी शुल्क के सर्वश्रेष्ठ ज्ञान को निरंतर पहुंचाते रहना है।"
        : "This sacred platform has been uniquely crafted for the propagation, promotion, and global welfare of traditional Ayurveda. By utilizing this application, you express your deep respect for our ancient medical traditions and agree to follow its holistic guidelines. Our promise is to continuously deliver this supreme knowledge directly to you without any commercial barriers or fees."
    },
    {
      id: 'disclaimer',
      icon: <AlertTriangle className="w-5 h-5" />,
      title: isHindi ? 'महत्वपूर्ण चेतावनी' : 'Disclaimer',
      content: isHindi
        ? "यहाँ दिए गए सभी घरेलू उपाय और नुस्खे शास्त्रों के सार और वैद्य जी के प्रामाणिक अनुभवों पर आधारित हैं, जो केवल आपके सामान्य ज्ञान और शैक्षिक उद्देश्य के लिए हैं। कृपया याद रखें कि यह किसी योग्य डॉक्टर का अंतिम विकल्प नहीं है। किसी भी गंभीर, पुरानी या जटिल बीमारी की स्थिति में, अपने विवेक का उपयोग करते हुए सदैव अपने नजदीकी क्वालिफाइड चिकित्सक या डॉक्टर से परामर्श अवश्य लें।"
        : "All home remedies and formulations shared here are rooted in scriptural essence and the authentic experiences of Vaidya Ji, intended strictly for educational and informational purposes. Please remember this is not a substitute for professional medical treatment. In case of any chronic, severe, or complex health conditions, always consult a qualified healthcare professional or physician."
    }
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 w-full h-14 flex items-center px-4 sm:px-6 shadow-lg transition-all duration-500 overflow-hidden",
      isNight ? "bg-black/95 backdrop-blur-md border-b border-white/20" : "bg-[#14532D]/95 backdrop-blur-md border-b border-white/10"
    )}>
      <div className="flex items-center gap-1 sm:gap-4 flex-1 min-w-0">
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
                        "leading-relaxed text-sm pt-2 pb-6 px-2",
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
          "transition-all duration-300 truncate max-w-[140px] xs:max-w-[180px] sm:max-w-none"
        )}>
          {isHindi ? 'घरेलू उपाय केयर' : 'Gharelu Upay Care'}
        </h1>
      </div>
      
      <div className="flex items-center gap-1 sm:gap-2 shrink-0 h-full">
        <Button variant="ghost" size="icon" onClick={onOpenFavorites} className={cn(headerBtnClass, hasFavorites && "text-accent")}>
          <Heart className={cn("w-5 h-5", hasFavorites && "fill-current")} />
        </Button>

        <Button variant="ghost" size="icon" onClick={onOpenNotifications} className={headerBtnClass}>
          <Bell className={cn("w-5 h-5 text-white", hasNotifications && "fill-current")} />
        </Button>

        <Button variant="ghost" size="icon" onClick={onToggleLanguage} className={headerBtnClass}>
          <Languages className="w-5 h-5" />
        </Button>

        <Button variant="ghost" size="icon" onClick={onToggleTheme} className={headerBtnClass}>
          {isNight ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} lang={lang} theme={theme} onSelectRemedy={(rId, cId) => onSelectRemedy?.(rId, cId)} />
    </header>
  );
};