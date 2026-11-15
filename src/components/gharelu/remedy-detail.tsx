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
  Volume2,
  VolumeX,
  PlayCircle,
  MessageSquare,
  Sparkles,
  Loader2
} from 'lucide-react';
import { cn, toEnglishDigits } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { useFirestore } from '@/firebase';
import { getChatUserId, getChatCacheKey, listenToChatThread, postUserExperience } from '@/lib/chat-sync';
import { speakText, stopSpeech } from '@/lib/audio-reader';
import { RemedyActionBar } from './remedy-action-bar';

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
  const isMountedRef = useRef(true);

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [question, setQuestion] = useState('');
  const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false);
  const [chatThread, setChatThread] = useState<any[]>([]);
  const [userId, setUserId] = useState<string>('');

  const stopAllAudioNow = () => {
    isMountedRef.current = false;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (typeof stopSpeech === 'function') {
      stopSpeech();
    }
    setIsAudioPlaying(false);
  };

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      stopAllAudioNow();
    };
  }, []);

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
      if (!isMountedRef.current) return;
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

  const handleToggleAudio = () => {
    if (isAudioPlaying) {
      stopAllAudioNow();
      return;
    }

    isMountedRef.current = true;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (typeof stopSpeech === 'function') {
      stopSpeech();
    }
    setIsAudioPlaying(true);

    try {
      const currentLang = lang || 'hi';

      const pickText = (val: any): string => {
        if (!val) return '';
        if (typeof val === 'string') return val.trim();
        if (typeof val === 'object') {
          return String(val[currentLang] || val['hi'] || val['en'] || '').trim();
        }
        return '';
      };

      const pickSection = (val: any, formatter?: (item: any, idx: number) => string): string => {
        if (!val) return '';
        const data =
          typeof val === 'object' && !Array.isArray(val)
            ? (val[currentLang] ?? val['hi'] ?? val['en'] ?? val)
            : val;

        if (typeof data === 'string') return data.trim();
        if (Array.isArray(data)) {
          return data
            .map((item, idx) => {
              if (formatter) return formatter(item, idx);
              if (typeof item === 'string') return item.trim();
              if (item && typeof item === 'object') {
                return pickText(item.text || item.instruction || item.rule || item.description || item.name || '');
              }
              return '';
            })
            .filter(Boolean)
            .join('। ');
        }
        if (data && typeof data === 'object') {
          return Object.entries(data)
            .map(([k, v]) => {
              const vText = pickText(v);
              return vText ? `${k}: ${vText}` : '';
            })
            .filter(Boolean)
            .join('। ');
        }
        return '';
      };

      const titleText = pickText(remedy?.name);
      const introText = pickSection(remedy?.introduction);
      const ingredientsText = pickSection(remedy?.ingredients, (item: any) => {
        if (typeof item === 'string') return item.trim();
        const name = pickText(item?.name);
        const qty = pickText(item?.quantity || item?.amount);
        return [name, qty].filter(Boolean).join(' - ');
      });
      const prepText = pickSection(remedy?.preparation, (step: any, idx: number) => {
        const stepText =
          typeof step === 'string'
            ? step.trim()
            : pickText(step?.instruction || step?.step || step?.description || step?.text);
        return stepText ? `चरण ${idx + 1}: ${stepText}` : '';
      });

      let doseText = '';
      if (Array.isArray(remedy?.doses) && remedy.doses.length > 0) {
        const idx =
          typeof selectedDoseIndex === 'number' && selectedDoseIndex >= 0 && selectedDoseIndex < remedy.doses.length
            ? selectedDoseIndex
            : 0;
        const d = remedy.doses[idx] || remedy.doses[0];
        const age = pickText(d?.ageRange || d?.age || (d as any)?.label);
        const amount = pickText(d?.dose || (d as any)?.dosage || (d as any)?.amount || (d as any)?.instruction);
        if (age || amount) {
          doseText = `स्मार्ट खुराक${age ? ` (${age})` : ''}: ${amount}`;
        }
      }

      const usageText = pickSection(remedy?.usage, (rule: any, idx: number) => {
        const rText =
          typeof rule === 'string'
            ? rule.trim()
            : pickText(rule?.rule || rule?.instruction || rule?.text || rule?.description);
        return rText ? `नियम ${idx + 1}: ${rText}` : '';
      });

      const eatText = pickSection(remedy?.dietEat);
      const avoidText = pickSection(remedy?.dietAvoid);
      const routineText = pickSection(remedy?.routine, (r: any) => {
        if (typeof r === 'string') return r.trim();
        const time = pickText(r?.time || r?.period);
        const desc = pickText(r?.description || r?.activity || r?.text);
        return [time, desc].filter(Boolean).join(': ');
      });
      const safetyText = pickSection(remedy?.safetyAdvice);

      const sectionList = [
        titleText,
        introText ? `बीमारी का परिचय: ${introText}` : '',
        ingredientsText ? `आवश्यक सामग्री: ${ingredientsText}` : '',
        prepText ? `बनाने की विधि: ${prepText}` : '',
        doseText,
        usageText ? `सेवन विधि: ${usageText}` : '',
        eatText ? `क्या खाएं: ${eatText}` : '',
        avoidText ? `क्या न खाएं: ${avoidText}` : '',
        routineText ? `दिनचर्या: ${routineText}` : '',
        safetyText ? `सुरक्षा सूचना: ${safetyText}` : '',
      ]
        .map((s) => toEnglishDigits(s).replace(/\s+/g, ' ').trim())
        .filter(Boolean);

      if (sectionList.length === 0) {
        setIsAudioPlaying(false);
        return;
      }

      let pointer = 0;

      const runNext = () => {
        if (!isMountedRef.current) {
          stopAllAudioNow();
          return;
        }

        if (pointer >= sectionList.length) {
          setIsAudioPlaying(false);
          return;
        }

        const block = sectionList[pointer];
        pointer += 1;

        speakText(
          block,
          currentLang,
          () => {
            if (!isMountedRef.current) return;
            runNext();
          },
          () => {
            if (!isMountedRef.current) return;
            setIsAudioPlaying(false);
          }
        );
      };

      runNext();
    } catch (err) {
      console.error('Audio Error:', err);
      if (isMountedRef.current) {
        setIsAudioPlaying(false);
      }
    }
  };

  const labels = {
    introduction: isHindi ? '1. बीमारी का परिचय' : '1. Introduction',
    ingredients: isHindi ? '2. आवश्यक सामग्री' : '2. Required Ingredients',
    preparation: isHindi ? '3. बनाने की विधि' : '3. Preparation Method',
    dosage: isHindi ? '4. स्मार्ट खुराक' : '4. Smart Dosage',
    usage: isHindi ? '5. सेवन विधि' : '5. Consumption Method',
    dietEat: isHindi ? '6. क्या खाएं' : '6. What to Eat',
    dietAvoid: isHindi ? '7. क्या न खाएं' : '7. What Not to Eat',
    routine: isHindi ? '8. दिनचर्या' : '8. Daily Routine',
    safety: isHindi ? '9. सुरक्षा सूचना' : '9. Safety Information',
    qaPlaceholder: isHindi ? 'अपना अनुभव साझा करें...' : 'Share your experience...',
    qaButton: isHindi ? 'नया अनुभव भेजें' : 'Send Experience',
  };

  const getVariantStyles = (variant: SectionVariant) => {
    if (isNight) return "bg-zinc-900 border-zinc-800 text-white";
    switch (variant) {
      case 'green': return "bg-[#E6F4EA] border-[#B2D8B9] text-[#0D3B2E]";
      case 'red': return "bg-[#FDF2F2] border-[#F8D7DA] text-[#721C24]";
      case 'yellow': default: return "bg-[#FFF9E6] border-[#FCE8B2] text-[#5F4B1A]";
    }
  };

  const renderSection = (icon: React.ReactNode, title: string, content: any, variant: SectionVariant) => {
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
        </div>
      </div>
    );
  };

  const formatTime = (ts: any) => {
    try {
      const ms = ts?.toMillis?.() || ts?.seconds * 1000 || new Date(ts).getTime();
      return new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) { return ""; }
  };

  const formatDate = (ts: any) => {
    try {
      const ms = ts?.toMillis?.() || ts?.seconds * 1000 || new Date(ts).getTime();
      return new Date(ms).toLocaleDateString([], { day: 'numeric', month: 'short' });
    } catch (e) { return ""; }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24 max-w-2xl mx-auto overflow-hidden">
      <div className="w-full">
        <div className="flex justify-start mb-2 px-1">
          <Button 
            onClick={handleToggleAudio}
            variant="outline" 
            size="sm"
            className={cn(
              "rounded-full px-4 h-9 gap-2 font-black text-[11px] uppercase tracking-widest transition-all shadow-md",
              isAudioPlaying 
                ? "bg-accent border-accent text-white animate-pulse" 
                : (isNight ? "bg-zinc-800 border-white/10 text-white" : "bg-[#14532D]/5 border-[#14532D]/20 text-[#14532D]")
            )}
          >
            {isAudioPlaying ? (
              <><VolumeX className="w-4 h-4" /> {isHindi ? 'रुकें' : 'Stop'}</>
            ) : (
              <><Volume2 className="w-4 h-4" /> {isHindi ? 'नुस्खा सुनें' : 'Listen'}</>
            )}
          </Button>
        </div>

        <div className="flex items-start justify-between mb-4 gap-2">
          <h2 className={cn("text-[26px] font-black tracking-wide leading-tight flex-1", isNight ? "text-white" : "text-[#14532D]")}>
            {toEnglishDigits(remedy.name?.[lang] || '')}
          </h2>
          <Button variant="ghost" size="icon" onClick={onToggleFavorite} className={cn("rounded-full h-10 w-10 shrink-0", isFavorite ? "text-accent" : "text-muted-foreground")}>
            <Heart className={cn("w-6 h-6", isFavorite && "fill-current")} />
          </Button>
        </div>

        {remedy.image && (
          <div className="mb-8 relative aspect-[16/9] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-accent/20">
            <Image src={remedy.image} alt={remedy.name?.[lang] as string || 'remedy'} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" priority />
            {isAudioPlaying && (
              <div className="absolute top-4 right-4 bg-accent text-white p-2 rounded-full shadow-lg animate-bounce">
                <PlayCircle className="w-6 h-6" />
              </div>
            )}
          </div>
        )}

        <div className="space-y-0">
          {renderSection(<Info className="w-5 h-5" />, labels.introduction, remedy.introduction?.[lang], 'green')}
          {renderSection(<Beaker className="w-5 h-5" />, labels.ingredients, remedy.ingredients?.[lang], 'yellow')}
          {renderSection(<ChefHat className="w-5 h-5" />, labels.preparation, remedy.preparation?.[lang], 'yellow')}
          
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
                    <User className="w-3.5 h-3.5" /> {toEnglishDigits(dose.ageRange?.[lang] || dose.age?.[lang] || '')}
                  </button>
                ))}
              </div>
              {remedy.doses[selectedDoseIndex] && (
                <div className={cn("p-5 rounded-2xl border-l-4", isNight ? "bg-white/5 border-accent" : "bg-white/60 border-accent")}>
                  <div className="text-[16px] font-bold leading-relaxed">
                    <ul className="space-y-2 list-none p-0 m-0">
                      {(Array.isArray(remedy.doses[selectedDoseIndex].dose?.[lang]) ? (remedy.doses[selectedDoseIndex].dose?.[lang] as string[]) : (remedy.doses[selectedDoseIndex].dose?.[lang] as string || '').split('\n')).filter(p => p.trim() !== '').map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" /><span>{toEnglishDigits(point)}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {renderSection(<Activity className="w-5 h-5" />, labels.usage, remedy.usage?.[lang], 'yellow')}
          {renderSection(<Apple className="w-5 h-5" />, labels.dietEat, remedy.dietEat?.[lang], 'green')}
          {renderSection(<AlertTriangle className="w-5 h-5" />, labels.dietAvoid, remedy.dietAvoid?.[lang], 'red')}
          
          <div className={cn("p-6 rounded-[2.5rem] border shadow-md space-y-4 mb-6 transition-all duration-300", getVariantStyles('yellow'))}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700"><Clock className="w-5 h-5" /></div>
              <h3 className="text-[18px] font-bold leading-tight">{labels.routine}</h3>
            </div>
            
            <div className="text-[15px] leading-relaxed font-medium">
              <ul className="space-y-3 list-none p-0 m-0">
                {remedy.routine?.morning || remedy.routine?.afternoon || remedy.routine?.evening ? (
                  <>
                    {['morning', 'afternoon', 'evening'].map((timeKey) => {
                      const timeData = (remedy.routine as any)?.[timeKey];
                      if (!timeData) return null;
                      
                      const label = timeKey === 'morning' ? (isHindi ? 'सुबह' : 'Morning') : 
                                    timeKey === 'afternoon' ? (isHindi ? 'दोपहर' : 'Afternoon') : 
                                    (isHindi ? 'शाम' : 'Evening');
                      
                      const content = Array.isArray(timeData[lang]) 
                        ? timeData[lang].join('. ') 
                        : (timeData[lang] || '');
                      
                      if (!content) return null;

                      return (
                        <li key={timeKey} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                          <span>
                            <span className="font-black text-amber-700 mr-1">{label}:</span>
                            {toEnglishDigits(content)}
                          </span>
                        </li>
                      );
                    })}
                  </>
                ) : (
                  (() => {
                    const data = (remedy.routine as any)?.[lang] || (remedy.routine as any);
                    const points: string[] = Array.isArray(data) 
                      ? data.filter(item => typeof item === 'string' && item.trim() !== '') 
                      : (typeof data === 'string' ? data.split('\n').filter(line => line.trim() !== '') : []);
                    
                    return points.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                        <span>{toEnglishDigits(item)}</span>
                      </li>
                    ));
                  })()
                )}
              </ul>
            </div>
          </div>

          {renderSection(<ShieldCheck className="w-5 h-5" />, labels.safety, remedy.safetyAdvice?.[lang], 'red')}

          <div className={cn(
            "p-5 rounded-[2.5rem] border border-dashed text-[13px] leading-relaxed mb-6 font-bold text-center",
            isNight ? "bg-white/5 border-white/20 text-white/60" : "bg-primary/5 border-primary/20 text-muted-foreground"
          )}>
            <p>
              विशेष परामर्श: प्रिय पाठक, यह घरेलू उपाय शैक्षिक उद्देश्य से साझा किए गए हैं। किसी भी गंभीर स्थिति में हों, तो कृपया किसी योग्य डॉक्टर या वैद्य से व्यक्तिगत सलाह ज़रूर लें।
            </p>
          </div>
        </div>
      </div>

      <RemedyActionBar remedy={remedy} lang={lang} />

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
                    {formatDate(item.timestamp)}, {formatTime(item.timestamp)}
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
