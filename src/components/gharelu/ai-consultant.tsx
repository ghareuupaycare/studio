import React, { useState } from 'react';
import { consultVaidyaAI, ConsultVaidyaAIOutput } from '@/ai/flows/consult-vaidya-ai';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Send, Loader2, Stethoscope, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export const AIConsultant = () => {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ConsultVaidyaAIOutput | null>(null);

  const handleConsult = async () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    try {
      const output = await consultVaidyaAI({ symptoms });
      setResult(output);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
          <Sparkles className="w-3 h-3" />
          Powered by AI
        </div>
        <h2 className="text-2xl font-headline font-bold text-primary">वैद्य जी सलाह</h2>
        <p className="text-muted-foreground text-sm px-4">
          अपनी स्वास्थ्य समस्याओं के बारे में बताएं और हमारे एआई वैद्य जी से पारंपरिक आयुर्वेदिक सुझाव प्राप्त करें।
        </p>
      </div>

      <Card className="bg-card/30 border-primary/20 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-4 space-y-4">
          <div className="relative">
            <Textarea
              placeholder="उदाहरण: मुझे कल से घुटनों में बहुत दर्द हो रहा है और चलने में दिक्कत है..."
              className="min-h-[120px] bg-background/50 border-primary/20 focus-visible:ring-primary text-foreground placeholder:text-muted-foreground/50 resize-none p-4 pb-12"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
            <div className="absolute bottom-2 right-2">
              <Button 
                onClick={handleConsult} 
                disabled={loading || !symptoms.trim()}
                className="bg-accent hover:bg-accent/90 text-white rounded-full h-10 w-10 p-0"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6 pb-20 animate-in slide-in-from-bottom-4 duration-700">
          {result.remedies.map((remedy, idx) => (
            <Card key={idx} className="border-primary/20 bg-card/40 overflow-hidden shadow-2xl">
              <CardHeader className="bg-primary/10 pb-4 border-b border-primary/10">
                <CardTitle className="text-primary font-headline text-xl flex items-center gap-2">
                  <Stethoscope className="w-5 h-5" />
                  {remedy.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {remedy.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    सामग्री (Ingredients)
                  </h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {remedy.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary/60" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary">बनाने की विधि</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground bg-background/30 p-3 rounded-lg border border-primary/5">
                    {remedy.preparation}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary">इस्तेमाल कैसे करें</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {remedy.usage}
                  </p>
                </div>

                <Alert className="bg-accent/5 border-accent/20 text-accent-foreground">
                  <AlertTriangle className="h-4 w-4 text-accent" />
                  <AlertTitle className="text-xs font-bold uppercase tracking-wider text-accent">सावधानी</AlertTitle>
                  <AlertDescription className="text-xs leading-relaxed opacity-90">
                    {remedy.safetyAdvice}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-primary/5 border-primary/10">
            <CardContent className="p-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">सामान्य सलाह</h4>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "{result.generalAdvice}"
              </p>
            </CardContent>
          </Card>

          <p className="text-[10px] text-center text-muted-foreground px-6 py-4 uppercase tracking-widest">
            {result.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
};
