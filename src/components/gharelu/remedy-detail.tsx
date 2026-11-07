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
  Send,
  Loader2,
  Sparkles,
  MessageSquare,
  Volume2,
  VolumeX,
  PlayCircle
} from 'lucide-react';
import { cn, toEnglishDigits } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { useFirestore } from '@/firebase';
import { getChatUserId, getChatCacheKey, listenToChatThread, postUserExperience } from '@/lib/chat-sync';
import { speakText, stopSpeech } from '@/lib/audio-reader';

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
  const chatEndRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);

  // Audio Reader State
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Q&A States
  const [question, setQuestion] = useState('');
  const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false);
  const [chatThread, setChatThread] = useState<any[]>([]);
  const [userId, setUserId] = useState<string>('');

  const safeTsToMillis = (ts: any): number => {
    if (!ts) return Date.now();
    if (typeof ts.toMillis === 'function') return ts.toMillis();
    if (ts.seconds) return ts.seconds * 1000;
    const parsed = new Date(ts).getTime();
    return isNaN(parsed) ? Date.now() : parsed;
  };

  useEffect(() => {
    const uid = getChatUserId();
    setUserId(uid);
    if (!db || !remedy?.id || !uid) return;

    const cacheKey = getChatCacheKey(remedy.id, uid);
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try { 
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) setChatThread(parsed);
      } catch(e) {}
    }

    const unsubscribe = listenToChatThread(db, remedy.id, uid, (messages) => {
      setChatThread(messages);
      localStorage.setItem(cacheKey, JSON.stringify(messages));
      if (!isInitialLoad.current) {
        setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 300);
      }
      isInitialLoad.current = false;
    });

    return () => {
      unsubscribe();
      isInitialLoad.current = true;
      stopSpeech(); // Stop audio on unmount
    };
  }, [db, remedy?.id]);

  const handleQuestionSubmit = async () => {
    if (!question.trim() || !db || !userId) return;
    setIsSubmittingQuestion(true);
    try {
      await postUserExperience(db, remedy.id, remedy.name, userId, question);
      setQuestion('');
      toast({ title: isHindi ? "अनुभव भेज दिया गया" : "Experience shared" });
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 300);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to send.' });
    } finally {
      setIsSubmittingQuestion(false);
    }
  };

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
    qaPlaceholder: isHindi ? 'अपना अनुभव साझा करें...' : 'Share your experience...',
    qaButton: isHindi ? 'अनुभव भेजें' : 'Send Experience',
  };

  const handleToggleAudio = () => {
    if (isAudioPlaying) {
      stopSpeech();
      setIsAudioPlaying(false);
    } else {
      // Gather all text to read
      const textToRead = [
        remedy.name[lang],
        labels.introduction,
        remedy.introduction[lang],
        labels.ingredients,
        remedy.ingredients[lang],
        labels.preparation,
        remedy.preparation[lang],
        labels.usage,
        remedy.usage[lang],
        labels.safety,
        remedy.safetyAdvice[lang]
      ].flat().filter(Boolean).join('. ');

      speakText(
        toEnglishDigits(textToRead),
        lang,
        () => setIsAudioPlaying(true),
        () => setIsAudioPlaying(false)
      );
    }
  };

  const disclaimerText = isHindi 
    ? "विशेष परामर्श: प्रिय पाठक, यह घरेलू उपाय शैक्षिक उद्देश्य से साझा किए गए हैं। किसी भी गंभीर स्थिति में हों, तो कृपया किसी योग्य डॉक्टर या वैद्य से व्यक्तिगत सलाह ज़रूर लें।"
    : "Special Advice: Dear Reader, these home remedies are shared for educational purposes. Consult a qualified doctor or Vaidya for serious conditions.";

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/remedy/${remedy.id}` : '';

  const handleWhatsAppShare = () => {
    const briefIntro = Array.isArray(remedy.introduction[lang]) 
      ? (remedy.introduction[lang] as string[])[0] 
      : (remedy.introduction[lang] as string).split('\n')[0];
    const message = `🌿 *${remedy.name[lang]}* 🌿\n\n${briefIntro}\n\nपूरा नुस्खा यहाँ देखें:\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(toEnglishDigits(message))}`, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast({ title: isHindi ? "लिंक कॉपी हो गया" : "Link Copied" });
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

  const renderSection = (icon: React.ReactNode, title: string, content: any, variant: SectionVariant, appendDisclaimer?: boolean) => {
    if (!content) return null;
    const points: string[] = Array.isArray(content) 
      ? content.filter(item => typeof item === 'string' && item.trim() !== '') 
      : (typeof content === 'string' ? content.split('\n').filter(line => line.trim() !== '') : []);
    
    if (points.length === 0) return null;

    return (
      <div className={cn("p-6 rounded-[2.5rem] border shadow-md space-y-4 mb-6 transition-all duration-300", getVariantStyles(variant))}>
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-xl", variant === 'green' ? "bg-emerald-500/10 text-emerald-700" : variant === 'red' ? "bg-red-500/10 text-red-700" : "bg-amber-500/10 text-amber-700")}>
            {icon}
          </div>
          <h3 className="text-[18px] font-bold leading-tight">{title}</h3>
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

  const formatTime = (ts: any) => {
    return new Date(safeTsToMillis(ts)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (ts: any) => {
    return new Date(safeTsToMillis(ts)).toLocaleDateString([], { day: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24 max-w-2xl mx-auto overflow-hidden">
      <div className="w-full">
        <div className="flex items-start justify-between mb-4 gap-2">
          <div className="flex-1 flex flex-col gap-1">
            <h2 className={cn("text-[26px] font-black tracking-wide leading-tight", isNight ? "text-white" : "text-[#14532D]")}>
              {toEnglishDigits(remedy.name[lang])}
            </h2>
            <div className="flex items-center gap-3">
              <Button 
                onClick={handleToggleAudio}
                variant="outline" 
                size="sm"
                className={cn(
                  "rounded-full px-4 h-9 gap-2 font-black text-[11px] uppercase tracking-widest transition-all",
                  isAudioPlaying 
                    ? "bg-accent border-accent text-white shadow-lg animate-pulse" 
                    : (isNight ? "bg-zinc-800 border-white/10 text-white" : "bg-[#14532D]/5 border-[#14532D]/20 text-[#14532D]")
                )}
              >
                {isAudioPlaying ? (
                  <>
                    <VolumeX className="w-4 h-4" /> 
                    {isHindi ? 'रुकें' : 'Stop'}
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" /> 
                    {isHindi ? 'नुस्खा सुनें' : 'Listen'}
                  </>
                )}
              </Button>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onToggleFavorite} className={cn("rounded-full h-10 w-10", isFavorite ? "text-accent" : "text-muted-foreground")}>
            <Heart className={cn("w-6 h-6", isFavorite && "fill-current")} />
          </Button>
        </div>

        {remedy.image && (
          <div className="mb-8 relative aspect-[16/9] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-accent/20">
            <Image src={remedy.image} alt={remedy.name[lang] as string} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" priority />
            {isAudioPlaying && (
              <div className="absolute top-4 right-4 bg-accent text-white p-2 rounded-full shadow-lg animate-bounce">
                <PlayCircle className="w-6 h-6" />
              </div>
            )}
          </div>
        )}

        <div className="space-y-0">
          {renderSection(<Info className="w-5 h-5" />, labels.introduction, remedy.introduction[lang], 'green')}
          {renderSection(<Beaker className="w-5 h-5" />, labels.ingredients, remedy.ingredients[lang], 'yellow')}
          {renderSection(<ChefHat className="w-5 h-5" />, labels.preparation, remedy.preparation[lang], 'yellow')}
          
          {remedy.doses && remedy.doses.length > 0 && (
            <div className={cn("p-6 rounded-[2.5rem] border shadow-md space-y-6 mb-6 transition-all duration-300", getVariantStyles('yellow'))}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700"><Stethoscope className="w-5 h-5" /></div>
                <h3 className="text-[18px] font-bold leading-tight">{labels.dosage}</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {remedy.doses.map((dose, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedDoseIndex(i)} 
                    className={cn(
                      "px-4 py-3 rounded-2xl text-[13px] font-bold transition-all border flex items-center justify-center gap-2", 
                      selectedDoseIndex === i ? "bg-accent border-accent text-white shadow-lg scale-95" : (isNight ? "bg-white/5 border-white/10 text-white" : "bg-white border-amber-200 text-[#5F4B1A] hover:bg-amber-50")
                    )}
                  >
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
          {renderSection(<ShieldCheck className="w-5 h-5" />, labels.safety, remedy.safetyAdvice[lang], 'red', true)}
        </div>
      </div>

      <div className="flex justify-end items-center gap-1.5 pt-4 mb-4 overflow-x-auto pb-2 no-scrollbar">
        <Button onClick={() => window.print()} className="h-9 px-3 bg-[#14532D] text-white border-2 border-[#FBBF24] rounded-xl flex items-center gap-1.5 font-bold text-xs shrink-0"><FileDown className="w-3.5 h-3.5" /> PDF</Button>
        <Button onClick={handleCopy} className="h-9 px-3 bg-[#14532D] text-white border-2 border-[#FBBF24] rounded-xl flex items-center gap-1.5 font-bold text-xs shrink-0"><Copy className="w-3.5 h-3.5" /> LINK</Button>
        <Button onClick={handleWhatsAppShare} className="h-9 px-3 bg-[#14532D] text-white border-2 border-[#FBBF24] rounded-xl flex items-center gap-1.5 font-bold text-xs shrink-0"><Share2 className="w-3.5 h-3.5" /> SHARE</Button>
      </div>

      <div className={cn(
        "mt-8 p-6 rounded-[2.5rem] border-2 shadow-2xl transition-colors duration-500",
        isNight ? "bg-zinc-950 border-[#FBBF24]/30" : "bg-white border-[#FBBF24]/40"
      )}>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar flex flex-col pt-2 mb-6">
          {chatThread.length > 0 ? (
            chatThread.map((item) => (
              <div key={item.id} className="space-y-1 animate-in slide-in-from-bottom-2 duration-300 w-full flex flex-col">
                <div className="w-full flex flex-col items-end">
                  <div className={cn(
                    "px-4 py-2 rounded-2xl rounded-tr-none max-w-[85%] border shadow-sm",
                    isNight ? "bg-zinc-800 border-accent/20 text-white" : "bg-muted/30 border-primary/5 text-primary"
                  )}>
                    <p className="text-[14px] font-bold leading-tight">{item.question}</p>
                  </div>
                  <span className="text-[9px] font-bold opacity-40 mt-1 mr-1">
                    {formatDate(item._sortTs)}, {formatTime(item._sortTs)}
                  </span>
                </div>

                {item.answer && (
                  <div className="w-full flex flex-col items-start mt-4">
                    <div className={cn(
                      "px-4 py-2 rounded-2xl rounded-tl-none max-w-[85%] border-2 border-accent/40 bg-accent/5 shadow-md animate-in fade-in duration-500"
                    )}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="bg-accent p-0.5 rounded-full"><Sparkles className="w-2.5 h-2.5 text-white" /></div>
                        <span className="text-[9px] font-black text-accent uppercase tracking-[0.2em]">वैद्य जी</span>
                      </div>
                      <p className="text-[14px] font-medium leading-tight">{item.answer}</p>
                    </div>
                    {item.answeredAt && (
                      <span className="text-[9px] font-bold opacity-40 mt-1 ml-1">
                        {formatDate(item.answeredAt)}, {formatTime(item.answeredAt)}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="py-12 text-center opacity-30 flex flex-col items-center gap-4">
              <MessageSquare className="w-12 h-12" />
              <p className="font-bold text-sm">{labels.qaPlaceholder.replace('...', '')}</p>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="space-y-3 pt-4 border-t border-accent/10">
          <Textarea 
            placeholder={labels.qaPlaceholder}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className={cn(
              "min-h-[90px] rounded-2xl border-2 transition-all duration-300 focus:ring-0",
              isNight ? "bg-zinc-900 border-[#FBBF24] text-white" : "bg-white border-[#FBBF24] text-primary"
            )}
          />
          <Button 
            onClick={handleQuestionSubmit}
            disabled={isSubmittingQuestion || !question.trim() || !userId}
            className="w-full h-12 !bg-[#14532D] text-white border-2 !border-[#FBBF24] rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 disabled:opacity-50"
          >
            {isSubmittingQuestion ? <Loader2 className="animate-spin w-5 h-5" /> : labels.qaButton}
          </Button>
        </div>
      </div>
    </div>
  );
};
