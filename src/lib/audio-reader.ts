/**
 * @fileOverview Browser-native Text-to-Speech utility for reading remedies.
 * Supports both Hindi (hi-IN) and English (en-US).
 * Optimized for INSTANT response (under 1 second) and zero hardcoded content.
 */

export const stopSpeech = () => {
  if (typeof window !== 'undefined') {
    window.speechSynthesis.cancel();
  }
};

/**
 * Robust Speech synthesis that takes raw text from the caller.
 * Strictly avoids any internal fallbacks to ensure it only reads what is passed.
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

  // 1. Force-stop any current speech to clear the browser buffer instantly
  window.speechSynthesis.cancel();

  // 2. Create the utterance object with the provided dynamic text
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set language to Hindi or English as requested
  utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
  
  // Set strictly to 0.85 for a calm, natural Vaidya-like pace
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
   * Browser-specific optimization: A tiny delay ensures the browser's 
   * speech engine has processed the 'cancel' command before starting the new one.
   */
  setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, 50);
};
