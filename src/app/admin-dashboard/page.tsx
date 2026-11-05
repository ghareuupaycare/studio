'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LayoutDashboard, LogOut, PlusCircle, ChevronLeft, ClipboardList, Moon, Sun, MessageSquare, Send, X, Trash2, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { collection, addDoc, setDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { AdminForm } from '@/components/admin/admin-form';
import { AdminRemedyList } from '@/components/admin/admin-remedy-list';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

type ViewState = 'overview' | 'manage' | 'add-recipe' | 'questions';
type Theme = 'cream' | 'night';

const INITIAL_FORM_DATA = {
  mainCategoryHi: '', mainCategoryEn: '', diseaseNameHi: '', diseaseNameEn: '',
  remedyTitleHi: '', remedyTitleEn: '', introductionHi: '', introductionEn: '',
  ingredientsHi: '', ingredientsEn: '', preparationHi: '', preparationEn: '',
  usageHi: '', usageEn: '', dietEatHi: '', dietEatEn: '', dietAvoidHi: '', dietAvoidEn: '',
  routineHi: '', routineEn: '', safetyAdviceHi: '', safetyAdviceEn: '', seoKeywords: '',
};

const INITIAL_DOSES = [
  { ageRangeHi: '5 वर्ष से 12 वर्ष', ageRangeEn: '5 Years to 12 Years', doseHi: '', doseEn: '' },
  { ageRangeHi: '13 वर्ष से 40 वर्ष', ageRangeEn: '13 Years to 40 Years', doseHi: '', doseEn: '' },
  { ageRangeHi: '41 वर्ष से 60 वर्ष', ageRangeEn: '41 Years to 60 Years', doseHi: '', doseEn: '' },
  { ageRangeHi: '61 वर्ष से 80 वर्ष', ageRangeEn: '61 Years to 80 Years', doseHi: '', doseEn: '' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const db = useFirestore();
  const [isLoaded, setIsLoaded] = useState(false);
  const [view, setView] = useState('overview');
  const [theme, setTheme] = useState<Theme>('cream');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [liveRecipes, setLiveRecipes] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [doses, setDoses] = useState<any[]>(INITIAL_DOSES);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  
  // Storage for reply inputs per thread card to keep them persistent
  const [replyText, setReplyText] = useState<Record<string, string>>({});

  useEffect(() => {
    const isAuth = typeof window !== 'undefined' ? localStorage.getItem('gharelu_admin_auth') : null;
    if (isAuth !== 'true') router.push('/admin-login');
    else setIsLoaded(true);
  }, [router]);

  useEffect(() => {
    if (!db) return;
    const unsubRecipes = onSnapshot(query(collection(db, 'recipes'), orderBy('timestamp', 'desc')), (snapshot) => {
      setLiveRecipes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    const unsubQuestions = onSnapshot(query(collection(db, 'questions'), orderBy('timestamp', 'asc')), (snapshot) => {
      setQuestions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => { unsubRecipes(); unsubQuestions(); };
  }, [db]);

  const isNight = theme === 'night';

  const groupedRecipes = useMemo(() => {
    const groups: Record<string, Record<string, any[]>> = {};
    liveRecipes.forEach(recipe => {
      const cat = recipe.mainCategory?.hi || 'अन्य';
      const dis = recipe.diseaseName?.hi || 'सामान्य';
      if (!groups[cat]) groups[cat] = {};
      if (!groups[cat][dis]) groups[cat][dis] = [];
      groups[cat][dis].push(recipe);
    });
    return groups;
  }, [liveRecipes]);

  // Group questions by UserID + RemedyID for a unified threaded view
  const groupedQuestions = useMemo(() => {
    const groups: Record<string, {
      userId: string;
      remedyId: string;
      remedyName: any;
      messages: any[];
    }> = {};

    questions.forEach(q => {
      const key = `${q.userId}_${q.remedyId}`;
      if (!groups[key]) {
        groups[key] = {
          userId: q.userId,
          remedyId: q.remedyId,
          remedyName: q.remedyName,
          messages: []
        };
      }
      groups[key].messages.push(q);
    });

    return Object.values(groups).map(group => ({
      ...group,
      messages: group.messages.sort((a, b) => (a.timestamp?.toMillis() || 0) - (b.timestamp?.toMillis() || 0))
    })).sort((a, b) => {
      const lastA = a.messages[a.messages.length - 1]?.timestamp?.toMillis() || 0;
      const lastB = b.messages[b.messages.length - 1]?.timestamp?.toMillis() || 0;
      return lastB - lastA;
    });
  }, [questions]);

  // Function to reply to the latest question in a thread
  const handleReplyThread = async (threadKey: string, thread: any) => {
    if (!db || !replyText[threadKey]?.trim()) return;
    
    // Find the latest question document that needs a reply or simply the latest one
    const latestDoc = thread.messages[thread.messages.length - 1];
    if (!latestDoc) return;

    try {
      await updateDoc(doc(db, 'questions', latestDoc.id), {
        answer: replyText[threadKey].trim(),
        hasAnswer: true,
        isRead: false,
        answeredAt: serverTimestamp()
      });
      setReplyText(prev => ({ ...prev, [threadKey]: '' }));
      toast({ title: "जवाब भेज दिया गया!" });
    } catch (e) {
      toast({ variant: "destructive", title: "त्रुटि" });
    }
  };

  const handleQuestionDelete = async (qId: string) => {
    if (!db || !confirm("क्या आप वाकई यह सवाल हटाना चाहते हैं?")) return;
    try {
      await deleteDoc(doc(db, 'questions', qId));
      toast({ title: "हटा दिया गया" });
    } catch (e) { toast({ variant: "destructive", title: "त्रुटि" }); }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setDoses(INITIAL_DOSES);
    setEditingId(null);
    setUploadedImageUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    setIsSubmitting(true);
    try {
      const submissionData = {
        mainCategory: { hi: formData.mainCategoryHi, en: formData.mainCategoryEn },
        diseaseName: { hi: formData.diseaseNameHi, en: formData.diseaseNameEn },
        remedyTitle: { hi: formData.remedyTitleHi, en: formData.remedyTitleEn },
        introduction: { hi: formData.introductionHi, en: formData.introductionEn },
        ingredients: { hi: formData.ingredientsHi, en: formData.ingredientsEn },
        preparation: { hi: formData.preparationHi, en: formData.preparationEn },
        usage: { hi: formData.usageHi, en: formData.usageEn },
        dietEat: { hi: formData.dietEatHi, en: formData.dietEatEn },
        dietAvoid: { hi: formData.dietAvoidHi, en: formData.dietAvoidEn },
        routine: { hi: formData.routineHi, en: formData.routineEn },
        safetyAdvice: { hi: formData.safetyAdviceHi, en: formData.safetyAdviceEn },
        doses: doses.map(d => ({ ageRange: { hi: d.ageRangeHi, en: d.ageRangeEn }, dose: { hi: d.doseHi, en: d.doseEn } })),
        keywords: formData.seoKeywords.split(',').map(k => k.trim()),
        image: uploadedImageUrl,
        timestamp: serverTimestamp(),
      };
      if (editingId) await setDoc(doc(db, 'recipes', editingId), submissionData, { merge: true });
      else await addDoc(collection(db, 'recipes'), submissionData);
      toast({ title: "सफलता!" });
      resetForm();
      setView('manage');
    } catch (error) { toast({ variant: "destructive", title: "विफल" }); }
    finally { setIsSubmitting(false); }
  };

  if (!isLoaded) return null;

  return (
    <div className={cn("min-h-screen flex flex-col transition-colors duration-500", isNight ? "bg-zinc-950 text-white" : "bg-[#FDFBF7] text-foreground")}>
      <header className={cn("h-14 flex items-center justify-between px-6 sticky top-0 z-50 shadow-md", isNight ? "bg-zinc-900" : "bg-primary text-white")}>
        <div className="flex items-center gap-3"><LayoutDashboard /><h1 className="font-headline font-black text-lg">एडमिन कंट्रोल</h1></div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setTheme(prev => prev === 'cream' ? 'night' : 'cream')} className="text-white">
            {isNight ? <Sun /> : <Moon />}
          </Button>
          <Button variant="ghost" onClick={() => { localStorage.removeItem('gharelu_admin_auth'); router.push('/admin-login'); }}><LogOut className="mr-2" /> लॉगआउट</Button>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
        {view === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className={cn("p-8 text-center space-y-4 cursor-pointer rounded-[2.5rem] border-2 transition-all hover:scale-105 shadow-xl", isNight ? "bg-zinc-900 border-white/10" : "bg-white border-primary/10")} onClick={() => setView('manage')}>
              <ClipboardList className="mx-auto w-10 h-10 text-primary" />
              <h3 className="font-bold">नुस्खे प्रबंधित करें</h3>
            </Card>
            <Card className={cn("p-8 text-center space-y-4 cursor-pointer rounded-[2.5rem] border-2 transition-all hover:scale-105 shadow-xl", isNight ? "bg-zinc-900 border-white/10" : "bg-white border-primary/10")} onClick={() => setView('add-recipe')}>
              <PlusCircle className="mx-auto w-10 h-10 text-emerald-600" />
              <h3 className="font-bold">नया नुस्खा जोड़ें</h3>
            </Card>
            <Card className={cn("p-8 text-center space-y-4 cursor-pointer rounded-[2.5rem] border-2 transition-all hover:scale-105 shadow-xl", isNight ? "bg-zinc-900 border-accent/20" : "bg-white border-accent/40")} onClick={() => setView('questions')}>
              <MessageSquare className="mx-auto w-10 h-10 text-accent" />
              <h3 className="font-bold">सवालों के जवाब दें</h3>
              {questions.filter(q => !q.hasAnswer).length > 0 && (
                <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] animate-pulse">
                  {questions.filter(q => !q.hasAnswer).length} New
                </span>
              )}
            </Card>
          </div>
        )}

        {view === 'questions' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <Button variant="ghost" onClick={() => setView('overview')} className="mb-4"><ChevronLeft className="mr-2" /> पीछे</Button>
            <h2 className="text-2xl font-black font-headline">यूज़र के सवाल (चैट थ्रेड्स)</h2>
            
            <div className="grid gap-6">
              {groupedQuestions.length > 0 ? groupedQuestions.map((group, idx) => {
                const threadKey = `${group.userId}_${group.remedyId}`;
                return (
                  <Card key={idx} className={cn("p-6 rounded-[2.5rem] border-2 shadow-sm overflow-hidden", isNight ? "bg-zinc-900 border-white/5" : "bg-white border-accent/20")}>
                    {/* Thread Header - Clickable Recipe Link */}
                    <div className="mb-6 border-b pb-4 border-accent/10">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <button 
                            onClick={() => router.push(`/?remedyId=${group.remedyId}`)}
                            className="text-left group/link"
                          >
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-1 flex items-center gap-1 group-hover/link:underline">
                              नुस्खा देखें <ExternalLink className="w-2.5 h-2.5" />
                            </p>
                            <h3 className="text-xl font-bold flex items-center gap-2 group-hover/link:text-accent transition-colors">
                              <MessageSquare className="w-5 h-5 text-accent" />
                              {group.remedyName?.hi} (Thread)
                            </h3>
                          </button>
                        </div>
                        <div className="text-[9px] opacity-40 uppercase font-bold text-right ml-4">
                          User ID: #{group.userId.slice(-4)}<br/>
                          Active: {group.messages[group.messages.length - 1]?.timestamp?.toDate().toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    {/* Unified Chat History within this thread card */}
                    <div className="space-y-6 max-h-[500px] overflow-y-auto mb-6 pr-2 custom-scrollbar flex flex-col">
                      {group.messages.map((item) => (
                        <div key={item.id} className="space-y-2 group/msg relative">
                          <div className="flex justify-between items-center px-1">
                             <span className="text-[9px] font-bold opacity-40">{item.timestamp?.toDate ? item.timestamp.toDate().toLocaleString() : '...'}</span>
                             <Button 
                               variant="ghost" 
                               size="icon" 
                               className="h-6 w-6 text-destructive opacity-0 group-hover/msg:opacity-100 transition-opacity" 
                               onClick={() => handleQuestionDelete(item.id)}
                             >
                               <Trash2 className="w-3 h-3" />
                             </Button>
                          </div>
                          
                          {/* User Message Bubble */}
                          <div className={cn(
                            "p-4 rounded-2xl rounded-tr-none max-w-[90%] self-end ml-auto border-2 shadow-sm",
                            isNight ? "bg-zinc-800 border-white/5" : "bg-muted/30 border-primary/5"
                          )}>
                            <p className="font-bold text-[14px] leading-relaxed">{item.question}</p>
                          </div>
                          
                          {/* Admin Reply Area (per message if answered) */}
                          {item.answer && (
                            <div className={cn(
                              "p-4 rounded-2xl rounded-tl-none max-w-[90%] self-start mr-auto border-2 border-accent/40 bg-accent/5 shadow-sm animate-in fade-in"
                            )}>
                              <p className="text-[9px] font-black text-accent uppercase tracking-widest mb-1 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> आपका जवाब:
                              </p>
                              <p className="text-[14px] font-medium leading-relaxed">{item.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Persistent Unified Thread Reply Box at Bottom of Card */}
                    <div className="pt-4 border-t border-accent/10 flex gap-2">
                      <Textarea 
                        placeholder="नया संदेश या जवाब लिखें..." 
                        value={replyText[threadKey] || ''} 
                        onChange={(e) => setReplyText(prev => ({ ...prev, [threadKey]: e.target.value }))} 
                        className={cn(
                          "rounded-2xl border-2 focus:border-accent min-h-[60px] text-sm resize-none",
                          isNight ? "bg-zinc-800 border-white/5 text-white" : "bg-white border-primary/5"
                        )} 
                      />
                      <Button 
                        className="bg-accent hover:bg-accent/90 h-auto px-4 rounded-2xl text-white shadow-lg active:scale-95 transition-all" 
                        onClick={() => handleReplyThread(threadKey, group)}
                        disabled={!replyText[threadKey]?.trim()}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                );
              }) : (
                <div className="p-20 text-center opacity-30 flex flex-col items-center gap-4">
                  <MessageSquare className="w-20 h-20" />
                  <p className="font-bold text-xl">अभी कोई चैट थ्रेड नहीं है</p>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'manage' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <Button variant="ghost" onClick={() => setView('overview')} className="mb-4"><ChevronLeft className="mr-2" /> पीछे</Button>
            <AdminRemedyList 
              groupedRecipes={groupedRecipes} 
              onEdit={(r) => { setFormData({ ...r, seoKeywords: r.keywords?.join(',') }); setEditingId(r.id); setView('add-recipe'); }} 
              onDelete={async (_, id) => { if(confirm("हटाएं?")) await deleteDoc(doc(db!, 'recipes', id)); }} 
              onDeleteCategory={()=>{}} onDeleteSubCategory={()=>{}} onQuickAdd={()=>{}} isNight={isNight}
            />
          </div>
        )}

        {view === 'add-recipe' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <Button variant="ghost" onClick={() => setView('overview')} className="mb-4"><ChevronLeft className="mr-2" /> रद्द करें</Button>
            <AdminForm 
              formData={formData} doses={doses} isSubmitting={isSubmitting} editingId={editingId} isUploadingImage={false} uploadProgress={0}
              onInputChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))} 
              onDoseChange={(i, f, v) => { const n = [...doses]; (n[i] as any)[f] = v; setDoses(n); }}
              onAddDose={() => setDoses([...doses, { ageRangeHi: '', ageRangeEn: '', doseHi: '', doseEn: '' }])}
              onRemoveDose={(i) => setDoses(doses.filter((_, idx) => idx !== i))}
              onImageChange={()=>{}} onClearImage={()=>{}} existingImageUrl={uploadedImageUrl}
              onSubmit={handleSubmit} onCancel={() => setView('manage')} isNight={isNight}
            />
          </div>
        )}
      </main>
    </div>
  );
}