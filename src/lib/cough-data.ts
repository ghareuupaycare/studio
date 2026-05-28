/**
 * @fileOverview Category 3: Dry & Productive Cough (सूखी एवं बलगम वाली खांसी) Data Store
 * Isolated dataset handler for Category 3 remedies.
 */

export type LocalizedString = {
  hi: string | string[];
  en: string | string[];
};

export type DoseConfig = {
  ageRange: { hi: string; en: string };
  dose: LocalizedString;
  ingredients?: { hi: string[]; en: string[] };
};

export type Remedy = {
  id: string;
  serialNumber: string;
  name: { hi: string; en: string };
  illnessId: string;
  introduction: LocalizedString;
  severity?: 'mild' | 'moderate' | 'severe';
  severityLabel?: { hi: string; en: string };
  doses: DoseConfig[];
  ingredients: { hi: string[]; en: string[] };
  preparation: LocalizedString;
  usage: LocalizedString;
  dietEat: LocalizedString;
  dietAvoid: LocalizedString;
  strictAvoid?: LocalizedString;
  routine: {
    morning: LocalizedString;
    afternoon: LocalizedString;
    evening: LocalizedString;
  };
  safetyAdvice: LocalizedString;
  disclaimer: LocalizedString;
  image: string;
  keywords: string[];
};

export const AGE_BRACKETS = {
  childhood: { hi: "5-12 वर्ष", en: "5-12 Years" },
  youth: { hi: "13-40 वर्ष", en: "13-40 Years" },
  middleAge: { hi: "41-60 वर्ष", en: "41-60 Years" },
  oldAge: { hi: "61-80 वर्ष", en: "61-80 Years" }
};

