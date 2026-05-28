/**
 * @fileOverview Category 3: Dry & Productive Cough (सूखी एवं बलगम वाली खांसी) Data Store
 * Initialized as a dedicated modular node for future expansion.
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

export const COUGH_REMEDIES: Remedy[] = [];
