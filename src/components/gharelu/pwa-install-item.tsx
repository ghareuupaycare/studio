'use client';

import React, { useState } from 'react';
import { Download, Share, PlusSquare, MoreVertical, Smartphone } from 'lucide-react';
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

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await installApp();
      if (!success) setShowInstructions(true);
    } else {
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
            : "bg-white border-primary/10 text-primary hover:bg-primary/5"
        )}
        onClick={handleInstallClick}
      >
        <Download className="w-5 h-5 text-accent" /> 
        {isHindi ? 'ऐप इंस्टॉल करें' : 'Install App'}
      </Button>

      <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
        <DialogContent className={cn(
          "max-w-[90vw] rounded-3xl border-none",
          isNight ? "bg-zinc-900 text-white" : "bg-white"
        )}>
          <DialogHeader>
            <DialogTitle className="text-xl font-headline font-black">
              {isHindi ? 'ऐप कैसे इंस्टॉल करें?' : 'How to Install?'}
            </DialogTitle>
            <DialogDescription className="pt-4 space-y-4">
              {isIOS ? (
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="bg-accent/20 p-2 rounded-lg text-accent">1</div>
                    <p className="text-sm">
                      {isHindi ? 'नीचे बने "Share" बटन पर क्लिक करें' : 'Tap the "Share" button below'}
                      <Share className="inline-block mx-1 w-4 h-4" />
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-accent/20 p-2 rounded-lg text-accent">2</div>
                    <p className="text-sm">
                      {isHindi ? 'नीचे स्क्रॉल करें और "Add to Home Screen" चुनें' : 'Scroll down and select "Add to Home Screen"'}
                      <PlusSquare className="inline-block mx-1 w-4 h-4" />
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="bg-accent/20 p-2 rounded-lg text-accent">1</div>
                    <p className="text-sm">
                      {isHindi ? 'ब्राउज़र के "3-Dots" मेनू पर क्लिक करें' : 'Open the browser "3-Dots" menu'}
                      <MoreVertical className="inline-block mx-1 w-4 h-4" />
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-accent/20 p-2 rounded-lg text-accent">2</div>
                    <p className="text-sm">
                      {isHindi ? '"Install App" या "Add to Home Screen" चुनें' : 'Select "Install App" or "Add to Home Screen"'}
                      <Smartphone className="inline-block mx-1 w-4 h-4" />
                    </p>
                  </div>
                </div>
              )}
              <div className="pt-4">
                <Button 
                  onClick={() => setShowInstructions(false)}
                  className="w-full bg-primary text-white rounded-xl h-12 font-bold"
                >
                  {isHindi ? 'समझ गया' : 'Got it'}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
