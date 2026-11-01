'use client';

import React, { useState, useEffect } from 'react';
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
  Send,
  Loader2,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { cn, toEnglishDigits } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp, query, where, onSnapshot, orderBy } from 'firebase/firestore';

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
  const db = useFirestore();

  // Q&A States
  const [question, setQuestion] = useState('');
  const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false);
  const [myQA, setMyQA] = useState<any[]>([]);

  useEffect(() => {
    if (!db) return;
    const uid = localStorage.getItem('gharelu_user_id');
    if (!uid) return;

    const q = query(
      collection(db, 'questions'),
      where('remedyId', '==', remedy.id),
      where('userId', '==', uid),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMyQA(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [db, remedy.id]);

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
    qaTitle: isHindi ? 'वैद्य जी से पूछें (गुमनाम)' : 'Ask Vaidya Ji (Anonymous)',
    qaPlaceholder: isHindi ? 'इस नुस्खे से जुड़ा अपना सवाल यहाँ लिखें...' : 'Write your question related to this remedy here...',
    qaButton: isHindi ? 'सवाल भेजें' : 'Send Question',
    qaSuccess: isHindi ? 'आपका सवाल भेज दिया गया है। वैद्य जी जल्द ही इसी पेज पर जवाब देंगे।' : 'Your question has been sent. Vaidya Ji will reply on this page soon.',
  };

  const dosageWarning = isHindi 
    ? "उपरोक्त कुल सामग्री में से अपनी उम्र के अनुसार केवल नीचे चुनी गई खुराक ही लें:"
    : "From the above ingredients, take only the dosage selected below according to your age:";

  const disclaimerText = isHindi 
    ? "विशेष परामर्श: प्रिय पाठक, यह घरेलू उपाय शैक्षिक उद्देश्य से साझा किए गए हैं। किसी भी गंभीर स्थिति में हों, तो कृपया किसी योग्य डॉक्टर या वैद्य से व्यक्तिगत सलाह ज़रूर लें।"
    : "Special Advice: Dear Reader, these home remedies are shared for educational purposes. Consult a qualified doctor or Vaidya for serious conditions.";

  const shareUrl = `https://ghareluupaycare.vercel.app/?remedyId=${remedy.id}`;

  const handleQuestionSubmit = async () => {
    if (!question.trim() || !db) return;
    setIsSubmittingQuestion(true);
    try {
      const uid = localStorage.getItem('gharelu_user_id');
      await addDoc(collection(db, 'questions'), {
        remedyId: remedy.id,
        remedyName: remedy.name,
        userId: uid,
        question: question.trim(),
        answer: null,
        hasAnswer: false,
        isRead: false,
        timestamp: serverTimestamp()
      });
      setQuestion('');
      toast({ title: labels.qaSuccess });
    } catch (e) {
      console.error(e);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to send question.' });
    } finally {
      setIsSubmittingQuestion(false);
    }
  };

  const getFormattedContent = (full: boolean = true) => {
    const name = remedy.name[lang];
    const formatValue = (val: any) => {
      if (Array.isArray(val)) return val.map(v => `• ${v}`).join('\n');
      return String(val).split('\n').map(v => `• ${v}`).join('\n');
    };
    if (!full) {
      const briefIntro = Array.isArray(remedy.introduction[lang]) ? (remedy.introduction[lang] as string[])[0] : (remedy.introduction[lang] as string).split('\n')[0];
      return `🌿 *${name}* 🌿\n\n${briefIntro}\n\nपूरा नुस्खा और स्मार्ट कैलकुलेटर के साथ अपनी उम्र के हिसाब से खुराक जानने के लिए यहां जाएं:\n${shareUrl}`;
    }
    let text = `🌿 *${name}* 🌿\n\n`;
    text += `[${labels.introduction}]\n${formatValue(remedy.introduction[lang])}\n\n`;
    text += `[${labels.ingredients}]\n${formatValue(remedy.ingredients[lang])}\n\n`;
    text += `[${labels.preparation}]\n${formatValue(remedy.preparation[lang])}\n\n`;
    if (remedy.doses && remedy.doses.length > 0) {
      const activeDose = remedy.doses[selectedDoseIndex];
      text += `[${labels.dosage}]\n${activeDose.ageRange[lang]}: ${formatValue(activeDose.dose[lang])}\n\n`;
    }
    text += `[${labels.usage}]\n${formatValue(remedy.usage[lang])}\n\n`;
    text += `[${labels.dietEat}]\n${formatValue(remedy.dietEat[lang])}\n\n`;
    text += `[${labels.dietAvoid}]\n${formatValue(remedy.dietAvoid[lang])}\n\n`;
    if (remedy.routine) {
      text += `[${labels.routine}]\n${formatValue((remedy.routine as any)[lang])}\n\n`;
    }
    text += `[${labels.safety}]\n${formatValue(remedy.safetyAdvice[lang])}\n\n`;
    text += `${disclaimerText}\n\n${shareUrl}`;
    return toEnglishDigits(text);
  };

  const handleWhatsAppShare = () => {
    const message = getFormattedContent(false);
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCopy = () => {
    const textToCopy = getFormattedContent(true);
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({ title: isHindi ? "पूरा नुस्खा कॉपी हो गया" : "Full Recipe Copied" });
    });
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
    let points: string[] = Array.isArray(content) ? content.filter(item => typeof item === 'string' && item.trim() !== '') : (typeof content === 'string' ? content.split('\n').filter(line => line.trim() !== '') : []);
    if (points.length === 0) return null;
    return (
      <div className={cn("p-6 rounded-[2rem] border shadow-md space-y-4 mb-6 transition-all duration-300 break-inside-avoid", getVariantStyles(variant))}>
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-xl", variant === 'green' ? "bg-emerald-500/10 text-emerald-700" : variant === 'red' ? "bg-red-500/10 text-red-700" : "bg-amber-500/10 text-amber-700")}>
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
                <span className={cn("w-1.5 h-1.5 rounded-full mt-2 shrink-0", variant === 'green' ? "bg-emerald-600" : variant === 'red' ? "bg-red-600" : "bg-amber-600")} />
                <span>{toEnglishDigits(item)}</span>
              </li>
            ))}
          </ul>
          {appendDisclaimer && <div className="pt-4 border-t border-red-200/50 mt-4 italic text-[14px] leading-relaxed">{disclaimerText}</div>}
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
          <Button variant="ghost" size="icon" onClick={onToggleFavorite} className={cn("rounded-full h-10 w-10", isFavorite ? "text-accent" : "text-muted-foreground")}>
            <Heart className={cn("w-6 h-6", isFavorite && "fill-current")} />
          </Button>
        </div>

        {remedy.image && (
          <div className="mb-8 relative aspect-[16/9] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-accent/20">
            <Image src={remedy.image} alt={remedy.name[lang] as string} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" priority />
          </div>
        )}

        <div className="space-y-0">
          {renderSection(<Info className="w-5 h-5" />, labels.introduction, remedy.introduction[lang], 'green')}
          {renderSection(<Beaker className="w-5 h-5" />, labels.ingredients, remedy.ingredients[lang], 'yellow')}
          {renderSection(<ChefHat className="w-5 h-5" />, labels.preparation, remedy.preparation[lang], 'yellow')}
          
          {remedy.doses && remedy.doses.length > 0 && (
            <div className={cn("p-6 rounded-[2rem] border shadow-md space-y-6 mb-6 transition-all duration-300", getVariantStyles('yellow'))}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700"><Stethoscope className="w-5 h-5" /></div>
                <div className="flex flex-col">
                  <h3 className="text-[18px] font-bold leading-tight">{labels.dosage}</h3>
                  <p className="text-[11px] font-bold mt-0.5 leading-tight opacity-80">{dosageWarning}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {remedy.doses.map((dose, i) => (
                  <button key={i} onClick={() => setSelectedDoseIndex(i)} className={cn("px-4 py-3 rounded-2xl text-[13px] font-bold transition-all border flex items-center justify-center gap-2", selectedDoseIndex === i ? "bg-accent border-accent text-white shadow-lg scale-95" : (isNight ? "bg-white/5 border-white/10 text-white" : "bg-white border-amber-200 text-[#5F4B1A] hover:bg-amber-50"))}>
                    <User className="w-3.5 h-3.5" /> {toEnglishDigits(dose.ageRange[lang])}
                  </button>
                ))}
              </div>
              <div className={cn("p-5 rounded-2xl border-l-4", isNight ? "bg-white/5 border-accent" : "bg-white/60 border-accent")}>
                <div className="text-[16px] font-bold leading-relaxed">
                  <ul className="space-y-2 list-none p-0 m-0">
                    {(Array.isArray(remedy.doses[selectedDoseIndex].dose[lang]) ? (remedy.doses[selectedDoseIndex].dose[lang] as string[]) : (remedy.doses[selectedDoseIndex].dose[lang] as string).split('\n')).filter(p => p.trim() !== '').map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" /><span>{toEnglishDigits(point)}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {renderSection(<Activity className="w-5 h-5" />, labels.usage, remedy.usage[lang], 'yellow')}
          {renderSection(<Apple className="w-5 h-5" />, labels.dietEat, remedy.dietEat[lang], 'green')}
          {renderSection(<AlertTriangle className="w-5 h-5" />, labels.dietAvoid, remedy.dietAvoid[lang], 'red')}
          {remedy.routine && renderSection(<Clock className="w-5 h-5" />, labels.routine, (remedy.routine as any)[lang], 'yellow')}
          {renderSection(<ShieldCheck className="w-5 h-5" />, labels.safety, remedy.safetyAdvice[lang], 'red', undefined, true)}
        </div>
      </div>

      <div className="flex justify-end items-center gap-1.5 pt-4 mb-4 overflow-x-auto pb-2 no-scrollbar print:hidden">
        <Button onClick={() => window.print()} className="h-9 px-3 bg-[#14532D] text-white border-2 border-[#FBBF24] rounded-xl flex items-center gap-1.5 font-bold text-xs shrink-0"><FileDown className="w-3.5 h-3.5" /> PDF</Button>
        <Button onClick={handleCopy} className="h-9 px-3 bg-[#14532D] text-white border-2 border-[#FBBF24] rounded-xl flex items-center gap-1.5 font-bold text-xs shrink-0"><Copy className="w-3.5 h-3.5" /> COPY</Button>
        <Button onClick={handleWhatsAppShare} className="h-9 px-3 bg-[#14532D] text-white border-2 border-[#FBBF24] rounded-xl flex items-center gap-1.5 font-bold text-xs shrink-0"><Share2 className="w-3.5 h-3.5" /> SHARE</Button>
      </div>

      {/* Private Q&A Section */}
      <div className={cn("mt-10 p-6 rounded-[2.5rem] border shadow-2xl space-y-6", isNight ? "bg-zinc-900 border-accent/20" : "bg-white border-primary/10")}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-accent/10 text-accent"><MessageCircle className="w-6 h-6" /></div>
          <h3 className={cn("text-xl font-black font-headline", isNight ? "text-accent" : "text-primary")}>{labels.qaTitle}</h3>
        </div>

        {/* Existing Q&A List for this user */}
        {myQA.length > 0 && (
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {myQA.map((item) => (
              <div key={item.id} className="space-y-2 animate-in slide-in-from-left-2 duration-300">
                <div className={cn("p-4 rounded-2xl ml-4", isNight ? "bg-white/5" : "bg-muted/30")}>
                  <p className="text-[14px] font-bold">{item.question}</p>
                </div>
                {item.answer && (
                  <div className={cn("p-4 rounded-2xl mr-4 border-l-4 border-accent", isNight ? "bg-accent/10" : "bg-accent/5")}>
                    <p className="text-[12px] font-black text-accent uppercase tracking-widest mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> वैद्य जी का जवाब:
                    </p>
                    <p className="text-[15px] font-medium leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3 pt-2">
          <Textarea 
            placeholder={labels.qaPlaceholder}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className={cn("min-h-[100px] rounded-2xl border-2", isNight ? "bg-zinc-800 border-white/10" : "bg-muted/10 border-primary/5")}
          />
          <Button 
            onClick={handleQuestionSubmit}
            disabled={isSubmittingQuestion || !question.trim()}
            className="w-full h-12 bg-accent hover:bg-accent/90 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg active:scale-95"
          >
            {isSubmittingQuestion ? <Loader2 className="animate-spin" /> : <><Send className="mr-2 w-4 h-4" /> {labels.qaButton}</>}
          </Button>
        </div>
      </div>
    </div>
  );
};
