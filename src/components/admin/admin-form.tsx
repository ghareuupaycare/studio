'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Loader2, Stethoscope, BookOpen, Plus, Trash2, X, Globe } from 'lucide-react';

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
  onCancel
}: AdminFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-headline font-black text-primary">
          {editingId ? 'नुस्खा अपडेट करें' : 'नया नुस्खा अपलोड करें'}
        </h2>
        {editingId && (
          <Button variant="outline" onClick={onCancel} className="gap-2 border-destructive text-destructive hover:bg-destructive/10">
            <X className="w-4 h-4" /> एडिट रद्द करें
          </Button>
        )}
      </div>

      {/* 1. Classifications */}
      <Card className="border-primary/20 shadow-xl overflow-hidden rounded-[2rem]">
        <CardHeader className="bg-primary text-white">
          <CardTitle className="text-lg flex items-center gap-2"><Stethoscope className="w-5 h-5" /> 1. श्रेणी और वर्गीकरण</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Label>मुख्य श्रेणी (Hindi / English)</Label>
              <Input 
                name="mainCategoryHi" 
                placeholder="उदा: पेट रोग, बुखार" 
                required 
                value={formData.mainCategoryHi} 
                onChange={onInputChange} 
              />
              <Input 
                name="mainCategoryEn" 
                placeholder="e.g. Stomach Ailments, Fever" 
                required 
                value={formData.mainCategoryEn} 
                onChange={onInputChange} 
              />
            </div>
            <div className="space-y-4">
              <Label>उप-श्रेणी / बीमारी (Hindi / English)</Label>
              <Input 
                name="diseaseNameHi" 
                placeholder="उदा: गैस, सामान्य बुखार" 
                required 
                value={formData.diseaseNameHi} 
                onChange={onInputChange} 
              />
              <Input 
                name="diseaseNameEn" 
                placeholder="e.g. Gas, General Fever" 
                required 
                value={formData.diseaseNameEn} 
                onChange={onInputChange} 
              />
            </div>
          </div>
          <div className="space-y-4 pt-4 border-t">
            <Label>नुस्खे का शीर्षक (Hindi / English)</Label>
            <Input 
              name="remedyTitleHi" 
              placeholder="उदा: हींग और अजवाइन का चूर्ण" 
              required 
              value={formData.remedyTitleHi} 
              onChange={onInputChange} 
            />
            <Input 
              name="remedyTitleEn" 
              placeholder="e.g. Hing and Ajwain Powder" 
              required 
              value={formData.remedyTitleEn} 
              onChange={onInputChange} 
            />
          </div>
        </CardContent>
      </Card>

      {/* 2-9. Detailed Content */}
      <Card className="border-primary/20 shadow-xl overflow-hidden rounded-[2rem]">
        <CardHeader className="bg-[#14532D] text-white">
           <CardTitle className="text-lg flex items-center gap-2"><BookOpen className="w-5 h-5" /> विस्तृत जानकारी (2-9)</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <div className="space-y-4">
            <Label className="font-bold text-primary">2. परिचय | Introduction</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea name="introductionHi" placeholder="Hindi Description" value={formData.introductionHi} onChange={onInputChange} required />
              <Textarea name="introductionEn" placeholder="English Description" value={formData.introductionEn} onChange={onInputChange} required />
            </div>
          </div>
          <div className="space-y-4">
            <Label className="font-bold text-primary">3. सामग्री | Ingredients</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea name="ingredientsHi" placeholder="सामग्री की सूची (एक लाइन में एक)" value={formData.ingredientsHi} onChange={onInputChange} required />
              <Textarea name="ingredientsEn" placeholder="List of ingredients (one per line)" value={formData.ingredientsEn} onChange={onInputChange} required />
            </div>
          </div>
          <div className="space-y-4">
            <Label className="font-bold text-primary">4. बनाने की विधि | Preparation</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea name="preparationHi" placeholder="Hindi Method" value={formData.preparationHi} onChange={onInputChange} required />
              <Textarea name="preparationEn" placeholder="English Method" value={formData.preparationEn} onChange={onInputChange} required />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <Label className="font-bold text-primary">5. खुराक | Smart Dosage</Label>
            <div className="space-y-4">
              {doses.map((dose, index) => (
                <div key={index} className="p-4 border rounded-xl space-y-4 bg-muted/20">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-primary">खुराक #{index + 1}</span>
                    <Button type="button" variant="ghost" size="icon" onClick={() => onRemoveDose(index)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs">आयु वर्ग (Hindi / English)</Label>
                      <Input placeholder="उदा: 5-12 वर्ष" value={dose.ageRangeHi} onChange={(e) => onDoseChange(index, 'ageRangeHi', e.target.value)} />
                      <Input placeholder="e.g. 5-12 Years" value={dose.ageRangeEn} onChange={(e) => onDoseChange(index, 'ageRangeEn', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">खुराक (Hindi / English)</Label>
                      <Input placeholder="उदा: आधा चम्मच" value={dose.doseHi} onChange={(e) => onDoseChange(index, 'doseHi', e.target.value)} />
                      <Input placeholder="e.g. Half Teaspoon" value={dose.doseEn} onChange={(e) => onDoseChange(index, 'doseEn', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={onAddDose} className="w-full gap-2 border-dashed"><Plus className="w-4 h-4" /> और खुराक जोड़ें</Button>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="font-bold text-primary">6. सेवन विधि | Usage</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea name="usageHi" placeholder="Hindi Usage" value={formData.usageHi} onChange={onInputChange} required />
              <Textarea name="usageEn" placeholder="English Usage" value={formData.usageEn} onChange={onInputChange} required />
            </div>
          </div>
          <div className="space-y-4">
            <Label className="font-bold text-primary">7. क्या खाएं / परहेज़ | Diet</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Input name="dietEatHi" placeholder="क्या खाएं (Hi)" value={formData.dietEatHi} onChange={onInputChange} />
              <Input name="dietEatEn" placeholder="Eat (En)" value={formData.dietEatEn} onChange={onInputChange} />
              <Input name="dietAvoidHi" placeholder="परहेज़ (Hi)" value={formData.dietAvoidHi} onChange={onInputChange} />
              <Input name="dietAvoidEn" placeholder="Avoid (En)" value={formData.dietAvoidEn} onChange={onInputChange} />
            </div>
          </div>
          <div className="space-y-4">
            <Label className="font-bold text-primary">8. दिनचर्या | Routine</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea name="routineHi" placeholder="दिनचर्या (Hi)" value={formData.routineHi} onChange={onInputChange} />
              <Textarea name="routineEn" placeholder="Routine (En)" value={formData.routineEn} onChange={onInputChange} />
            </div>
          </div>
          <div className="space-y-4">
            <Label className="font-bold text-primary">9. सुरक्षा | Safety</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea name="safetyAdviceHi" placeholder="सुरक्षा सलाह (Hi)" value={formData.safetyAdviceHi} onChange={onInputChange} required />
              <Textarea name="safetyAdviceEn" placeholder="Safety Advice (En)" value={formData.safetyAdviceEn} onChange={onInputChange} required />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Section */}
      <Card className="border-accent/20 shadow-xl overflow-hidden rounded-[2rem]">
        <CardHeader className="bg-accent text-white">
           <CardTitle className="text-lg flex items-center gap-2"><Globe className="w-5 h-5" /> ग्लोबल सर्चिंग कीवर्ड्स (Global SEO Keywords)</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <Label className="text-sm font-bold opacity-70">सर्च इंजन इंडेक्सिंग के लिए (Google, Internal Search)</Label>
          <Textarea 
            name="seoKeywords" 
            placeholder="उदा: gas, acidity, pet dard, kabj, acidity ka gharelu ilaj (कीवर्ड्स को कॉमा से अलग करें)" 
            value={formData.seoKeywords} 
            onChange={onInputChange}
            className="min-h-[100px] border-accent/20 focus-visible:ring-accent"
          />
          <p className="text-[11px] text-muted-foreground italic">
            ये कीवर्ड्स यूजर को ऐप के अंदर नहीं दिखेंगे, लेकिन गूगल सर्च और ऐप के सर्च बार को सही परिणाम ढूंढने में मदद करेंगे।
          </p>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1 h-14 bg-accent hover:bg-accent/90 rounded-2xl shadow-xl text-lg font-bold">
          {isSubmitting ? <Loader2 className="animate-spin" /> : <Save className="mr-2" />} 
          {editingId ? 'अपडेट सुरक्षित करें' : 'नुस्खा सुरक्षित करें'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="h-14 px-8 rounded-2xl">रद्द करें</Button>
      </div>
    </form>
  );
};