'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LayoutDashboard, LogOut, PlusCircle, ChevronLeft, ClipboardList, Moon, Sun, MessageSquare, Send, X, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useStorage } from '@/firebase';
import { collection, addDoc, setDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc, where, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
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
  const storage = useStorage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [view, setView] = useState<ViewState>('overview');
  const [theme, setTheme] = useState<Theme>('cream');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [liveRecipes, setLiveRecipes] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [doses, setDoses] = useState<any[]>(INITIAL_DOSES);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
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
    const unsubQuestions = onSnapshot(query(collection(db, 'questions'), orderBy('timestamp', 'desc')), (snapshot) => {
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

  const handleReplySubmit = async (qId: string) => {
    if (!db || !replyText[qId]?.trim()) return;
    try {
      await updateDoc(doc(db, 'questions', qId), {
        answer: replyText[qId].trim(),
        hasAnswer: true,
        isRead: false,
        answeredAt: serverTimestamp()
      });
      setReplyText(prev => ({ ...prev, [qId]: '' }));
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
    <div className={cn("min-h-screen flex flex-col transition-colors", isNight ? "bg-zinc-950 text-white" : "bg-[#FDFBF7]")}>
      <header className={cn("h-14 flex items-center justify-between px-6 sticky top-0 z-50 shadow-md", isNight ? "bg-zinc-900" : "bg-primary text-white")}>
        <div className="flex items-center gap-3"><LayoutDashboard /><h1 className="font-headline font-black text-lg">एडमिन कंट्रोल</h1></div>
        <Button variant="ghost" onClick={() => { localStorage.removeItem('gharelu_admin_auth'); router.push('/admin-login'); }}><LogOut className="mr-2" /> लॉगआउट</Button>
      </header>

      <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
        {view === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className={cn("p-8 text-center space-y-4 cursor-pointer rounded-[2.5rem]", isNight ? "bg-zinc-900" : "bg-white")} onClick={() => setView('manage')}>
              <ClipboardList className="mx-auto w-10 h-10" /><h3>नुस्खे प्रबंधित करें</h3>
            </Card>
            <Card className={cn("p-8 text-center space-y-4 cursor-pointer rounded-[2.5rem]", isNight ? "bg-zinc-900" : "bg-white")} onClick={() => setView('add-recipe')}>
              <PlusCircle className="mx-auto w-10 h-10" /><h3>नया नुस्खा जोड़ें</h3>
            </Card>
            <Card className={cn("p-8 text-center space-y-4 cursor-pointer rounded-[2.5rem]", isNight ? "bg-zinc-900 border-accent/20" : "bg-white")} onClick={() => setView('questions')}>
              <MessageSquare className="mx-auto w-10 h-10 text-accent" /><h3>सवालों के जवाब दें</h3>
              {questions.filter(q => !q.hasAnswer).length > 0 && <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">New</span>}
            </Card>
          </div>
        )}

        {view === 'questions' && (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setView('overview')}><ChevronLeft /> पीछे</Button>
            <h2 className="text-2xl font-black">यूज़र के सवाल</h2>
            <div className="grid gap-4">
              {questions.length > 0 ? questions.map(q => (
                <Card key={q.id} className={cn("p-6 rounded-[2rem] border-2", isNight ? "bg-zinc-900" : "bg-white", q.hasAnswer ? "border-emerald-500/20" : "border-accent/40")}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Recipe: {q.remedyName?.hi}</p>
                      <h4 className="text-lg font-bold">{q.question}</h4>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleQuestionDelete(q.id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                  {q.answer ? (
                    <div className="bg-emerald-500/10 p-4 rounded-xl border-l-4 border-emerald-500">
                      <p className="text-xs font-bold uppercase mb-1">वैद्य जी का जवाब:</p>
                      <p>{q.answer}</p>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Textarea placeholder="अपना जवाब यहाँ लिखें..." value={replyText[q.id] || ''} onChange={(e) => setReplyText(prev => ({ ...prev, [q.id]: e.target.value }))} className={cn("rounded-xl", isNight && "bg-zinc-800")} />
                      <Button className="bg-accent h-auto px-6 rounded-xl" onClick={() => handleReplySubmit(q.id)}><Send /></Button>
                    </div>
                  )}
                </Card>
              )) : <p className="text-center italic opacity-50 py-20">अभी कोई सवाल नहीं हैं।</p>}
            </div>
          </div>
        )}

        {view === 'manage' && (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setView('overview')}><ChevronLeft /> पीछे</Button>
            <AdminRemedyList 
              groupedRecipes={groupedRecipes} 
              onEdit={(r) => { setFormData({ ...r, seoKeywords: r.keywords?.join(',') }); setEditingId(r.id); setView('add-recipe'); }} 
              onDelete={async (_, id) => { if(confirm("हटाएं?")) await deleteDoc(doc(db!, 'recipes', id)); }} 
              onDeleteCategory={()=>{}} onDeleteSubCategory={()=>{}} onQuickAdd={()=>{}} isNight={isNight}
            />
          </div>
        )}

        {view === 'add-recipe' && (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setView('overview')}><ChevronLeft /> रद्द करें</Button>
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
