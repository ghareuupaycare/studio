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
      </div>

      <Card className="bg-card/30 border-primary/20 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-4 space-y-4">
          <div className="relative">
            <Textarea
              placeholder="अपनी स्वास्थ्य समस्याओं के बारे में बताएं..."
              className="min-h-[120px] bg-background/50 border-primary/20 text-[16px]"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
            <div className="absolute bottom-2 right-2">
              <Button onClick={handleConsult} disabled={loading || !symptoms.trim()} className="bg-accent rounded-full h-10 w-10 p-0">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6 pb-20">
          {result.remedies.map((remedy, idx) => (
            <Card key={idx} className="border-primary/20 bg-card/40">
              <CardHeader className="bg-primary/10">
                <CardTitle className="text-primary font-headline text-[18px] flex items-center gap-2">
                  <Stethoscope className="w-5 h-5" />
                  {remedy.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6 text-[16px]">
                <p>{remedy.description}</p>
                <Alert className="bg-accent/5">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-[12px] opacity-60">
                    {remedy.safetyAdvice}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          ))}
          <p className="text-[12px] text-center text-muted-foreground opacity-60 px-6 py-4 uppercase tracking-widest">
            {result.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
};