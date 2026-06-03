
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
  CheckCircle2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

type DoseEntry = {
  ageRange: string;
  dose: string;
};

type ViewState = 'overview' | 'manage' | 'add-recipe';

const INITIAL_FORM_DATA = {
  mainCategory: '',
  diseaseName: '',
  remedyTitle: '',
  introduction: '',
  ingredients: '',
  preparation: '',
  usage: '',
  dietEat: '',
  dietAvoid: '',
  routine: '',
  safetyAdvice: '',
};

const INITIAL_DOSES: DoseEntry[] = [
  { ageRange: '5-12 वर्ष', dose: '' },
  { ageRange: '13-40 वर्ष', dose: '' },
  { ageRange: '41-60 वर्ष', dose: '' },
  { ageRange: '61-80 वर्ष', dose: '' },
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
      console.error("Listener error:", error);
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
    setDoses([...doses, { ageRange: '', dose: '' }]);
  };

  const removeDoseField = (index: number) => {
    setDoses(doses.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    setIsSubmitting(true);

    const submissionData = {
      ...formData,
      doses: doses.filter(d => d.ageRange && d.dose),
      timestamp: serverTimestamp(),
    };

    const recipesRef = collection(db, 'recipes');
    addDoc(recipesRef, submissionData)
      .then(() => {
        toast({
          title: "नुस्खा सुरक्षित हो गया!",
          description: `${formData.remedyTitle} को सफलतापूर्वक डेटाबेस में जोड़ दिया गया है।`,
        });
        setIsSubmitting(false);
        setView('manage');
        setFormData(INITIAL_FORM_DATA);
        setDoses(INITIAL_DOSES);
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: 'recipes',
          operation: 'write',
          requestResourceData: submissionData,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
        setIsSubmitting(false);
      });
  };

  const handleDelete = (recipeId: string, title: string) => {
    if (!db) return;
    if (confirm(`क्या आप वाकई "${title}" को हटाना चाहते हैं?`)) {
      const docRef = doc(db, 'recipes', recipeId);
      deleteDoc(docRef).catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: `recipes/${recipeId}`,
          operation: 'delete',
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      });
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
                          <h4 className="font-bold text-primary">{recipe.remedyTitle}</h4>
                          <p className="text-xs text-muted-foreground">{recipe.mainCategory} &gt; {recipe.diseaseName}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(recipe.id, recipe.remedyTitle)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
                <h2 className="text-2xl font-headline font-black text-primary">नया नुस्खा अपलोड करें</h2>
                <p className="text-sm text-muted-foreground">सभी 9 चरणों को विस्तार से भरें</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <Card className="border-primary/20 shadow-xl overflow-hidden rounded-[2rem]">
                <CardHeader className="bg-primary text-white p-6">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Stethoscope className="w-5 h-5" />
                    श्रेणी और वर्गीकरण
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="mainCategory" className="font-bold">मुख्य श्रेणी</Label>
                      <Input 
                        id="mainCategory"
                        name="mainCategory"
                        placeholder="उदा: पेट रोग, बुखार, त्वचा रोग"
                        required
                        value={formData.mainCategory}
                        onChange={handleInputChange}
                        className="h-12 border-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="diseaseName" className="font-bold">उप-श्रेणी / बीमारी</Label>
                      <Input 
                        id="diseaseName"
                        name="diseaseName"
                        placeholder="उदा: गैस, एसिडिटी, कब्ज"
                        required
                        value={formData.diseaseName}
                        onChange={handleInputChange}
                        className="h-12 border-primary/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="remedyTitle" className="font-bold">नुस्खे का शीर्षक/नाम</Label>
                    <Input 
                      id="remedyTitle"
                      name="remedyTitle"
                      placeholder="उदा: हींग और अजवाइन का चूर्ण"
                      required
                      value={formData.remedyTitle}
                      onChange={handleInputChange}
                      className="h-12 border-primary/20"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 shadow-xl overflow-hidden rounded-[2rem]">
                <CardHeader className="bg-[#14532D] text-white p-6">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    नुस्खे की विस्तृत जानकारी (9 स्टेप्स)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                  <div className="space-y-3">
                    <Label htmlFor="introduction" className="font-black text-primary">1. बीमारी का परिचय</Label>
                    <Textarea 
                      id="introduction"
                      name="introduction"
                      placeholder="बीमारी के लक्षण और कारणों का विस्तार से वर्णन करें..."
                      className="min-h-[150px] border-primary/10 bg-[#FDFBF7]/50"
                      value={formData.introduction}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="ingredients" className="font-black text-primary">2. आवश्यक सामग्री</Label>
                    <Textarea 
                      id="ingredients"
                      name="ingredients"
                      placeholder="सामग्री की सूची और उनकी सटीक मात्रा यहाँ लिखें..."
                      className="min-h-[120px] border-primary/10 bg-[#FDFBF7]/50"
                      value={formData.ingredients}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="preparation" className="font-black text-primary">3. बनाने की विधि</Label>
                    <Textarea 
                      id="preparation"
                      name="preparation"
                      placeholder="नुस्खा तैयार करने के एक-एक चरण को विस्तार से लिखें..."
                      className="min-h-[150px] border-primary/10 bg-[#FDFBF7]/50"
                      value={formData.preparation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-4 pt-4 border-t border-primary/10">
                    <div className="flex items-center justify-between">
                      <Label className="font-black text-primary text-base">4. स्मार्ट खुराक और मात्रा</Label>
                      <Button type="button" variant="outline" size="sm" onClick={addDoseField} className="rounded-full border-primary/30 text-primary">
                        <Plus className="w-4 h-4 mr-1" /> उम्र जोड़ें
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {doses.map((dose, index) => (
                        <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end p-4 rounded-2xl bg-primary/5 border border-primary/10">
                          <div className="sm:col-span-4 space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-wider text-primary/60">उम्र समूह</Label>
                            <Input 
                              value={dose.ageRange}
                              onChange={(e) => handleDoseChange(index, 'ageRange', e.target.value)}
                              placeholder="उदा: 5-12 वर्ष"
                              className="bg-white border-primary/10 h-11"
                            />
                          </div>
                          <div className="sm:col-span-7 space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-wider text-primary/60">खुराक की मात्रा</Label>
                            <Input 
                              value={dose.dose}
                              onChange={(e) => handleDoseChange(index, 'dose', e.target.value)}
                              placeholder="उदा: आधा चम्मच"
                              className="bg-white border-primary/10 h-11"
                            />
                          </div>
                          <div className="sm:col-span-1 flex justify-end">
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeDoseField(index)} className="text-destructive hover:bg-destructive/10">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="usage" className="font-black text-primary">5. सेवन विधि</Label>
                    <Textarea 
                      id="usage"
                      name="usage"
                      placeholder="दवा लेने का सही समय और तरीका..."
                      className="min-h-[120px] border-primary/10 bg-[#FDFBF7]/50"
                      value={formData.usage}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="dietEat" className="font-black text-primary">6. क्या खाएं</Label>
                    <Textarea 
                      id="dietEat"
                      name="dietEat"
                      placeholder="लाभकारी भोजन और फलों की सूची..."
                      className="min-h-[100px] border-primary/10 bg-[#FDFBF7]/50"
                      value={formData.dietEat}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="dietAvoid" className="font-black text-primary">7. क्या न खाएं</Label>
                    <Textarea 
                      id="dietAvoid"
                      name="dietAvoid"
                      placeholder="नुक्सानदायक भोजन से बचने के निर्देश..."
                      className="min-h-[100px] border-primary/10 bg-[#FDFBF7]/50"
                      value={formData.dietAvoid}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="routine" className="font-black text-primary">8. दिनचर्या</Label>
                    <Textarea 
                      id="routine"
                      name="routine"
                      placeholder="जीवनशैली में बदलाव के सुझाव..."
                      className="min-h-[120px] border-primary/10 bg-[#FDFBF7]/50"
                      value={formData.routine}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="safetyAdvice" className="font-black text-primary">9. सुरक्षा सूचना</Label>
                    <Textarea 
                      id="safetyAdvice"
                      name="safetyAdvice"
                      placeholder="महत्वपूर्ण सावधानियां और चेतावनी..."
                      className="min-h-[120px] border-primary/10 bg-[#FDFBF7]/50"
                      value={formData.safetyAdvice}
                      onChange={handleInputChange}
                      required
                    />
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
                      नुस्खा सुरक्षित करें
                    </>
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setView('manage')}
                  className="h-14 px-8 border-primary/20 text-primary font-bold rounded-2xl"
                >
                  रद्द करें
                </Button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
