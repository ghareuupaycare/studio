
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
  ClipboardList
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type DoseEntry = {
  ageRange: string;
  dose: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoaded, setIsLoaded] = useState(false);
  const [view, setView] = useState<'overview' | 'add-recipe'>('overview');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
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
  });

  const [doses, setDoses] = useState<DoseEntry[]>([
    { ageRange: '5-12 वर्ष', dose: '' },
    { ageRange: '13-40 वर्ष', dose: '' },
    { ageRange: '41-60 वर्ष', dose: '' },
    { ageRange: '61-80 वर्ष', dose: '' },
  ]);

  useEffect(() => {
    const isAuth = localStorage.getItem('gharelu_admin_auth');
    if (isAuth !== 'true') {
      router.push('/admin-login');
    } else {
      setIsLoaded(true);
    }
  }, [router]);

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
    setIsSubmitting(true);

    // Simulate save
    setTimeout(() => {
      console.log('Form Submitted:', { ...formData, doses });
      toast({
        title: "नुस्खा सुरक्षित हो गया!",
        description: `${formData.remedyTitle} को सफलतापूर्वक डेटाबेस में जोड़ दिया गया है।`,
      });
      setIsSubmitting(false);
      setView('overview');
      // Reset form
      setFormData({
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
      });
    }, 1500);
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      {/* Admin Header */}
      <header className="h-16 bg-primary text-white flex items-center justify-between px-6 shadow-md shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-5 h-5 text-accent" />
          <h1 className="font-headline font-black text-xl tracking-wide">एडमिन डैशबोर्ड</h1>
        </div>
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="text-white hover:bg-white/10 gap-2 font-bold"
        >
          <LogOut className="w-4 h-4" />
          लॉगआउट
        </Button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto w-full">
        {view === 'overview' ? (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-headline font-black text-primary">कंट्रोल पैनल</h2>
                <p className="text-muted-foreground font-medium">नुस्खे और डेटा प्रबंधित करें</p>
              </div>
              <Button 
                onClick={() => setView('add-recipe')}
                className="bg-accent hover:bg-accent/90 text-white font-bold rounded-full gap-2 py-6 px-6 shadow-lg active:scale-95 transition-all"
              >
                <PlusCircle className="w-5 h-5" />
                नया नुस्खा अपलोड करें
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <Card className="border-primary/10 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setView('add-recipe')}>
                <CardHeader className="pb-2">
                  <div className="p-3 w-fit rounded-2xl bg-primary/5 text-primary mb-2">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">नुस्खा जोड़ें</CardTitle>
                  <CardDescription>नया आयुर्वेदिक उपचार डेटाबेस में जोड़ें</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-primary/10 shadow-sm opacity-50 cursor-not-allowed">
                <CardHeader className="pb-2">
                  <div className="p-3 w-fit rounded-2xl bg-amber-500/5 text-amber-500 mb-2">
                    <ClipboardList className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">सभी नुस्खे</CardTitle>
                  <CardDescription>पुराने नुस्खे देखें या एडिट करें (जल्द आ रहा है)</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 pb-20">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setView('overview')}
                className="rounded-full hover:bg-primary/5"
              >
                <ChevronLeft className="w-6 h-6 text-primary" />
              </Button>
              <h2 className="text-2xl font-headline font-black text-primary">नया नुस्खा अपलोड करें</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Classification */}
              <Card className="border-primary/20 shadow-xl overflow-hidden rounded-[2rem]">
                <CardHeader className="bg-primary text-white">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Stethoscope className="w-5 h-5" />
                    श्रेणी और बीमारी का चयन
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

              {/* Step 2: Detailed Information */}
              <Card className="border-primary/20 shadow-xl overflow-hidden rounded-[2rem]">
                <CardHeader className="bg-[#14532D] text-white">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    नुस्खे का विस्तृत विवरण
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
                    <Label htmlFor="ingredients" className="font-black text-primary">2. आवश्यक सामग्री (कुल स्टॉक या बनाने के लिए)</Label>
                    <Textarea 
                      id="ingredients"
                      name="ingredients"
                      placeholder="सामग्री की सूची और उनकी मात्रा लिखें..."
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
                      placeholder="नुस्खा तैयार करने के चरण लिखें..."
                      className="min-h-[150px] border-primary/10 bg-[#FDFBF7]/50"
                      value={formData.preparation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Dosage Section */}
                  <div className="space-y-4 pt-4 border-t border-primary/10">
                    <div className="flex items-center justify-between">
                      <Label className="font-black text-primary text-base">4. स्मार्ट खुराक और मात्रा</Label>
                      <Button type="button" variant="outline" size="sm" onClick={addDoseField} className="rounded-full border-primary/30 text-primary">
                        <Plus className="w-4 h-4 mr-1" /> उम्र जोड़ें
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground italic mb-4">
                      (उपरोक्त कुल सामग्री में से अपनी उम्र के अनुसार केवल नीचे चुनी गई खुराक ही लें:)
                    </p>
                    
                    <div className="space-y-4">
                      {doses.map((dose, index) => (
                        <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end p-4 rounded-2xl bg-primary/5 border border-primary/10">
                          <div className="sm:col-span-4 space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-wider text-primary/60">उम्र समूह</Label>
                            <Input 
                              value={dose.ageRange}
                              onChange={(e) => handleDoseChange(index, 'ageRange', e.target.value)}
                              placeholder="उदा: 5-12 वर्ष"
                              className="bg-white border-primary/10"
                            />
                          </div>
                          <div className="sm:col-span-7 space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-wider text-primary/60">खुराक की मात्रा</Label>
                            <Input 
                              value={dose.dose}
                              onChange={(e) => handleDoseChange(index, 'dose', e.target.value)}
                              placeholder="उदा: आधा चम्मच दिन में दो बार"
                              className="bg-white border-primary/10"
                            />
                          </div>
                          <div className="sm:col-span-1 flex justify-end">
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => removeDoseField(index)}
                              className="text-destructive hover:bg-destructive/10"
                            >
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
                      placeholder="दवा लेने का सही समय और तरीका (जैसे गुनगुने पानी के साथ)..."
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
                      placeholder="लाभदायक भोजन और फलों की सूची..."
                      className="min-h-[100px] border-primary/10 bg-[#FDFBF7]/50"
                      value={formData.dietEat}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="dietAvoid" className="font-black text-primary">7. क्या न खाएं (सख़्त परहेज़)</Label>
                    <Textarea 
                      id="dietAvoid"
                      name="dietAvoid"
                      placeholder="नुकसानदायक भोजन और आदतों से बचें..."
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
                      placeholder="जीवनशैली और दैनिक आदतों में बदलाव के सुझाव..."
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
                      placeholder="सावधानियां, चेतावनी और डॉक्टर से परामर्श की सलाह..."
                      className="min-h-[120px] border-primary/10 bg-[#FDFBF7]/50"
                      value={formData.safetyAdvice}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submit Action */}
              <div className="flex gap-4 pt-4 pb-12">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 h-14 bg-accent hover:bg-accent/90 text-white font-black text-lg uppercase tracking-widest rounded-2xl shadow-xl active:scale-95 transition-all"
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
                  onClick={() => setView('overview')}
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
