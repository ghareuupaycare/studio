
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  LogOut, 
  LayoutDashboard, 
  PlusCircle, 
  ChevronLeft, 
  Save, 
  Loader2, 
  Plus, 
  Trash2,
  Stethoscope,
  BookOpen,
  ClipboardList,
  Users,
  Settings,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Pencil,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { collection, addDoc, setDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';
import { cn } from '@/lib/utils';

type DoseEntry = {
  ageRangeHi: string;
  ageRangeEn: string;
  doseHi: string;
  doseEn: string;
};

type ViewState = 'overview' | 'manage' | 'add-recipe';

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
};

const INITIAL_DOSES: DoseEntry[] = [
  { ageRangeHi: '5-12 वर्ष', ageRangeEn: '5-12 Years', doseHi: '', doseEn: '' },
  { ageRangeHi: '13-40 वर्ष', ageRangeEn: '13-40 Years', doseHi: '', doseEn: '' },
  { ageRangeHi: '41-60 वर्ष', ageRangeEn: '41-60 Years', doseHi: '', doseEn: '' },
  { ageRangeHi: '61-80 वर्ष', ageRangeEn: '61-80 Years', doseHi: '', doseEn: '' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const db = useFirestore();
  const [isLoaded, setIsLoaded] = useState(false);
  const [view, setView] = useState<ViewState>('overview');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [liveRecipes, setLiveRecipes] = useState<any[]>([]);
  
  // Edit & Tree States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedDisease, setExpandedDisease] = useState<string | null>(null);

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [doses, setDoses] = useState<DoseEntry[]>(INITIAL_DOSES);

  useEffect(() => {
    const isAuth = localStorage.getItem('gharelu_admin_auth');
    if (isAuth !== 'true') {
      router.push('/admin-login');
    } else {
      setIsLoaded(true);
    }
  }, [router]);

  useEffect(() => {
    if (!db) return;
    const recipesRef = collection(db, 'recipes');
    const q = query(recipesRef, orderBy('timestamp', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLiveRecipes(docs);
    }, (error) => {
      console.error("Firestore Listener error:", error);
    });

    return () => unsubscribe();
  }, [db]);

  // Group recipes for Tree View
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

  const handleLogout = () => {
    localStorage.removeItem('gharelu_admin_auth');
    router.push('/admin-login');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDoseChange = (index: number, field: keyof DoseEntry, value: string) => {
    const newDoses = [...doses];
    newDoses[index][field] = value;
    setDoses(newDoses);
  };

  const addDoseField = () => {
    setDoses([...doses, { ageRangeHi: '', ageRangeEn: '', doseHi: '', doseEn: '' }]);
  };

  const removeDoseField = (index: number) => {
    setDoses(doses.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setDoses(INITIAL_DOSES);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) {
      alert("डेटाबेस कनेक्शन उपलब्ध नहीं है।");
      return;
    }

    setIsSubmitting(true);

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
      doses: doses.filter(d => (d.ageRangeHi || d.ageRangeEn) && (d.doseHi || d.doseEn)).map(d => ({
        ageRange: { hi: d.ageRangeHi, en: d.ageRangeEn },
        dose: { hi: d.doseHi, en: d.doseEn }
      })),
      timestamp: serverTimestamp(),
    };

    try {
      if (editingId) {
        const docRef = doc(db, 'recipes', editingId);
        await setDoc(docRef, submissionData, { merge: true });
        toast({ title: "सफलता!", description: "नुस्खा सफलतापूर्वक अपडेट किया गया!" });
      } else {
        const recipesRef = collection(db, 'recipes');
        await addDoc(recipesRef, submissionData);
        toast({ title: "सफलता!", description: "नया नुस्खा सफलतापूर्वक सुरक्षित किया गया!" });
      }
      
      resetForm();
      setView('manage');
    } catch (error: any) {
      console.error("Firebase Save Error:", error);
      const permissionError = new FirestorePermissionError({
        path: editingId ? `recipes/${editingId}` : 'recipes',
        operation: editingId ? 'update' : 'create',
        requestResourceData: submissionData,
      } satisfies SecurityRuleContext);
      errorEmitter.emit('permission-error', permissionError);
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
    });

    if (recipe.doses && Array.isArray(recipe.doses)) {
      setDoses(recipe.doses.map((d: any) => ({
        ageRangeHi: d.ageRange?.hi || '',
        ageRangeEn: d.ageRange?.en || '',
        doseHi: d.dose?.hi || '',
        doseEn: d.dose?.en || '',
      })));
    } else {
      setDoses(INITIAL_DOSES);
    }

    setEditingId(recipe.id);
    setView('add-recipe');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (e: React.MouseEvent, recipeId: string, title: string) => {
    e.stopPropagation();
    if (!db) return;
    if (confirm(`क्या आप वाकई "${title}" को हटाना चाहते हैं?`)) {
      try {
        const docRef = doc(db, 'recipes', recipeId);
        await deleteDoc(docRef);
        toast({ title: "हटा दिया गया", description: "नुस्खा सफलतापूर्वक हटा दिया गया है।" });
      } catch (error: any) {
        console.error("Firebase Delete Error:", error);
        const permissionError = new FirestorePermissionError({
          path: `recipes/${recipeId}`,
          operation: 'delete',
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      }
    }
  };

  const toggleCategory = (cat: string) => {
    setExpandedCategory(expandedCategory === cat ? null : cat);
    setExpandedDisease(null);
  };

  const toggleDisease = (dis: string) => {
    setExpandedDisease(expandedDisease === dis ? null : dis);
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <header className="h-14 bg-primary text-white flex items-center justify-between px-6 shadow-md shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-5 h-5 text-accent" />
          <h1 className="font-headline font-black text-lg">एडमिन कंट्रोल पैनल</h1>
        </div>
        <Button variant="ghost" onClick={handleLogout} className="text-white hover:bg-white/10 gap-2 h-9 text-sm">
          <LogOut className="w-4 h-4" /> लॉगआउट
        </Button>
      </header>

      <main className="flex-1 p-4 sm:p-6 max-w-5xl mx-auto w-full">
        {view === 'overview' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-headline font-black text-primary">डैशबोर्ड ओवरव्यू</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-primary/20 cursor-pointer group active:scale-[0.98]" onClick={() => setView('manage')}>
                <CardHeader>
                  <div className="p-3 w-fit rounded-2xl bg-primary/10 text-primary mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">नुस्खे प्रबंधित करें</CardTitle>
                  <CardDescription>लाइव डेटा देखें, एडिट करें या हटाएँ</CardDescription>
                </CardHeader>
              </Card>
              <Card className="opacity-80 grayscale">
                <CardHeader>
                  <div className="p-3 w-fit rounded-2xl bg-amber-500/10 text-amber-600 mb-3"><Users className="w-6 h-6" /></div>
                  <CardTitle className="text-xl">यूजर अनुरोध</CardTitle>
                  <CardDescription>जल्द आ रहा है</CardDescription>
                </CardHeader>
              </Card>
              <Card className="opacity-80 grayscale">
                <CardHeader>
                  <div className="p-3 w-fit rounded-2xl bg-blue-500/10 text-blue-600 mb-3"><Settings className="w-6 h-6" /></div>
                  <CardTitle className="text-xl">ऐप सेटिंग्स</CardTitle>
                  <CardDescription>जल्द आ रहा है</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        )}

        {view === 'manage' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => setView('overview')} className="rounded-full"><ChevronLeft /></Button>
                <div>
                  <h2 className="text-2xl font-headline font-black text-primary">नुस्खे प्रबंधित करें</h2>
                  <p className="text-sm text-muted-foreground">श्रेणीवार नुस्खे देखें और एडिट करें</p>
                </div>
              </div>
              <Button onClick={() => { resetForm(); setView('add-recipe'); }} className="bg-accent hover:bg-accent/90 rounded-full gap-2 shadow-lg">
                <PlusCircle className="w-5 h-5" /> नुस्खा जोड़ें
              </Button>
            </div>

            <Card className="border-primary/10 overflow-hidden">
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle className="text-lg flex items-center gap-2"><ClipboardList className="w-5 h-5 text-primary" /> सभी लाइव नुस्खे ({liveRecipes.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {Object.keys(groupedRecipes).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(groupedRecipes).map(([category, diseases]) => (
                      <div key={category} className="border rounded-xl overflow-hidden shadow-sm">
                        <button 
                          onClick={() => toggleCategory(category)}
                          className="w-full flex items-center justify-between p-4 bg-primary/5 hover:bg-primary/10 transition-colors font-bold text-primary"
                        >
                          <div className="flex items-center gap-3">
                            {expandedCategory === category ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                            {category}
                          </div>
                          <span className="bg-primary/20 text-primary px-3 py-0.5 rounded-full text-xs">
                            {Object.values(diseases).flat().length} नुस्खे
                          </span>
                        </button>
                        
                        {expandedCategory === category && (
                          <div className="bg-white divide-y">
                            {Object.entries(diseases).map(([disease, recipes]) => (
                              <div key={disease} className="pl-4">
                                <button 
                                  onClick={() => toggleDisease(disease)}
                                  className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors font-medium text-slate-700"
                                >
                                  <div className="flex items-center gap-3">
                                    {expandedDisease === disease ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                    {disease}
                                  </div>
                                  <span className="text-xs text-muted-foreground">{recipes.length} नुस्खे</span>
                                </button>
                                
                                {expandedDisease === disease && (
                                  <div className="bg-slate-50/50 divide-y border-t">
                                    {recipes.map((recipe) => (
                                      <div key={recipe.id} className="p-4 flex items-center justify-between group">
                                        <div className="flex-1">
                                          <h4 className="font-bold text-primary flex items-center gap-2">
                                            {recipe.remedyTitle?.hi || 'शीर्षक उपलब्ध नहीं'}
                                            <button 
                                              onClick={() => router.push(`/?remedyId=${recipe.id}`)}
                                              className="p-1 rounded hover:bg-primary/10 text-primary/40 hover:text-primary transition-colors"
                                              title="ऐप में देखें"
                                            >
                                              <ExternalLink className="w-3 h-3" />
                                            </button>
                                          </h4>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            onClick={() => handleEdit(recipe)}
                                            className="text-blue-600 hover:bg-blue-50"
                                            title="एडिट करें"
                                          >
                                            <Pencil className="w-4 h-4" />
                                          </Button>
                                          <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            onClick={(e) => handleDelete(e, recipe.id, recipe.remedyTitle?.hi)}
                                            className="text-destructive hover:bg-destructive/10"
                                            title="हटाएँ"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground italic">अभी कोई डेटा नहीं है।</div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {view === 'add-recipe' && (
          <div className="space-y-6 pb-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => { resetForm(); setView('manage'); }} className="rounded-full"><ChevronLeft /></Button>
                <h2 className="text-2xl font-headline font-black text-primary">
                  {editingId ? 'नुस्खा अपडेट करें' : 'नया नुस्खा अपलोड करें'}
                </h2>
              </div>
              {editingId && (
                <Button variant="outline" onClick={resetForm} className="gap-2 border-destructive text-destructive hover:bg-destructive/10">
                  <X className="w-4 h-4" /> एडिट रद्द करें
                </Button>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <Card className="border-primary/20 shadow-xl overflow-hidden rounded-[2rem]">
                <CardHeader className="bg-primary text-white">
                  <CardTitle className="text-lg flex items-center gap-2"><Stethoscope className="w-5 h-5" /> श्रेणी और वर्गीकरण</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Label>मुख्य श्रेणी (Hindi / English)</Label>
                      <Input name="mainCategoryHi" placeholder="Hindi" required value={formData.mainCategoryHi} onChange={handleInputChange} />
                      <Input name="mainCategoryEn" placeholder="English" required value={formData.mainCategoryEn} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-4">
                      <Label>उप-श्रेणी / बीमारी (Hindi / English)</Label>
                      <Input name="diseaseNameHi" placeholder="Hindi" required value={formData.diseaseNameHi} onChange={handleInputChange} />
                      <Input name="diseaseNameEn" placeholder="English" required value={formData.diseaseNameEn} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="space-y-4 pt-4 border-t">
                    <Label>नुस्खे का शीर्षक (Hindi / English)</Label>
                    <Input name="remedyTitleHi" placeholder="Hindi" required value={formData.remedyTitleHi} onChange={handleInputChange} />
                    <Input name="remedyTitleEn" placeholder="English" required value={formData.remedyTitleEn} onChange={handleInputChange} />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 shadow-xl overflow-hidden rounded-[2rem]">
                <CardHeader className="bg-[#14532D] text-white">
                   <CardTitle className="text-lg flex items-center gap-2"><BookOpen className="w-5 h-5" /> विस्तृत जानकारी</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                  <div className="space-y-4">
                    <Label className="font-bold text-primary">1. बीमारी का परिचय | Disease Introduction</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Textarea name="introductionHi" placeholder="Hindi" value={formData.introductionHi} onChange={handleInputChange} required />
                      <Textarea name="introductionEn" placeholder="English" value={formData.introductionEn} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label className="font-bold text-primary">2. आवश्यक सामग्री | Required Ingredients</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Textarea name="ingredientsHi" placeholder="Hindi" value={formData.ingredientsHi} onChange={handleInputChange} required />
                      <Textarea name="ingredientsEn" placeholder="English" value={formData.ingredientsEn} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label className="font-bold text-primary">3. बनाने की विधि | Preparation Method</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Textarea name="preparationHi" placeholder="Hindi" value={formData.preparationHi} onChange={handleInputChange} required />
                      <Textarea name="preparationEn" placeholder="English" value={formData.preparationEn} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label className="font-bold text-primary">5. सेवन विधि | Consumption Method</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Textarea name="usageHi" placeholder="Hindi" value={formData.usageHi} onChange={handleInputChange} required />
                      <Textarea name="usageEn" placeholder="English" value={formData.usageEn} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label className="font-bold text-primary">9. सुरक्षा सूचना | Safety Information</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Textarea name="safetyAdviceHi" placeholder="Hindi" value={formData.safetyAdviceHi} onChange={handleInputChange} required />
                      <Textarea name="safetyAdviceEn" placeholder="English" value={formData.safetyAdviceEn} onChange={handleInputChange} required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1 h-14 bg-accent hover:bg-accent/90 rounded-2xl shadow-xl text-lg font-bold">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <Save className="mr-2" />} 
                  {editingId ? 'अपडेट सुरक्षित करें' : 'नुस्खा सुरक्षित करें'}
                </Button>
                <Button type="button" variant="outline" onClick={() => { resetForm(); setView('manage'); }} className="h-14 px-8 rounded-2xl">रद्द करें</Button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
