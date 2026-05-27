/**
 * @fileOverview Main Data Hub for Ayurvedic Remedies.
 * Exports types and orchestrates modular data files.
 */

export type LocalizedString = {
  hi: string;
  en: string;
};

export type DoseConfig = {
  ageRange: LocalizedString;
  dose: LocalizedString;
  ingredients?: { hi: string[]; en: string[] };
};

export type Remedy = {
  id: string;
  serialNumber: string;
  name: LocalizedString;
  illnessId: string;
  introduction: LocalizedString;
  severity?: 'mild' | 'moderate' | 'severe';
  severityLabel?: LocalizedString;
  doses: DoseConfig[];
  ingredients: { hi: string[]; en: string[] };
  preparation: LocalizedString;
  usage: LocalizedString;
  dietEat: LocalizedString;
  dietAvoid: LocalizedString;
  strictAvoid: LocalizedString;
  routine: {
    morning: LocalizedString;
    afternoon: LocalizedString;
    evening: LocalizedString;
  };
  safetyAdvice: LocalizedString;
  disclaimer: LocalizedString;
  image: string;
  keywords: string;
};

export const AGE_BRACKETS = {
  childhood: { hi: "5-12 वर्ष", en: "5-12 Years" },
  youth: { hi: "13-40 वर्ष", en: "13-40 Years" },
  middleAge: { hi: "41-60 वर्ष", en: "41-60 Years" },
  oldAge: { hi: "61-80 वर्ष", en: "61-80 Years" }
};

export const GENERAL_DISCLAIMER: LocalizedString = {
  hi: "यह जानकारी केवल शैक्षिक उद्देश्य के लिए है, कृपया अपने चिकित्सक से सलाह ज़रूर लें।",
  en: "This information is for educational purposes only, please consult your physician."
};

export const CATEGORIES = [
  { id: 'fever', label: '1. मौसमी बुखार एवं फ्लू', icon: 'Thermometer', image: "https://picsum.photos/seed/cough/600/400" },
  { id: 'joints', label: '2. घुटनों का दर्द', icon: 'Accessibility', image: "https://picsum.photos/seed/joint/600/400" },
  { id: 'respiratory', label: '3. खांसी और सर्दी', icon: 'Wind', image: "https://picsum.photos/seed/cough/600/400" },
  { id: 'digestion', label: '4. पाचन', icon: 'Stomach', image: "https://picsum.photos/seed/digestion/600/400" },
];

// Data imports must happen AFTER constants are defined to avoid circular dependency initialization errors
import { FEVER_REMEDIES } from "./fever-data";
import { COLD_REMEDIES } from "./cold-data";

export const REMEDIES: Remedy[] = [
  ...FEVER_REMEDIES,
  ...COLD_REMEDIES
];
