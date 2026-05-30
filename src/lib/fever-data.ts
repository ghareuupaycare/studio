import { Remedy, AGE_BRACKETS, GENERAL_DISCLAIMER } from "./remedy-types";

export const FEVER_REMEDIES: Remedy[] = [
  {
    id: 'gf-1',
    serialNumber: '1',
    name: { hi: 'तुलसी और गिलोय का दिव्य अमृत काढ़ा', en: 'Divine Amrit Decoction of Tulsi and Giloy' },
    illnessId: 'general-fever',
    introduction: {
      hi: "जब शरीर का तापमान सामान्य से अधिक हो जाता है, तो उसे सामान्य बुखार कहते हैं। आयुर्वेद में इसे 'ज्वर' कहा जाता है। यह तुलसी और गिलोय का मिश्रण एक शक्तिशाली वायरस नाशक है।",
      en: "General fever, known as 'Jvara' in Ayurveda. This Tulsi-Giloy brew is a powerful natural defense that activates the immune system."
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "5 से 10 मिलीलीटर (शहद के साथ)", en: "5 to 10 ml (with honey)" } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "20 से 30 मिलीलीटर (गुनगुना)", en: "20 to 30 ml (lukewarm)" } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "15 से 20 मिलीलीटर", en: "15 to 20 ml" } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "10 से 15 मिलीलीटर", en: "10 to 15 ml" } }
    ],
    ingredients: {
      hi: ['7-8 ताजी तुलसी की पत्तियां', '3-4 इंच गिलोय की डंडी', '2-3 साबुत काली मिर्च', '1 छोटा टुकड़ा अदरक', '2 कप पानी'],
      en: ['7-8 Tulsi leaves', '3-4 inch Giloy stick', '2-3 Black peppercorns', '1 piece ginger', '2 cups water']
    },
    preparation: {
      hi: 'दो कप पानी में सामग्री डालकर तब तक उबालें जब तक आधा कप न रह जाए।',
      en: 'Boil ingredients in two cups of water until it reduces to half a cup.'
    },
    usage: {
      hi: 'इसे हल्का गुनगुना सुबह और शाम पिएं।',
      en: 'Drink it lukewarm morning and evening.'
    },
    dietEat: {
      hi: 'मूँग दाल की खिचड़ी, दलिया और गुनगुना पानी।',
      en: 'Moong dal khichdi, porridge and lukewarm water.'
    },
    dietAvoid: {
      hi: 'ठंडा पानी, भारी खाना और तली-भुनी चीजें।',
      en: 'Cold water, heavy meals and fried food.'
    },
    strictAvoid: {
      hi: 'कोल्ड ड्रिंक्स, आइसक्रीम और खट्टी चीजें।',
      en: 'Cold drinks, ice cream and sour items.'
    },
    routine: {
      morning: { hi: 'सुबह: गुनगुना पानी और हल्का नाश्ता।', en: 'Morning: Lukewarm water and light breakfast.' },
      afternoon: { hi: 'दोपहर: मूँग दाल की खिचड़ी।', en: 'Afternoon: Moong dal khichdi.' },
      evening: { hi: 'शाम: सब्जियों का सूप और जल्दी डिनर।', en: 'Evening: Vegetable soup and early dinner.' }
    },
    safetyAdvice: { hi: 'यदि बुखार 102 से अधिक हो, तो डॉक्टर से मिलें।', en: 'If fever exceeds 102, consult a doctor.' },
    disclaimer: GENERAL_DISCLAIMER,
    keywords: ["bukhar ka gharelu ilaj", "fever home remedy", "tulsi aur giloy ka kadha", "giloy kwath", "viral fever dawa", "बुखार का इलाज", "गिलोय", "तुलसी"]
  },
  {
    id: 'gf-2',
    serialNumber: '2',
    name: { hi: 'अदरक और धनिए के बीजों का पाचक पानी', en: 'Digestive Water of Ginger and Coriander Seeds' },
    illnessId: 'general-fever',
    introduction: {
      hi: "बुखार में पाचन अग्नि मंद हो जाती है। यह पानी चयापचय प्रक्रिया को सक्रिय करता है।",
      en: "Digestion weakens during fever. This water activates the metabolism."
    },
    doses: [
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "50-60 मिलीलीटर", en: "50-60 ml" } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "50-60 मिलीलीटर", en: "50-60 ml" } }
    ],
    ingredients: {
      hi: ['1 चम्मच धनिए के बीज', 'आधा इंच अदरक', '2 कप पानी'],
      en: ['1 tbsp coriander seeds', '1/2 inch ginger', '2 cups water']
    },
    preparation: {
      hi: 'पानी में सामग्री उबालकर आधा करें।',
      en: 'Boil ingredients in water until reduced to half.'
    },
    usage: {
      hi: 'दिन में तीन बार भोजन से पहले पिएं।',
      en: 'Drink thrice daily before meals.'
    },
    dietEat: { hi: 'मूँग दाल का पानी और उबली सब्जियां।', en: 'Moong dal water and boiled vegetables.' },
    dietAvoid: { hi: 'दूध और भारी मिठाइयां।', en: 'Milk and heavy sweets.' },
    strictAvoid: { hi: 'खट्टी चीजें और अचार।', en: 'Sour items and pickles.' },
    routine: {
      morning: { hi: 'सुबह: हल्का नाश्ता।', en: 'Morning: Light breakfast.' },
      afternoon: { hi: 'दोपहर: दाल और रोटी।', en: 'Afternoon: Dal and roti.' },
      evening: { hi: 'शाम: हल्का सूप।', en: 'Evening: Light soup.' }
    },
    safetyAdvice: { hi: 'उल्टियां होने पर डॉक्टर से मिलें।', en: 'Consult doctor if vomiting occurs.' },
    disclaimer: GENERAL_DISCLAIMER,
    keywords: ["bukhar me dhaniya ka pani", "adrak aur dhaniya", "fever digestion remedy", "dhaniya ke beej", "halka bukhar ka upay", "धनिए का पानी", "अदरक"]
  }
];
