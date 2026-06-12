'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Remedy } from '@/lib/remedy-types';
import { Language, Theme } from '@/app/page';
import { 
  Heart,
  Info,
  Beaker,
  ChefHat,
  Stethoscope,
  Activity,
  Apple,
  AlertTriangle,
  Clock,
  ShieldCheck,
  User,
  Share2,
  Copy,
  FileDown,
  Volume2,
  VolumeX
} from 'lucide-react';
import { cn, toEnglishDigits } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface RemedyDetailProps {
  remedy: Remedy;
  theme: Theme;
  lang: Language;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

type SectionVariant = 'green' | 'yellow' | 'red';

export const RemedyDetail = ({ remedy, theme, lang, isFavorite, onToggleFavorite }: RemedyDetailProps) => {
  const isNight = theme === 'night';
  const isHindi = lang === 'hi';
  const [selectedDoseIndex, setSelectedDoseIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) {
        console.log("Cancelling speech on unmount");
        synthRef.current.cancel();
      }
    };
  }, []);

  const labels = {
    introduction: isHindi ? '1. बीमारी का परिचय' : '1. Introduction',
    ingredients: isHindi ? '2. आवश्यक सामग्री' : '2. Required Ingredients',
    preparation: isHindi ? '3. बनाने की विधि' : '3. Preparation Method',
    dosage: isHindi ? '4. स्मार्ट खुराक' : '4. Smart Dosage',
    usage: isHindi ? '5. सेवन विधि' : '5. Consumption Method',
    dietEat: isHindi ? '6. क्या खाएं' : '6. What to Eat',
    dietAvoid: isHindi ? '7. क्या न खाएं' : '7. What to Avoid',
    routine: isHindi ? '8. दिनचर्या' : '8. Daily Routine',
    safety: isHindi ? '9. सुरक्षा सूचना' : '9. Safety Information',
  };

  const dosageWarning = isHindi 
    ? "उपरोक्त कुल सामग्री में से अपनी उम्र के अनुसार केवल नीचे चुनी गई खुराक ही लें:"
    : "From the above ingredients, take only the dosage selected below according to your age:";

  const disclaimerText = isHindi 
    ? "विशेष परामर्श: प्रिय पाठक, यह घरेलू उपाय शैक्षिक उद्देश्य से साझा किए गए हैं। किसी भी गंभीर स्थिति में हों, तो कृपया किसी योग्य डॉक्टर या वैद्य से व्यक्तिगत सलाह ज़रूर लें।"
    : "Special Advice: Dear Reader, these home remedies are shared for educational purposes. Consult a qualified doctor or Vaidya for serious conditions.";

  const shareUrl = `https://gharelu-upay.web.app/remedy/${remedy.id}`;

  const handleToggleSpeech = () => {
    console.log("Speaker clicked");
    
    if (!synthRef.current) {
      console.error("SpeechSynthesis not supported in this browser");
      toast({
        variant: "destructive",
        title: isHindi ? "त्रुटि" : "Error",
        description: isHindi ? "आपका ब्राउज़र ऑडियो का समर्थन नहीं करता है।" : "Your browser does not support audio.",
      });
      return;
    }

    if (isSpeaking) {
      console.log("Stopping speech");
      synthRef.current.cancel();
      setIsSpeaking(false);
      return;
    }

    // Construct readable text specifically from the data
    const constructText = () => {
      let text = `${remedy.name[lang]}. `;
      
      const addSection = (title: string, content: any) => {
        if (!content) return;
        text += `${title}. `;
        if (Array.isArray(content)) {
          text += content.join('. ') + '. ';
        } else if (typeof content === 'string') {
          text += content + '. ';
        }
      };

      addSection(labels.introduction, remedy.introduction[lang]);
      addSection(labels.ingredients, remedy.ingredients[lang]);
      addSection(labels.preparation, remedy.preparation[lang]);
      
      if (remedy.doses && remedy.doses.length > 0) {
        text += `${labels.dosage}. `;
        const dose = remedy.doses[selectedDoseIndex];
        text += `${dose.ageRange[lang]}: ${Array.isArray(dose.dose[lang]) ? dose.dose[lang].join('. ') : dose.dose[lang]}. `;
      }

      addSection(labels.usage, remedy.usage[lang]);
      addSection(labels.dietEat, remedy.dietEat[lang]);
      addSection(labels.dietAvoid, remedy.dietAvoid[lang]);
      
      if (remedy.routine) {
        text += `${labels.routine}. `;
        const routineContent = (remedy.routine as any)[lang] || '';
        text += routineContent + '. ';
      }

      addSection(labels.safety, remedy.safetyAdvice[lang]);
      text += disclaimerText;
      
      return toEnglishDigits(text).replace(/[*_#]/g, '');
    };

    const finalSpeechText = constructText();
    console.log("Speech text constructed:", finalSpeechText.substring(0, 100) + "...");

    const utterance = new SpeechSynthesisUtterance(finalSpeechText);
    utterance.lang = isHindi ? 'hi-IN' : 'en-US';
    utterance.rate = 0.95;
    
    utterance.onstart = () => {
      console.log("Speech started");
      setIsSpeaking(true);
    };
    
    utterance.onend = () => {
      console.log("Speech ended normally");
      setIsSpeaking(false);
    };
    
    utterance.onerror = (event) => {
      console.error("SpeechSynthesisUtterance error", event);
      setIsSpeaking(false);
    };

    synthRef.current.speak(utterance);
  };

  const handleWhatsAppShare = () => {
    const remedyTitle = remedy.name[lang];
    const message = `🌿 *${remedyTitle}* 🌿\nपूरी जानकारी यहाँ देखें:\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCopy = () => {
    const textToCopy = `${remedy.name[lang]}\n\n${shareUrl}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({
        title: isHindi ? "लिंक कॉपी हो गया" : "Link Copied",
      });
    });
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const getVariantStyles = (variant: SectionVariant) => {
    if (isNight) return "bg-zinc-900 border-zinc-800 text-white";
    switch (variant) {
      case 'green': return "bg-[#E6F4EA] border-[#B2D8B9] text-[#0D3B2E]";
      case 'red': return "bg-[#FDF2F2] border-[#F8D7DA] text-[#721C24]";
      case 'yellow': default: return "bg-[#FFF9E6] border-[#FCE8B2] text-[#5F4B1A]";
    }
  };

  const renderSection = (icon: React.ReactNode, title: string, content: any, variant: SectionVariant, customHeader?: string, appendDisclaimer?: boolean) => {
    if (!content) return null;
    let points: string[] = Array.isArray(content) 
      ? content.filter(item => typeof item === 'string' && item.trim() !== '') 
      : (typeof content === 'string' ? content.split('\n').filter(line => line.trim() !== '') : []);
    
    if (points.length === 0) return null;

    return (
      <div className={cn("p-6 rounded-[2rem] border shadow-md space-y-4 mb-6 transition-all duration-300 break-inside-avoid", getVariantStyles(variant))}>
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-xl", 
            variant === 'green' ? "bg-emerald-500/10 text-emerald-700" : 
            variant === 'red' ? "bg-red-500/10 text-red-700" : 
            "bg-amber-500/10 text-amber-700"
          )}>
            {icon}
          </div>
          <div className="flex flex-col">
            <h3 className="text-[18px] font-bold leading-tight">{title}</h3>
            {customHeader && <p className="text-[11px] font-bold mt-0.5 leading-tight opacity-80">{customHeader}</p>}
          </div>
        </div>
        <div className="text-[15px] leading-relaxed font-medium space-y-2">
          <ul className="space-y-3 list-none p-0 m-0">
            {points.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={cn("w-1.5 h-1.5 rounded-full mt-2 shrink-0", 
                  variant === 'green' ? "bg-emerald-600" : 
                  variant === 'red' ? "bg-red-600" : 
                  "bg-amber-600"
                )} />
                <span>{toEnglishDigits(item)}</span>
              </li>
            ))}
          </ul>
          {appendDisclaimer && (
            <div className="pt-4 border-t border-red-200/50 mt-4 italic text-[14px] leading-relaxed">
              {disclaimerText}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto overflow-hidden">
      <div className="w-full">
        <div className="flex items-start justify-between mb-4 gap-2">
          <h2 className={cn("text-[26px] font-black tracking-wide leading-tight flex-1", isNight ? "text-white" : "text-[#14532D]")}>
            {toEnglishDigits(remedy.name[lang])}
          </h2>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleToggleSpeech}
              className={cn(
                "rounded-full h-10 w-10 transition-all", 
                isNight 
                  ? (isSpeaking ? "bg-white/20 text-white" : "text-white/60 hover:text-white hover:bg-white/10") 
                  : (isSpeaking ? "bg-black/10 text-black" : "text-black/60 hover:text-black hover:bg-black/5")
              )}
              title={isSpeaking ? (isHindi ? "सुनना बंद करें" : "Stop Listening") : (isHindi ? "नुस्खा सुनें" : "Listen to Recipe")}
            >
              {isSpeaking ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onToggleFavorite} 
              className={cn("rounded-full h-10 w-10", isFavorite ? "text-accent" : "text-muted-foreground")}
            >
              <Heart className={cn("w-6 h-6", isFavorite && "fill-current")} />
            </Button>
          </div>
        </div>

        <div className="space-y-0">
          {renderSection(<Info className="w-5 h-5" />, labels.introduction, remedy.introduction[lang], 'green')}
          {renderSection(<Beaker className="w-5 h-5" />, labels.ingredients, remedy.ingredients[lang], 'yellow')}
          {renderSection(<ChefHat className="w-5 h-5" />, labels.preparation, remedy.preparation[lang], 'yellow')}
          
          {remedy.doses && remedy.doses.length > 0 && (
            <div className={cn("p-6 rounded-[2rem] border shadow-md space-y-6 mb-6 transition-all duration-300", getVariantStyles('yellow'))}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[18px] font-bold leading-tight">{labels.dosage}</h3>
                  <p className="text-[11px] font-bold mt-0.5 leading-tight opacity-80">{dosageWarning}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {remedy.doses.map((dose, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedDoseIndex(i)} 
                    className={cn(
                      "px-4 py-3 rounded-2xl text-[13px] font-bold transition-all border flex items-center justify-center gap-2", 
                      selectedDoseIndex === i 
                        ? "bg-accent border-accent text-white shadow-lg scale-95" 
                        : (isNight ? "bg-white/5 border-white/10 text-white" : "bg-white border-amber-200 text-[#5F4B1A] hover:bg-amber-50")
                    )}
                  >
                    <User className="w-3.5 h-3.5" />
                    {toEnglishDigits(dose.ageRange[lang])}
                  </button>
                ))}
              </div>

              <div className={cn("p-5 rounded-2xl border-l-4", isNight ? "bg-white/5 border-accent" : "bg-white/60 border-accent")}>
                <div className="text-[16px] font-bold leading-relaxed">
                  <ul className="space-y-2 list-none p-0 m-0">
                    {(Array.isArray(remedy.doses[selectedDoseIndex].dose[lang]) 
                      ? (remedy.doses[selectedDoseIndex].dose[lang] as string[]) 
                      : (remedy.doses[selectedDoseIndex].dose[lang] as string).split('\n'))
                      .filter(p => p.trim() !== '')
                      .map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                          <span>{toEnglishDigits(point)}</span>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </div>
          )}

          {renderSection(<Activity className="w-5 h-5" />, labels.usage, remedy.usage[lang], 'yellow')}
          {renderSection(<Apple className="w-5 h-5" />, labels.dietEat, remedy.dietEat[lang], 'green')}
          {renderSection(<AlertTriangle className="w-5 h-5" />, labels.dietAvoid, remedy.dietAvoid[lang], 'red')}
          
          {remedy.routine && (
            renderSection(<Clock className="w-5 h-5" />, labels.routine, (remedy.routine as any)[lang], 'yellow')
          )}

          {renderSection(<ShieldCheck className="w-5 h-5" />, labels.safety, remedy.safetyAdvice[lang], 'red', undefined, true)}
        </div>
      </div>

      <div className="flex justify-end items-center gap-1.5 pt-4 mb-10 overflow-x-auto pb-2 no-scrollbar">
        <Button 
          onClick={handleDownloadPDF}
          className="h-9 px-3 bg-[#14532D] hover:bg-[#1a6b3a] text-white border-2 border-[#FBBF24] rounded-xl flex items-center gap-1.5 font-bold text-[11px] sm:text-xs shadow-md shrink-0"
        >
          <FileDown className="w-3.5 h-3.5" />
          <span className="whitespace-nowrap">PDF डाउनलोड / प्रिंट</span>
        </Button>
        <Button 
          onClick={handleCopy}
          className="h-9 px-3 bg-[#14532D] hover:bg-[#1a6b3a] text-white border-2 border-[#FBBF24] rounded-xl flex items-center gap-1.5 font-bold text-[11px] sm:text-xs shadow-md shrink-0"
        >
          <Copy className="w-3.5 h-3.5" />
          <span className="whitespace-nowrap">कॉपी करें</span>
        </Button>
        <Button 
          onClick={handleWhatsAppShare}
          className="h-9 px-3 bg-[#14532D] hover:bg-[#1a6b3a] text-white border-2 border-[#FBBF24] rounded-xl flex items-center gap-1.5 font-bold text-[11px] sm:text-xs shadow-md shrink-0"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="whitespace-nowrap">शेयर करें</span>
        </Button>
      </div>
    </div>
  );
};