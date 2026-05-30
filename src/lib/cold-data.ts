import { Remedy, AGE_BRACKETS, GENERAL_DISCLAIMER } from "./remedy-types";

export const COLD_REMEDIES: Remedy[] = [
  {
    id: 'cc-1',
    serialNumber: '1',
    name: { hi: 'तुलसी और अदरक की चमत्कारी चाय', en: 'Miraculous Tulsi and Ginger Tea' },
    illnessId: 'common-cold',
    introduction: {
      hi: "जुकाम और नाक बहने की समस्या अक्सर कफ दोष के असंतुलन से होती है।",
      en: "Cold and runny nose are often caused by Kapha imbalance."
    },
    doses: [
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "आधा कप", en: "Half a cup" } }
    ],
    ingredients: {
      hi: ['10-12 तुलसी पत्ते', '1 इंच अदरक', '2 काली मिर्च'],
      en: ['10-12 Tulsi leaves', '1 inch ginger', '2 black pepper']
    },
    preparation: {
      hi: 'पानी में उबालकर छान लें।',
      en: 'Boil in water and strain.'
    },
    usage: {
      hi: 'दिन में दो-तीन बार पिएं।',
      en: 'Drink 2-3 times daily.'
    },
    dietEat: { hi: 'खिचड़ी और ताजे फल।', en: 'Khichdi and fresh fruits.' },
    dietAvoid: { hi: 'दही और ठंडी ड्रिंक्स।', en: 'Curd and cold drinks.' },
    strictAvoid: { hi: 'नंगे पैर चलना।', en: 'Walking barefoot.' },
    routine: {
      morning: { hi: 'सुबह: गुनगुना पानी।', en: 'Morning: Lukewarm water.' },
      afternoon: { hi: 'दोपहर: हल्का भोजन।', en: 'Afternoon: Light meal.' },
      evening: { hi: 'शाम: हल्का डिनर।', en: 'Evening: Light dinner.' }
    },
    safetyAdvice: { hi: 'सिरदर्द हो तो भाप लें।', en: 'Take steam if headache persists.' },
    disclaimer: GENERAL_DISCLAIMER,
    keywords: ["sardi jukam ka gharelu ilaj", "cold and cough tea", "tulsi adrak ki chai", "sardi ki dawa", "gale me kharas", "तुलसी अदरक चाय", "सर्दी जुकाम"]
  }
];
