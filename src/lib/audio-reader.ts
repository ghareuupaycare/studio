/**
 * @fileOverview Browser-native Text-to-Speech utility for reading remedies.
 * Supports both Hindi (hi-IN) and English (en-US).
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
 * Robust Speech synthesis that minimizes initialization lag.
 */
export const speakText = (
  text: string,
  lang: 'hi' | 'en',
  onStart: () => void,
  onEnd: () => void
) => {
  if (typeof window === 'undefined') return;

  // Stop any current speech immediately
  stopSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set language properties
  utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
  
  // Set to strictly 0.85 as per requirement for natural calm pace
  utterance.rate = 0.85; 
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  utterance.onstart = onStart;
  utterance.onend = onEnd;
  utterance.onerror = (event) => {
    console.error('SpeechSynthesis error:', event);
    onEnd();
  };

  // Small timeout helps browser engine stabilize and start faster on some systems
  setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, 10);
};
