
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LayoutDashboard, LogOut, PlusCircle, ChevronLeft, ClipboardList, Moon, Sun, MessageSquare, Send, Trash2, Sparkles, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useStorage } from '@/firebase';
import { 
  collection, onSnapshot, query, orderBy, deleteDoc, doc, 
  addDoc, updateDoc, serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { AdminRemedyList } from '@/components/admin/admin-remedy-list';
import { AdminForm } from '@/components/admin/admin-form';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { postAdminReply } from '@/lib/chat-sync';

type ViewState = 'overview' | 'manage' | 'add-recipe' | 'questions';
type Theme = 'cream' | 'night';

const INITIAL_FORM_DATA = {
  mainCategoryHi: '',
  mainCategoryEn: '',
  diseaseNameHi: '',
  diseaseNameEn: '',
  remedyTitleHi: '',
  remedyTitleEn: '',
  introductionHi: '',
  introductionEn: '',
  ingredientsHi: '',
  ingredientsEn: '',
  preparationHi: '',
  preparationEn: '',
  usageHi: '',
  usageEn: '',
  dietEatHi: '',
  dietEatEn: '',
  dietAvoidHi: '',
  dietAvoidEn: '',
  routineHi: '',
  routineEn: '',
  safetyAdviceHi: '',
  safetyAdviceEn: '',
  seoKeywords: ''
};

export default function AdminDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const db = useFirestore();
  const storage = useStorage();
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [view, setView] = useState<ViewState>('overview');
  const [theme, setTheme] = useState<Theme>('cream');
  
  // Data States
  const [questions, setQuestions] = useState<any[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  
  // Form States
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [doses, setDoses] = useState<any[]>([
    { ageRangeHi: "5-12 वर्ष", ageRangeEn: "5-12 Years", doseHi: "", doseEn: "" },
    { ageRangeHi: "13-40 वर्ष", ageRangeEn: "13-40 Years", doseHi: "", doseEn: "" },
    { ageRangeHi: "41-60 वर्ष", ageRangeEn: "41-60 Years", doseHi: "", doseEn: "" },
    { ageRangeHi: "61-80 वर्ष", ageRangeEn: "61-80 Years", doseHi: "", doseEn: "" }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Image States
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [recipeImageUrl, setRecipeImageUrl] = useState<string | null>(null);

  const [replyText, setReplyText] = useState<Record<string, string>>({});

  useEffect(() => {
    const isAuth = typeof window !== 'undefined' ? localStorage.getItem('gharelu_admin_auth') : null;
    if (isAuth !== 'true') router.push('/admin-login');
    else setIsLoaded(true);
  }, [router]);

  // Listeners
  useEffect(() => {
    if (!db) return;
    
    const unsubQuestions = onSnapshot(query(collection(db, 'questions')), (snapshot) => {
      setQuestions(snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        _ts: doc.data().timestamp?.toMillis() || Date.now()
      })));
    });

    const unsubRecipes = onSnapshot(query(collection(db, 'recipes'), orderBy('timestamp', 'desc')), (snapshot) => {
      setRecipes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => { 
      unsubQuestions(); 
      unsubRecipes(); 
    };
  }, [db]);

  const isNight = theme === 'night';

  const groupedRecipes = useMemo(() => {
    const grouped: Record<string, Record<string, any[]>> = {};
    recipes.forEach(recipe => {
      const cat = recipe.mainCategory?.hi || 'अन्य';
      const dis = recipe.diseaseName?.hi || 'सामान्य';
      if (!grouped[cat]) grouped[cat] = {};
      if (!grouped[cat][dis]) grouped[cat][dis] = [];
      grouped[cat][dis].push(recipe);
    });
    return grouped;
  }, [recipes]);

  const groupedQuestions = useMemo(() => {
    const groups: Record<string, any> = {};
    questions.forEach(q => {
      const key = `${q.userId}_${q.remedyId}`;
      if (!groups[key]) {
        groups[key] = { userId: q.userId, remedyId: q.remedyId, remedyName: q.remedyName, messages: [] };
      }
      groups[key].messages.push(q);
    });
    return Object.values(groups).map((g: any) => ({
      ...g,
      messages: g.messages.sort((a: any, b: any) => a._ts - b._ts)
    })).sort((a: any, b: any) => {
      const lastA = a.messages[a.messages.length - 1]?._ts || 0;
      const lastB = b.messages[b.messages.length - 1]?._ts || 0;
      return lastB - lastA;
    });
  }, [questions]);

  // Helper for Timestamps
  const formatTime = (ts: any) => {
    if (!ts) return "";
    try {
      const ms = typeof ts.toMillis === 'function' ? ts.toMillis() : (ts.seconds ? ts.seconds * 1000 : new Date(ts).getTime());
      return new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) { return ""; }
  };

  const formatDate = (ts: any) => {
    if (!ts) return "";
    try {
      const ms = typeof ts.toMillis === 'function' ? ts.toMillis() : (ts.seconds ? ts.seconds * 1000 : new Date(ts).getTime());
      return new Date(ms).toLocaleDateString([], { day: 'numeric', month: 'short' });
    } catch (e) { return ""; }
  };

  // Form Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDoseChange = (index: number, field: string, value: string) => {
    const newDoses = [...doses];
    newDoses[index][field] = value;
    setDoses(newDoses);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !storage) return;

    setIsUploadingImage(true);
    const storageRef = ref(storage, `recipe_images/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      }, 
      (error) => {
        console.error("Upload error", error);
        toast({ variant: "destructive", title: "इमेज अपलोड विफल" });
        setIsUploadingImage(false);
      }, 
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setRecipeImageUrl(downloadURL);
        setIsUploadingImage(false);
        toast({ title: "इमेज अपलोड सफल" });
      }
    );
  };

  const handleRecipeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    setIsSubmitting(true);

    const recipeData = {
      mainCategory: { hi: formData.mainCategoryHi, en: formData.mainCategoryEn },
      diseaseName: { hi: formData.diseaseNameHi, en: formData.diseaseNameEn },
      remedyTitle: { hi: formData.remedyTitleHi, en: formData.remedyTitleEn },
      introduction: { hi: formData.introductionHi, en: formData.introductionEn },
      ingredients: { hi: formData.ingredientsHi.split('\n'), en: formData.ingredientsEn.split('\n') },
      preparation: { hi: formData.preparationHi, en: formData.preparationEn },
      usage: { hi: formData.usageHi, en: formData.usageEn },
      dietEat: { hi: formData.dietEatHi, en: formData.dietEatEn },
      dietAvoid: { hi: formData.dietAvoidHi, en: formData.dietAvoidEn },
      routine: { hi: formData.routineHi, en: formData.routineEn },
      safetyAdvice: { hi: formData.safetyAdviceHi, en: formData.safetyAdviceEn },
      doses: doses.map(d => ({
        ageRange: { hi: d.ageRangeHi, en: d.ageRangeEn },
        dose: { hi: d.doseHi, en: d.doseEn }
      })),
      keywords: formData.seoKeywords.split(',').map(k => k.trim()),
      image: recipeImageUrl,
      timestamp: serverTimestamp()
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, 'recipes', editingId), recipeData);
        toast({ title: "नुस्खा अपडेट कर दिया गया!" });
      } else {
        await addDoc(collection(db, 'recipes'), recipeData);
        toast({ title: "नया नुस्खा जोड़ दिया गया!" });
      }
      setFormData(INITIAL_FORM_DATA);
      setRecipeImageUrl(null);
      setEditingId(null);
      setView('manage');
    } catch (error) {
      toast({ variant: "destructive", title: "त्रुटि", description: "नुस्खा सेव नहीं हो सका।" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditRecipe = (recipe: any) => {
    setFormData({
      mainCategoryHi: recipe.mainCategory?.hi || '',
      mainCategoryEn: recipe.mainCategory?.en || '',
      diseaseNameHi: recipe.diseaseName?.hi || '',
      diseaseNameEn: recipe.diseaseName?.en || '',
      remedyTitleHi: recipe.remedyTitle?.hi || '',
      remedyTitleEn: recipe.remedyTitle?.en || '',
      introductionHi: Array.isArray(recipe.introduction?.hi) ? recipe.introduction.hi.join('\n') : (recipe.introduction?.hi || ''),
      introductionEn: Array.isArray(recipe.introduction?.en) ? recipe.introduction.en.join('\n') : (recipe.introduction?.en || ''),
      ingredientsHi: Array.isArray(recipe.ingredients?.hi) ? recipe.ingredients.hi.join('\n') : (recipe.ingredients?.hi || ''),
      ingredientsEn: Array.isArray(recipe.ingredients?.en) ? recipe.ingredients.en.join('\n') : (recipe.ingredients?.en || ''),
      preparationHi: recipe.preparation?.hi || '',
      preparationEn: recipe.preparation?.en || '',
      usageHi: recipe.usage?.hi || '',
      usageEn: recipe.usage?.en || '',
      dietEatHi: recipe.dietEat?.hi || '',
      dietEatEn: recipe.dietEat?.en || '',
      dietAvoidHi: recipe.dietAvoid?.hi || '',
      dietAvoidEn: recipe.dietAvoid?.en || '',
      routineHi: recipe.routine?.hi || '',
      routineEn: recipe.routine?.en || '',
      safetyAdviceHi: recipe.safetyAdvice?.hi || '',
      safetyAdviceEn: recipe.safetyAdvice?.en || '',
      seoKeywords: recipe.keywords?.join(', ') || ''
    });
    setDoses(recipe.doses?.map((d: any) => ({
      ageRangeHi: d.ageRange?.hi,
      ageRangeEn: d.ageRange?.en,
      doseHi: d.dose?.hi,
      doseEn: d.dose?.en
    })) || []);
    setRecipeImageUrl(recipe.image || null);
    setEditingId(recipe.id);
    setView('add-recipe');
  };

  const handleDeleteRecipe = async (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    if (!db || !confirm(`क्या आप "${title}" को हटाना चाहते हैं?`)) return;
    try {
      await deleteDoc(doc(db, 'recipes', id));
      toast({ title: "नुस्खा हटा दिया गया" });
    } catch (e) {
      toast({ variant: "destructive", title: "हटाने में त्रुटि" });
    }
  };

  const handleReplyThread = async (threadKey: string, thread: any) => {
    if (!db || !replyText[threadKey]?.trim()) return;
    const latestDoc = thread.messages[thread.messages.length - 1];
    try {
      await postAdminReply(db, latestDoc.id, replyText[threadKey]);
      setReplyText(prev => ({ ...prev, [threadKey]: '' }));
      toast({ title: "जवाब भेज दिया गया!" });
    } catch (e) { toast({ variant: "destructive", title: "त्रुटि" }); }
  };

  const handleQuestionDelete = async (qId: string) => {
    if (!db || !confirm("क्या आप इस संदेश को हटाना चाहते हैं?")) return;
    try { 
      await deleteDoc(doc(db, 'questions', qId)); 
      toast({ title: "संदेश हटा दिया गया" });
    } catch (e) { toast({ variant: "destructive", title: "त्रुटि" }); }
  };

  if (!isLoaded) return null;

  return (
    <div className={cn("min-h-screen flex flex-col transition-colors", isNight ? "bg-zinc-950 text-white" : "bg-[#FDFBF7] text-foreground")}>
      <header className={cn("h-14 flex items-center justify-between px-6 sticky top-0 z-50 shadow-md", isNight ? "bg-zinc-900" : "bg-primary text-white")}>
        <div className="flex items-center gap-3" onClick={() => setView('overview')}><LayoutDashboard /><h1 className="font-headline font-black text-lg cursor-pointer">एडमिन कंट्रोल</h1></div>
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
            <Card className={cn("p-8 text-center space-y-4 cursor-pointer rounded-[2.5rem] border-2 transition-all hover:scale-105 shadow-xl", isNight ? "bg-zinc-900 border-white/10" : "bg-white border-primary/10 shadow-lg")} onClick={() => setView('manage')}>
              <ClipboardList className="mx-auto w-10 h-10 text-primary" />
              <h3 className="font-bold">नुस्खे प्रबंधित करें</h3>
            </Card>
            <Card className={cn("p-8 text-center space-y-4 cursor-pointer rounded-[2.5rem] border-2 transition-all hover:scale-105 shadow-xl", isNight ? "bg-zinc-900 border-white/10" : "bg-white border-primary/10 shadow-lg")} onClick={() => { setEditingId(null); setFormData(INITIAL_FORM_DATA); setView('add-recipe'); }}>
              <PlusCircle className="mx-auto w-10 h-10 text-emerald-600" />
              <h3 className="font-bold">नया नुस्खा जोड़ें</h3>
            </Card>
            <Card className={cn("p-8 text-center space-y-4 cursor-pointer rounded-[2.5rem] border-2 transition-all hover:scale-105 shadow-xl", isNight ? "bg-zinc-900 border-accent/20" : "bg-white border-accent/20 shadow-lg")} onClick={() => setView('questions')}>
              <MessageSquare className="mx-auto w-10 h-10 text-accent" />
              <h3 className="font-bold">सवालों के जवाब दें</h3>
              {questions.filter(q => !q.hasAnswer).length > 0 && <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] animate-pulse">New</span>}
            </Card>
          </div>
        )}

        {view === 'add-recipe' && (
          <div className="animate-in slide-in-from-right-4 duration-500">
            <Button variant="ghost" onClick={() => setView('overview')} className="mb-4"><ChevronLeft className="mr-2" /> पीछे</Button>
            <AdminForm 
              formData={formData}
              doses={doses}
              isSubmitting={isSubmitting}
              isUploadingImage={isUploadingImage}
              uploadProgress={uploadProgress}
              editingId={editingId}
              onInputChange={handleInputChange}
              onDoseChange={handleDoseChange}
              onAddDose={() => {}}
              onRemoveDose={() => {}}
              onImageChange={handleImageChange}
              onClearImage={() => setRecipeImageUrl(null)}
              existingImageUrl={recipeImageUrl}
              onSubmit={handleRecipeSubmit}
              onCancel={() => setView('manage')}
              isNight={isNight}
            />
          </div>
        )}

        {view === 'manage' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <Button variant="ghost" onClick={() => setView('overview')} className="mb-4"><ChevronLeft className="mr-2" /> पीछे</Button>
            <AdminRemedyList 
              groupedRecipes={groupedRecipes} 
              onEdit={handleEditRecipe} 
              onDelete={handleRecipeSubmit} 
              onDeleteCategory={() => {}} 
              onDeleteSubCategory={() => {}} 
              onQuickAdd={() => setView('add-recipe')} 
              isNight={isNight} 
            />
          </div>
        )}

        {view === 'questions' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <Button variant="ghost" onClick={() => setView('overview')} className="mb-4"><ChevronLeft className="mr-2" /> पीछे</Button>
            <h2 className="text-2xl font-black font-headline">चैट थ्रेड्स</h2>
            <div className="grid gap-6">
              {groupedQuestions.map((group, idx) => {
                const threadKey = `${group.userId}_${group.remedyId}`;
                return (
                  <Card key={idx} className={cn("p-6 rounded-[2.5rem] border-2 shadow-sm", isNight ? "bg-zinc-900 border-white/5" : "bg-white border-accent/20")}>
                    <div className="mb-6 border-b pb-4">
                      <button onClick={() => router.push(`/?remedyId=${group.remedyId}`)} className="text-left group/link flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-accent" />
                        <h3 className="text-xl font-bold group-hover/link:text-accent transition-colors">{group.remedyName?.hi}</h3>
                        <ExternalLink className="w-4 h-4 opacity-40" />
                      </button>
                    </div>
                    <div className="space-y-6 max-h-[400px] overflow-y-auto mb-6 pr-2 custom-scrollbar">
                      {group.messages.map((item: any) => (
                        <div key={item.id} className="group/msg flex flex-col space-y-1">
                          <div className="flex justify-end"><Button variant="ghost" size="icon" className="h-6 w-6 text-destructive opacity-0 group-hover/msg:opacity-100" onClick={() => handleQuestionDelete(item.id)}><Trash2 className="w-3 h-3" /></Button></div>
                          <div className="flex flex-col items-end">
                            <div className={cn("px-4 py-2 rounded-2xl rounded-tr-none max-w-[85%] border shadow-sm", isNight ? "bg-zinc-800 border-white/5" : "bg-muted/30 border-primary/5")}>
                              <p className="text-sm font-bold">{item.question}</p>
                            </div>
                            <span className="text-[9px] font-bold opacity-40 mt-1 mr-1">
                              {formatDate(item.timestamp)}, {formatTime(item.timestamp)}
                            </span>
                          </div>
                          {item.answer && (
                            <div className="w-full flex flex-col items-start mt-4">
                              <div className="px-4 py-2 rounded-2xl rounded-tl-none border-2 border-accent/40 bg-accent/5 max-w-[85%] shadow-sm">
                                <p className="text-sm font-medium">{item.answer}</p>
                              </div>
                              <span className="text-[9px] font-bold opacity-40 mt-1 ml-1">
                                {formatDate(item.answeredAt)}, {formatTime(item.answeredAt)}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t flex gap-2">
                      <Textarea placeholder="जवाब लिखें..." value={replyText[threadKey] || ''} onChange={(e) => setReplyText(prev => ({ ...prev, [threadKey]: e.target.value }))} className="rounded-2xl" />
                      <Button className="bg-accent text-white rounded-2xl" onClick={() => handleReplyThread(threadKey, group)} disabled={!replyText[threadKey]?.trim()}><Send className="w-4 h-4" /></Button>
                    </div>
                  </Card>
                );
              })}
              {groupedQuestions.length === 0 && <div className="p-20 text-center opacity-30 italic">कोई चैट नहीं है</div>}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
