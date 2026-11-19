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
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';

interface PwaInstallItemProps {
  isNight: boolean;
  isHindi: boolean;
}

export const PwaInstallItem = ({ isNight, isHindi }: PwaInstallItemProps) => {
  const { isInstallable, installApp } = usePwaInstall();
  const [showInstructions, setShowInstructions] = useState(false);
  const [installed, setInstalled] = useState(false);

  const handleInstallClick = async () => {
    if (isInstallable) {
      const result = await installApp();
      if (result) {
        setInstalled(true);
      } else {
        // User cancelled or prompt failed
        setShowInstructions(true);
      }
    } else {
      // Prompt not available (iOS or already handled)
      setShowInstructions(true);
    }
  };

  const isIOS = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/.test(navigator.userAgent);

  if (installed) {
    return (
      <div className="w-full h-14 flex items-center justify-center gap-2 text-emerald-500 font-bold">
        <CheckCircle className="w-5 h-5" />
        <span>{isHindi ? 'ऐप इंस्टॉल हो गया' : 'App Installed'}</span>
      </div>
    );
  }

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
          isNight ? "bg-zinc-900 text-white" : "bg-white"
        )}>
          <DialogHeader>
            <DialogTitle className="text-xl font-headline font-black text-center">
              {isHindi ? 'ऐप कैसे इंस्टॉल करें?' : 'How to Install?'}
            </DialogTitle>
            <div className="pt-4 space-y-5">
              {isIOS ? (
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/20 w-8 h-8 flex items-center justify-center rounded-full text-accent font-bold">1</div>
                    <p className="text-sm">
                      {isHindi ? 'नीचे बने "Share" बटन पर क्लिक करें' : 'Tap the "Share" button below'}
                      <Share className="inline-block mx-1 w-4 h-4" />
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/20 w-8 h-8 flex items-center justify-center rounded-full text-accent font-bold">2</div>
                    <p className="text-sm">
                      {isHindi ? 'नीचे स्क्रॉल करें और "Add to Home Screen" चुनें' : 'Scroll down and select "Add to Home Screen"'}
                      <PlusSquare className="inline-block mx-1 w-4 h-4" />
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/20 w-8 h-8 flex items-center justify-center rounded-full text-accent font-bold">1</div>
                    <p className="text-sm">
                      {isHindi ? 'ब्राउज़र के "3-Dots" (ऊपर दाएं) पर क्लिक करें' : 'Open the browser "3-Dots" menu'}
                      <MoreVertical className="inline-block mx-1 w-4 h-4" />
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/20 w-8 h-8 flex items-center justify-center rounded-full text-accent font-bold">2</div>
                    <p className="text-sm">
                      {isHindi ? '"Install App" या "Add to Home Screen" चुनें' : 'Select "Install App" or "Add to Home Screen"'}
                      <Smartphone className="inline-block mx-1 w-4 h-4" />
                    </p>
                  </div>
                </div>
              )}
              <div className="pt-2">
                <Button 
                  onClick={() => setShowInstructions(false)}
                  className="w-full bg-primary text-white rounded-xl h-12 font-bold"
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