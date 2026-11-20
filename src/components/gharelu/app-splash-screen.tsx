
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * AppSplashScreen - A clean, white welcome animation.
 * Features: 2-second duration, brand logo zoom-in effect.
 * Strictly uses /icon-512.png as the source.
 */
export const AppSplashScreen = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('gharelu_splash_seen');
    if (!hasSeenSplash) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem('gharelu_splash_seen', 'true');
      }, 2000); // Exactly 2 seconds as requested
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#FFFFFF] flex flex-col items-center justify-center overflow-hidden animate-out fade-out fill-mode-forwards duration-500 delay-[1800ms]">
      <div className="relative w-64 h-64 animate-splash-zoom">
        <Image 
          src="/icon-512.png" 
          alt="Gharelu Upay Care" 
          width={512} 
          height={512}
          className="w-full h-full object-contain"
          priority
        />
      </div>
      
      <style jsx>{`
        @keyframes splashZoom {
          0% { 
            transform: scale(0.7); 
            opacity: 0; 
          }
          50% {
            opacity: 1;
          }
          100% { 
            transform: scale(1.1); 
            opacity: 1; 
          }
        }
        .animate-splash-zoom {
          animation: splashZoom 2000ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};
