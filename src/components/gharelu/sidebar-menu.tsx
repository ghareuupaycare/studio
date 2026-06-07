'use client';

import React from 'react';
import { 
  Info, Mail, ShieldCheck, FileText, AlertTriangle, Lock, X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  SheetContent, SheetHeader, SheetTitle, SheetClose 
} from "@/components/ui/sheet";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from '@/lib/utils';
import { Language, Theme } from '@/app/page';
import { useRouter } from 'next/navigation';

interface SidebarMenuProps {
  lang: Language;
  theme: Theme;
}

export const SidebarMenu = ({ lang, theme }: SidebarMenuProps) => {
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';
  const router = useRouter();

  const legalPages = [
    { 
      id: 'about', 
      icon: <Info className="w-4 h-4" />, 
      title: isHindi ? 'हमारे बारे में' : 'About Us', 
      content: isHindi 
        ? "प्रिय पाठक, 'घरेलू उपाय केयर' परिवार में आपका आत्मीय स्वागत है। हमारा एकमात्र पावन उद्देश्य भारत की सदियों पुरानी, समृद्ध और प्रामाणिक आयुर्वेद परंपरा तथा घरेलू नुस्खों को आधुनिक तकनीक के माध्यम से सीधे आपके मोबाइल तक पहुँचाना है। हम चाहते हैं कि हर घर में स्वास्थ्य की खुशहाली हो और लोग अपनी रोजमर्रा की छोटी-बड़ी दिक्कतों का समाधान प्रकृति की गोद में ढूंढ सकें। हमारी पूरी टीम दिन-रात मेहनत करके शुद्ध और सही जानकारियां जुटाती है ताकि आपकी जीवनशैली सरल, निरोगी और प्राकृतिक बन सके। हमसे जुड़ने और इस स्वस्थ भारत के सफर का हिस्सा बनने के लिए आपका कोटि-कोटि धन्यवाद।" 
        : "Dear Reader, a warm welcome to the 'Gharelu Upay Care' family. Our sole and sacred mission is to bring India's centuries-old, rich, and authentic Ayurvedic traditions and home remedies directly to your mobile via modern technology. We wish for health and happiness in every home, empowering people to find natural solutions for daily well-being. Our dedicated team works tirelessly to gather pure, accurate information to make your lifestyle simple, healthy, and natural. Thank you from the bottom of our hearts for joining us on this journey toward a healthier nation."
    },
    { 
      id: 'contact', 
      icon: <Mail className="w-4 h-4" />, 
      title: isHindi ? 'हमसे संपर्क करें' : 'Contact Us', 
      content: isHindi 
        ? "आपका हर एक सुझाव, विचार या सवाल हमारे लिए बेहद कीमती और आदरणीय है। यदि आपको हमारे किसी नुस्खे, ऐप की कार्यप्रणाली या किसी अन्य विषय को लेकर मन में कोई भी जिज्ञासा या संशय हो, तो आप बिना किसी झिझक के हमसे संपर्क कर सकते हैं। आपके बेहतर सपोर्ट के लिए जल्द ही यहाँ हमारी ऑफिशियल ईमेल आईडी जोड़ दी जाएगी। हमारी विशेषज्ञ टीम आपके हर संदेश का जवाब देने और आपकी पूरी सहायता करने के लिए 24 से 48 घंटों के भीतर प्रतिबद्ध है। आपका मार्गदर्शन ही हमारे ऐप को और बेहतर बनाएगा।" 
        : "Your every feedback, idea, or question is incredibly valuable to us. If you have any inquiries regarding our remedies or app functionality, feel free to reach out. For your better support, our official email ID will be added here very soon. Our expert team is strictly committed to responding to your queries within 24 to 48 hours."
    },
    { 
      id: 'privacy', 
      icon: <ShieldCheck className="w-4 h-4" />, 
      title: isHindi ? 'गोपनीयता नीति' : 'Privacy Policy', 
      content: isHindi 
        ? "आपकी सुरक्षा और निजता हमारे लिए सर्वोपरि है। हमने इस ऐप को पूरी तरह से झंझट-मुक्त बनाया है, इसलिए यहाँ ना तो कोई लॉगिन या रजिस्ट्रेशन का झंझट है और ना ही हम किसी भी व्यक्ति का कोई व्यक्तिगत डेटा (जैसे नाम, नंबर या ईमेल) लेते हैं। हमारे पास आपकी किसी भी प्रकार की व्यक्तिगत जानकारी नहीं आती है। आप बिना किसी डर, चिंता या प्राइवेसी के खतरे के, पूरी सुरक्षा के साथ हमारे इस ऐप और सभी घरेलू उपायों का बिल्कुल फ्री में लाभ उठा सकते हैं।" 
        : "Your privacy and security are our topmost priority. We have designed this app to be completely hassle-free; therefore, there is no login or registration required, and we do not collect any personal data (like name, phone number, or email) from anyone. We do not receive any of your personal information. You can safely benefit from our app and all home remedies with absolute peace of mind."
    },
    { 
      id: 'disclaimer', 
      icon: <AlertTriangle className="w-4 h-4" />, 
      title: isHindi ? 'महत्वपूर्ण चेतावनी' : 'Important Warning', 
      content: isHindi 
        ? "विशेष परामर्श: प्रिय पाठक, यहाँ दिए गए सभी घरेलू उपचार केवल शैक्षिक और सामान्य स्वास्थ्य जागरूकता के उद्देश्य से साझा किए गए हैं। इन्हें किसी भी प्रकार की पेशेवर चिकित्सा सलाह का विकल्प बिल्कुल न समझें। यदि बीमारी के लक्षण पुराने हों या स्थिति गंभीर हो, तो कृपया किसी योग्य डॉक्टर या अधिकृत वैद्य से व्यक्तिगत परामर्श अवश्य लें।" 
        : "Special Advice: Dear Reader, all home remedies shared here are solely for educational and general health awareness purposes. Please do not consider them a substitute for professional medical advice. If symptoms are chronic or severe, please consult a qualified doctor or Vaidya."
    },
    { 
      id: 'terms', 
      icon: <FileText className="w-4 h-4" />, 
      title: isHindi ? 'नियम एवं शर्तें' : 'Terms & Conditions', 
      content: isHindi 
        ? "इस ऐप का उपयोग करके आप हमारी सामान्य सेवा शर्तों और नियमों से अपनी सहमति व्यक्त करते हैं। यहाँ साझा की गई जानकारियां पारंपरिक लोक-ज्ञान पर आधारित हैं। यूज़र इन नुस्खों का उपयोग अपनी स्वेच्छा और विवेक के आधार पर करते हैं। ऐप के किसी भी कंटेंट को बिना अनुमति के व्यावसायिक रूप से कॉपी करना सख्त मना है। सुरक्षित रहें, स्वस्थ रहें, आपका स्वास्थ्य ही सर्वोपरि है।" 
        : "By using this app, you agree to our standard terms of service. The information shared is based on traditional folk knowledge. Users apply these remedies at their own discretion. Commercial copying of this app's content without explicit permission is strictly prohibited. Stay safe, stay healthy, your health is our supreme priority."
    }
  ];

  return (
    <SheetContent 
      side="left" 
      className={cn(
        "w-[70vw] max-w-[70vw] h-full p-0 border-none transition-all duration-300 ease-in-out [&>button]:hidden rounded-none shadow-2xl", 
        isNight ? "bg-[#0a110d] text-white" : "bg-[#FDFBF7]"
      )}
    >
      <div className="flex flex-col h-full">
        <SheetHeader className={cn(
          "p-6 pt-10 pb-6 relative transition-colors shrink-0", 
          isNight ? "bg-black border-b border-white/10" : "bg-[#14532D]"
        )}>
          <div className="absolute top-4 right-6">
            <SheetClose asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-white/10 text-accent transition-all active:scale-90 h-10 w-10"
              >
                <X className="w-8 h-8 stroke-[3]" />
              </Button>
            </SheetClose>
          </div>
          <SheetTitle className="text-xl font-headline font-black text-white text-left">
            {isHindi ? 'घरेलू उपाय केयर' : 'Gharelu Upay Care'}
          </SheetTitle>
          <p className="text-white/60 text-xs mt-1 text-left font-medium">
            {isHindi ? 'परंपरा, स्वास्थ्य और सुरक्षा' : 'Tradition, Health & Safety'}
          </p>
        </SheetHeader>
        
        <ScrollArea className="flex-1 bg-transparent">
          <div className="p-5 max-w-full mx-auto w-full">
            <Accordion type="single" collapsible className="w-full space-y-3">
              {legalPages.map((page) => (
                <AccordionItem key={page.id} value={page.id} className="border-none">
                  <AccordionTrigger className={cn(
                    "hover:no-underline py-4 px-4 rounded-2xl transition-all",
                    isNight ? "bg-white/5" : "bg-white border border-primary/5"
                  )}>
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "p-2 rounded-xl", 
                        isNight ? "bg-white/10 text-accent" : "bg-primary/5 text-primary"
                      )}>
                        {page.icon}
                      </div>
                      <span className={cn("font-bold text-[15px]", isNight ? "text-zinc-100" : "text-foreground")}>
                        {page.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className={cn(
                    "px-5 py-4 leading-relaxed text-[15px] font-medium transition-all duration-300 animate-in fade-in slide-in-from-top-2",
                    isNight ? "text-zinc-300" : "text-muted-foreground"
                  )}>
                    {page.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8 mb-10 px-4">
              <SheetClose asChild>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "w-full h-14 justify-start gap-4 rounded-2xl font-black text-sm uppercase tracking-widest border transition-all active:scale-95",
                    isNight ? "bg-white/5 border-white/10 text-white" : "bg-white border-primary/10 text-primary hover:bg-primary/5"
                  )}
                  onClick={() => router.push('/admin-login')}
                >
                  <Lock className="w-5 h-5 text-accent" /> {isHindi ? 'एडमिन लॉगिन' : 'Admin Login'}
                </Button>
              </SheetClose>
            </div>
          </div>
        </ScrollArea>
      </div>
    </SheetContent>
  );
};
