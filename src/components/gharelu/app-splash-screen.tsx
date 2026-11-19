'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export const AppSplashScreen = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('gharelu_splash_seen');
    if (!hasSeenSplash) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem('gharelu_splash_seen', 'true');
      }, 2500); // Slightly longer for better brand visibility
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#14532D] flex flex-col items-center justify-center animate-out fade-out fill-mode-forwards duration-500 delay-2000">
      <div className="relative w-48 h-48 mb-6 animate-in zoom-in-50 fade-in duration-700">
        <div className="absolute inset-0 bg-white/10 rounded-full animate-ping opacity-25" />
        <Image 
          src="/icon-512x512.png" 
          alt="Gharelu Upay Care" 
          width={512} 
          height={512}
          className="relative z-10 w-full h-full object-contain rounded-full border-4 border-amber-400 p-2 bg-white"
          priority
        />
      </div>
      <div className="text-center space-y-2 animate-in slide-in-from-bottom-4 duration-700 delay-200">
        <h1 className="text-3xl font-black font-headline text-white tracking-wider">
          घरेलू उपाय केयर
        </h1>
        <p className="text-amber-400 font-bold text-sm uppercase tracking-[0.3em]">
          Gharelu Upay Care
        </p>
      </div>
      
      {/* Bottom Loading Indicator */}
      <div className="absolute bottom-12 w-24 h-1.5 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-accent animate-progress origin-left w-full" />
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .animate-progress {
          animation: progress 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};