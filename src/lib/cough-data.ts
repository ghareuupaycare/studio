/**
 * @fileOverview Category 3: Dry & Productive Cough (सूखी एवं बलगम वाली खांसी) Data Store
 */

import { Remedy, AGE_BRACKETS } from "./remedy-data";

export const COUGH_REMEDIES: Remedy[] = [
  {
    id: "cough_remedy_1",
    serialNumber: "1",
    name: {
      hi: "1. सूखी खांसी के लिए शहद और काली मिर्च का अचूक चाटन",
      en: "1. Honey and Black Pepper Absolute Paste for Dry Cough"
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
          hi: "तैयार किए गए चाटन में से केवल आधा छोटा चम्मच (मात्रा आधी रखें) ही बच्चे को उंगली से धीरे-धीरे चटाएं।",
          en: "Lick only half a teaspoon (keep the quantity halved) of the prepared paste slowly with a finger for the child."
        }
      },
      {
        ageRange: AGE_BRACKETS.youth,
        dose: {
          hi: "1 पूरा छोटा चम्मच भरकर तैयार किया गया चाटन लें और इसे दिन में 3 बार धीरे-धीरे निगलें।",
          en: "Take 1 full teaspoon of the prepared paste 3 times a day, keeping it in the mouth to swallow the juice slowly."
        }
      },
      {
        ageRange: AGE_BRACKETS.middleAge,
        dose: {
          hi: "1 पूरा छोटा चम्मच तैयार चाटन लें, यह कमज़ोर फेफड़ों की खुश्की को दूर करने में मददगार है।",
          en: "Take 1 full teaspoon of the prepared paste; it is extremely helpful in removing dryness from weak lungs."
        }
      },
      {
        ageRange: AGE_BRACKETS.oldAge,
        dose: {
          hi: "1 छोटा चम्मच चाटन (काली मिर्च की मात्रा सिर्फ 1 से 2 चुटकी ही रखें ताकि जलन न हो)।",
          en: "Take 1 teaspoon of the paste (keep the quantity of black pepper to just 1 or 2 pinches so that it doesn't cause burning or heat in the stomach of the elderly)."
        }
      }
    ],
    ingredients: {
      hi: [
        "शुद्ध प्राकृतिक शहद — 1 छोटा चम्मच",
        "काली मिर्च (मरीच) का बारीक चूर्ण — 2 से 3 चुटकी",
        "नोट: काली मिर्च को ताजा पीसकर ही इस्तेमाल करें। ऊपर 'स्मार्ट खुराक' बटन से अपनी उम्र अनुसार मात्रा लें।"
      ],
      en: [
        "Pure Natural Honey — 1 teaspoon",
        "Fine Powder of Black Pepper (Marich) — 2 to 3 pinches",
        "Note: Use freshly ground black pepper. Extract only the exact quantity for your age group above."
      ]
    },
    preparation: {
      hi: [
        "साफ काली मिर्च को तवे पर धीमी आंच पर सूखा ही हल्का सा भून लें।",
        "इसे इमामदस्ते में कूटकर कपड़े से छानकर एकदम बारीक महीन चूर्ण तैयार कर लें।",
        "एक साफ कटोरी में 1 छोटा चम्मच शुद्ध शहद निकालें।",
        "इसमें 2 से 3 चुटकी काली मिर्च का चूर्ण डालकर उंगली से अच्छी तरह मिला लें।"
      ],
      en: [
        "First, gently dry-roast black pepper seeds on a pan over low heat.",
        "Grind thoroughly and strain to prepare an exceptionally fine powder.",
        "Take 1 teaspoon of pure honey in a clean small bowl.",
        "Add 2 to 3 pinches of black pepper powder and mix thoroughly to form a thick paste."
      ]
    },
    usage: {
      hi: [
        "इस तैयार चाटन को उम्र के अनुसार निकालें और उंगली से धीरे-धीरे चटाकर खाएं।",
        "इसे दिन में 2 से 3 बार (सुबह खाली पेट, दोपहर में और रात को सोने से ठीक पहले) लें।",
        "लगातार 3 से 5 दिनों तक करें। दवा लेने के बाद आधे घंटे तक पानी न पिएं।"
      ],
      en: [
        "Lick the prescribed quantity slowly with a finger; do not swallow all at once.",
        "Take 2 to 3 times a day (morning empty stomach, afternoon, and before bed).",
        "Use regularly for 3 to 5 consecutive days. Do not drink water for 30 minutes after."
      ]
    },
    dietEat: {
      hi: [
        "सुपाच्य और गुनगुना भोजन जैसे—मूंग की पतली खिचड़ी, गरम दलिया या कद्दू का सूप।",
        "गरमा-गरम गेहूं की ताजी रोटी पर थोड़ा सा शुद्ध देसी घी लगाकर खाएं।",
        "मुनक्के को तवे पर हल्का गर्म करके खाएं, यह सूखी खांसी में फायदेमंद है।",
        "पीने के लिए हमेशा हल्का गुनगुना पानी ही इस्तेमाल करें और गरारे ज़रूर करें।"
      ],
      en: [
        "Consume easily digestible food like thin moong dal khichdi, warm porridge, or pumpkin soup.",
        "Eat fresh hot wheat roti with pure desi ghee to maintain throat moisture.",
        "Eat raisins or Munakka after warming them slightly on a pan.",
        "Always use slightly lukewarm water and make sure to gargle with rock salt."
      ]
    },
    dietAvoid: {
      hi: [
        "बाजार के तले-भुने चिप्स, कुरकुरे, बिस्कुट और डिब्बाबंद जूस (ये गले में धसका बढ़ाते हैं)।",
        "भारी भोजन, तेल-मसाले वाला तीखा खाना, समोसा, चाउमीन, बासी भोजन बिल्कुल न खाएं।",
        "भारी प्रोटीन, मांसाहार, अंडा, पनीर और भारी तली-भुनी पूरियां बिल्कुल न खाएं।"
      ],
      en: [
        "Completely avoid packaged foods, chips, refined flour biscuits, and canned juices.",
        "Do not eat heavy meals, highly spiced food, samosas, or stale food.",
        "Strictly avoid heavy proteins, non-veg, eggs, and deep-fried items."
      ]
    },
    strictAvoid: {
      hi: "ठंडी चीजें, फ्रिज का पानी, कोल्ड ड्रिंक, आइसक्रीम, खट्टे फल और दही पूरी तरह वर्जित हैं।",
      en: "Cold items, chilled refrigerator water, cold drinks, ice cream, sour fruits, and curd are strictly prohibited."
    },
    routine: {
      morning: { hi: ["सुबह गुनगुना पानी पिएं और 10-15 मिनट ताजी धूप में बैठें।"], en: ["Drink lukewarm water and sit in sunlight for 10-15 minutes."] },
      afternoon: { hi: ["दोपहर में कूलर या एसी की सीधी ठंडी हवा छाती या गले पर न लगने दें।"], en: ["Avoid direct cold air from fans or AC hitting your chest."] },
      evening: { hi: ["शाम को गले को मफलर से ढककर रखें और रात को सोते समय सिरहाने को ऊंचा रखें।"], en: ["Cover your throat with a muffler and keep head slightly elevated while sleeping."] }
    },
    safetyAdvice: {
      hi: ["यदि खांसी के साथ तेज बुखार, छाती में भयंकर दर्द या बलगम में खून दिखाई दे तो डॉक्टर से मिलें।"],
      en: ["If high fever, chest pain, or blood in mucus occurs, consult a doctor immediately."]
    },
    disclaimer: {
      hi: "यह जानकारी केवल शैक्षिक उद्देश्य के लिए है, कृपया अपने चिकित्सक से सलाह जरूर लें।",
      en: "This information is for educational purposes only, please consult your physician for advice."
    },
    keywords: ["khansi ka gharelu ilaj", "sukhi khansi", "dry cough", "shahad aur kali mirch"]
  },
  {
    id: "cough_remedy_2",
    serialNumber: "2",
    name: {
      hi: "2. सूखी खांसी और गले की खुश्की के लिए मुलेठी एवं इलायची का दिव्य चूर्ण",
      en: "2. Mulethi and Cardamom Divine Powder for Dry Cough"
    },
    illnessId: "cough",
    introduction: {
      hi: [
        "सूखी खांसी में जब गले की नली पूरी तरह सूख जाती है, तो बार-बार खांसने से गले के अंदर छिलन होने लगती है।",
        "मुलेठी आयुर्वेद में गले को तर (Moist) रखने में सबसे बेस्ट मानी जाती है।",
        "छोटी इलायची गले की सूजन और छाती की जकड़न को शांत करती है, जिससे धसका उठना तुरंत बंद होता है।",
        "मिश्री के योग से यह चूर्ण फेफड़ों को ताकत देता है और छाती के दर्द को मिटाता है।"
      ],
      en: [
        "In dry cough, continuous coughing causes raw irritation inside the dry throat.",
        "Mulethi is the best Ayurvedic herb for keeping the throat lubricated.",
        "Green Cardamom seeds soothe throat inflammation and chest congestion.",
        "The addition of Rock Candy (Mishri) provides strength to the lungs."
      ]
    },
    doses: [
      {
        ageRange: AGE_BRACKETS.childhood,
        dose: {
          hi: "आधा छोटा चम्मच चूर्ण शहद या गुनगुने पानी के साथ बच्चे को दें।",
          en: "Give only half a teaspoon of this prepared powder to the child with honey."
        }
      },
      {
        ageRange: AGE_BRACKETS.youth,
        dose: {
          hi: "1 पूरा छोटा चम्मच चूर्ण दिन में 3 बार धीरे-धीरे चूसें या गुनगुने पानी से लें।",
          en: "Take 1 full teaspoon 3 times a day; keep in mouth to suck slowly."
        }
      },
      {
        ageRange: AGE_BRACKETS.middleAge,
        dose: {
          hi: "1 पूरा छोटा चम्मच चूर्ण दिन में 3 बार लें, यह खुश्की को जल्दी ठीक करता है।",
          en: "Take 1 full teaspoon 3 times a day to relieve respiratory dryness."
        }
      },
      {
        ageRange: AGE_BRACKETS.oldAge,
        dose: {
          hi: "1 पूरा छोटा चम्मच चूर्ण लें (शुगर होने पर मिश्री न मिलाएं)।",
          en: "Take 1 full teaspoon (Omit sugar candy if elderly has diabetes)."
        }
      }
    ],
    ingredients: {
      hi: ["मुलेठी का शुद्ध चूर्ण — 2 चम्मच", "छोटी इलायची दाना चूर्ण — आधा चम्मच", "धागे वाली मिश्री चूर्ण — 2 चम्मच"],
      en: ["Pure Mulethi Powder — 2 tsp", "Green Cardamom Seed Powder — 1/2 tsp", "Thread Rock Candy Powder — 2 tsp"]
    },
    preparation: {
      hi: ["मुलेठी और छोटी इलायची के दानों को बारीक कूटकर पाउडर बना लें।", "धागे वाली मिश्री को पीसकर महीन चूर्ण बना लें।", "तीनों चूर्ण को आपस में बहुत अच्छी तरह मिलाकर कांच की शीशी में भर लें।"],
      en: ["Grind Mulethi and cardamom seeds into fine powder.", "Grind rock candy (Mishri) into a fine powder.", "Mix all three and store in a dry glass jar."]
    },
    usage: {
      hi: ["तैयार चूर्ण को उम्र अनुसार निकालें और मुंह में रखकर धीरे-धीरे लार के साथ चूसें।", "इसे दिन में 3 बार भोजन के 15 मिनट बाद (भरे पेट) ही लें।", "लगातार 5 से 7 दिनों तक करें। 45 मिनट तक पानी न पिएं।"],
      en: ["Place in mouth and suck slowly with saliva, or mix with honey.", "Take 3 times a day, 15 minutes after meals (full stomach).", "Use for 5 to 7 days. Avoid water for 45 minutes after."]
    },
    dietEat: {
      hi: ["सात्विक और गरम सुपाच्य भोजन जैसे—मूंग की दाल का सूप या उबली सब्जियां।", "दिन में प्यास लगने पर केवल हल्का गुनगुना पानी ही पिएं।", "रात को सोते समय गुनगुने दूध में आधा चम्मच गाय का घी मिलाकर पिएं।", "हल्के गरम पानी में हल्दी और सेंधा नमक मिलाकर गरारे अवश्य करें।"],
      en: ["Consume light, fresh digestible meals like moong dal soup.", "Drink only lukewarm water when thirsty during the day.", "Drink lukewarm milk with half a tsp of cow ghee at bedtime.", "Gargle with warm water, turmeric, and rock salt twice daily."]
    },
    dietAvoid: {
      hi: ["सूखी और रूखी चीजें जैसे—खारी बिस्कुट, टोस्ट, भुना चना (ये धसका पैदा करते हैं)।", "तीखे मिर्च-मसाले, गरम मसाला, अचार और रिफाइंड तेल में बनी चीजें बिल्कुल न खाएं।"],
      en: ["Do not eat dry/crunchy items like toast or roasted chickpeas.", "Stop consumption of sharp spices, pickles, and refined oils."]
    },
    strictAvoid: {
      hi: "ठंडी चीजें, फ्रिज का पानी, कोल्ड ड्रिंक, सोडा, खट्टी चीजें और रात को दही लेना सख़्त मना है।",
      en: "Cold items, chilled water, soda, sour foods, and taking curd at night are strictly prohibited."
    },
    routine: {
      morning: { hi: ["सुबह सोकर उठते ही ठंडे फर्श पर नंगे पैर न चलें, गले को ढककर रखें।"], en: ["Wear slippers and keep your throat covered properly after waking up."] },
      afternoon: { hi: ["भोजन के तुरंत बाद ठंडे पानी से हाथ-मुंह न धोएं, गुनगुने पानी का ही उपयोग करें।"], en: ["Do not wash face with cold water immediately after lunch."] },
      evening: { hi: ["शाम को ठंडी हवा में बाहर न घूमें और पंखे की सीधी हवा छाती पर न आने दें।"], en: ["Avoid cold air after sunset and direct fan drafts on chest."] }
    },
    safetyAdvice: {
      hi: ["यदि 4-5 दिन लगातार आजमाने के बाद भी राहत न मिले तो डॉक्टर या वैद्य से सलाह लें।"],
      en: ["If you do not see relief after 4-5 days, consult a doctor or traditional Vaidya."]
    },
    disclaimer: {
      hi: "यह जानकारी केवल शैक्षिक उद्देश्य के लिए है, कृपया अपने चिकित्सक से सलाह जरूर लें।",
      en: "This information is for educational purposes only, please consult your physician for advice."
    },
    keywords: ["khansi", "mulethi powder", "dry cough", "sukhi khansi"]
  }
];
