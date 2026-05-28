/**
 * @fileOverview Category 3: Dry & Productive Cough (सूखी एवं बलगम वाली खांसी) Data Store
 * Isolated dataset handler for Category 3 remedies.
 */

import { Remedy, AGE_BRACKETS } from "./cold-data";

export const COUGH_REMEDIES: Remedy[] = [
  {
    id: "cough_remedy_1",
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
        "Dry cough increases dryness in the lungs and respiratory tract, causing constant irritation in the throat. Honey protects the throat lining while black pepper calms respiratory infections."
      ]
    },
    doses: [
      { 
        ageRange: AGE_BRACKETS.childhood, 
        dose: { 
          hi: "तैयार किए गए चाटन में से केवल आधा छोटा चम्मच (मात्रा आधी रखें) ही बच्चे को उंगली से धीरे-धीरे चटाएं।", 
          en: "Lick half a teaspoon slowly using a finger." 
        } 
      },
      { 
        ageRange: AGE_BRACKETS.youth, 
        dose: { 
          hi: "1 पूरा छोटा चम्मच भरकर तैयार किया गया चाटन लें और इसे दिन में 3 बार मुंह में रखकर धीरे-धीरे रस निगलें।", 
          en: "Take 1 full teaspoon and swallow slowly 3 times a day." 
        } 
      },
      { 
        ageRange: AGE_BRACKETS.middleAge, 
        dose: { 
          hi: "1 पूरा छोटा चम्मच तैयार चाटन लें, यह कमज़ोर फेफड़ों की खुश्की को दूर करने में बेहद मददगार है।", 
          en: "Take 1 full teaspoon; highly effective for age-related lung dryness." 
        } 
      },
      { 
        ageRange: AGE_BRACKETS.oldAge, 
        dose: { 
          hi: "1 छोटा चम्मच चाटन (काली मिर्च की मात्रा सिर्फ 1 से 2 चुटकी ही रखें ताकि बुजुर्गों के पेट में जलन या गर्मी न हो)।", 
          en: "Take 1 teaspoon with minimal pepper to avoid stomach irritation." 
        } 
      }
    ],
    ingredients: {
      hi: [
        "शुद्ध प्राकृतिक शहद — 1 छोटा चम्मच",
        "काली मिर्च (मरीच) का बारीक चूर्ण — 2 से 3 चुटकी",
        "जरूरी नोट: यह सभी सामग्रियां रसोई में हमेशा उपलब्ध रहती हैं। काली मिर्च को ताजा पीसकर ही इस्तेमाल करें ताकि उसका असर पूरा मिले। ऊपर स्मार्ट खुराक के बटन में अपनी उम्र के अनुसार बताई गई मात्रा ही चाटने के लिए बाहर निकालें।"
      ],
      en: [
        "Pure natural honey — 1 teaspoon",
        "Fine black pepper powder — 2 to 3 pinches",
        "Note: Use fresh ground pepper for best results. Use dosage according to selected age group."
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
        "Dry roast black peppercorns, crush into fine powder, and mix with pure honey to form a thick paste."
      ]
    },
    usage: {
      hi: [
        "विधि: इस तैयार चाटन को अपनी उम्र के बटन के अनुसार बताई गई चम्मच की मात्रा में निकालें और उंगली से धीरे-धीरे चटाकर खाएं, इसे पानी की तरह एक बार में पूरा न निगलें।",
        "समय: इसे दिन में 2 से 3 बार (सुबह खाली पेट, दोपहर में और रात को सोने से ठीक पहले) धीरे-धीरे चाटकर लें।",
        "अवधि: इसका नियमित सेवन लगातार 3 से 5 दिनों तक करें, जिससे गले का धसका और पुरानी सूखी खांसी जड़ से खत्म हो जाएगी। दवा लेने के बाद आधे घंटे तक पानी न पिएं।"
      ],
      en: [
        "Lick slowly 2-3 times daily (morning, noon, and night). Use for 3-5 days. Do not drink water for 30 minutes after consumption."
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
        "Eat digestible warm foods like Moong dal khichdi and warm soups. Use lukewarm water for drinking and gargling."
      ]
    },
    dietAvoid: {
      hi: [
        "पैकेट वाले फूड्स, बाजार के तले-भुने चिप्स, कुरकुरे, मैदे वाले बिस्कुट, टोस्ट, नमकीन और डिब्बाबंद जूस पूरी तरह बंद रखें, क्योंकि ये गले में सूखापन और धसका बढ़ाते हैं।",
        "भारी भोजन, बहुत ज्यादा तेल-मसाले वाला तीखा खाना, समोसा, चाउमीन, बासी भोजन बिल्कुल न खाएं।",
        "भारी प्रोटीन, मांसाहार, अंडा, पनीर और भारी तली-भुनी पूरियां बिल्कुल न खाएं।"
      ],
      en: [
        "Avoid packaged snacks, fried foods, non-veg, and cold beverages that increase throat dryness."
      ]
    },
    strictAvoid: {
      hi: "ठंडी चीजें, फ्रिज का पानी, कोल्ड ड्रिंक, आइसक्रीम, खट्टे फल (नींबू, संतरा) और दही पूरी तरह वर्जित हैं।",
      en: "Strictly avoid refrigerated water, sodas, ice cream, and sour fruits."
    },
    routine: {
      morning: {
        hi: ["सुबह उठकर सबसे पहले एक गिलास गुनगुना पानी पिएं। ताजी धूप में 10 से 15 मिनट बैठें ताकि छाती को प्राकृतिक गरमाहट मिले।"],
        en: ["Start with lukewarm water and sit in fresh sunlight for 10-15 minutes."]
      },
      afternoon: {
        hi: ["दोपहर के भोजन के बाद विश्राम करते समय पंखे, कूलर या एसी की सीधी हवा अपनी छाती या गले पर बिल्कुल न लगने दें।"],
        en: ["Avoid direct drafts from fans or AC on the chest area while resting."]
      },
      evening: {
        hi: ["शाम या रात को बाहर निकलते वक्त गले को सूती कपड़े या मफलर से ढककर रखें। रात को सोते समय सिरहाने को थोड़ा ऊंचा रखें ताकि लेटने पर धसका न उठे।"],
        en: ["Keep throat covered outdoors. Sleep with head slightly elevated."]
      }
    },
    safetyAdvice: {
      hi: [
        "यदि खांसी के साथ-साथ तेज बुखार आने लगे, छाती में खांसते समय भयंकर दर्द हो, या थूक/बलगम में खून के अंश दिखाई दें।",
        "तो इस घरेलू उपाय के साथ-साथ अपने किसी अच्छे डॉक्टर या वैद्य से मिलकर एक बार अपनी सेहत की जांच अवश्य करवा लें।"
      ],
      en: [
        "Consult a doctor if you experience high fever, severe chest pain, or blood in phlegm."
      ]
    },
    disclaimer: {
      hi: "यह जानकारी केवल शैक्षिक उद्देश्य के लिए है, कृपया अपने चिकित्सक से सलाह जरूर लें।",
      en: "This information is for educational purposes only."
    },
    image: "https://picsum.photos/seed/cough1/600/400",
    keywords: ["khansi ka gharelu ilaj", "sukhi khansi ka ilaj", "dry cough home remedy", "shahad aur kali mirch", "सूखी खांसी"]
  },
  {
    id: "cough_remedy_2",
    serialNumber: "2",
    name: { 
      hi: "सूखी खांसी और गले की खुश्की के लिए मुलेठी एवं इलायची का दिव्य चूर्ण", 
      en: "Divine Mulethi and Cardamom Powder for Dry Cough and Throat Dryness" 
    },
    illnessId: "cough",
    introduction: {
      hi: [
        "सूखी खांसी में जब गले की नली पूरी तरह सूख जाती है, तो बार-बार खांसने से गले के अंदर छोटे-छोटे जख्म या छिलन जैसी होने लगती है।",
        "मुलेठी आयुर्वेद की एक ऐसी जड़ी-बूटी है जो स्वाद में मीठी होती है और गले को तर (Moist) रखने में दुनिया में सबसे बेस्ट मानी जाती है।",
        "छोटी इलायची के दाने गले की सूजन और छाती की जकड़न को शांत करते हैं, जिससे सूखी धसका उठना तुरंत बंद होता है।",
        "मिश्री के योग से यह चूर्ण फेफड़ों को ताकत देता है और सूखी खांसी के कारण छाती में होने वाले दर्द को जड़ से मिटाता है।",
        "यह नुस्खा उन लोगों के लिए रामबाण है जिन्हें खांसते समय गले में कांटे जैसी चुभन महसूस होती है।"
      ],
      en: [
        "Mulethi is excellent for keeping the throat moist, while cardamom calms inflammation and chest tightness. This remedy is ideal for those feeling sharp pain during dry cough."
      ]
    },
    doses: [
      { 
        ageRange: AGE_BRACKETS.childhood, 
        dose: { 
          hi: "तैयार किए गए चूर्ण में से केवल आधा छोटा चम्मच (मात्रा कम रखें) शहद या गुनगुने पानी के साथ बच्चे को दें।", 
          en: "Give half a teaspoon with honey or lukewarm water." 
        } 
      },
      { 
        ageRange: AGE_BRACKETS.youth, 
        dose: { 
          hi: "1 पूरा छोटा चम्मच भरकर यह चूर्ण लें और इसे दिन में 3 बार (सुबह, दोपहर, रात) मुंह में रखकर धीरे-धीरे चूसें या गुनगुने पानी से लें।", 
          en: "Take 1 full teaspoon 3 times a day; suck slowly or take with lukewarm water." 
        } 
      },
      { 
        ageRange: AGE_BRACKETS.middleAge, 
        dose: { 
          hi: "1 पूरा छोटा चम्मच चूर्ण दिन में 3 बार लें, यह उम्र बढ़ने के कारण श्वसन नली में आए सूखेपन को बहुत जल्दी ठीक करता है।", 
          en: "Take 1 full teaspoon 3 times daily to combat age-related throat dryness." 
        } 
      },
      { 
        ageRange: AGE_BRACKETS.oldAge, 
        dose: { 
          hi: "1 पूरा छोटा चम्मच चूर्ण लें (यदि बुजुर्गों को शुगर/मधुमेह की समस्या हो, तो चूर्ण बनाते समय मिश्री बिल्कुल न मिलाएं, केवल मुलेठी और इलायची ही रखें)।", 
          en: "Take 1 full teaspoon (omit sugar candy if diabetic)." 
        } 
      }
    ],
    ingredients: {
      hi: [
        "मुलेठी का शुद्ध चूर्ण (पाउडर) — 2 चम्मच",
        "छोटी इलायची के दाने का चूर्ण — आधा चम्मच",
        "धागे वाली मिश्री का चूर्ण — 2 चम्मच",
        "जरूरी नोट: ऊपर बताई गई कुल सामग्री केवल एक बार बनाने का स्टॉक (मात्रा) है। इसे एक बार में पूरा नहीं खाना है। इसे नीचे दी गई विधि से एक बार में तैयार कर लें और फिर ऊपर 'स्मार्ट खुराक' वाले बटन में जो आपकी उम्र हो, उस हिसाब से अपनी खुराक निकाल कर सेवन करें।"
      ],
      en: [
        "Mulethi powder — 2 tsp, Cardamom powder — 1/2 tsp, Sugar candy powder — 2 tsp. Bulk quantity for easy daily dosing."
      ]
    },
    preparation: {
      hi: [
        "सबसे पहले मुलेठी की सूखी डंडियों को कूटकर या बाजार से लाया हुआ शुद्ध मुलेठी चूर्ण एक साफ सूखी कटोरी में निकाल लें।",
        "हरी छोटी इलायची के छिलके उतारकर उसके दानों को ओखली में एकदम बारीक कूटकर पाउडर बना लें।",
        "धागे वाली मिश्री को भी इमामदस्ते में पहले छोटा-छोटा तोड़ लें और फिर मिक्सी या खरल में पीसकर महीन चूर्ण बना लें।",
        "अब एक साफ बर्तन में 2 चम्मच मुलेठी चूर्ण, आधा चम्मच इलायची चूर्ण और 2 चम्मच मिश्री चूर्ण को आपस में बहुत अच्छी तरह मिला लें।",
        "इस तैयार त्रिविध चूर्ण को एक कांच की सूखी शीशी में भरकर रख लें, यह महीनों तक खराब नहीं होता।"
      ],
      en: [
        "Grind cardamom and sugar candy into fine powders. Mix with Mulethi powder and store in a dry glass jar."
      ]
    },
    usage: {
      hi: [
        "विधि: इस तैयार चूर्ण को अपनी उम्र के बटन के अनुसार बताई गई चम्मच की मात्रा में निकालें और मुंह में रखकर धीरे-धीरे लार (Saliva) के साथ चूसें, या फिर आधा चम्मच शहद में मिलाकर चाटें।",
        "समय: इसे दिन में 3 बार हमेशा सुबह, दोपहर और रात को भोजन या कुछ हल्का खाना खाने के 10 से 15 मिनट बाद (यानी भरे पेट) ही लें। खाली पेट इसका सेवन न करें।",
        "अवधि: इसका नियमित सेवन लगातार 5 से 7 दिनों तक करें। इसे लेने के बाद कम से कम 45 मिनट तक पानी या किसी भी पेय पदार्थ का सेहत बिल्कुल न करें।",
        "विशेष नोट: मुलेठी और मिश्री की तासीर ठंडी (शीतल) होती है। सूखी खांसी असल में गले के सूखेपन, गर्मी और सूजन के कारण होती है, इसलिए इसकी ठंडी तासीर गले को तर करके सूजन को शांत करती है और खांसी को जड़ से मिटाती है, इससे खांसी बिल्कुल नहीं बढ़ती।"
      ],
      en: [
        "Consume prescribed amount 3 times daily after meals. Suck slowly or mix with honey. Avoid water for 45 minutes after."
      ]
    },
    dietEat: {
      hi: [
        "भोजन: हल्का, ताजा और गरम सुपाच्य भोजन लें जैसे—साबुदाने की खिचड़ी, मूंग की दाल का सूप या उबली हुई लौकी-तोरई की सब्जी।",
        "पेय: दिन में जब भी प्यास लगे, सादे पानी की जगह हल्का गुनगुना पानी ही घूंट-घूंट करके पिएं।",
        "दूध: रात को सोते समय एक कप गुनगुने दूध में आधा चम्मच शुद्ध गाय का देसी घी मिलाकर पिएं, यह फेफड़ों की खुश्की को तुरंत काटता है।",
        "कुल्ला: हल्के गरम पानी में एक चुटकी हल्दी और थोड़ा सा सेंधा नमक मिलाकर दिन में दो बार गरारे अवश्य करें।"
      ],
      en: [
        "Eat light warm meals. Drink lukewarm water. Take warm milk with ghee at bedtime. Gargle with turmeric water."
      ]
    },
    dietAvoid: {
      hi: [
        "सूखी, कड़क और रूखी चीजें जैसे—खारी बिस्कुट, टोस्ट, भुना हुआ चना, मूंगफली और सूखे मेवे बिना भिगोए बिल्कुल न खाएं, क्योंकि ये गले में फंसकर धसका पैदा करते हैं।",
        "तीखे मिर्च-मसाले, गरम मसाला, लाल मिर्च, चाट मसाला और अचार का सेवन पूरी तरह बंद रखें।",
        "बाजार का समोसा, कचौड़ी, पकौड़े और रिफाइंड तेल में बनी चीजें बिल्कुल न छुएं।"
      ],
      en: [
        "Avoid dry snacks, spicy condiments, and fried items that irritate the throat."
      ]
    },
    strictAvoid: {
      hi: "ठंडी चीजें, फ्रिज का पानी, कोल्ड ड्रिंक, सोडा, खट्टी चीजें (जैसे इमली, अमचूर, सिरका), खट्टे फल और रात के समय दही या मट्ठा लेना सख़्त मना है।",
      en: "Strictly avoid cold water, sodas, and sour items like vinegar or citrus at night."
    },
    routine: {
      morning: {
        hi: ["सुबह सोकर उठते ही ठंडे फर्श पर नंगे पैर न चलें, पैरों में चप्पल पहनें और गले को ढककर रखें।"],
        en: ["Avoid walking barefoot on cold floors; keep throat warm."]
      },
      afternoon: {
        hi: ["भोजन के तुरंत बाद ठंडे पानी से हाथ-मुंह न धोएं, सामान्य या गुनगुने पानी का ही उपयोग करें।"],
        en: ["Wash up with normal or lukewarm water after lunch."]
      },
      evening: {
        hi: ["शाम ढलने के बाद ठंडी हवा में बाहर न घूमें। रात को सोते समय कमरे का तापमान सामान्य रखें और पंखे की सीधी हवा चेहरे या छाती पर न आने दें।"],
        en: ["Avoid night drafts and direct airflow from fans while sleeping."]
      }
    },
    safetyAdvice: {
      hi: [
        "हमारा यह घरेलू नुस्खा बहुत ही कोमल, मीठा और सुरक्षित है, जो आपके गले को बहुत आराम देगा। फिर भी मुलेठी की प्राकृतिक तासीर को देखते हुए इसे बताई गई सीमित मात्रा में ही लें।",
        "आप बहुत जल्द बिल्कुल भले-चंगे हो जाएंगे, लेकिन यदि इस उपाय को 4 से 5 दिन लगातार आजमाने के बाद भी आपको राहत न मिले, तो बिल्कुल संकोच न करें। अपने किसी नजदीकी डॉक्टर या नाड़ी वैद्य जी को दिखाकर उनकी सलाह से आगे बढ़ें। आपकी सेहत हमारे लिए सबसे कीमती है।"
      ],
      en: [
        "Use in moderation. If no relief after 4-5 days, consult a qualified physician or Ayurvedic expert."
      ]
    },
    disclaimer: {
      hi: "यह जानकारी केवल शैक्षिक उद्देश्य के लिए है, कृपया अपने चिकित्सक से सलाह जरूर लें।",
      en: "This information is for educational purposes only."
    },
    image: "https://picsum.photos/seed/herb1/600/400",
    keywords: ["khansi ka gharelu ilaj", "mulethi powder for cough", "gale ki khushki के उपाय", "sukhi khansi ki dawa", "मुलेठी"]
  }
];
