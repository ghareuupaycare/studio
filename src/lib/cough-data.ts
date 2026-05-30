/**
 * @fileOverview Category 3: Dry & Productive Cough (सूखी एवं बलगम वाली खांसी) Data Store
 * Unified to match standard Remedy type and Smart Dosage UI.
 */

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
          hi: "तैयार किए गए चाटन में से केवल आधा छोटा चम्मच (मात्रा आधी रखें) ही बच्चे को उंगली से धीरे-धीरे चटाएं।",
          en: "Lick only half a teaspoon (keep the quantity halved) of the prepared paste slowly with a finger for the child."
        }
      },
      {
        ageRange: AGE_BRACKETS.youth,
        dose: {
          hi: "1 पूरा छोटा चम्मच भरकर तैयार किया गया चाटन लें और इसे दिन में 3 बार मुंह में रखकर धीरे-धीरे रस निगलें।",
          en: "Take 1 full teaspoon of the prepared paste 3 times a day, keeping it in the mouth to swallow the juice slowly."
        }
      },
      {
        ageRange: AGE_BRACKETS.middleAge,
        dose: {
          hi: "1 पूरा छोटा चम्मच तैयार चाटन लें, यह कमज़ोर फेफड़ों की खुश्की को दूर करने में बेहद मददगार है।",
          en: "Take 1 full teaspoon of the prepared paste; it is extremely helpful in removing dryness from weak lungs."
        }
      },
      {
        ageRange: AGE_BRACKETS.oldAge,
        dose: {
          hi: "1 छोटा चम्मच चाटन (काली मिर्च की मात्रा सिर्फ 1 से 2 चुटकी ही रखें ताकि बुजुर्गों के पेट में जलन या गर्मी न हो)।",
          en: "Take 1 teaspoon of the paste (keep the quantity of black pepper to just 1 or 2 pinches so that it doesn't cause burning or heat in the stomach of the elderly)."
        }
      }
    ],
    ingredients: {
      hi: [
        "शुद्ध प्राकृतिक शहद — 1 छोटा चम्मच",
        "काली मिर्च (मरीच) का बारीक चूर्ण — 2 से 3 चुटकी",
        "जरूरी नोट: काली मिर्च को ताजा पीसकर ही इस्तेमाल करें ताकि उसका असर पूरा मिले।"
      ],
      en: [
        "Pure Natural Honey — 1 teaspoon",
        "Fine Powder of Black Pepper (Marich) — 2 to 3 pinches",
        "Important Note: Use freshly ground black pepper to ensure its full effect."
      ]
    },
    preparation: {
      hi: [
        "सबसे पहले साफ और अच्छी क्वालिटी के काली मिर्च के दानों को तवे पर धीमी आंच पर सूखा ही हल्का सा भून लें।",
        "भुनी हुई काली मिर्च को इमामदस्ते में डालकर अच्छी तरह कूट लें और कपड़े से छानकर एकदम बारीक महीन चूर्ण तैयार कर लें।",
        "एक साफ छोटी कटोरी में 1 छोटा चम्मच शुद्ध शहद निकालें।",
        "शहद में 2 से 3 चुटकी तैयार काली मिर्च का चूर्ण डालें और उंगली की मदद से दोनों को अच्छी तरह मिला लें।"
      ],
      en: [
        "First, gently dry-roast clean black pepper seeds on a pan over low heat.",
        "Put the roasted black pepper into a mortar, grind it thoroughly, and strain it through a cloth.",
        "Take 1 teaspoon of pure honey in a clean small bowl.",
        "Add 2 to 3 pinches of the prepared black pepper powder to the honey and mix thoroughly."
      ]
    },
    usage: {
      hi: [
        "विधि: इस तैयार चाटन को अपनी उम्र के अनुसार बताई गई मात्रा में निकालें और उंगली से धीरे-धीरे चटाकर खाएं।",
        "समय: इसे दिन में 2 से 3 बार (सुबह खाली पेट, दोपहर में और रात को सोने से ठीक पहले) धीरे-धीरे लें।",
        "अवधि: इसका नियमित सेवन लगातार 3 से 5 दिनों तक करें। दवा लेने के बाद आधे घंटे तक पानी न पिएं।"
      ],
      en: [
        "Method: Extract the prepared paste according to your age group dose and lick it slowly with a finger.",
        "Time: Take it 2 to 3 times a day (morning empty stomach, afternoon, and right before bed).",
        "Duration: Use regularly for 3 to 5 consecutive days. Do not drink water for 30 minutes after."
      ]
    },
    dietEat: {
      hi: [
        "भोजन: सुपाच्य और गुनगुना भोजन लें जैसे—मूंग की पतली खिचड़ी, गरम दलिया या कद्दू का गरमा-गरम सूप।",
        "रोटी: गरमा-गरम गेहूं की ताजी रोटी पर थोड़ा सा शुद्ध देसी घी लगाकर खाएं ताकि गले में तरी बनी रहे।",
        "फल: कशमिश या मुनक्के को तवे पर हल्का गर्म करके खाएं, यह सूखी खांसी में बहुत फायदेमंद होता है।",
        "पानी: पीने के लिए हमेशा हल्का गुनगुना पानी ही इस्तेमाल करें और गरारे ज़रूर करें।"
      ],
      en: [
        "Meals: Consume easily digestible and warm food like thin moong dal khichdi or pumpkin soup.",
        "Roti: Eat fresh hot wheat roti with pure desi ghee applied to maintain throat moisture.",
        "Fruits: Eat raisins or Munakka after warming them slightly on a pan.",
        "Water: Always use slightly lukewarm water for drinking and gargling."
      ]
    },
    dietAvoid: {
      hi: [
        "पैकेट वाले फूड्स, बाजार के तले-भुने चिप्स, कुरकुरे, मैदे वाले बिस्कुट, और डिब्बाबंद जूस पूरी तरह बंद रखें।",
        "भारी भोजन, बहुत ज्यादा तेल-मसाले वाला तीखा खाना, समोसा, चाउमीन, बासी भोजन बिल्कुल न खाएं।",
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
      morning: { hi: ["सुबह उठकर गुनगुना पानी पिएं और 10-15 मिनट ताजी धूप में बैठें।"], en: ["Drink lukewarm water and sit in sunlight for 10-15 minutes."] },
      afternoon: { hi: ["दोपहर में कूलर या एसी की सीधी ठंडी हवा छाती या गले पर न लगने दें।"], en: ["Avoid direct cold air from fans or AC hitting your chest."] },
      evening: { hi: ["शाम को गले को मफलर से ढककर रखें और रात को सोते समय सिरहाने को ऊंचा रखें।"], en: ["Cover your throat with a muffler and keep head slightly elevated while sleeping."] }
    },
    safetyAdvice: {
      hi: ["यदि खांसी के साथ तेज बुखार आने लगे, छाती में भयंकर दर्द हो, या थूक में खून के अंश दिखाई दें, तो डॉक्टर से मिलें।"],
      en: ["If a high fever accompanies the cough, or traces of blood appear in saliva, consult a doctor."]
    },
    disclaimer: GENERAL_DISCLAIMER,
    keywords: ["khansi ka gharelu ilaj", "sukhi khansi ka ilaj", "dry cough home remedy", "shahad aur kali mirch", "खांसी का घरेलू इलाज"]
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
        "सूखी खांसी में जब गले की नली पूरी तरह सूख जाती है, तो बार-बार खांसने से गले के अंदर छिलन जैसी होने लगती है।",
        "मुलेठी आयुर्वेद की एक ऐसी जड़ी-बूटी है जो गले को तर (Moist) रखने में दुनिया में सबसे बेस्ट मानी जाती है।",
        "छोटी इलायची के दाने गले की सूजन और छाती की जकड़न को शांत करते हैं, जिससे सूखी धसका उठना तुरंत बंद होता है।",
        "मिश्री के योग से यह चूर्ण फेफड़ों को ताकत देता है और सूखी खांसी के कारण छाती के दर्द को जड़ से मिटाता है।"
      ],
      en: [
        "In dry cough, when the throat dries out completely, continuous coughing causes raw irritation.",
        "Mulethi (Licorice) is naturally sweet and considered the best for keeping the throat moist.",
        "Green Cardamom seeds effectively soothe throat inflammation and chest congestion.",
        "The addition of Rock Candy (Mishri) provides strength to the lungs and eliminates chest pain."
      ]
    },
    doses: [
      {
        ageRange: AGE_BRACKETS.childhood,
        dose: {
          hi: "आधा छोटा चम्मच (मात्रा कम रखें) शहद या गुनगुने पानी के साथ बच्चे को दें।",
          en: "Give only half a teaspoon (minimal quantity) of this powder with honey to the child."
        }
      },
      {
        ageRange: AGE_BRACKETS.youth,
        dose: {
          hi: "1 पूरा छोटा चम्मच चूर्ण दिन में 3 बार मुंह में रखकर धीरे-धीरे चूसें या गुनगुने पानी से लें।",
          en: "Take 1 full teaspoon 3 times a day; suck slowly or take with lukewarm water."
        }
      },
      {
        ageRange: AGE_BRACKETS.middleAge,
        dose: {
          hi: "1 पूरा छोटा चम्मच चूर्ण दिन में 3 बार लें, यह श्वसन नली के सूखेपन को जल्दी ठीक करता है।",
          en: "Take 1 full teaspoon 3 times a day to relieve dryness in the respiratory tract."
        }
      },
      {
        ageRange: AGE_BRACKETS.oldAge,
        dose: {
          hi: "1 पूरा छोटा चम्मच चूर्ण लें (शुगर होने पर मिश्री बिल्कुल न मिलाएं)।",
          en: "Take 1 full teaspoon (Omit Rock Candy if diabetic)."
        }
      }
    ],
    ingredients: {
      hi: ["मुलेठी का शुद्ध चूर्ण — 2 चम्मच", "छोटी इलायची के दाने का चूर्ण — आधा चम्मच", "धागे वाली मिश्री का चूर्ण — 2 चम्मच"],
      en: ["Pure Mulethi Powder — 2 tsp", "Green Cardamom Seed Powder — 1/2 tsp", "Thread Rock Candy Powder — 2 tsp"]
    },
    preparation: {
      hi: [
        "सबसे पहले मुलेठी की सूखी डंडियों को कूटकर चूर्ण बना लें या बाजार से लाया हुआ शुद्ध चूर्ण लें।",
        "हरी छोटी इलायची के छिलके उतारकर उसके दानों को एकदम बारीक कूटकर पाउडर बना लें।",
        "धागे वाली मिश्री को भी इमामदस्ते में पहले तोड़ लें और फिर मिक्सी में पीसकर महीन चूर्ण बना लें।",
        "अब एक साफ बर्तन में मुलेठी, इलायची और मिश्री के चूर्ण को आपस में बहुत अच्छी तरह मिला लें।"
      ],
      en: [
        "Grind dry Mulethi sticks or use pure store-bought powder.",
        "Peel fresh green cardamoms and crush seeds into a fine powder.",
        "Grind thread rock candy (Mishri) into a fine powder.",
        "Mix all three powders thoroughly in a clean bowl."
      ]
    },
    usage: {
      hi: [
        "विधि: इस तैयार चूर्ण को अपनी उम्र के अनुसार चम्मच में निकालें और मुंह में रखकर धीरे-धीरे लार के साथ चूसें।",
        "समय: इसे दिन में 3 बार सुबह, दोपहर और रात को भोजन के 15 मिनट बाद (भरे पेट) ही लें।",
        "अवधि: इसका नियमित सेवन लगातार 5 से 7 दिनों तक करें। 45 मिनट तक पानी न पिएं।"
      ],
      en: [
        "Method: Place the powder in your mouth and suck it slowly with saliva, or mix with honey.",
        "Time: Take 3 times a day, 15 minutes after meals (full stomach).",
        "Duration: Consume regularly for 5 to 7 days. Avoid water for 45 minutes after."
      ]
    },
    dietEat: {
      hi: [
        "भोजन: हल्का, ताजा और गरम सुपाच्य भोजन लें जैसे—साबुदाने की खिचड़ी या मूंग की दाल का सूप।",
        "दूध: रात को सोते समय एक कप गुनगुने दूध में आधा चम्मच शुद्ध गाय का घी मिलाकर पिएं।",
        "कुल्ला: हल्के गरम पानी में एक चुटकी हल्दी और सेंधा नमक मिलाकर दिन में दो बार गरारे अवश्य करें।"
      ],
      en: [
        "Meals: Consume light, fresh digestible meals such as sago khichdi or moong dal soup.",
        "Milk: Drink warm milk with half a tsp of cow ghee at bedtime.",
        "Gargle: Gargle twice daily with warm water, turmeric, and rock salt."
      ]
    },
    dietAvoid: {
      hi: [
        "सूखी और रूखी चीजें जैसे—खारी बिस्कुट, टोस्ट, भुना हुआ चना (ये धसका पैदा करते हैं)।",
        "तीखे मिर्च-मसाले, अचार और रिफाइंड तेल में बनी चीजें बिल्कुल न खाएं।"
      ],
      en: [
        "Do not eat dry/crunchy items like toast or roasted chickpeas.",
        "Stop consumption of sharp spices, pickles, and refined oils."
      ]
    },
    strictAvoid: {
      hi: "ठंडी चीजें, फ्रिज का पानी, कोल्ड ड्रिंक, सोडा, खट्टी चीजें और रात को दही लेना सख़्त मना है।",
      en: "Cold items, chilled water, soda, sour foods, and taking curd at night are strictly prohibited."
    },
    routine: {
      morning: { hi: ["सुबह सोकर उठते ही ठंडे फर्श पर नंगे पैर न चलें, पैरों में चप्पल पहनें।"], en: ["Do not walk barefoot on cold floors after waking up."] },
      afternoon: { hi: ["भोजन के तुरंत बाद ठंडे पानी से हाथ-मुंह न धोएं, गुनगुने पानी का ही उपयोग करें।"], en: ["Use only lukewarm water to wash face after lunch."] },
      evening: { hi: ["शाम ढलने के बाद ठंडी हवा में बाहर न घूमें और पंखे की सीधी हवा छाती पर न आने दें।"], en: ["Avoid cold drafts after sunset and direct fan drafts on chest."] }
    },
    safetyAdvice: {
      hi: ["यह नुस्खा बहुत सुरक्षित है, लेकिन यदि 4-5 दिन में राहत न मिले, तो डॉक्टर या वैद्य से सलाह लें।"],
      en: ["If you do not see relief after 4-5 days, consult a doctor or Vaidya."]
    },
    disclaimer: GENERAL_DISCLAIMER,
    keywords: ["khansi ka gharelu ilaj", "mulethi powder", "dry cough", "सूखी खांसी", "मुलेठी"]
  }
];
