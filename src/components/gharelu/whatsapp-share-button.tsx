'use client';

import React from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Remedy } from '@/lib/remedy-types';
import { Language } from '@/app/page';
import { toEnglishDigits } from '@/lib/utils';

interface WhatsAppShareButtonProps {
  remedy: Remedy;
  lang: Language;
}

export const WhatsAppShareButton = ({ remedy, lang }: WhatsAppShareButtonProps) => {
  const handleWhatsAppShare = () => {
    try {
      const isHindi = lang === 'hi';
      const title = remedy.name?.[lang] || '';
      const intro = remedy.introduction?.[lang];
      
      // Get a short snippet from the introduction
      const briefIntro = Array.isArray(intro) 
        ? (intro as string[])[0] 
        : (intro as string || '').split('\n')[0];
      
      const shareUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/remedy/${remedy.id}` 
        : `https://ghareluupaycare.vercel.app/remedy/${remedy.id}`;
      
      const brandHeader = isHindi ? '🌿 *घरेलू उपाय केयर* 🌿' : '🌿 *Gharelu Upay Care* 🌿';
      const cta = isHindi 
        ? '💡 अपनी उम्र के हिसाब से \'स्मार्ट खुराक\' और पूरी जानकारी देखने के लिए नीचे दिए गए लिंक पर क्लिक करें:' 
        : '💡 To see \'Smart Dosage\' according to your age and complete details, click the link below:';

      // Constructing the Rich Message
      const message = `${brandHeader}\n\n*${title}*\n\n${briefIntro}\n\n${cta}\n\n${shareUrl}`;
      
      // Using toEnglishDigits to ensure numbers in the message are standard for the URL
      const finalEncodedMessage = encodeURIComponent(toEnglishDigits(message));
      
      window.open(`https://wa.me/?text=${finalEncodedMessage}`, '_blank');
    } catch (e) {
      console.error("WhatsApp share error", e);
    }
  };

  return (
    <Button 
      onClick={handleWhatsAppShare} 
      className="h-9 px-3 bg-[#14532D] text-white border-2 border-[#FBBF24] rounded-xl flex items-center gap-1.5 font-bold text-xs shrink-0 active:scale-95 transition-transform"
    >
      <Share2 className="w-3.5 h-3.5" /> SHARE
    </Button>
  );
};
