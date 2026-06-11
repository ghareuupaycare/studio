'use client';

import React, { useState } from 'react';
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
  FileDown
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
  const { toast } = useToast();

  const labels = {
    introduction: isHindi ? '1. बीमारी का परिचय' : '1. Introduction',
    ingredients: isHindi ? '2. आवश्यक सामग्री (कुल स्टॉक या बनाने के लिए)' : '2. Required Ingredients',
    preparation: isHindi ? '3. बनाने की विधि' : '3. Preparation Method',
    dosage: isHindi ? '4. स्मार्ट खुराक और मात्रा' : '4. Smart Dosage & Quantity',
    usage: isHindi ? '5. सेवन विधि' : '5. Consumption Method',
    dietEat: isHindi ? '6. क्या खाएं' : '6. What to Eat',
    dietAvoid: isHindi ? '7. क्या न खाएं (सख़्त परहेज़)' : '7. What to Avoid (Strict)',
    routine: isHindi ? '8. दिनचर्या' : '8. Daily Routine',
    safety: isHindi ? '9. सुरक्षा सूचना' : '9. Safety Information',
  };

  const dosageWarning = isHindi 
    ? "उपरोक्त कुल सामग्री में से अपनी उम्र के अनुसार केवल नीचे चुनी गई खुराक ही लें:"
    : "From the above ingredients, take only the dosage selected below according to your age:";

  const disclaimerText = isHindi 
    ? "विशेष परामर्श: प्रिय पाठक, यह घरेलू उपाय शैक्षिक उद्देश्य से साझा किए गए हैं। किसी भी गंभीर स्थिति में हों, तो कृपया किसी योग्य डॉक्टर या वैद्य से व्यक्तिगत सलाह ज़रूर लें। सुरक्षित रहें, स्वस्थ रहें, आपका स्वास्थ्य सर्वोपरि है।"
    : "Special Advice: Dear Reader, these home remedies are shared solely for educational purposes. In case of any serious condition, please consult a qualified doctor or Vaidya for personal advice. Stay safe, stay healthy, your health is our supreme priority.";

  const shareUrl = `https://studio-xi-mocha.vercel.app/?remedyId=${remedy.id}`;

  const handleWhatsAppShare = () => {
    const remedyTitle = remedy.name[lang];
    const message = `🌿 *${remedyTitle}* 🌿\nपूरी जानकारी और बनाने की विधि यहाँ देखें:\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCopy = () => {
    const titleText = toEnglishDigits(Array.isArray(remedy.name[lang]) ? remedy.name[lang][0] : remedy.name[lang]);
    const introText = toEnglishDigits(Array.isArray(remedy.introduction[lang]) ? remedy.introduction[lang].join('\n') : remedy.introduction[lang]);
    
    const textToCopy = `${titleText}\n\n${introText}\n\nपूरी जानकारी वेबसाइट पर देखें: ${shareUrl}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({
        title: isHindi ? "लिंक कॉपी हो गया" : "Link Copied",
        description: isHindi ? "अब आप इसे कहीं भी शेयर कर सकते हैं।" : "You can now share it anywhere.",
      });
    });
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const getVariantStyles = (variant: SectionVariant) => {
    if (isNight) return "bg-white/5 border-white/10 text-white";
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
      <div className={cn("p-6 rounded-[2rem] border shadow-md space-y-4 mb-6 transition-all duration-300 break-inside-avoid section-box", getVariantStyles(variant))}>
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-xl no-print", 
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
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; background: #FDFBF7 !important; }
          #printable-area, #printable-area * { visibility: visible; }
          #printable-area { position: absolute; left: 0; top: 0; width: 100%; padding: 20px; }
          .no-print { display: none !important; }
          .print-header { display: flex !important; flex-direction: column; align-items: center; text-align: center; margin-bottom: 30px; border-bottom: 2px solid #14532D; padding-bottom: 15px; }
          .print-footer { display: flex !important; justify-content: space-between; align-items: flex-end; margin-top: 40px; border-top: 1px solid #ddd; padding-top: 20px; }
          .section-box { border-radius: 15px !important; border: 1px solid #ccc !important; margin-bottom: 15px !important; page-break-inside: avoid; }
        }
      `}</style>

      {/* Main Content (Screen) */}
      <div id="printable-area" className="w-full">
        {/* Top Branding for PDF */}
        <div className="hidden print-header">
          <h1 className="text-2xl font-black text-[#14532D] font-headline">🌿 घरेलू उपाय केयर | Gharelu Upay Care 🌿</h1>
          <p className="text-sm font-bold text-amber-600">https://studio-xi-mocha.vercel.app/</p>
        </div>

        <div className="flex items-center justify-between mb-4 no-print">
          <h2 className={cn("text-[26px] font-black tracking-wide leading-tight flex-1", isNight ? "text-white" : "text-[#14532D]")}>
            {toEnglishDigits(remedy.name[lang])}
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleFavorite} 
            className={cn("rounded-full h-12 w-12", isFavorite ? "text-accent" : "text-muted-foreground")}
          >
            <Heart className={cn("w-7 h-7", isFavorite && "fill-current")} />
          </Button>
        </div>

        {/* Print Title Only */}
        <h2 className="hidden print:block text-2xl font-black text-[#14532D] mb-6 underline">
          {toEnglishDigits(remedy.name[lang])}
        </h2>

        <div className="space-y-0">
          {renderSection(<Info className="w-5 h-5" />, labels.introduction, remedy.introduction[lang], 'green')}
          {renderSection(<Beaker className="w-5 h-5" />, labels.ingredients, remedy.ingredients[lang], 'yellow')}
          {renderSection(<ChefHat className="w-5 h-5" />, labels.preparation, remedy.preparation[lang], 'yellow')}
          
          {/* Section 4: Dosage */}
          {remedy.doses && remedy.doses.length > 0 && (
            <div className={cn("p-6 rounded-[2rem] border shadow-md space-y-6 mb-6 transition-all duration-300 break-inside-avoid section-box", getVariantStyles('yellow'))}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700 no-print">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[18px] font-bold leading-tight">{labels.dosage}</h3>
                  <p className="text-[11px] font-bold mt-0.5 leading-tight opacity-80">{dosageWarning}</p>
                </div>
              </div>

              {/* Dose Selector (Screen Only) */}
              <div className="grid grid-cols-2 gap-2 no-print">
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

              {/* Dose Display (Screen active) */}
              <div className="no-print">
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

              {/* Print Only All Doses */}
              <div className="hidden print:block space-y-4">
                {remedy.doses.map((dose, i) => (
                  <div key={i} className="border-t pt-2 mt-2">
                    <p className="font-bold text-[#14532D] text-sm">{toEnglishDigits(dose.ageRange[lang])}:</p>
                    <p className="text-sm pl-4">
                      {Array.isArray(dose.dose[lang]) ? dose.dose[lang].join(', ') : dose.dose[lang]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {renderSection(<Activity className="w-5 h-5" />, labels.usage, remedy.usage[lang], 'yellow')}
          {renderSection(<Apple className="w-5 h-5" />, labels.dietEat, remedy.dietEat[lang], 'green')}
          {renderSection(<AlertTriangle className="w-5 h-5" />, labels.dietAvoid, remedy.dietAvoid[lang], 'red')}
          
          {/* Section 8: Routine (Handles both dynamic string and nested object) */}
          {remedy.routine && (
            typeof (remedy.routine as any).morning === 'undefined' ? (
              renderSection(<Clock className="w-5 h-5" />, labels.routine, (remedy.routine as any)[lang], 'yellow')
            ) : (
              <div className={cn("p-6 rounded-[2rem] border shadow-sm space-y-4 mb-6 break-inside-avoid section-box", getVariantStyles('yellow'))}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700 no-print">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="text-[18px] font-bold leading-tight">{labels.routine}</h3>
                </div>
                <div className="space-y-4">
                  {['morning', 'afternoon', 'evening'].map((time) => {
                    const content = (remedy.routine as any)[time];
                    if (!content) return null;
                    const timeLabel = { 
                      morning: isHindi ? 'सुबह:' : 'Morning:', 
                      afternoon: isHindi ? 'दोपहर:' : 'Afternoon:', 
                      evening: isHindi ? 'शाम:' : 'Evening:' 
                    }[time as 'morning'|'afternoon'|'evening'];
                    
                    return (
                      <div key={time} className="flex items-start gap-3">
                        <span className="text-[13px] font-bold text-accent w-20 pt-1 shrink-0">{timeLabel}</span>
                        <div className="flex-1">
                          <ul className="space-y-2 list-none p-0 m-0">
                            {(Array.isArray(content[lang]) ? content[lang] : content[lang].split('\n'))
                              .filter((p: string) => p.trim() !== '')
                              .map((point: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-2 text-[14px] font-medium">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                                  <span>{toEnglishDigits(point)}</span>
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          )}

          {renderSection(<ShieldCheck className="w-5 h-5" />, labels.safety, remedy.safetyAdvice[lang], 'red', undefined, true)}
        </div>

        {/* PDF Footer with QR Code */}
        <div className="hidden print-footer">
          <div className="text-[10px] text-gray-500 max-w-[70%]">
            यह जानकारी केवल शैक्षिक उद्देश्य के लिए है। स्वास्थ्य संबंधी किसी भी निर्णय से पहले विशेषज्ञ की सलाह लें।
          </div>
          <div className="flex flex-col items-center">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(shareUrl)}`} 
              alt="QR Code" 
              className="w-20 h-20 border p-1 bg-white"
            />
            <span className="text-[8px] mt-1 font-bold">Scan to open online</span>
          </div>
        </div>
      </div>

      {/* Sharing and Actions Row - Optimized Layout */}
      <div className="flex justify-end items-center gap-1.5 pt-4 mb-10 no-print flex-nowrap overflow-x-auto pb-2">
        <Button 
          onClick={handleDownloadPDF}
          className="h-9 px-3 bg-[#14532D] hover:bg-[#1a6b3a] text-white border-2 border-[#FBBF24] rounded-xl flex items-center gap-1.5 font-bold text-[11px] sm:text-xs shadow-md transition-all active:scale-95 shrink-0"
        >
          <FileDown className="w-3.5 h-3.5" />
          <span className="whitespace-nowrap">PDF डाउनलोड / प्रिंट</span>
        </Button>
        <Button 
          onClick={handleCopy}
          className="h-9 px-3 bg-[#14532D] hover:bg-[#1a6b3a] text-white border-2 border-[#FBBF24] rounded-xl flex items-center gap-1.5 font-bold text-[11px] sm:text-xs shadow-md transition-all active:scale-95 shrink-0"
        >
          <Copy className="w-3.5 h-3.5" />
          <span className="whitespace-nowrap">कॉपी करें</span>
        </Button>
        <Button 
          onClick={handleWhatsAppShare}
          className="h-9 px-3 bg-[#14532D] hover:bg-[#1a6b3a] text-white border-2 border-[#FBBF24] rounded-xl flex items-center gap-1.5 font-bold text-[11px] sm:text-xs shadow-md transition-all active:scale-95 shrink-0"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="whitespace-nowrap">शेयर करें</span>
        </Button>
      </div>
    </div>
  );
};