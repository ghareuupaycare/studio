
'use client';

import React, { useEffect, useState } from 'react';
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
  Settings,
  Users,
  Languages
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

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

  // Form State
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

  // Real-time listener for recipes
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Submit initiated...");

    if (!db) {
      const errorMsg = "डेटाबेस कनेक्शन उपलब्ध नहीं है। | Database connection not available.";
      console.error(errorMsg);
      alert(errorMsg);
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
      console.log("Attempting to write to Firestore collection 'recipes'...");
      const recipesRef = collection(db, 'recipes');
      
      const docRef = await addDoc(recipesRef, submissionData);
      
      console.log("Firebase Save Success! Document ID:", docRef.id);

      toast({
        title: "नुस्खा सफलतापूर्वक सुरक्षित किया गया! | Recipe Saved Successfully!",
        description: `${formData.remedyTitleHi} को सफलतापूर्वक डेटाबेस में जोड़ दिया गया है।`,
      });
      
      // Reset and redirect
      setFormData(INITIAL_FORM_DATA);
      setDoses(INITIAL_DOSES);
      setView('manage');
    } catch (error: any) {
      // Explicitly log and alert the error for debugging
      console.error("Firebase Save Error:", error);
      alert("Firebase Error: " + (error.message || "Unknown error occurred during save."));
      
      // Emit permission error if relevant
      const permissionError = new FirestorePermissionError({
        path: 'recipes',
        operation: 'write',
        requestResourceData: submissionData,
      } satisfies SecurityRuleContext);
      
      errorEmitter.emit('permission-error', permissionError);
    } finally {
      setIsSubmitting(false);
      console.log("Submit process finished.");
    }
  };

  const handleDelete = async (recipeId: string, title: string) => {
    if (!db) return;
    if (confirm(`क्या आप वाकई "${title}" को हटाना चाहते हैं?`)) {
      try {
        const docRef = doc(db, 'recipes', recipeId);
        await deleteDoc(docRef);
        toast({
          title: "हटा दिया गया",
          description: "नुस्खा सफलतापूर्वक हटा दिया गया है।",
        });
      } catch (error: any) {
        console.error("Firebase Delete Error:", error);
        alert("Delete Error: " + error.message);
        const permissionError = new FirestorePermissionError({
          path: `recipes/${recipeId}`,
          operation: 'delete',
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      }
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      {/* Admin Header */}
      <header className="h-14 bg-primary text-white flex items-center justify-between px-6 shadow-md shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-5 h-5 text-accent" />
          <h1 className="font-headline font-black text-lg tracking-wide">एडमिन कंट्रोल पैनल</h1>
        </div>
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="text-white hover:bg-white/10 gap-2 font-bold h-9 text-sm"
        >
          <LogOut className="w-4 h-4" />
          लॉगआउट
        </Button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 max-w-5xl mx-auto w-full">
        
        {/* VIEW 1: ROOT DASHBOARD OVERVIEW */}
        {view === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
              <h2 className="text-2xl font-headline font-black text-primary">डैशबोर्ड ओवरव्यू</h2>
              <p className="text-muted-foreground font-medium text-sm">घरेलू उपाय केयर के मुख्य फीचर्स का प्रबंधन करें</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card 
                className="border-primary/20 shadow-sm hover:shadow-md transition-all cursor-pointer group active:scale-[0.98]" 
                onClick={() => setView('manage')}
              >
                <CardHeader className="pb-4">
                  <div className="p-3 w-fit rounded-2xl bg-primary/10 text-primary mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">नुस्खे प्रबंधित करें</CardTitle>
                  <CardDescription>नए नुस्खे जोड़ें या पुराने उपचारों को मैनेज करें</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border/50 bg-muted/30 shadow-none opacity-80">
                <CardHeader className="pb-4">
                  <div className="p-3 w-fit rounded-2xl bg-amber-500/10 text-amber-600 mb-3">
                    <Users className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">यूजर अनुरोध</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    जल्द आ रहा है
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border/50 bg-muted/30 shadow-none opacity-80">
                <CardHeader className="pb-4">
                  <div className="p-3 w-fit rounded-2xl bg-blue-500/10 text-blue-600 mb-3">
                    <Settings className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">ऐप सेटिंग्स</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    जल्द आ रहा है
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        )}

        {/* VIEW 2: MANAGE RECIPES PANEL */}
        {view === 'manage' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setView('overview')}
                  className="rounded-full hover:bg-primary/5"
                >
                  <ChevronLeft className="w-6 h-6 text-primary" />
                </Button>
                <div>
                  <h2 className="text-2xl font-headline font-black text-primary">नुस्खे प्रबंधित करें</h2>
                  <p className="text-muted-foreground font-medium text-sm">नुस्खे जोड़ें और लाइव डेटा देखें</p>
                </div>
              </div>
              <Button 
                onClick={() => setView('add-recipe')}
                className="bg-accent hover:bg-accent/90 text-white font-bold rounded-full gap-2 py-5 px-6 shadow-lg active:scale-95 transition-all"
              >
                <PlusCircle className="w-5 h-5" />
                नुस्खा जोड़ें
              </Button>
            </div>

            <Card className="border-primary/10 overflow-hidden">
              <CardHeader className="bg-primary/5 border-b border-primary/10">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-primary" />
                  सभी लाइव नुस्खे ({liveRecipes.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {liveRecipes.length > 0 ? (
                  <div className="divide-y divide-border">
                    {liveRecipes.map((recipe) => (
                      <div key={recipe.id} className="p-4 flex items-center justify-between hover:bg-muted/5 transition-colors">
                        <div>
                          <h4 className="font-bold text-primary">{recipe.remedyTitle?.hi || 'शीर्षक उपलब्ध नहीं'}</h4>
                          <p className="text-xs text-muted-foreground">
                            {recipe.mainCategory?.hi} &gt; {recipe.diseaseName?.hi}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete(recipe.id, recipe.remedyTitle?.hi)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground italic bg-muted/10">
                    अभी कोई नया नुस्खा डेटाबेस में नहीं है। 'नुस्खा जोड़ें' बटन दबाकर शुरुआत करें।
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* VIEW 3: ADD NEW RECIPE FORM */}
        {view === 'add-recipe' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 pb-20">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setView('manage')}
                className="rounded-full hover:bg-primary/5"
              >
                <ChevronLeft className="w-6 h-6 text-primary" />
              </Button>
              <div>
                <h2 className="text-2xl font-headline font-black text-primary">नया नुस्खा अपलोड करें (द्विभाषी)</h2>
                <p className="text-sm text-muted-foreground">हिंदी और अंग्रेजी दोनों भाषाओं में जानकारी भरें</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <Card className="border-primary/20 shadow-xl overflow-hidden rounded-[2rem]">
                <CardHeader className="bg-primary text-white p-6">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Stethoscope className="w-5 h-5" />
                    श्रेणी और वर्गीकरण | Category
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="mainCategoryHi" className="font-bold">मुख्य श्रेणी (Hindi)</Label>
                        <Input 
                          id="mainCategoryHi"
                          name="mainCategoryHi"
                          placeholder="उदा: पेट रोग, बुखार"
                          required
                          value={formData.mainCategoryHi}
                          onChange={handleInputChange}
                          className="h-11 border-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mainCategoryEn" className="font-bold text-muted-foreground">Main Category (English)</Label>
                        <Input 
                          id="mainCategoryEn"
                          name="mainCategoryEn"
                          placeholder="e.g. Stomach Ailments, Fever"
                          required
                          value={formData.mainCategoryEn}
                          onChange={handleInputChange}
                          className="h-11 border-primary/10"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="diseaseNameHi" className="font-bold">उप-श्रेणी / बीमारी (Hindi)</Label>
                        <Input 
                          id="diseaseNameHi"
                          name="diseaseNameHi"
                          placeholder="उदा: गैस, एसिडिटी"
                          required
                          value={formData.diseaseNameHi}
                          onChange={handleInputChange}
                          className="h-11 border-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="diseaseNameEn" className="font-bold text-muted-foreground">Disease Name (English)</Label>
                        <Input 
                          id="diseaseNameEn"
                          name="diseaseNameEn"
                          placeholder="e.g. Gas, Acidity"
                          required
                          value={formData.diseaseNameEn}
                          onChange={handleInputChange}
                          className="h-11 border-primary/10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="remedyTitleHi" className="font-bold">नुस्खे का शीर्षक/नाम (Hindi)</Label>
                      <Input 
                        id="remedyTitleHi"
                        name="remedyTitleHi"
                        placeholder="उदा: हींग और अजवाइन का चूर्ण"
                        required
                        value={formData.remedyTitleHi}
                        onChange={handleInputChange}
                        className="h-11 border-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="remedyTitleEn" className="font-bold text-muted-foreground">Remedy Title (English)</Label>
                      <Input 
                        id="remedyTitleEn"
                        name="remedyTitleEn"
                        placeholder="e.g. Hing and Ajwain Powder"
                        required
                        value={formData.remedyTitleEn}
                        onChange={handleInputChange}
                        className="h-11 border-primary/10"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Steps 1 to 9 */}
              <Card className="border-primary/20 shadow-xl overflow-hidden rounded-[2rem]">
                <CardHeader className="bg-[#14532D] text-white p-6">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    नुस्खे की विस्तृत जानकारी | Recipe Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-12">
                  
                  {/* 1. INTRODUCTION */}
                  <div className="space-y-4">
                    <Label className="font-black text-primary text-base">1. बीमारी का परिचय | Disease Introduction</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Textarea 
                        name="introductionHi"
                        placeholder="हिंदी में बीमारी का परिचय लिखें..."
                        className="min-h-[120px] border-primary/10 bg-[#FDFBF7]/50"
                        value={formData.introductionHi}
                        onChange={handleInputChange}
                        required
                      />
                      <Textarea 
                        name="introductionEn"
                        placeholder="Write disease introduction in English..."
                        className="min-h-[120px] border-primary/10 bg-muted/20"
                        value={formData.introductionEn}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* 2. INGREDIENTS */}
                  <div className="space-y-4">
                    <Label className="font-black text-primary text-base">2. आवश्यक सामग्री | Required Ingredients</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Textarea 
                        name="ingredientsHi"
                        placeholder="हिंदी में सामग्री की सूची लिखें..."
                        className="min-h-[100px] border-primary/10 bg-[#FDFBF7]/50"
                        value={formData.ingredientsHi}
                        onChange={handleInputChange}
                        required
                      />
                      <Textarea 
                        name="ingredientsEn"
                        placeholder="Write list of ingredients in English..."
                        className="min-h-[100px] border-primary/10 bg-muted/20"
                        value={formData.ingredientsEn}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* 3. PREPARATION */}
                  <div className="space-y-4">
                    <Label className="font-black text-primary text-base">3. बनाने की विधि | Preparation Method</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Textarea 
                        name="preparationHi"
                        placeholder="हिंदी में बनाने की विधि लिखें..."
                        className="min-h-[120px] border-primary/10 bg-[#FDFBF7]/50"
                        value={formData.preparationHi}
                        onChange={handleInputChange}
                        required
                      />
                      <Textarea 
                        name="preparationEn"
                        placeholder="Write preparation method in English..."
                        className="min-h-[120px] border-primary/10 bg-muted/20"
                        value={formData.preparationEn}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* 4. DOSAGE (DYNAMIC) */}
                  <div className="space-y-4 pt-4 border-t border-primary/10">
                    <div className="flex items-center justify-between mb-4">
                      <Label className="font-black text-primary text-base">4. स्मार्ट खुराक और मात्रा | Smart Dosage</Label>
                      <Button type="button" variant="outline" size="sm" onClick={addDoseField} className="rounded-full border-primary/30 text-primary">
                        <Plus className="w-4 h-4 mr-1" /> उम्र जोड़ें | Add Age
                      </Button>
                    </div>
                    <div className="space-y-6">
                      {doses.map((dose, index) => (
                        <div key={index} className="p-5 rounded-2xl bg-primary/5 border border-primary/10 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-xs font-bold uppercase text-primary/60">उम्र समूह (Hindi)</Label>
                              <Input 
                                value={dose.ageRangeHi}
                                onChange={(e) => handleDoseChange(index, 'ageRangeHi', e.target.value)}
                                placeholder="उदा: 5-12 वर्ष"
                                className="bg-white border-primary/10 h-10"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs font-bold uppercase text-primary/60">Age Group (English)</Label>
                              <Input 
                                value={dose.ageRangeEn}
                                onChange={(e) => handleDoseChange(index, 'ageRangeEn', e.target.value)}
                                placeholder="e.g. 5-12 Years"
                                className="bg-white border-primary/10 h-10"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                            <div className="space-y-2">
                              <Label className="text-xs font-bold uppercase text-primary/60">खुराक (Hindi)</Label>
                              <Input 
                                value={dose.doseHi}
                                onChange={(e) => handleDoseChange(index, 'doseHi', e.target.value)}
                                placeholder="उदा: आधा चम्मच"
                                className="bg-white border-primary/10 h-10"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs font-bold uppercase text-primary/60">Dosage (English)</Label>
                              <Input 
                                value={dose.doseEn}
                                onChange={(e) => handleDoseChange(index, 'doseEn', e.target.value)}
                                placeholder="e.g. Half Teaspoon"
                                className="bg-white border-primary/10 h-10"
                              />
                            </div>
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeDoseField(index)} className="absolute -top-1 -right-1 text-destructive hover:bg-destructive/10">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 5. USAGE */}
                  <div className="space-y-4">
                    <Label className="font-black text-primary text-base">5. सेवन विधि | Consumption Method</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Textarea 
                        name="usageHi"
                        placeholder="हिंदी में सेवन विधि लिखें..."
                        className="min-h-[100px] border-primary/10 bg-[#FDFBF7]/50"
                        value={formData.usageHi}
                        onChange={handleInputChange}
                        required
                      />
                      <Textarea 
                        name="usageEn"
                        placeholder="Write consumption method in English..."
                        className="min-h-[100px] border-primary/10 bg-muted/20"
                        value={formData.usageEn}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* 6. DIET EAT */}
                  <div className="space-y-4">
                    <Label className="font-black text-primary text-base">6. क्या खाएं | What to Eat</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Textarea 
                        name="dietEatHi"
                        placeholder="हिंदी में लाभकारी भोजन लिखें..."
                        className="min-h-[100px] border-primary/10 bg-[#FDFBF7]/50"
                        value={formData.dietEatHi}
                        onChange={handleInputChange}
                        required
                      />
                      <Textarea 
                        name="dietEatEn"
                        placeholder="Write beneficial foods in English..."
                        className="min-h-[100px] border-primary/10 bg-muted/20"
                        value={formData.dietEatEn}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* 7. DIET AVOID */}
                  <div className="space-y-4">
                    <Label className="font-black text-primary text-base">7. क्या न खाएं | What to Avoid</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Textarea 
                        name="dietAvoidHi"
                        placeholder="हिंदी में वर्जित भोजन लिखें..."
                        className="min-h-[100px] border-primary/10 bg-[#FDFBF7]/50"
                        value={formData.dietAvoidHi}
                        onChange={handleInputChange}
                        required
                      />
                      <Textarea 
                        name="dietAvoidEn"
                        placeholder="Write foods to avoid in English..."
                        className="min-h-[100px] border-primary/10 bg-muted/20"
                        value={formData.dietAvoidEn}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* 8. ROUTINE */}
                  <div className="space-y-4">
                    <Label className="font-black text-primary text-base">8. दिनचर्या | Daily Routine</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Textarea 
                        name="routineHi"
                        placeholder="हिंदी में दिनचर्या के सुझाव लिखें..."
                        className="min-h-[100px] border-primary/10 bg-[#FDFBF7]/50"
                        value={formData.routineHi}
                        onChange={handleInputChange}
                        required
                      />
                      <Textarea 
                        name="routineEn"
                        placeholder="Write lifestyle tips in English..."
                        className="min-h-[100px] border-primary/10 bg-muted/20"
                        value={formData.routineEn}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* 9. SAFETY */}
                  <div className="space-y-4">
                    <Label className="font-black text-primary text-base">9. सुरक्षा सूचना | Safety Information</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Textarea 
                        name="safetyAdviceHi"
                        placeholder="हिंदी में सावधानियां लिखें..."
                        className="min-h-[100px] border-primary/10 bg-[#FDFBF7]/50"
                        value={formData.safetyAdviceHi}
                        onChange={handleInputChange}
                        required
                      />
                      <Textarea 
                        name="safetyAdviceEn"
                        placeholder="Write safety warnings in English..."
                        className="min-h-[100px] border-primary/10 bg-muted/20"
                        value={formData.safetyAdviceEn}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 pb-12">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 h-14 bg-accent hover:bg-accent/90 text-white font-black text-lg uppercase tracking-widest rounded-2xl shadow-xl transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin mr-2" />
                      सुरक्षित किया जा रहा है...
                    </>
                  ) : (
                    <>
                      <Save className="w-6 h-6 mr-2" />
                      नुस्खा सुरक्षित करें | Save Recipe
                    </>
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setView('manage')}
                  className="h-14 px-8 border-primary/20 text-primary font-bold rounded-2xl"
                >
                  रद्द करें | Cancel
                </Button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
