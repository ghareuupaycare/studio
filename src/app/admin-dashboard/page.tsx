
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard, Settings, Database, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

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

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      {/* Admin Header */}
      <header className="h-16 bg-primary text-white flex items-center justify-between px-6 shadow-md shrink-0">
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
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard Feature Placeholders */}
          <div className="p-8 rounded-[2rem] border border-primary/10 bg-white shadow-sm flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-2xl bg-primary/5 text-primary">
              <Database className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl">नुस्खे प्रबंधित करें</h3>
            <p className="text-sm text-muted-foreground">नए नुस्खे जोड़ें या पुराने अपडेट करें।</p>
            <Button variant="outline" className="rounded-full border-primary/20 text-primary opacity-50 cursor-not-allowed">जल्द आ रहा है</Button>
          </div>

          <div className="p-8 rounded-[2rem] border border-primary/10 bg-white shadow-sm flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-2xl bg-amber-500/5 text-amber-500">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl">यूजर अनुरोध</h3>
            <p className="text-sm text-muted-foreground">यूजर्स द्वारा मांगे गए नए उपचार देखें।</p>
            <Button variant="outline" className="rounded-full border-primary/20 text-primary opacity-50 cursor-not-allowed">जल्द आ रहा है</Button>
          </div>

          <div className="p-8 rounded-[2rem] border border-primary/10 bg-white shadow-sm flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-500/5 text-emerald-500">
              <Settings className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl">ऐप सेटिंग्स</h3>
            <p className="text-sm text-muted-foreground">एप्लिकेशन की मुख्य सेटिंग्स बदलें।</p>
            <Button variant="outline" className="rounded-full border-primary/20 text-primary opacity-50 cursor-not-allowed">जल्द आ रहा है</Button>
          </div>
        </div>

        {/* Empty State / Welcome */}
        <div className="mt-12 py-20 border-2 border-dashed border-primary/10 rounded-[3rem] flex flex-col items-center justify-center text-center space-y-4 opacity-40">
          <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center">
             <LayoutDashboard className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-headline font-black">कंट्रोल पैनल में आपका स्वागत है</h2>
            <p className="max-w-md mx-auto">यहाँ से आप 'घरेलू उपाय केयर' ऐप की हर गतिविधि को नियंत्रित कर सकेंगे। सुविधाएँ जल्द ही सक्रिय कर दी जाएंगी।</p>
          </div>
        </div>
      </main>
    </div>
  );
}
