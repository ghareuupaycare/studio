
'use client';

import React, { useState } from 'react';
import { Download, Share, PlusSquare, MoreVertical, Smartphone, CheckCircle } from 'lucide-react';
import { usePwaInstall } from '@/hooks/use-pwa-install';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';

interface PwaInstallItemProps {
  isNight: boolean;
  isHindi: boolean;
}

export const PwaInstallItem = ({ isNight, isHindi }: PwaInstallItemProps) => {
  const { isInstallable, installApp, isStandalone } = usePwaInstall();
  const [showInstructions, setShowInstructions] = useState(false);

  // 1. If already in standalone mode, show friendly confirmation text
  if (isStandalone) {
    return (
      <div className={cn(
        "w-full h-14 flex items-center justify-start gap-4 px-4 rounded-2xl border transition-all",
        isNight 
          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
          : "bg-emerald-50 border-emerald-100 text-emerald-700"
      )}>
        <CheckCircle className="w-5 h-5 shrink-0" />
        <span className="text-[12px] font-black uppercase tracking-widest leading-tight">
          {isHindi ? 'आप पहले से घरेलू उपाय केयर ऐप में हैं' : 'You are already in the app'}
        </span>
      </div>
    );
  }

  const handleInstallClick = async () => {
    // 2. If native prompt is available, trigger it directly
    if (isInstallable) {
      const success = await installApp();
      if (!success) {
        // Fallback in case prompt failed or was dismissed
        console.log('PWA: Prompt not completed successfully');
      }
    } else {
      // 3. Fallback for iOS / Unsupported browsers where native prompt isn't fired
      setShowInstructions(true);
    }
  };

  const isIOS = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/.test(navigator.userAgent);

  return (
    <>
      <Button 
        variant="ghost" 
        className={cn(
          "w-full h-14 justify-start gap-4 rounded-2xl font-black text-sm uppercase tracking-widest border transition-all active:scale-95",
          isNight 
            ? "bg-white/5 border-white/10 text-white" 
            : "bg-white border-primary/10 text-primary hover:bg-primary/5 shadow-sm"
        )}
        onClick={handleInstallClick}
      >
        <Download className="w-5 h-5 text-accent" /> 
        {isHindi ? 'ऐप इंस्टॉल करें' : 'Install App'}
      </Button>

      <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
        <DialogContent className={cn(
          "max-w-[90vw] w-[350px] rounded-3xl border-none p-6",
          isNight ? "bg-zinc-900 text-white" : "bg-[#FDFBF7] text-foreground"
        )}>
          <DialogHeader>
            <DialogTitle className="text-xl font-headline font-black text-center mb-4">
              {isHindi ? 'ऐप कैसे इंस्टॉल करें?' : 'How to Install?'}
            </DialogTitle>
            <div className="space-y-5">
              {isIOS ? (
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/20 w-8 h-8 flex items-center justify-center rounded-full text-accent font-black shrink-0">1</div>
                    <p className="text-sm font-bold">
                      {isHindi ? 'नीचे बने "Share" बटन पर क्लिक करें' : 'Tap the "Share" button below'}
                      <Share className="inline-block mx-1 w-4 h-4" />
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/20 w-8 h-8 flex items-center justify-center rounded-full text-accent font-black shrink-0">2</div>
                    <p className="text-sm font-bold">
                      {isHindi ? 'नीचे स्क्रॉल करें और "Add to Home Screen" चुनें' : 'Scroll down and select "Add to Home Screen"'}
                      <PlusSquare className="inline-block mx-1 w-4 h-4" />
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/20 w-8 h-8 flex items-center justify-center rounded-full text-accent font-black shrink-0">1</div>
                    <p className="text-sm font-bold">
                      {isHindi ? 'ब्राउज़र के "3-Dots" (ऊपर दाएं) पर क्लिक करें' : 'Open the browser "3-Dots" menu'}
                      <MoreVertical className="inline-block mx-1 w-4 h-4" />
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/20 w-8 h-8 flex items-center justify-center rounded-full text-accent font-black shrink-0">2</div>
                    <p className="text-sm font-bold">
                      {isHindi ? '"Install App" या "Add to Home Screen" चुनें' : 'Select "Install App" or "Add to Home Screen"'}
                      <Smartphone className="inline-block mx-1 w-4 h-4" />
                    </p>
                  </div>
                </div>
              )}
              <div className="pt-4">
                <Button 
                  onClick={() => setShowInstructions(false)}
                  className="w-full bg-[#14532D] text-white rounded-2xl h-12 font-black uppercase tracking-widest shadow-lg"
                >
                  {isHindi ? 'ठीक है, समझ गया' : 'Got it'}
                </Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
