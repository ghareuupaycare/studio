/**
 * @fileOverview Main Data Hub for Ayurvedic Remedies.
 * Exports types and orchestrates modular data files.
 */

export type LocalizedString = {
  hi: string;
  en: string;
};

export type FlexibleLocalizedString = {
  hi: string | string[];
  en: string | string[];
};

export type DoseConfig = {
  ageRange: LocalizedString;
  dose: FlexibleLocalizedString;
  ingredients?: { hi: string[]; en: string[] };
};

export type Remedy = {
  id: string;
  serialNumber: string;
  name: LocalizedString;
  illnessId: string;
  introduction: FlexibleLocalizedString;
  severity?: 'mild' | 'moderate' | 'severe';
  severityLabel?: LocalizedString;
  doses: DoseConfig[];
  ingredients: { hi: string[]; en: string[] };
  preparation: FlexibleLocalizedString;
  usage: FlexibleLocalizedString;
  dietEat: FlexibleLocalizedString;
  dietAvoid: FlexibleLocalizedString;
  strictAvoid?: FlexibleLocalizedString;
  routine: {
    morning: FlexibleLocalizedString;
    afternoon: FlexibleLocalizedString;
    evening: FlexibleLocalizedString;
  };
  safetyAdvice: FlexibleLocalizedString;
  disclaimer: FlexibleLocalizedString;
  image?: string;
  keywords: string[];
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
  { id: 'fever_flu', label: '1. मौसमी बुखार एवं फ्लू', icon: 'Thermometer', image: "https://picsum.photos/seed/cough/600/400" },
  { id: 'digestion', label: '2. पाचन', icon: 'Stomach', image: "https://picsum.photos/seed/digestion/600/400" },
];

import { FEVER_REMEDIES } from "./fever-data";
import { COLD_REMEDIES } from "./cold-data";
import { COUGH_REMEDIES } from "./cough-data";

export const REMEDIES: Remedy[] = [
  ...FEVER_REMEDIES,
  ...COLD_REMEDIES,
  ...COUGH_REMEDIES
];
