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

/**
 * Robust Speech synthesis optimized for instant playback (under 1 second).
 * It takes raw text and language as input, ensuring no hardcoded content is used.
 */
export const speakText = (
  text: string,
  lang: 'hi' | 'en',
  onStart: () => void,
  onEnd: () => void
) => {
  if (typeof window === 'undefined' || !text.trim()) {
    onEnd();
    return;
  }

  // 1. Cancel any existing speech immediately to clear the queue
  window.speechSynthesis.cancel();

  // 2. Prepare the utterance with the provided text only
  const utterance = new SpeechSynthesisUtterance(text);
  
  utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
  utterance.rate = 0.85; // Calm, natural pace
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
   * Browser-specific fix: Chrome/Safari require a tiny pause after cancel()
   * but 20ms is enough for nearly instant execution.
   */
  setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, 20);
};
