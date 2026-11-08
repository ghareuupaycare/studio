/**
 * @fileOverview Browser-native Text-to-Speech utility for reading remedies.
 * Supports both Hindi (hi-IN) and English (en-US).
 * Optimized for instant response and reliability.
 */

export const stopSpeech = () => {
  if (typeof window !== 'undefined') {
    window.speechSynthesis.cancel();
  }
};

export const pauseSpeech = () => {
  if (typeof window !== 'undefined') {
    window.speechSynthesis.pause();
  }
};

export const resumeSpeech = () => {
  if (typeof window !== 'undefined') {
    window.speechSynthesis.resume();
  }
};

/**
 * Robust Speech synthesis optimized for instant playback (under 1 second).
 */
export const speakText = (
  text: string,
  lang: 'hi' | 'en',
  onStart: () => void,
  onEnd: () => void
) => {
  if (typeof window === 'undefined') return;

  // 1. Cancel any existing speech immediately
  window.speechSynthesis.cancel();

  // 2. Prepare the utterance
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set language properties based on selection
  utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
  
  // Speed set strictly to 0.85 as per requirement for calm, natural pace
  utterance.rate = 0.85; 
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
      console.error('SpeechSynthesis error:', event);
    }
    onEnd();
  };

  /**
   * Browser-specific fix: Some browsers (Chrome/Safari) require a brief pause 
   * after cancel() before starting a new speak() request to avoid internal hangs.
   * Reducing to minimal 50ms for near-instant response.
   */
  setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, 50);
};
