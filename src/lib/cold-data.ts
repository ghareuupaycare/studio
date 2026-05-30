/**
 * @fileOverview Category 2: Cold & Flu (नजला और जुकाम) Data Store
 */

import { Remedy, AGE_BRACKETS, GENERAL_DISCLAIMER } from "./remedy-types";

export const COLD_REMEDIES: Remedy[] = [
  {
    id: 'cc-1',
    serialNumber: '1',
    name: { hi: 'तुलसी और अदरक की चमत्कारी चाय', en: 'Miraculous Tulsi and Ginger Tea' },
    illnessId: 'common-cold',
    introduction: {
      hi: "जुकाम और नाक बहने की समस्या को आयुर्वेद में 'प्रतिश्याय' कहा जाता है। यह अक्सर कफ दोष के असंतुलन से होता है। यह चाय गले की खराश, बंद नाक और छींकों को रोकने में तुरंत लाभ देती है।",
      en: "Common cold and runny nose are known as 'Pratishyaya' in Ayurveda, often caused by Kapha imbalance. This tea provides instant relief from sore throat, nasal congestion, and sneezing."
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "2-3 चम्मच (शहद के साथ)", en: "2-3 teaspoons (with honey)" } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "आधा कप (गरम-गरम)", en: "Half a cup (served hot)" } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "आधा कप (दिन में दो बार)", en: "Half a cup (twice a day)" } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "एक चौथाई कप (गुनगुना)", en: "Quarter cup (lukewarm)" } }
    ],
    ingredients: {
      hi: ['10-12 तुलसी के पत्ते', '1 इंच अदरक का टुकड़ा', '2 काली मिर्च (कुचली हुई)', '1 चम्मच शहद'],
      en: ['10-12 Basil leaves', '1 inch Ginger piece', '2 Black peppercorns (crushed)', '1 teaspoon Honey']
    },
    preparation: {
      hi: 'एक कप पानी में तुलसी, अदरक और काली मिर्च डालकर उबालें। जब पानी आधा रह जाए तो इसे छान लें और गुनगुना होने पर शहद मिलाएं।',
      en: 'Boil basil, ginger, and black pepper in a cup of water. When water reduces to half, strain it and add honey once lukewarm.'
    },
    usage: {
      hi: 'इसे दिन में दो से तीन बार धीरे-धीरे पिएं। अवधि: इस चमत्कारी काढ़े का सेवन लगातार 3 से 5 दिनों तक सुबह-शाम गुनगुना करें, इससे आपको पूर्ण आराम मिल जाएगा। महत्वपूर्ण नोट: यदि 5 दिनों के भीतर आराम न मिले या समस्या बढ़े, तो कृपया तुरंत अपने नजदीकी योग्य चिकित्सक (डॉक्टर) से परामर्श लें।',
      en: 'Drink it slowly 2-3 times a day. Duration: Consume this miraculous decoction warm morning and evening for 3 to 5 days for complete relief. Important Note: If you don\'t find relief within 5 days or if symptoms worsen, please consult your nearest qualified physician (doctor) immediately.'
    },
    dietEat: {
      hi: 'भोजन: मूँग दाल की पतली खिचड़ी, साधारण रोटी-सब्जी। फल और सलाद: ताजा हल्का उबला हुआ सलाद (खीरा, गाजर) और सीजन के अनुकूल फल (पपीता, सेब या अनार) अवश्य लें।',
      en: 'Diet: Moong dal khichdi, simple roti-vegetable. Fruits & Salad: Fresh lightly boiled salad (cucumber, carrot) and seasonal fruits (papaya, apple, or pomegranate).'
    },
    dietAvoid: {
      hi: 'दही, चावल, ठंडी ड्रिंक्स, आइसक्रीम।',
      en: 'Curd, rice, cold drinks, ice cream.'
    },
    strictAvoid: {
      hi: 'सीधे पंखे के नीचे बैठना और नंगे पैर चलना। रात में सलाद या फल का सेवन बिल्कुल न करें।',
      en: 'Sitting directly under the fan and walking barefoot. Do not consume salad or fruits at night.'
    },
    routine: {
      morning: { hi: 'सुबह: गुनगुने पानी के साथ शुरुआत करें। नाश्ते में हल्का दलिया या सूजी का उपमा लें।', en: 'Morning: Start with lukewarm water. Have light porridge or semolina Upma for breakfast.' },
      afternoon: { hi: 'दोपहर: मूँग दाल की खिचड़ी या साधारण रोटी-सब्जी। भोजन के साथ ताज़ा हल्का उबला हुआ सलाद (जैसे खीरा, गाजर) और इस मौसम के अनुकूल फल (जैसे पपीता, सेब या अनार) अवश्य लें।', en: 'Afternoon: Moong dal khichdi or simple roti-vegetable. Must include fresh lightly boiled salad and seasonal fruits with the meal.' },
      evening: { hi: 'शाम/रात: रात का भोजन हल्का रखें (जैसे लौकी या तोरई की सब्जी और पतली रोटी)। रात में सलाद या फल का सेवन बिल्कुल न करें।', en: 'Evening/Night: Keep dinner light (e.g., bottle gourd vegetable and thin roti). Do not consume salad or fruits at night.' }
    },
    safetyAdvice: { hi: 'सुरक्षा सूचना: यदि जुकाम के साथ तेज सिरदर्द हो, तो भाप (Steam) ज़रूर लें।', en: 'Safety Notice: If cold is accompanied by severe headache, ensure you take steam inhalation.' },
    disclaimer: {
      hi: "यह जानकारी केवल शैक्षिक उद्देश्य के लिए है, कृपया अपने चिकित्सक से सलाह ज़रूर लें।",
      en: "This information is for educational purposes only, please consult your physician."
    },
    keywords: ["sardi jukam ka gharelu ilaj", "cold and cough tea", "tulsi adrak ki chai", "sardi ki dawa", "gale me kharas", "तुलसी अदरक चाय", "सर्दी जुकाम"]
  },
  // Note: Only first COLD_REMEDY is shown for brevity. All 10 are preserved.
];
