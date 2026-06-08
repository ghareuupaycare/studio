
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Loader2, Stethoscope, BookOpen, Plus, Trash2, X, Globe, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DoseEntry {
  ageRangeHi: string;
  ageRangeEn: string;
  doseHi: string;
  doseEn: string;
}

interface AdminFormProps {
  formData: any;
  doses: DoseEntry[];
  isSubmitting: boolean;
  editingId: string | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onDoseChange: (index: number, field: keyof DoseEntry, value: string) => void;
  onAddDose: () => void;
  onRemoveDose: (index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isNight?: boolean;
}

export const AdminForm = ({
  formData,
  doses,
  isSubmitting,
  editingId,
  onInputChange,
  onDoseChange,
  onAddDose,
  onRemoveDose,
  onSubmit,
  onCancel,
  isNight = false
}: AdminFormProps) => {
  const cardBgClass = isNight ? "bg-zinc-900 border-white/10" : "bg-white border-primary/20 shadow-xl";
  const inputClass = isNight ? "bg-zinc-800 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-accent" : "focus-visible:ring-primary";
  const labelClass = isNight ? "text-zinc-400" : "";

  return (
    <form onSubmit={onSubmit} className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <h2 className={cn("text-2xl font-headline font-black", isNight ? "text-accent" : "text-primary")}>
          {editingId ? 'नुस्खा अपडेट करें' : 'नया नुस्खा अपलोड करें'}
        </h2>
        {editingId && (
          <Button variant="outline" onClick={onCancel} className="gap-2 border-destructive text-destructive hover:bg-destructive/10">
            <X className="w-4 h-4" /> एडिट रद्द करें
          </Button>
        )}
      </div>

      {/* Basic Classification */}
      <Card className={cn("overflow-hidden rounded-[2rem]", cardBgClass)}>
        <CardHeader className={isNight ? "bg-zinc-800 text-white" : "bg-primary text-white"}>
          <CardTitle className="text-lg flex items-center gap-2"><Stethoscope className="w-5 h-5" /> श्रेणी और वर्गीकरण</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Label className={labelClass}>मुख्य श्रेणी (Hindi / English)</Label>
              <Input 
                name="mainCategoryHi" 
                placeholder="उदा: पेट रोग, बुखार" 
                required 
                value={formData.mainCategoryHi} 
                onChange={onInputChange} 
                className={inputClass}
              />
              <Input 
                name="mainCategoryEn" 
                placeholder="e.g. Stomach Ailments, Fever" 
                required 
                value={formData.mainCategoryEn} 
                onChange={onInputChange} 
                className={inputClass}
              />
            </div>
            <div className="space-y-4">
              <Label className={labelClass}>उप-श्रेणी / बीमारी (Hindi / English)</Label>
              <Input 
                name="diseaseNameHi" 
                placeholder="उदा: गैस, सामान्य बुखार" 
                required 
                value={formData.diseaseNameHi} 
                onChange={onInputChange} 
                className={inputClass}
              />
              <Input 
                name="diseaseNameEn" 
                placeholder="e.g. Gas, General Fever" 
                required 
                value={formData.diseaseNameEn} 
                onChange={onInputChange} 
                className={inputClass}
              />
            </div>
          </div>
          <div className="space-y-4 pt-4 border-t border-white/5">
            <Label className={labelClass}>नुस्खे का शीर्षक (Hindi / English)</Label>
            <Input 
              name="remedyTitleHi" 
              placeholder="उदा: हींग और अजवाइन का चूर्ण" 
              required 
              value={formData.remedyTitleHi} 
              onChange={onInputChange} 
              className={inputClass}
            />
            <Input 
              name="remedyTitleEn" 
              placeholder="e.g. Hing and Ajwain Powder" 
              required 
              value={formData.remedyTitleEn} 
              onChange={onInputChange} 
              className={inputClass}
            />
          </div>
        </CardContent>
      </Card>

      {/* Sequential 1-9 Content Sections */}
      <Card className={cn("overflow-hidden rounded-[2rem]", cardBgClass)}>
        <CardHeader className={isNight ? "bg-emerald-950 text-white" : "bg-[#14532D] text-white"}>
           <CardTitle className="text-lg flex items-center gap-2"><BookOpen className="w-5 h-5" /> विस्तृत जानकारी (1-9)</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          
          {/* 1. Disease Introduction */}
          <div className="space-y-4">
            <Label className={cn("font-bold", isNight ? "text-accent" : "text-primary")}>1. बीमारी का परिचय | Disease Introduction</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea name="introductionHi" placeholder="हिंदी में बीमारी का परिचय लिखें..." value={formData.introductionHi} onChange={onInputChange} required className={inputClass} />
              <Textarea name="introductionEn" placeholder="Write disease introduction in English..." value={formData.introductionEn} onChange={onInputChange} required className={inputClass} />
            </div>
          </div>

          {/* 2. Required Ingredients */}
          <div className="space-y-4">
            <Label className={cn("font-bold", isNight ? "text-accent" : "text-primary")}>2. आवश्यक सामग्री (कुल स्टॉक बनाने के लिए) | Required Ingredients</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea name="ingredientsHi" placeholder="हिंदी में आवश्यक सामग्री और कुल स्टॉक की सूची लिखें..." value={formData.ingredientsHi} onChange={onInputChange} required className={inputClass} />
              <Textarea name="ingredientsEn" placeholder="Write list of required ingredients in English..." value={formData.ingredientsEn} onChange={onInputChange} required className={inputClass} />
            </div>
          </div>

          {/* 3. Preparation Method */}
          <div className="space-y-4">
            <Label className={cn("font-bold", isNight ? "text-accent" : "text-primary")}>3. बनाने की विधि | Preparation Method</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea name="preparationHi" placeholder="हिंदी में बनाने की विधि लिखें..." value={formData.preparationHi} onChange={onInputChange} required className={inputClass} />
              <Textarea name="preparationEn" placeholder="Write preparation method in English..." value={formData.preparationEn} onChange={onInputChange} required className={inputClass} />
            </div>
          </div>

          {/* 4. Smart Dosage (Fixed Tiers) */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <Label className={cn("font-bold", isNight ? "text-accent" : "text-primary")}>4. स्मार्ट खुराक और मात्रा (उपरोक्त कुल सामग्री में से अपनी उम्र के अनुसार केवल चुनी गई खुराक ही लें:) | Smart Dosage</Label>
            <div className="space-y-4">
              {doses.map((dose, index) => (
                <div key={index} className={cn("p-4 border rounded-xl space-y-4", isNight ? "bg-zinc-800/50 border-white/5" : "bg-muted/20 border-primary/5")}>
                  <div className="flex justify-between items-center">
                    <span className={cn("text-sm font-bold flex items-center gap-2", isNight ? "text-accent" : "text-primary")}>
                      <User className="w-4 h-4" /> खुराक वर्ग #{index + 1}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs">उम्र समूह (Hindi / English)</Label>
                      <Input readOnly className={cn("font-bold", isNight ? "bg-zinc-900 border-white/5 text-zinc-400" : "bg-muted/50 font-bold")} value={dose.ageRangeHi} />
                      <Input readOnly className={cn("font-bold", isNight ? "bg-zinc-900 border-white/5 text-zinc-400" : "bg-muted/50 font-bold")} value={dose.ageRangeEn} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">खुराक (Hindi / English)</Label>
                      <Input placeholder="उदा: आधा चम्मच" value={dose.doseHi} onChange={(e) => onDoseChange(index, 'doseHi', e.target.value)} required className={inputClass} />
                      <Input placeholder="e.g. Half Teaspoon" value={dose.doseEn} onChange={(e) => onDoseChange(index, 'doseEn', e.target.value)} required className={inputClass} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Consumption Method */}
          <div className="space-y-4">
            <Label className={cn("font-bold", isNight ? "text-accent" : "text-primary")}>5. सेवन विधि | Consumption Method</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea name="usageHi" placeholder="हिंदी में सेवन विधि लिखें..." value={formData.usageHi} onChange={onInputChange} required className={inputClass} />
              <Textarea name="usageEn" placeholder="Write consumption method in English..." value={formData.usageEn} onChange={onInputChange} required className={inputClass} />
            </div>
          </div>

          {/* 6. What to Eat */}
          <div className="space-y-4">
            <Label className={cn("font-bold", isNight ? "text-accent" : "text-primary")}>6. क्या खाएं | What to Eat</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea name="dietEatHi" placeholder="हिंदी में क्या खाएं उसकी सूची लिखें..." value={formData.dietEatHi} onChange={onInputChange} required className={inputClass} />
              <Textarea name="dietEatEn" placeholder="Write what to eat list in English..." value={formData.dietEatEn} onChange={onInputChange} required className={inputClass} />
            </div>
          </div>

          {/* 7. What Not to Eat */}
          <div className="space-y-4">
            <Label className={cn("font-bold", isNight ? "text-accent" : "text-primary")}>7. क्या न खाएं (सख़्त परहेज़) | What Not to Eat</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea name="dietAvoidHi" placeholder="हिंदी में क्या न खाएं और सख़्त परहेज़ लिखें..." value={formData.dietAvoidHi} onChange={onInputChange} required className={inputClass} />
              <Textarea name="dietAvoidEn" placeholder="Write what not to eat and strict restrictions in English..." value={formData.dietAvoidEn} onChange={onInputChange} required className={inputClass} />
            </div>
          </div>

          {/* 8. Daily Routine */}
          <div className="space-y-4">
            <Label className={cn("font-bold", isNight ? "text-accent" : "text-primary")}>8. दिनचर्या | Daily Routine</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea name="routineHi" placeholder="हिंदी में दिनचर्या के नियम लिखें..." value={formData.routineHi} onChange={onInputChange} required className={inputClass} />
              <Textarea name="routineEn" placeholder="Write daily routine guidelines in English..." value={formData.routineEn} onChange={onInputChange} required className={inputClass} />
            </div>
          </div>

          {/* 9. Safety Information */}
          <div className="space-y-4">
            <Label className={cn("font-bold", isNight ? "text-accent" : "text-primary")}>9. सुरक्षा सूचना | Safety Information</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea name="safetyAdviceHi" placeholder="हिंदी में सुरक्षा सूचना और चेतावनियां लिखें..." value={formData.safetyAdviceHi} onChange={onInputChange} required className={inputClass} />
              <Textarea name="safetyAdviceEn" placeholder="Write safety information and warnings in English..." value={formData.safetyAdviceEn} onChange={onInputChange} required className={inputClass} />
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Global SEO Keywords Section - PROTECTED */}
      <Card className={cn("overflow-hidden rounded-[2rem]", isNight ? "bg-zinc-900 border-accent/20" : "bg-white border-accent/20 shadow-xl")}>
        <CardHeader className="bg-accent text-white">
           <CardTitle className="text-lg flex items-center gap-2"><Globe className="w-5 h-5" /> ग्लोबल सर्चिंग कीवर्ड्स (Global SEO Keywords)</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <Label className={cn("text-sm font-bold opacity-70", isNight ? "text-zinc-300" : "")}>सर्च इंजन इंडेक्सिंग के लिए (Google, Internal Search)</Label>
          <Textarea 
            name="seoKeywords" 
            placeholder="उदा: gas, acidity, pet dard, kabj, acidity ka gharelu ilaj (कीवर्ड्स को कॉमा से अलग करें)" 
            value={formData.seoKeywords} 
            onChange={onInputChange}
            className={cn("min-h-[100px]", isNight ? "bg-zinc-800 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-accent" : "border-accent/20 focus-visible:ring-accent")}
          />
          <p className="text-[11px] text-muted-foreground italic">
            ये कीवर्ड्स यूजर को ऐप के अंदर नहीं दिखेंगे, लेकिन गूगल सर्च और ऐप के सर्च बार को सही परिणाम ढूंढने में मदद करेंगे।
          </p>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1 h-14 bg-accent hover:bg-accent/90 text-white rounded-2xl shadow-xl text-lg font-bold transition-all active:scale-95">
          {isSubmitting ? <Loader2 className="animate-spin" /> : <Save className="mr-2" />} 
          {editingId ? 'अपडेट सुरक्षित करें' : 'नुस्खा सुरक्षित करें'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className={cn("h-14 px-8 rounded-2xl", isNight ? "bg-zinc-800 border-white/10 text-white" : "")}>रद्द करें</Button>
      </div>
    </form>
  );
};