export const COUGH_REMEDIES: Remedy[] = [
  {
    id: "cough-1",
    serialNumber: "1",
    name: { 
      hi: "सूखी खांसी के लिए शहद और काली मिर्च का अचूक चाटन", 
      en: "Effective Honey and Black Pepper Lick for Dry Cough" 
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
        "Dry cough increases dryness in the lungs and respiratory tract, causing constant irritation or tickling in the throat.",
        "No phlegm is produced, but coughing leads to severe pain in the chest, ribs, and abdominal muscles.",
        "Coughing intensity increases at night, severely disrupting sleep.",
        "Pure honey creates a protective layer on the irritated throat lining, while roasted black pepper calms respiratory infections and inflammation.",
        "This divine lick is the simplest, tastiest, and most effective home remedy for dry cough."
      ]
    },
    doses: [
      { 
        ageRange: AGE_BRACKETS.childhood, 
        dose: { 
          hi: "तैयार किए गए चाटन में से केवल आधा छोटा चम्मच (मात्रा आधी रखें) ही बच्चे को उंगली से धीरे-धीरे चटाएं।", 
          en: "Lick only half a teaspoon of the prepared mixture slowly using a finger." 
        } 
      },
      { 
        ageRange: AGE_BRACKETS.youth, 
        dose: { 
          hi: "1 पूरा छोटा चम्मच भरकर तैयार किया गया चाटन लें और इसे दिन में 3 बार मुंह में रखकर धीरे-धीरे रस निगलें।", 
          en: "Take 1 full teaspoon and swallow it slowly 3 times a day." 
        } 
      },
      { 
        ageRange: AGE_BRACKETS.middleAge, 
        dose: { 
          hi: "1 पूरा छोटा चम्मच तैयार चाटन लें, यह कमज़ोर फेफड़ों की खुश्की को दूर करने में बेहद मददगार है।", 
          en: "Take 1 full teaspoon; it is highly effective in relieving lung dryness." 
        } 
      },
      { 
        ageRange: AGE_BRACKETS.oldAge, 
        dose: { 
          hi: "1 छोटा चम्मच चाटन (काली मिर्च की मात्रा सिर्फ 1 से 2 चुटकी ही रखें ताकि बुजुर्गों के पेट में जलन या गर्मी न हो)।", 
          en: "Take 1 teaspoon (keep pepper amount to 1-2 pinches to avoid stomach irritation)." 
        } 
      }
    ],
    ingredients: {
      hi: [
        "शुद्ध प्राकृतिक शहद — 1 छोटा चम्मच",
        "काली मिर्च (मरीच) का बारीक चूर्ण — 2 से 3 चुटकी",
        "\n\n(ज़रूरी नोट: यह सभी सामग्रियां रसोई में हमेशा उपलब्ध रहती हैं। काली मिर्च को ताजा पीसकर ही इस्तेमाल करें ताकि उसका असर पूरा मिले। ऊपर स्मार्ट खुराक के बटन में अपनी उम्र के अनुसार बताई गई मात्रा ही चाटने के लिए बाहर निकालें।)"
      ],
      en: [
        "Pure natural honey — 1 teaspoon",
        "Fine black pepper powder — 2 to 3 pinches",
        "\n\n(Note: Use fresh ground pepper for best results. Use dosage according to selected age group.)"
      ]
    },
    preparation: {
      hi: [
        "सबसे पहले साफ और अच्छी क्वालिटी के काली मिर्च के दानों को तवे पर धीमी आंच पर सूखा ही हल्का सा भून लें।",
        "भुनी हुई काली मिर्च को खरल या इमामदस्ते में डालकर अच्छी तरह कूट लें और कपड़े से छानकर एकदम बारीक महीन चूर्ण तैयार कर लें।",
        "अब एक साफ छोटी कटोरी या सीधे चम्मच में 1 छोटा चम्मच शुद्ध शहद निकालें।",
        "इस शहद के ऊपर 2 से 3 चुटकी तैयार काली मिर्च का चूर्ण डालें और उंगली की मदद से दोनों को अच्छी तरह आपस में मिला लें ताकि एक गाढ़ा चाटन बन जाए।"
      ],
      en: [
        "Lightly dry roast clean, high-quality black peppercorns on a pan over low heat.",
        "Crush the roasted pepper and sift through a cloth to make a very fine powder.",
        "Take 1 teaspoon of pure honey in a clean bowl or spoon.",
        "Add 2-3 pinches of pepper powder to the honey and mix well to form a thick paste."
      ]
    },
    usage: {
      hi: [
        "विधि: इस तैयार चाटन को अपनी उम्र के बटन के अनुसार बताई गई चम्मच की मात्रा में निकालें और उंगली से धीरे-धीरे चाटकर खाएं, इसे पानी की तरह एक बार में पूरा न निगलें।",
        "समय: इसे दिन में 2 से 3 बार (सुबह खाली पेट, दोपहर में और रात को सोने से ठीक पहले) धीरे-धीरे चाटकर लें।",
        "अवधि: इसका नियमित सेवन लगातार 3 से 5 दिनों तक करें, जिससे गले का धसका और पुरानी सूखी खांसी जड़ से खत्म हो जाएगी। दवा लेने के बाद आधे घंटे तक पानी न पिएं।"
      ],
      en: [
        "Method: Take the prescribed quantity based on age and lick it slowly; do not swallow it all at once like water.",
        "Timing: Take 2-3 times a day (empty stomach morning, afternoon, and just before bed).",
        "Duration: Use for 3-5 days to eradicate throat tickling and chronic dry cough. Do not drink water for 30 minutes after."
      ]
    },
    dietEat: {
      hi: [
        "भोजन: सुपाच्य और गुनगुना भोजन लें जैसे—मूंग की पतली खिचड़ी, गरम दलिया या कद्दू का गरमा-गरम सूप।",
        "रोटी: गरमा-गरम गेहूं की ताजी रोटी पर थोड़ा सा शुद्ध देसी घी लगाकर खाएं ताकि गले में तरी बनी रहे।",
        "फल: कशमिश या मुनक्के को तवे पर हल्का गर्म करके खाएं, यह सूखी खांसी में बहुत फायदेमंद होता है।",
        "पानी: पीने के लिए हमेशा हल्का गुनगुना पानी ही इस्तेमाल करें। गुनगुने पानी में सेंधा नमक डालकर गरारे ज़रूर करें।"
      ],
      en: [
        "Food: Eat digestible warm food like Moong dal khichdi, hot porridge, or warm pumpkin soup.",
        "Roti: Eat fresh hot wheat roti with pure desi ghee to maintain throat moisture.",
        "Fruits: Eat lightly heated raisins or Munakka; highly beneficial for dry cough.",
        "Water: Always use lukewarm water. Gargle with warm salt water."
      ]
    },
    dietAvoid: {
      hi: [
        "पैकेट वाले फूड्स, बाजार के तले-भुने चिप्स, कुरकुरे, मैदे वाले बिस्कुट, टोस्ट, नमकीन और डिब्बाबंद जूस पूरी तरह बंद रखें, क्योंकि ये गले में सूखापन और धसका बढ़ाते हैं।",
        "भारी भोजन, बहुत ज्यादा तेल-मसाले वाला तीखा खाना, समोसा, चाउमीन, बासी भोजन बिल्कुल न खाएं।",
        "भारी प्रोटीन, मांसाहार, अंडा, पनीर और भारी तली-भुनी पूरियां बिल्कुल न खाएं।"
      ],
      en: [
        "Avoid packaged foods, fried chips, refined flour biscuits, and canned juices as they increase throat dryness.",
        "Avoid heavy, oily, spicy food, samosas, noodles, and stale food.",
        "Avoid heavy protein, non-veg, eggs, paneer, and deep-fried items."
      ]
    },
    strictAvoid: {
      hi: "ठंडी चीजें, फ्रिज का पानी, कोल्ड ड्रिंक, आइसक्रीम, खट्टे फल (नींबू, संतरा) और दही पूरी तरह वर्जित हैं।",
      en: "Cold items, refrigerated water, sodas, ice cream, sour fruits, and curd are strictly prohibited."
    },
    routine: {
      morning: { 
        hi: ["सुबह उठकर सबसे पहले एक गिलास गुनगुना पानी पिएं। ताजी धूप में 10 से 15 मिनट बैठें ताकि छाती को प्राकृतिक गरमाहट मिले।"], 
        en: ["Morning: Start with a glass of lukewarm water. Sit in fresh sunlight for 10-15 minutes."] 
      },
      afternoon: { 
        hi: ["दोपहर के भोजन के बाद विश्राम करते समय पंखे, कूलर या एसी की सीधी ठंडी हवा अपनी छाती या गले पर बिल्कुल न लगने दें।"], 
        en: ["Afternoon: Avoid direct fan or AC draft on the chest and throat while resting."] 
      },
      evening: { 
        hi: ["शाम या रात को बाहर निकलते वक्त गले को सूती कपड़े या मफलर से ढककर रखें। रात को सोते समय सिरहाने को थोड़ा ऊंचा रखें ताकि लेटने पर धसका न उठे।"], 
        en: ["Evening: Keep throat covered with a cotton cloth or muffler outdoors. Use an extra pillow to keep head elevated."] 
      }
    },
    safetyAdvice: {
      hi: [
        "यदि खांसी के साथ-साथ तेज बुखार आने लगे, छाती में खांसते समय भयंकर दर्द हो, या थूक/बलगम में खून के अंश दिखाई दें।",
        "तो इस घरेलू उपाय के साथ-साथ अपने किसी अच्छे डॉक्टर या वैद्य से मिलकर एक बार अपनी सेहत की जांच अवश्य करवा लें।"
      ],
      en: [
        "Consult a doctor if high fever, severe chest pain while coughing, or blood in phlegm occurs.",
        "Ensure a medical check-up alongside these home remedies."
      ]
    },
    disclaimer: {
      hi: "यह जानकारी केवल शैक्षिक उद्देश्य के लिए है, कृपया अपने चिकित्सक से सलाह जरूर लें।",
      en: "This information is for educational purposes only, please consult your physician."
    },
    image: "https://picsum.photos/seed/cough/600/400",
    keywords: [
      "khansi ka gharelu ilaj", 
      "sukhi khansi ka ilaj", 
      "dry cough home remedy", 
      "khansi ki dawa", 
      "cough syrup gharelu", 
      "gale me kharas", 
      "dhaska thik karne ke upay", 
      "shahad aur kali mirch", 
      "खांसी का घरेलू इलाज", 
      "सूखी खांसी"
    ]
  }
];
