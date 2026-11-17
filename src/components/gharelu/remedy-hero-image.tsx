'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface RemedyHeroImageProps {
  url?: string;
  alt?: string;
}

export const RemedyHeroImage = ({ url, alt }: RemedyHeroImageProps) => {
  const [error, setError] = useState(false);

  if (!url || error) return null;

  return (
    <div className="mb-6 w-full animate-in fade-in duration-700">
      <div className={cn(
        "relative aspect-video w-full overflow-hidden rounded-[2.5rem] shadow-2xl",
        "border-4 border-amber-400/30"
      )}>
        <Image 
          src={url} 
          alt={alt || "Remedy Image"} 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
          onError={() => setError(true)}
        />
      </div>
    </div>
  );
};
