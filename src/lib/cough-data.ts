import { Remedy, AGE_BRACKETS, GENERAL_DISCLAIMER } from "./remedy-types";

export const COUGH_REMEDIES: Remedy[] = [
  {
    id: "cough_remedy_1",
    serialNumber: "1",
    name: {
      hi: "सूखी खांसी के लिए शहद और काली मिर्च का अचूक चाटन",
      en: "Honey and Black Pepper Absolute Paste for Dry Cough"
    },
    illnessId: "cough",
    introduction: {
      hi: [
        "सूखी खांसी होने पर फेफड़ों और श्वास नली में रूखापन बढ़ जाता है, जिससे गले में हर वक्त एक तीखी धसका या खराश बनी रहती हैं।",
        "इसमें बलगम नहीं निकलता, बल्कि खांसते-खांसते छाती, पसलियों और पेट की मांसपेशियों में तेज दर्द होने लगता है।",
        "रात के समय सोते समय खांसी का वेग इतना बढ़ जाता है कि पीड़ित व्यक्ति की नींद पूरी तरह खराब हो जाती है।",
        "शुद्ध शहद का गाढ़ापन गले की छिली हुई नली पर एक सुरक्षा कवच बनाता है और भुनी हुई काली मिर्च अपने तीखे गुणों से श्वास नली के इन्फेक्शन और सूजन को शांत करती हैं।",
        "यह दिव्य चाटन सूखी खांसी की सबसे सरल, स्वादिष्ट और तुरंत असर दिखाने वाली अचूक घरेलू दवा है।"
      ],
      en: [
        "When a dry cough occurs, dryness increases in the lungs and respiratory tract, leading to a constant sharp tickle or irritation in the throat.",
        "No mucus is expelled in this condition; instead, continuous coughing leads to severe pain in the chest, ribs, and abdominal muscles.",
        "During the night while sleeping, the intensity of the cough increases so much that it completely disrupts the patient's sleep.",
        "The thickness of pure honey forms a protective shield over the raw lining of the throat, while roasted black pepper, with its pungent properties, calms infection and inflammation in the respiratory tract.",
        "This divine paste is the simplest, most delicious, and instantly effective absolute home remedy for a dry cough."
      ]
    },
    doses: [
      {
        ageRange: AGE_BRACKETS.childhood,
        dose: {
          hi: "तैयार किए गए चाटन में से केवल आधा छोटा चम्मच बच्चे को उंगली से धीरे-धीरे चटाएं।",
          en: "Lick only half a teaspoon of the prepared paste slowly with a finger for the child."
        }
      },
      {
        ageRange: AGE_BRACKETS.youth,
        dose: {
          hi: "1 पूरा छोटा चम्मच भरकर तैयार किया गया चाटन लें और इसे दिन में 3 बार धीरे-धीरे रस निगलें।",
          en: "Take 1 full teaspoon 3 times a day, swallowing the juice slowly."
        }
      },
      {
        ageRange: AGE_BRACKETS.middleAge,
        dose: {
          hi: "1 पूरा छोटा चम्मच तैयार चाटन लें, यह खुश्की दूर करने में मददगार है।",
          en: "Take 1 full teaspoon; it is helpful in removing dryness."
        }
      },
      {
        ageRange: AGE_BRACKETS.oldAge,
        dose: {
          hi: "1 छोटा चम्मच चाटन (काली मिर्च की मात्रा कम रखें)।",
          en: "Take 1 teaspoon (keep black pepper minimal)."
        }
      }
    ],
    ingredients: {
      hi: ["शुद्ध शहद — 1 चम्मच", "काली मिर्च चूर्ण — 2-3 चुटकी"],
      en: ["Pure Honey — 1 tsp", "Black Pepper Powder — 2-3 pinches"]
    },
    preparation: {
      hi: ["काली मिर्च भूनकर पीस लें।", "शहद में मिलाकर चाटन बनाएं।"],
      en: ["Roast and grind black pepper.", "Mix with honey to form a paste."]
    },
    usage: {
      hi: ["दिन में 2-3 बार धीरे-धीरे चाटें।", "3-5 दिनों तक नियमित लें।"],
      en: ["Lick slowly 2-3 times daily.", "Take regularly for 3-5 days."]
    },
    dietEat: {
      hi: ["खिचड़ी, दलिया और गुनगुना पानी।", "गरम सूप।"],
      en: ["Khichdi, porridge and lukewarm water.", "Warm soup."]
    },
    dietAvoid: {
      hi: ["ठंडी चीजें और तली-भुनी चीजें।", "बासी भोजन।"],
      en: ["Cold items and fried food.", "Stale food."]
    },
    strictAvoid: {
      hi: "कोल्ड ड्रिंक और फ्रिज का पानी।",
      en: "Cold drinks and chilled water."
    },
    routine: {
      morning: { hi: ["सुबह गुनगुना पानी पिएं।"], en: ["Drink lukewarm water in the morning."] },
      afternoon: { hi: ["सीधी ठंडी हवा से बचें।"], en: ["Avoid direct cold air."] },
      evening: { hi: ["गले को ढककर रखें।"], en: ["Keep throat covered."] }
    },
    safetyAdvice: {
      hi: ["बुखार या खून आने पर डॉक्टर से मिलें।"],
      en: ["Consult doctor if fever or blood occurs."]
    },
    disclaimer: GENERAL_DISCLAIMER,
    keywords: ["khansi का इलाज", "sukhi khansi", "dry cough", "honey pepper", "शहद काली मिर्च"]
  },
  {
    id: "cough_remedy_2",
    serialNumber: "2",
    name: {
      hi: "सूखी खांसी और गले की खुश्की के लिए मुलेठी एवं इलायची का दिव्य चूर्ण",
      en: "Mulethi and Cardamom Divine Powder for Dry Cough"
    },
    illnessId: "cough",
    introduction: {
      hi: [
        "सूखी खांसी में जब गले की नली सूख जाती है, तो मुलेठी उसे तर रखने में श्रेष्ठ है।",
        "इलायची सूजन शांत करती है और मिश्री फेफड़ों को ताकत देती है।"
      ],
      en: [
        "Mulethi is best for moisturizing the throat during dry cough.",
        "Cardamom reduces inflammation and rock candy strengthens lungs."
      ]
    },
    doses: [
      {
        ageRange: AGE_BRACKETS.youth,
        dose: {
          hi: "1 चम्मच चूर्ण दिन में 3 बार चूसें।",
          en: "Suck 1 tsp powder 3 times daily."
        }
      }
    ],
    ingredients: {
      hi: ["मुलेठी चूर्ण — 2 चम्मच", "इलायची चूर्ण — आधा चम्मच", "मिश्री चूर्ण — 2 चम्मच"],
      en: ["Mulethi powder — 2 tsp", "Cardamom powder — 1/2 tsp", "Rock candy powder — 2 tsp"]
    },
    preparation: {
      hi: ["सभी चूर्ण को आपस में मिला लें।"],
      en: ["Mix all powders together."]
    },
    usage: {
      hi: ["दिन में 3 बार धीरे-धीरे लार के साथ चूसें।"],
      en: ["Suck slowly with saliva 3 times a day."]
    },
    dietEat: { hi: ["साबूदाना खिचड़ी और गरम सूप।"], en: ["Sago khichdi and warm soup."] },
    dietAvoid: { hi: ["रूखी चीजें जैसे टोस्ट या बिस्कुट।"], en: ["Dry items like toast or biscuits."] },
    strictAvoid: { hi: "खट्टी चीजें और ठंडी ड्रिंक्स।", en: "Sour items and cold drinks." },
    routine: {
      morning: { hi: ["पैरों में चप्पल पहनें।"], en: ["Wear slippers."] },
      afternoon: { hi: ["गुनगुने पानी का प्रयोग करें।"], en: ["Use lukewarm water."] },
      evening: { hi: ["ठंडी हवा से बचें।"], en: ["Avoid cold air."] }
    },
    safetyAdvice: { hi: ["राहत न मिले तो डॉक्टर से मिलें।"], en: ["Consult doctor if no relief."] },
    disclaimer: GENERAL_DISCLAIMER,
    keywords: ["mulethi powder", "dry cough", "इलायची", "मुलेठी"]
  }
];
