import React from 'react';
import { Bell, Search, Languages, Moon, Sun, Menu, X, Info, Mail, ShieldCheck, FileText, AlertTriangle } from 'lucide-react';
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

interface TopBarProps {
  lang: Language;
  theme: Theme;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
}

export const TopBar = ({ lang, theme, onToggleLanguage, onToggleTheme }: TopBarProps) => {
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';

  const headerBtnClass = "text-white/90 hover:bg-white/5 hover:text-[#FBBF24] active:text-[#B45309] active:scale-95 transition-all duration-200 border-none shadow-none focus-visible:ring-0";

  const legalPages = [
    {
      id: 'about',
      icon: <Info className="w-5 h-5" />,
      title: isHindi ? 'हमारे बारे में' : 'About Us',
      content: isHindi 
        ? "'घरेलू उपाय केयर' पारंपरिक भारतीय आयुर्वेद और सदियों पुराने अचूक घरेलू नुस्खों को पुनर्जीवित करने का एक पावन डिजिटल संग्रह है। हमारा एकमात्र मिशन इंटरनेट पर फैली गलत जानकारियों को हटाकर, आप तक ऋषियों-मुनियों के बताए वो सच्चे, प्रामाणिक और परखे हुए उपाय पहुंचाना है जो आपकी रसोई में ही छिपे हैं। हमारा लक्ष्य बिना किसी रासायनिक दवाओं या साइड-इफेक्ट के, शुद्ध और प्राकृतिक घरेलू पद्धतियों के माध्यम से हर परिवार को एक स्वस्थ, समृद्ध और रोगमुक्त जीवनशैली देना है, ताकि आपका घर और आपकी रसोई ही आपकी पहली पाठशाला बने।"
        : "Gharelu Upay Care is a sacred digital collection dedicated to reviving traditional Indian Ayurveda and centuries-old home remedies. Our mission is to provide authentic, time-tested remedies hidden in your kitchen, ensuring a healthy, chemical-free, and disease-free lifestyle for every family."
    },
    {
      id: 'contact',
      icon: <Mail className="w-5 h-5" />,
      title: isHindi ? 'हमसे संपर्क करें' : 'Contact Us',
      content: isHindi
        ? "हम अपने पाठकों और दर्शकों की मदद के लिए हमेशा तत्पर हैं। यदि आपके पास हमारे घरेलू नुस्खों, स्वास्थ्य युक्तियों या हमारी वेबसाइट से जुड़ा कोई भी सवाल, सुझाव या प्रतिक्रिया है, तो आप हमसे बेझिझक संपर्क कर सकते हैं। आप हमें हमारे आधिकारिक ईमेल या सोशल मीडिया हैंडल के ज़रिए जुड़ सकते हैं। हम आपके संदेश का जवाब 24 से 48 घंटों के भीतर देने का पूरा प्रयास करेंगे।"
        : "We are always ready to help our readers. If you have any questions or suggestions regarding our remedies or website, please feel free to contact us. We strive to respond within 24-48 hours."
    },
    {
      id: 'privacy',
      icon: <ShieldCheck className="w-5 h-5" />,
      title: isHindi ? 'गोपनीयता नीति' : 'Privacy Policy',
      content: isHindi
        ? "हमारे लिए आपकी गोपनीयता सबसे बढ़कर है। 'घरेलू उपाय केयर' वेबसाइट का उपयोग करने के लिए आपको कोई भी लॉग-इन (Login), साइन-अप या अपना मोबाइल नंबर/ईमेल देने की बिल्कुल ज़रूरत नहीं है। हम अपने किसी भी दर्शक का कोई व्यक्तिगत डेटा इकट्ठा नहीं करते हैं। आप बिना किसी पाबंदी या डर के, पूरी आज़ादी से सभी नुस्खे देख सकते हैं। हमारी साइट पर जो विज्ञापन भविष्य में दिखेंगे, वे भी गूगल की पूरी तरह सुरक्षित और पारदर्शी नीतियों के तहत ही होंगे।"
        : "Your privacy is paramount. You don't need to log in or provide any personal details to use our site. We do not collect personal data, and future advertisements will follow Google's secure and transparent policies."
    },
    {
      id: 'terms',
      icon: <FileText className="w-5 h-5" />,
      title: isHindi ? 'नियम और शर्तें' : 'Terms & Conditions',
      content: isHindi
        ? "इस वेबसाइट पर दी गई सभी सामग्रियां और नुस्खे केवल आपकी सामान्य जानकारी और ज्ञानवर्धन के लिए हैं। इस साइट का उपयोग करके, आप हमारे नियमों को स्वीकार करते हैं। यहाँ दी गई किसी भी जानकारी या नुस्खे का उपयोग आप अपनी स्वेच्छा और जिम्मेदारी पर करते हैं।"
        : "All materials on this site are for general information only. By using this site, you agree to our terms. Use the information provided at your own discretion and responsibility."
    },
    {
      id: 'disclaimer',
      icon: <AlertTriangle className="w-5 h-5" />,
      title: isHindi ? 'महत्वपूर्ण चेतावनी' : 'Disclaimer',
      content: isHindi
        ? "एक छोटी सी प्यारी सलाह: इस वेबसाइट पर दिए गए सभी घरेलू नुस्खे हमारे पारंपरिक ज्ञान और बुजुर्गों के अनुभवों पर आधारित हैं। इन्हें आपकी जानकारी बढ़ाने के लिए सरल भाषा में साझा किया गया है। वैसे तो ये उपाय पूरी तरह प्राकृतिक हैं, लेकिन हर व्यक्ति का शरीर और उसकी तासीर अलग होती है। इसलिए किसी भी बड़े नुस्खे को आजमाने से पहले, या यदि समस्या पुरानी और गंभीर है, तो अपने नजदीकी वैद्य जी या डॉक्टर से एक बार सलाह ज़रूर ले लें। स्वस्थ रहें, सुरक्षित रहें!"
        : "Advice: These remedies are based on traditional knowledge. While natural, everyone's body is different. Consult a qualified Vaidya or doctor before trying any major remedy or if conditions are severe."
    }
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full h-20 flex items-center px-6 shadow-md transition-colors duration-500",
      isNight ? "bg-black border-b border-white/20" : "bg-[#14532D] border-b border-white/10"
    )}>
      <div className="flex items-center gap-4">
        {/* Sidebar Menu Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className={headerBtnClass}>
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className={cn(
              "w-[85%] sm:w-[400px] p-0 overflow-hidden border-none transition-colors duration-500",
              isNight ? "bg-[#121b15] shadow-[5px_0_30px_rgba(0,0,0,0.8)]" : "bg-[#FDFBF7] shadow-[5px_0_30px_rgba(0,0,0,0.1)]"
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
                <p className="text-xs text-white/70 font-bold uppercase tracking-widest mt-1">
                  {isHindi ? 'स्वस्थ जीवन की कुंजी' : 'Key to Healthy Living'}
                </p>
              </SheetHeader>
              
              <ScrollArea className="flex-1 p-6">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {legalPages.map((page) => (
                    <AccordionItem 
                      key={page.id} 
                      value={page.id} 
                      className={cn(
                        "transition-colors duration-500",
                        isNight ? "border-b-white/10" : "border-b-primary/10"
                      )}
                    >
                      <AccordionTrigger className={cn(
                        "hover:no-underline transition-colors py-4",
                        isNight ? "hover:text-white" : "hover:text-primary"
                      )}>
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2 rounded-xl transition-colors duration-500",
                            isNight ? "bg-white/10 text-white" : "bg-primary/5 text-primary"
                          )}>
                            {page.icon}
                          </div>
                          <span className={cn(
                            "font-bold text-lg transition-colors duration-500",
                            isNight ? "text-zinc-100" : "text-foreground"
                          )}>
                            {page.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className={cn(
                        "leading-relaxed text-base pt-2 pb-6 px-2 transition-colors duration-500",
                        isNight ? "text-zinc-400" : "text-muted-foreground"
                      )}>
                        {page.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                <div className={cn(
                  "mt-12 p-6 rounded-[2rem] border transition-colors duration-500",
                  isNight ? "bg-white/5 border-white/10" : "bg-accent/5 border-accent/10"
                )}>
                  <p className={cn(
                    "text-xs font-black uppercase tracking-widest text-center mb-2",
                    isNight ? "text-white/60" : "text-accent"
                  )}>
                    {isHindi ? 'शुद्ध एवं सात्विक' : 'Pure & Holistic'}
                  </p>
                  <p className={cn(
                    "text-[10px] text-center uppercase tracking-[0.2em]",
                    isNight ? "text-white/40" : "text-muted-foreground"
                  )}>
                    © 2024 GHARELU UPAY CARE
                  </p>
                </div>
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>

        <h1 className="text-2xl font-headline font-black tracking-tight text-[#FDFBF7]">
          {isHindi ? 'घरेलू उपाय केयर' : 'Gharelu Upay Care'}
        </h1>
      </div>
      
      <div className="flex-1" />
      
      <div className="flex items-center gap-1 sm:gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleLanguage}
          className={headerBtnClass}
        >
          <Languages className="w-5 h-5" />
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleTheme}
          className={headerBtnClass}
        >
          {isNight ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        <Button variant="ghost" size="icon" className={headerBtnClass}>
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className={headerBtnClass}>
          <Search className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};
