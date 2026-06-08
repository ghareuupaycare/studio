
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LayoutDashboard, LogOut, PlusCircle, ChevronLeft, ClipboardList, Moon, Sun } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { collection, addDoc, setDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { AdminForm } from '@/components/admin/admin-form';
import { AdminRemedyList } from '@/components/admin/admin-remedy-list';
import { cn } from '@/lib/utils';

type DoseEntry = {
  ageRangeHi: string;
  ageRangeEn: string;
  doseHi: string;
  doseEn: string;
};

type ViewState = 'overview' | 'manage' | 'add-recipe';
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
  seoKeywords: '',
};

const INITIAL_DOSES: DoseEntry[] = [
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
  const [view, setView] = useState<ViewState>('overview');
  const [theme, setTheme] = useState<Theme>('cream');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [liveRecipes, setLiveRecipes] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [doses, setDoses] = useState<DoseEntry[]>(INITIAL_DOSES);

  useEffect(() => {
    const isAuth = typeof window !== 'undefined' ? localStorage.getItem('gharelu_admin_auth') : null;
    if (isAuth !== 'true') router.push('/admin-login');
    else {
      const savedTheme = localStorage.getItem('gharelu_admin_theme') as Theme;
      if (savedTheme) setTheme(savedTheme);
      setIsLoaded(true);
    }
  }, [router]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('gharelu_admin_theme', theme);
    }
  }, [theme, isLoaded]);

  useEffect(() => {
    if (!db) return;
    const unsubscribe = onSnapshot(query(collection(db, 'recipes'), orderBy('timestamp', 'desc')), (snapshot) => {
      setLiveRecipes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDoseChange = (index: number, field: keyof DoseEntry, value: string) => {
    const newDoses = [...doses];
    newDoses[index][field] = value;
    setDoses(newDoses);
  };

  const addDoseField = () => setDoses([...doses, { ageRangeHi: '', ageRangeEn: '', doseHi: '', doseEn: '' }]);
  const removeDoseField = (index: number) => setDoses(doses.filter((_, i) => i !== index));

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setDoses(INITIAL_DOSES);
    setEditingId(null);
  };

  const generateSlug = (category: string, disease: string, title: string) => {
    const combined = `${disease}-${title}`.toLowerCase();
    return combined
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    setIsSubmitting(true);

    const keywordArray = formData.seoKeywords
      .split(',')
      .map(k => k.trim())
      .filter(k => k !== '');

    const slug = generateSlug(formData.mainCategoryEn, formData.diseaseNameEn, formData.remedyTitleEn);

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
      keywords: keywordArray,
      slug: slug,
      timestamp: serverTimestamp(),
    };

    try {
      if (editingId) {
        await setDoc(doc(db, 'recipes', editingId), submissionData, { merge: true });
      } else {
        await addDoc(collection(db, 'recipes'), submissionData);
      }
      toast({ title: "सफलता!", description: "नुस्खा सुरक्षित किया गया!" });
      resetForm();
      setView('manage');
    } catch (error: any) {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: editingId ? `recipes/${editingId}` : 'recipes',
        operation: editingId ? 'update' : 'create',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (recipe: any) => {
    setFormData({
      mainCategoryHi: recipe.mainCategory?.hi || '',
      mainCategoryEn: recipe.mainCategory?.en || '',
      diseaseNameHi: recipe.diseaseName?.hi || '',
      diseaseNameEn: recipe.diseaseName?.en || '',
      remedyTitleHi: recipe.remedyTitle?.hi || '',
      remedyTitleEn: recipe.remedyTitle?.en || '',
      introductionHi: recipe.introduction?.hi || '',
      introductionEn: recipe.introduction?.en || '',
      ingredientsHi: recipe.ingredients?.hi || '',
      ingredientsEn: recipe.ingredients?.en || '',
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
      seoKeywords: Array.isArray(recipe.keywords) ? recipe.keywords.join(', ') : '',
    });
    
    const loadedDoses = recipe.doses?.map((d: any) => ({ 
      ageRangeHi: d.ageRange?.hi || '', 
      ageRangeEn: d.ageRange?.en || '', 
      doseHi: d.dose?.hi || '', 
      doseEn: d.dose?.en || '' 
    })) || INITIAL_DOSES;
    
    setDoses(loadedDoses);
    setEditingId(recipe.id);
    setView('add-recipe');
  };

  const handleQuickAdd = (category?: any, disease?: any) => {
    resetForm();
    if (category) {
      setFormData(prev => ({
        ...prev,
        mainCategoryHi: category.hi || '',
        mainCategoryEn: category.en || '',
      }));
    }
    if (disease) {
      setFormData(prev => ({
        ...prev,
        diseaseNameHi: disease.hi || '',
        diseaseNameEn: disease.en || '',
      }));
    }
    setView('add-recipe');
  };

  const handleDelete = async (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    if (confirm(`क्या आप वाकई "${title}" हटाना चाहते हैं?`)) {
      try {
        await deleteDoc(doc(db!, 'recipes', id));
        toast({ title: "हटा दिया गया" });
      } catch (e) {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: `recipes/${id}`, operation: 'delete' }));
      }
    }
  };

  const handleDeleteCategory = async (categoryName: string) => {
    if (!db) return;
    if (confirm(`सावधानी! क्या आप पूरी श्रेणी "${categoryName}" और इसके अंदर के सभी बीमारियों और नुस्खों को हटाना चाहते हैं?`)) {
      const recipesToDelete = liveRecipes.filter(r => r.mainCategory?.hi === categoryName);
      try {
        for (const r of recipesToDelete) {
          await deleteDoc(doc(db, 'recipes', r.id));
        }
        toast({ title: "श्रेणी हटा दी गई" });
      } catch (e) {
        toast({ variant: "destructive", title: "त्रुटि" });
      }
    }
  };

  const handleDeleteSubCategory = async (categoryName: string, diseaseName: string) => {
    if (!db) return;
    if (confirm(`क्या आप वाकई बीमारी "${diseaseName}" के सभी नुस्खे हटाना चाहते हैं?`)) {
      const recipesToDelete = liveRecipes.filter(r => r.mainCategory?.hi === categoryName && r.diseaseName?.hi === diseaseName);
      try {
        for (const r of recipesToDelete) {
          await deleteDoc(doc(db, 'recipes', r.id));
        }
        toast({ title: "बीमारी हटा दी गई" });
      } catch (e) {
        toast({ variant: "destructive", title: "त्रुटि" });
      }
    }
  };

  const toggleTheme = () => setTheme(prev => prev === 'cream' ? 'night' : 'cream');

  if (!isLoaded) return null;

  return (
    <div className={cn(
      "min-h-screen flex flex-col transition-colors duration-500",
      isNight ? "bg-zinc-950 text-white" : "bg-[#FDFBF7] text-foreground"
    )}>
      <header className={cn(
        "h-14 flex items-center justify-between px-6 sticky top-0 z-50 shadow-md transition-colors",
        isNight ? "bg-zinc-900 border-b border-white/10" : "bg-primary text-white"
      )}>
        <div className="flex items-center gap-3">
          <LayoutDashboard className={cn("w-5 h-5", isNight ? "text-accent" : "text-accent")} />
          <h1 className="font-headline font-black text-lg">एडमिन कंट्रोल पैनल</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-white hover:bg-white/10 h-10 w-10 p-0 rounded-full">
            {isNight ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <Button variant="ghost" onClick={() => { localStorage.removeItem('gharelu_admin_auth'); router.push('/admin-login'); }} className="text-white hover:bg-white/10 gap-2 h-9 text-sm">
            <LogOut className="w-4 h-4" /> लॉगआउट
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
        {view === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              className={cn(
                "cursor-pointer group transition-all rounded-[2.5rem]",
                isNight ? "bg-zinc-900 border-white/10 hover:border-accent/50" : "bg-white border-primary/20 hover:border-primary/50"
              )} 
              onClick={() => setView('manage')}
            >
              <div className="p-8 text-center space-y-4">
                <div className={cn(
                  "mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-colors",
                  isNight ? "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-black" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                )}>
                  <ClipboardList className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">नुस्खे प्रबंधित करें</h3>
                <p className={cn("text-sm", isNight ? "text-zinc-400" : "text-muted-foreground")}>लाइव नुस्खे देखें, एडिट करें या हटाएँ</p>
              </div>
            </Card>
            <Card 
              className={cn(
                "cursor-pointer group transition-all rounded-[2.5rem]",
                isNight ? "bg-zinc-900 border-white/10 hover:border-accent/50" : "bg-white border-primary/20 hover:border-primary/50"
              )} 
              onClick={() => { resetForm(); setView('add-recipe'); }}
            >
              <div className="p-8 text-center space-y-4">
                <div className={cn(
                  "mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-colors",
                  isNight ? "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-black" : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white"
                )}>
                  <PlusCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">नया नुस्खा जोड़ें</h3>
                <p className={cn("text-sm", isNight ? "text-zinc-400" : "text-muted-foreground")}>ऐप में नया पारंपरिक नुस्खा अपलोड करें</p>
              </div>
            </Card>
          </div>
        )}

        {view === 'manage' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <Button variant="ghost" onClick={() => setView('overview')} className={cn("gap-2 font-bold", isNight ? "text-accent" : "text-primary")}><ChevronLeft /> पीछे</Button>
              <Button onClick={() => { resetForm(); setView('add-recipe'); }} className="bg-accent hover:bg-accent/90 text-white">नुस्खा जोड़ें</Button>
            </div>
            <AdminRemedyList 
              groupedRecipes={groupedRecipes} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
              onDeleteCategory={handleDeleteCategory}
              onDeleteSubCategory={handleDeleteSubCategory}
              onQuickAdd={handleQuickAdd}
              isNight={isNight}
            />
          </div>
        )}

        {view === 'add-recipe' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <Button variant="ghost" onClick={() => setView('manage')} className={cn("gap-2 font-bold", isNight ? "text-accent" : "text-primary")}><ChevronLeft /> रद्द करें</Button>
            <AdminForm 
              formData={formData} doses={doses} isSubmitting={isSubmitting} editingId={editingId}
              onInputChange={handleInputChange} onDoseChange={handleDoseChange} 
              onAddDose={addDoseField} onRemoveDose={removeDoseField} 
              onSubmit={handleSubmit} onCancel={() => setView('manage')}
              isNight={isNight}
            />
          </div>
        )}
      </main>
    </div>
  );
}
