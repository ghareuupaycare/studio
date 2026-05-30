/**
 * @fileOverview Base Types and Constants for Ayurvedic Remedies.
 * Prevents circular dependencies by providing a common foundation.
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
