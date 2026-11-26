'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * AppSplashScreen - A clean, white welcome animation.
 * Optimized with safety guards for storage and SSR.
 */
export const AppSplashScreen = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const hasSeenSplash = sessionStorage.getItem('gharelu_splash_seen');
      if (!hasSeenSplash) {
        setVisible(true);
        const timer = setTimeout(() => {
          setVisible(false);
          try {
            sessionStorage.setItem('gharelu_splash_seen', 'true');
          } catch (e) {}
        }, 2000);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error("Splash screen storage access failed", e);
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
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          image-rendering: -webkit-optimize-contrast;
        }
      `}</style>
    </div>
  );
};
