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
  keywords: string | string[];
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
  { id: 'fever', label: '1. सामान्य बुखार', icon: 'Thermometer', image: "https://picsum.photos/seed/cough/600/400" },
  { id: 'cold', label: '2. नजला और जुकाम', icon: 'Wind', image: "https://picsum.photos/seed/cold/600/400" },
  { id: 'respiratory', label: '3. सूखी एवं बलगम वाली खांसी', icon: 'Wind', image: "https://picsum.photos/seed/cough/600/400" },
  { id: 'digestion', label: '4. पाचन', icon: 'Stomach', image: "https://picsum.photos/seed/digestion/600/400" },
];

import { FEVER_REMEDIES } from "./fever-data";
import { COLD_REMEDIES } from "./cold-data";
import { COUGH_REMEDIES } from "./cough-data";

export const REMEDIES: Remedy[] = [
  ...FEVER_REMEDIES,
  ...COLD_REMEDIES,
  ...COUGH_REMEDIES
];
