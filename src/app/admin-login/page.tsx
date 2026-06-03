
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Check if already logged in
  useEffect(() => {
    const isAuth = localStorage.getItem('gharelu_admin_auth');
    if (isAuth === 'true') {
      router.push('/admin-dashboard');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Using a static credential or env variable check
    // For production, you'd want to use Firebase Auth, but for now we follow the "static master" request.
    const MASTER_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'vaidya2024';

    setTimeout(() => {
      if (password === MASTER_PASSWORD) {
        localStorage.setItem('gharelu_admin_auth', 'true');
        toast({
          title: "लॉगिन सफल",
          description: "वैद्य जी, एडमिन डैशबोर्ड में आपका स्वागत है।",
        });
        router.push('/admin-dashboard');
      } else {
        toast({
          variant: "destructive",
          title: "लॉगिन विफल",
          description: "गलत पासवर्ड। कृपया पुनः प्रयास करें।",
        });
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-headline font-black text-primary">एडमिन लॉगिन</h1>
          <p className="text-muted-foreground font-medium">घरेलू उपाय केयर कंट्रोल पैनल</p>
        </div>

        <Card className="border-primary/10 shadow-xl overflow-hidden">
          <CardHeader className="bg-primary text-white p-6">
            <CardTitle className="text-lg flex items-center gap-2">
              <Lock className="w-4 h-4" />
              सुरक्षित प्रवेश
            </CardTitle>
            <CardDescription className="text-white/70">
              आगे बढ़ने के लिए अपना मास्टर पासवर्ड दर्ज करें
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="पासवर्ड दर्ज करें..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-primary/20 focus-visible:ring-primary"
                  autoFocus
                  required
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 bg-accent hover:bg-accent/90 text-white font-black uppercase tracking-widest transition-all active:scale-95"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'प्रवेश करें'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground opacity-60 uppercase tracking-widest font-bold">
          <AlertCircle className="w-3 h-3" />
          केवल अधिकृत उपयोग के लिए
        </div>
      </div>
    </div>
  );
}
