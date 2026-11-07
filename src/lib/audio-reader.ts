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

export const speakText = (
  text: string,
  lang: 'hi' | 'en',
  onStart: () => void,
  onEnd: () => void
) => {
  if (typeof window === 'undefined') return;

  // Stop any current speech
  stopSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set language properties
  utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
  
  // Adjusted for natural, comfortable listening speed as requested
  utterance.rate = 0.9; 
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  utterance.onstart = onStart;
  utterance.onend = onEnd;
  utterance.onerror = (event) => {
    console.error('SpeechSynthesis error:', event);
    onEnd();
  };

  window.speechSynthesis.speak(utterance);
};
