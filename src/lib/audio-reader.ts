/**
 * @fileOverview A brand new, clean implementation of Browser-native Text-to-Speech.
 * This file has been completely rebuilt from scratch to ensure zero hardcoded content.
 * It is purely functional and reacts only to the text passed during execution.
 */

export const stopSpeech = () => {
  if (typeof window !== 'undefined') {
    window.speechSynthesis.cancel();
  }
};

/**
 * Universal Speak Function.
 * Starts playback in under 1 second by clearing buffers immediately.
 */
export const speakText = (
  text: string,
  lang: 'hi' | 'en',
  onStart: () => void,
  onEnd: () => void
) => {
  if (typeof window === 'undefined' || !text || !text.trim()) {
    onEnd();
    return;
  }

  // 1. Instant Reset: Clear any pending or current speech immediately
  window.speechSynthesis.cancel();

  // 2. Create dynamic utterance from the passed text
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Configure for a natural Ayurvedic Consultant (Vaidya) tone
  utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
  utterance.rate = 0.85; // Natural slow pace
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  utterance.onstart = () => {
    onStart();
  };

  utterance.onend = () => {
    onEnd();
  };

  utterance.onerror = (event) => {
    if (event.error !== 'interrupted') {
      console.error('Speech synthesis execution error:', event);
    }
    onEnd();
  };

  // 3. Trigger speech immediately after a minimal micro-delay to allow buffer clearing
  setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, 30);
};
