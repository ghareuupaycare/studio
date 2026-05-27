import { PlaceHolderImages } from "./placeholder-images";

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
  /** Search keywords in Hindi, English, and Hinglish */
  keywords: string;
};

export const CATEGORIES = [
  { id: 'fever', label: '1. मौसमी बुखार एवं फ्लू', icon: 'Thermometer', image: PlaceHolderImages.find(i => i.id === 'respiratory')?.imageUrl },
  { id: 'joints', label: '2. घुटनों का दर्द', icon: 'Accessibility', image: PlaceHolderImages.find(i => i.id === 'joint-pain')?.imageUrl },
  { id: 'respiratory', label: '3. खांसी और सर्दी', icon: 'Wind', image: PlaceHolderImages.find(i => i.id === 'respiratory')?.imageUrl },
  { id: 'digestion', label: '4. पाचन', icon: 'Stomach', image: PlaceHolderImages.find(i => i.id === 'digestion')?.imageUrl },
];

const GENERAL_DISCLAIMER: LocalizedString = {
  hi: "यह जानकारी केवल शैक्षिक उद्देश्य के लिए है, कृपया अपने चिकित्सक से सलाह ज़रूर लें।",
  en: "This information is for educational purposes only, please consult your physician."
};

const AGE_BRACKETS = {
  childhood: { hi: "5-12 वर्ष", en: "5-12 Years" },
  youth: { hi: "13-40 वर्ष", en: "13-40 Years" },
  middleAge: { hi: "41-60 वर्ष", en: "41-60 Years" },
  oldAge: { hi: "61-80 वर्ष", en: "61-80 Years" }
};

export const REMEDIES: Remedy[] = [
  // --- CATEGORY 1: सामान्य बुखार (FULL RESTORATION) ---
  {
    id: 'gf-1',
    serialNumber: '1',
    name: { hi: 'तुलसी और गिलोय का दिव्य अमृत काढ़ा', en: 'Divine Amrit Decoction of Tulsi and Giloy' },
    illnessId: 'general-fever',
    introduction: {
      hi: "जब शरीर का तापमान सामान्य से अधिक हो जाता है, तो उसे सामान्य बुखार कहते हैं। आयुर्वेद में इसे 'ज्वर' कहा जाता है, जो मुख्य रूप से अनुचित खान-पान, मौसम के अचानक बदलाव या शरीर में संचित टॉक्सिंस (आमदोष) के कारण मंदाग्नि होने से होता है। यह तुलसी और गिलोय का मिश्रण एक परम शक्तिशाली वायरस नाशक और रोग प्रतिरोधक क्षमता बढ़ाने वाला दिव्य अमृत है। यह शरीर की रक्षा प्रणाली को सक्रिय कर बाहरी संक्रमण और हानिकारक कीटाणुओं से लड़ने की शक्ति प्रदान करता है, जिससे बुखार तेजी से उतरता है।",
      en: "General fever, known as 'Jvara' in Ayurveda, is caused by Mandagni (weakened digestion) due to toxins. This Tulsi-Giloy brew is a powerful natural defense that activates the immune system to fight external infections and harmful germs efficiently."
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "5 से 10 मिलीलीटर (शहद के साथ)", en: "5 to 10 ml (with honey)" } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "20 से 30 मिलीलीटर (गुनगुना)", en: "20 to 30 ml (lukewarm)" } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "15 से 20 मिलीलीटर", en: "15 to 20 ml" } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "10 से 15 मिलीलीटर", en: "10 to 15 ml" } }
    ],
    ingredients: {
      hi: ['7-8 ताजी तुलसी की पत्तियां (साफ धुली हुई)', '3-4 इंच गिलोय की डंडी (ताजी और कुचली हुई)', '2-3 साबुत काली मिर्च (दरदरी कुटी हुई)', '1 छोटा टुकड़ा ताज़ा अदरक', '2 कप पीने का शुद्ध पानी'],
      en: ['7-8 Tulsi leaves (washed)', '3-4 inch Giloy stick (fresh and crushed)', '2-3 Black peppercorns (coarsely ground)', '1 small piece of fresh ginger', '2 cups pure drinking water']
    },
    preparation: {
      hi: 'सबसे पहले एक बर्तन में दो कप पानी डालें। अब उसमें कुचली हुई गिलोय, तुलसी के पत्ते, काली मिर्च और कद्दूकस किया हुआ अदरक डाल दें। इस मिश्रण को मध्यम आंच पर तब तक उबालें जब तक कि पानी जलकर केवल आधा कप न रह जाए। इसके बाद इसे आंच से उतारें और किसी छलनी से छान लें। आपका दिव्य औषधीय काढ़ा अब सेवन के लिए तैयार है।',
      en: 'Add two cups of water to a vessel. Add crushed Giloy, Tulsi, black pepper, and grated ginger. Boil on medium heat until the water reduces to half a cup. Strain it through a sieve. Your divine medicinal brew is now ready for consumption.'
    },
    usage: {
      hi: 'इसे हल्का गुनगुना रहने पर सुबह और शाम को खाली पेट या भोजन के 1 घंटे बाद चाय की तरह धीरे-धीरे सिप लेकर पिएं। इसे पीने के बाद कम से कम आधे घंटे तक कुछ भी न खाएं-पिएं।\nअवधि: इसका नियमित सेवन लगातार 3 से 5 दिनों तक सुबह और शाम करें।',
      en: 'Sip it slowly like tea twice daily, in the morning on an empty stomach and in the evening 1 hour after meals. Avoid eating or drinking anything for 30 minutes after. Duration: Use regularly for 3 to 5 days.'
    },
    dietEat: {
      hi: 'भोजन: पुरानी मूँग दाल की पतली खिचड़ी, सादा दलिया, उबले हुए सेब का गूदा, और पर्याप्त मात्रा में गुनगुना पानी।\nफल और सब्जी: दोपहर के भोजन के साथ हल्की उबली हुई लौकी या परवल की सब्जी और अनुकूल फल जैसे पपीता या अनार का सेवन करें।',
      en: 'Food: Thin Moong dal khichdi, plain porridge, boiled apple pulp, and plenty of lukewarm water. Vegetables: Lightly boiled bottle gourd or pointed gourd and seasonal fruits like papaya or pomegranate.'
    },
    dietAvoid: {
      hi: 'पैकेट वाले आहार: चिप्स, बिस्कुट, नमकीन और बाजार की तली-भुनी चीजें बिल्कुल बंद रखें।\nभारी भोजन: ठंडा पानी, फ्रिज का खाना, पराठे, पूरी और गरिष्ठ भोजन का सेवन न करें।',
      en: 'Avoid: Packaged snacks like chips, biscuits, and fried street foods. Heavy meals: Cold water, refrigerated food, parathas, and oily preparations.'
    },
    strictAvoid: {
      hi: 'सख्त परहेज़: कोल्ड ड्रिंक्स, आइसक्रीम, खट्टी चीजें जैसे अचार और रात के समय दही का सेवन पूरी तरह वर्जित है।',
      en: 'Strict Avoid: Cold drinks, ice cream, sour items like pickles, and curd at night are strictly prohibited.'
    },
    routine: {
      morning: { hi: 'सुबह: हल्का उबला हुआ सेब या मूँग की दाल का पतला पानी और गुनगुना पानी पिएं।', en: 'Morning: Have boiled apple pulp or light Moong dal water along with lukewarm water.' },
      afternoon: { hi: 'दोपहर: अच्छी तरह पकी हुई मूँग की दाल की पतली खिचड़ी और थोड़ा सा सेंधा नमक।', en: 'Afternoon: Well-cooked thin Moong dal khichdi with a pinch of rock salt.' },
      evening: { hi: 'शाम/रात: हल्का दलिया या उबली हुई ताजी सब्जियों का सादा सूप लें। रात को जल्दी सोएं।', en: 'Evening: Light porridge or plain vegetable soup. Ensure you sleep early.' }
    },
    safetyAdvice: { hi: 'यदि बुखार 102 डिग्री से अधिक हो या 3 दिन से ज्यादा रहे, तो तुरंत डॉक्टर से संपर्क करें।', en: 'If fever exceeds 102°F or lasts more than 3 days, consult a physician immediately.' },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'ayurveda-herbs')?.imageUrl || "",
    keywords: "bukhar fever jwar tulsi giloy kadha immunity"
  },
  {
    id: 'gf-2',
    serialNumber: '2',
    name: { hi: 'अदरक और धनिए के बीजों का पाचक पानी', en: 'Digestive Water of Ginger and Coriander Seeds' },
    illnessId: 'general-fever',
    introduction: {
      hi: "बुखार की स्थिति में अक्सर हमारे शरीर की पाचन अग्नि (जठराग्नि) मंद पड़ जाती है, जिसके कारण भूख नहीं लगती और शरीर में टॉक्सिंस (आमदोष) जमा होने लगते हैं। यह अदरक और धनिए के बीजों का पाचक पानी शरीर की चयापचय प्रक्रिया (Metabolism) को सक्रिय करता है। यह खून को साफ़ करने, पेट की भारीपन को दूर करने और शरीर के तापमान को प्राकृतिक रूप से नियंत्रित करने में बहुत प्रभावी है।",
      en: "During fever, the body's digestive fire (Jatharagni) weakens, leading to loss of appetite and toxin buildup. This ginger and coriander water activates the metabolic fire, purifies the blood, and helps naturally regulate body temperature."
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "20-30 मिलीलीटर (दिन में दो बार)", en: "20-30 ml (twice daily)" } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "50-60 मिलीलीटर", en: "50-60 ml" } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "50-60 मिलीलीटर", en: "50-60 ml" } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "40-50 मिलीलीटर", en: "40-50 ml" } }
    ],
    ingredients: {
      hi: ['1 बड़ा चम्मच धनिए के बीज (हल्के कुचले हुए)', 'आधा इंच ताज़ा अदरक का टुकड़ा (कटा हुआ)', '2 कप साफ़ पीने का पानी'],
      en: ['1 tbsp coriander seeds (lightly cracked)', '1/2 inch fresh ginger (sliced)', '2 cups clean drinking water']
    },
    preparation: {
      hi: 'एक पतीले में 2 कप पानी लें। उसमें हल्के कुचले हुए धनिए के बीज और कटा हुआ अदरक डाल दें। अब इसे तब तक उबालें जब तक कि पानी उबलकर आधा न रह जाए। आंच बंद कर दें और इसे ठंडा होने दें। जब पानी गुनगुना हो जाए, तो इसे छान लें।',
      en: 'Take 2 cups of water in a pot. Add cracked coriander seeds and ginger slices. Boil until the volume reduces to half. Turn off the heat and allow it to cool until lukewarm, then strain.'
    },
    usage: {
      hi: 'इस पाचक पानी को छानकर दिन में तीन बार सुबह, दोपहर और शाम को भोजन से आधा घंटा पहले घूंट-घूंट करके पिएं।\nअवधि: इसे लगातार 3 से 5 दिनों तक पिएं।',
      en: 'Drink this digestive water thrice daily—morning, noon, and evening—30 minutes before meals. Sip slowly. Duration: Use for 3 to 5 days.'
    },
    dietEat: { hi: 'भोजन: हल्का सुपाच्य भोजन जैसे मूँग दाल का पानी, उबली हुई लौकी, और ताज़ा बना हुआ गरम खाना।', en: 'Diet: Easily digestible food like Moong dal water, boiled bottle gourd, and fresh hot meals.' },
    dietAvoid: { hi: 'परहेज़: दूध, भारी घी, और मैदे से बनी भारी मिठाइयों का सेवन बुखार के दौरान बिल्कुल न करें।', en: 'Avoid: Milk, heavy ghee, and sweets made from refined flour during fever.' },
    strictAvoid: { hi: 'सख्त मनाही: खट्टी चीजें, अचार, और ठंडी ड्रिंक्स का सेवन पाचन को बिगाड़ सकता है।', en: 'Strict Avoid: Sour items, pickles, and cold drinks can worsen digestion.' },
    routine: {
      morning: { hi: 'सुबह: गुनगुना पानी और यह पाचक पानी लें। हल्का नाश्ता करें।', en: 'Morning: Take lukewarm water followed by this digestive water. Eat a light breakfast.' },
      afternoon: { hi: 'दोपहर: सादा दलिया और उबली सब्जियां।', en: 'Afternoon: Plain porridge and boiled vegetables.' },
      evening: { hi: 'शाम: सब्जियों का सादा सूप और जल्दी डिनर।', en: 'Evening: Plain vegetable soup and an early dinner.' }
    },
    safetyAdvice: { hi: 'यदि पाचन बहुत ज्यादा खराब हो और लगातार उल्टियां हों, तो तुरंत डॉक्टर से मिलें।', en: 'If digestion is severely compromised with continuous vomiting, consult a doctor immediately.' },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'digestion')?.imageUrl || "",
    keywords: "adrak dhania digestive water bukhar appetite"
  },
  {
    id: 'gf-3',
    serialNumber: '3',
    name: { hi: 'महासुदर्शन चूर्ण और शहद का योग', en: 'Mahasudarshan Churna and Honey Blend' },
    illnessId: 'general-fever',
    introduction: {
      hi: "महासुदर्शन चूर्ण आयुर्वेद का एक दिव्य और प्राचीन योग है जो सभी प्रकार के बुखारों के लिए सबसे प्रसिद्ध औषधि मानी जाती है। यह 50 से अधिक जड़ी-बूटियों का एक जटिल मिश्रण है। इसके कड़वे गुण पित्त दोष को शांत करते हैं, यकृत (Liver) की रक्षा करते हैं और खून से अशुद्धियों को बाहर निकालते हैं। यह शरीर के प्रतिरोधक तंत्र को मजबूत कर संक्रमण को जड़ से मिटाने में सक्षम है।",
      en: "Mahasudarshan Churna is a divine ancient Ayurvedic formulation and the most renowned remedy for all types of fever. A complex blend of over 50 herbs, its bitter properties balance Pitta, protect the liver, and purify the blood. It strengthens the immune system to eliminate infection at its root."
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "1-2 ग्राम (शहद के साथ मिलाकर)", en: "1-2g (blended with honey)" } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "3-5 ग्राम (गुनगुने पानी के साथ)", en: "3-5g (with lukewarm water)" } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "3-5 ग्राम", en: "3-5g" } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "2-3 ग्राम", en: "2-3g" } }
    ],
    ingredients: {
      hi: ['महासुदर्शन चूर्ण (किसी अच्छे ब्रांड का)', 'शुद्ध जैविक शहद'],
      en: ['Mahasudarshan Churna (reliable brand)', 'Pure Organic Honey']
    },
    preparation: { hi: 'तय मात्रा में चूर्ण को एक चम्मच शहद के साथ मिलाकर एक गाढ़ा पेस्ट बना लें।', en: 'Mix the prescribed amount of churna with a spoonful of honey to create a thick paste.' },
    usage: { hi: 'इस मिश्रण को दिन में दो बार, सुबह नाश्ते के बाद और शाम को भोजन के बाद लें।\nअवधि: बुखार पूरी तरह ठीक होने तक या 5 दिनों तक लें।', en: 'Take this blend twice daily, after breakfast and after dinner. Duration: Use until the fever subsides completely or for 5 days.' },
    dietEat: { hi: 'भोजन: मूँग दाल, पतली चपाती, और उबली हुई सब्जियां। ताज़ा फल जैसे पपीता खाएं।', en: 'Food: Moong dal, thin rotis, and boiled vegetables. Eat fresh fruits like papaya.' },
    dietAvoid: { hi: 'परहेज़: बहुत अधिक मसालेदार खाना, मिर्च, और तेल वाले आचार से बचें।', en: 'Avoid: Highly spicy food, chilies, and oily pickles.' },
    strictAvoid: { hi: 'सख्त मनाही: जंक फूड, कोल्ड ड्रिंक्स और बासी भोजन का सेवन बिल्कुल न करें।', en: 'Strict Avoid: Junk food, cold drinks, and stale food are completely prohibited.' },
    routine: {
      morning: { hi: 'सुबह: हल्का नाश्ता और चूर्ण का सेवन।', en: 'Morning: Light breakfast followed by churna consumption.' },
      afternoon: { hi: 'दोपहर: सात्विक और ताजा भोजन।', en: 'Afternoon: Sattvic and fresh lunch.' },
      evening: { hi: 'शाम: रात का भोजन जल्दी और हल्का रखें।', en: 'Evening: Keep dinner early and light.' }
    },
    safetyAdvice: { hi: 'गर्भवती महिलाएं और स्तनपान कराने वाली माताएं बिना चिकित्सक की सलाह के इसका सेवन न करें।', en: 'Pregnant and lactating mothers should not consume this without a physician\'s advice.' },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'vaidya-expert')?.imageUrl || "",
    keywords: "mahasudarshan churna honey fever jwar"
  },
  {
    id: 'gf-4',
    serialNumber: '4',
    name: { hi: 'किशमिश और मुनक्के का शीतल पानी', en: 'Cooling Water of Raisins and Munakka' },
    illnessId: 'general-fever',
    introduction: {
      hi: "तेज बुखार के समय जब शरीर में अत्यधिक जलन, प्यास और बेचैनी महसूस हो, तब मुनक्का और किशमिश का शीतल पानी एक वरदान की तरह काम करता है। मुनक्का शरीर की आंतरिक गर्मी (पित्त) को सोख लेता है और शरीर को तुरंत ऊर्जा (Glucose) प्रदान करता है। यह पेट को साफ़ करने में भी मदद करता है जो बुखार के दौरान अक्सर कब्ज की समस्या को दूर करता है।",
      en: "During high fever with intense burning, thirst, and restlessness, the cooling water of Munakka and raisins acts as a blessing. Munakka absorbs internal heat (Pitta) and provides instant glucose for energy. It also helps clear the bowels, addressing common fever-induced constipation."
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "4-5 मुनक्का का तैयार पानी", en: "Prepared water of 4-5 Munakka" } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "8-10 मुनक्का का तैयार पानी", en: "Prepared water of 8-10 Munakka" } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "8-10 मुनक्का का पानी", en: "Water of 8-10 Munakka" } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "6-8 मुनक्का का पानी", en: "Water of 6-8 Munakka" } }
    ],
    ingredients: {
      hi: ['मुनक्का (8-10 दाने, बीज निकले हुए)', 'किशमिश (10-12 दाने)', '1 गिलास पीने का शुद्ध पानी'],
      en: ['Munakka (8-10 seeds, de-seeded)', 'Raisins (10-12 seeds)', '1 glass pure drinking water']
    },
    preparation: { hi: 'मुनक्का और किशमिश को धोकर रात भर एक गिलास पानी में भिगो दें। सुबह इन दानों को उसी पानी में अच्छी तरह मसल लें और फिर छान लें।', en: 'Wash Munakka and raisins and soak them overnight in a glass of water. In the morning, mash them thoroughly into the same water and then strain.' },
    usage: { hi: 'इस तैयार पानी को सुबह खाली पेट पिएं। इसे धीरे-धीरे पिएं ताकि शरीर इसे अच्छे से सोख सके।\nअवधि: इसे लगातार 3 से 5 दिनों तक पिएं।', en: 'Drink this prepared water on an empty stomach in the morning. Sip slowly for better absorption. Duration: Use for 3 to 5 days.' },
    dietEat: { hi: 'भोजन: ठंडी तासीर वाले फल जैसे अनार और मौसमी फल खाएं।', en: 'Food: Eat cooling fruits like pomegranate and other seasonal fruits.' },
    dietAvoid: { hi: 'परहेज़: लाल मिर्च, गरम मसाला, और बहुत अधिक गरम चाय-कॉफी।', en: 'Avoid: Red chili, garam masala, and very hot tea or coffee.' },
    strictAvoid: { hi: 'सख्त मनाही: शराब, धूम्रपान और मांस का सेवन पूरी तरह वर्जित है।', en: 'Strict Avoid: Alcohol, smoking, and non-veg consumption are strictly prohibited.' },
    routine: {
      morning: { hi: 'सुबह: मुनक्का और किशमिश का पानी।', en: 'Morning: Munakka and raisin water.' },
      afternoon: { hi: 'दोपहर: हल्की मूंग दाल की खिचड़ी।', en: 'Afternoon: Light Moong dal khichdi.' },
      evening: { hi: 'शाम: उबले हुए फल और पर्याप्त आराम।', en: 'Evening: Boiled fruits and adequate rest.' }
    },
    safetyAdvice: { hi: 'मधुमेह (Diabetes) के रोगी इसकी मात्रा का विशेष ध्यान रखें या डॉक्टर से पूछकर ही लें।', en: 'Diabetic patients should monitor the quantity or consult a doctor before use.' },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'skincare')?.imageUrl || "",
    keywords: "kishmish munakka cooling water energy"
  },
  {
    id: 'gf-5',
    serialNumber: '5',
    name: { hi: 'दालचीनी और लौंग की स्वेदन चाय', en: 'Sweat-inducing Tea of Cinnamon and Clove' },
    illnessId: 'general-fever',
    introduction: {
      hi: "यदि बुखार में ठंड ज्यादा लग रही हो, कंपकंपी हो और पसीना नहीं आ रहा हो, तो यह दालचीनी और लौंग की चाय रामबाण है। यह शरीर की आंतरिक गर्मी को सक्रिय करती है और 'स्वेदन' (पसीना निकालने) की प्रक्रिया को शुरू करती है। जब शरीर से पसीना निकलता है, तो बुखार का वेग कम होने लगता है। इसमें मौजूद मसालों के तेल श्वसन तंत्र को भी साफ़ रखते हैं।",
      en: "If chills and shivering accompany fever with no sweating, this cinnamon and clove tea is a panacea. It activates internal body heat and initiates the process of 'Svedana' (sweating). As the body sweats, the intensity of the fever decreases. The essential oils in these spices also keep the respiratory system clear."
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "आधा कप (गरम-गरम)", en: "Half cup (served hot)" } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "एक पूरा कप", en: "One full cup" } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "एक पूरा कप", en: "One full cup" } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "आधा कप", en: "Half cup" } }
    ],
    ingredients: {
      hi: ['1 इंच दालचीनी का टुकड़ा (या आधा चम्मच पाउडर)', '2-3 साबुत लौंग', '1 बड़ा कप पानी'],
      en: ['1 inch cinnamon stick (or 1/2 tsp powder)', '2-3 whole cloves', '1 large cup water']
    },
    preparation: { hi: 'एक कप पानी में दालचीनी और लौंग डालकर अच्छी तरह उबालें जब तक पानी आधा न हो जाए। इसे उबालते समय ढक कर रखें ताकि मसालों के औषधीय तेल न उड़ें।', en: 'Boil cinnamon and cloves in a cup of water until reduced to half. Keep it covered while boiling to preserve the medicinal volatile oils.' },
    usage: { hi: 'इसे छानकर गर्म-गर्म पिएं। इसे पीने के तुरंत बाद चादर या कंबल ओढ़कर सो जाएं ताकि पसीना आए।\nअवधि: दिन में दो बार, 3 दिनों तक लें।', en: 'Strain and drink hot. Immediately after drinking, lie down and cover yourself with a blanket to induce sweating. Duration: Twice daily for 3 days.' },
    dietEat: { hi: 'भोजन: गर्म सब्जियां, अदरक वाली चाय, और ताज़ा बना सूप।', en: 'Food: Hot vegetables, ginger tea, and fresh soup.' },
    dietAvoid: { hi: 'परहेज़: आइसक्रीम, फ्रिज का पानी, और ठंडी दही।', en: 'Avoid: Ice cream, refrigerated water, and cold curd.' },
    strictAvoid: { hi: 'सख्त मनाही: ठंडी हवा में घूमना और गीले बालों में रहना।', en: 'Strict Avoid: Walking in cold drafts and keeping hair wet.' },
    routine: {
      morning: { hi: 'सुबह: दालचीनी चाय और हल्का नाश्ता।', en: 'Morning: Cinnamon tea and light breakfast.' },
      afternoon: { hi: 'दोपहर: गर्म मक्का या गेहूं की चपाती।', en: 'Afternoon: Hot corn or wheat chapatis.' },
      evening: { hi: 'शाम: गर्म दलिया और जल्दी नींद।', en: 'Evening: Hot porridge and early sleep.' }
    },
    safetyAdvice: { hi: 'गर्मी के मौसम में इसका अधिक सेवन न करें क्योंकि इसकी तासीर बहुत गर्म होती है।', en: 'Avoid over-consumption during summer due to its highly heating nature.' },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'respiratory')?.imageUrl || "",
    keywords: "dalchini laung tea sweat chills"
  },
  {
    id: 'gf-6',
    serialNumber: '6',
    name: { hi: 'अजवाइन, सोंठ और गुड़ का पसीना लाने वाला घरेलू काढ़ा', en: 'Sweat-Inducing Brew of Ajwain, Dry Ginger and Jaggery' },
    illnessId: 'general-fever',
    introduction: {
      hi: "यह काढ़ा विशेष रूप से उस बुखार में उपयोगी है जो ठंड के कारण होता है। अजवाइन और सोंठ मिलकर शरीर के अवरुद्ध रोमछिद्रों को खोलते हैं, जिससे पसीना आता है और शरीर का बढ़ा हुआ तापमान कम होने लगता है। गुड़ न केवल स्वाद बढ़ाता है बल्कि कमजोरी को दूर कर शरीर को खनिज भी प्रदान करता है। यह काढ़ा शरीर की रोग प्रतिरोधक क्षमता को भी बल देता है।",
      en: "This brew is specifically useful for fever caused by cold exposure. Ajwain and dry ginger work together to open blocked skin pores, inducing sweating and reducing the body temperature. Jaggery adds minerals and fights weakness while enhancing the taste. This brew also boosts the immune system."
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "2-3 बड़े चम्मच", en: "2-3 tbsp" } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "आधा कप", en: "Half cup" } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "आधा कप", en: "Half cup" } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "आधा कप", en: "Half cup" } }
    ],
    ingredients: {
      hi: ['आधा चम्मच अजवाइन (कुचली हुई)', 'आधा चम्मच सोंठ पाउडर (सूखा अदरक)', 'छोटा टुकड़ा पुराना गुड़', '1 ग्लास पीने का शुद्ध पानी'],
      en: ['1/2 tsp ajwain (crushed)', '1/2 tsp dry ginger powder (Saunth)', 'small piece of old jaggery', '1 glass pure drinking water']
    },
    preparation: { hi: 'सभी सामग्रियों को पानी में डालकर धीमी आंच पर तब तक उबालें जब तक पानी आधा न रह जाए। इसे छान लें और गुनगुना रहने दें।', en: 'Boil all ingredients in water on low heat until reduced to half. Strain and let it sit until lukewarm.' },
    usage: { hi: 'इसे हल्का गुनगुना पिएं। इसे पीने के बाद आराम करना बहुत ज़रूरी है।\nअवधि: दिन में दो बार, 3-5 दिनों तक।', en: 'Drink it slightly lukewarm. Resting after consumption is essential. Duration: Twice daily for 3-5 days.' },
    dietEat: { hi: 'भोजन: बाजरे या ज्वार की खिचड़ी, गर्म मांड निकाला हुआ चावल।', en: 'Food: Bajra or Jowar khichdi, hot rice with gruel removed.' },
    dietAvoid: { hi: 'परहेज़: दही, मट्ठा, और चावल का पानी (ठंडा होने पर)।', en: 'Avoid: Curd, buttermilk, and cold rice water.' },
    strictAvoid: { hi: 'सख्त मनाही: नंगे पैर ठंडी जमीन पर चलना।', en: 'Strict Avoid: Walking barefoot on cold floors.' },
    routine: {
      morning: { hi: 'सुबह: काढ़ा और उसके बाद पूर्ण आराम।', en: 'Morning: Brew followed by complete rest.' },
      afternoon: { hi: 'दोपहर: सात्विक और ताजा आहार।', en: 'Afternoon: Sattvic and fresh diet.' },
      evening: { hi: 'शाम: हल्का सूप और गुनगुना पानी।', en: 'Evening: Light soup and lukewarm water.' }
    },
    safetyAdvice: { hi: 'जिन लोगों को एसिडिटी (पित्त) की समस्या अधिक है, वे इसकी मात्रा कम रखें।', en: 'Individuals with high acidity (Pitta) should take this in smaller quantities.' },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'ayurveda-herbs')?.imageUrl || "",
    keywords: "ajwain saunth gud sweat fever"
  },
  {
    id: 'gf-7',
    serialNumber: '7',
    name: { hi: 'मेथी, सोंठ और भुने जीरे का घरेलू ज्वरनाशक चूर्ण', en: 'Fever-Reducing Powder of Methi, Ginger and Cumin' },
    illnessId: 'general-fever',
    introduction: {
      hi: "मेथी कफ और वात दोष को शांत करने के लिए जानी जाती है। सोंठ और जीरा मिलकर पाचन तंत्र को ठीक करते हैं और बुखार को जड़ से मिटाने में मदद करते हैं। यह चूर्ण भूख को पुनर्जीवित करता है और शरीर में हल्कापन लाता है। यह घर पर बनाने में आसान और बहुत ही प्रभावशाली औषधि है जो सदियों से भारतीय परिवारों में उपयोग की जा रही है।",
      en: "Fenugreek is known to pacify Kapha and Vata doshas. Ginger and cumin work together to correct the digestive system and help eradicate fever. This powder revives appetite and brings lightness to the body. It is an easy-to-make and highly effective remedy used in Indian households for centuries."
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "1 ग्राम (शहद के साथ)", en: "1g (with honey)" } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "3 ग्राम (गुनगुने पानी से)", en: "3g (with lukewarm water)" } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "3 ग्राम", en: "3g" } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "2 ग्राम", en: "2g" } }
    ],
    ingredients: {
      hi: ['मेथी दाना पाउडर (बारीक पीसा हुआ)', 'सोंठ पाउडर (सूखा अदरक)', 'भुना हुआ जीरा पाउडर (बराबर मात्रा में)'],
      en: ['Fenugreek seeds powder (finely ground)', 'Dry ginger powder', 'Roasted cumin powder (equal parts)']
    },
    preparation: { hi: 'तीनों सामग्रियों को बराबर वजन में लेकर एक साथ मिला लें और एक साफ़ कांच की शीशी में भर लें।', en: 'Mix equal weights of all three ingredients and store in a clean glass jar.' },
    usage: { hi: 'इस चूर्ण को गुनगुने पानी के साथ दिन में दो बार सुबह और शाम भोजन के बाद लें।\nअवधि: 5 से 7 दिनों तक नियमित लें।', en: 'Take this powder twice daily, morning and evening after meals, with lukewarm water. Duration: Use regularly for 5 to 7 days.' },
    dietEat: { hi: 'भोजन: ताजा बना भोजन और उबली हुई सब्जियां।', en: 'Food: Freshly cooked meals and boiled vegetables.' },
    dietAvoid: { hi: 'परहेज़: भारी तेल वाला खाना और गहरी तली चीजें।', en: 'Avoid: Oily heavy food and deep-fried items.' },
    strictAvoid: { hi: 'सख्त मनाही: पैकेट वाले ठंडे ड्रिंक्स।', en: 'Strict Avoid: Packaged cold drinks.' },
    routine: {
      morning: { hi: 'सुबह: चूर्ण और पर्याप्त गुनगुना पानी।', en: 'Morning: Powder and plenty of lukewarm water.' },
      afternoon: { hi: 'दोपहर: सादी मूँग दाल खिचड़ी।', en: 'Afternoon: Plain Moong dal khichdi.' },
      evening: { hi: 'शाम: रात को हल्का और जल्दी भोजन।', en: 'Evening: Early and light dinner.' }
    },
    safetyAdvice: { hi: 'इसे खाली पेट न लें, वरना पेट में जलन हो सकती है।', en: 'Do not take on an empty stomach, as it may cause gastric irritation.' },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'digestion')?.imageUrl || "",
    keywords: "methi saunth jeera churna fever"
  },
  {
    id: 'gf-8',
    serialNumber: '8',
    name: { hi: 'काली मिर्च, अदरक और तुलसी पत्र का तीखा ज्वरनाशक काढ़ा', en: 'Pungent Brew of Black Pepper, Ginger and Tulsi' },
    illnessId: 'general-fever',
    introduction: {
      hi: "यह काढ़ा संक्रमण और कफ को खत्म करने के लिए बहुत प्रभावी है। काली मिर्च की तेजी और अदरक की गर्माहट शरीर से जमे हुए दोषों को बाहर निकालती है। तुलसी के पत्ते एंटी-बैक्टीरियल और एंटी-वायरल गुणों से भरपूर होते हैं जो शरीर के तापमान को प्राकृतिक रूप से नियंत्रित करते हैं। यह गले की खराश और बुखार के कारण होने वाले भारीपन को भी दूर करता है।",
      en: "This brew is highly effective for eliminating infection and phlegm. The pungency of black pepper and the warmth of ginger clear out accumulated doshas. Tulsi leaves are rich in anti-bacterial and anti-viral properties that naturally regulate body temperature. It also relieves sore throat and the heaviness caused by fever."
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "10-20 मिलीलीटर", en: "10-20 ml" } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "30-50 मिलीलीटर", en: "30-50 ml" } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "30-50 मिलीलीटर", en: "30-50 ml" } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "30-40 मिलीलीटर", en: "30-40 ml" } }
    ],
    ingredients: {
      hi: ['3-4 काली मिर्च (कुचली हुई)', 'आधा इंच ताज़ा अदरक (कद्दूकस किया)', '10-12 ताज़ा तुलसी के पत्ते', '1 बड़ा ग्लास पानी'],
      en: ['3-4 Black peppercorns (crushed)', '1/2 inch fresh ginger (grated)', '10-12 fresh Tulsi leaves', '1 large glass water']
    },
    preparation: { hi: 'सबको पानी में डालकर तब तक उबालें जब तक पानी आधा न रह जाए। इसे अच्छी तरह दबाकर छान लें।', en: 'Add all ingredients to water and boil until reduced to half. Press the solids well while straining.' },
    usage: { hi: 'इसे छानकर हल्का गुनगुना पिएं। इसे दिन में दो बार सुबह और शाम लें।\nअवधि: 3 से 5 दिनों तक लें।', en: 'Strain and drink slightly lukewarm twice daily, morning and evening. Duration: Use for 3 to 5 days.' },
    dietEat: { hi: 'भोजन: हल्का सुपाच्य खाना जैसे मूंग दाल।', en: 'Food: Easily digestible light food like Moong dal.' },
    dietAvoid: { hi: 'परहेज़: बहुत अधिक भारी और ठंडा भोजन।', en: 'Avoid: Very heavy and cold food.' },
    strictAvoid: { hi: 'सख्त मनाही: मैदा और मैदे से बनी चीजें।', en: 'Strict Avoid: Refined flour and its products.' },
    routine: {
      morning: { hi: 'सुबह: औषधीय काढ़ा।', en: 'Morning: Medicinal brew.' },
      afternoon: { hi: 'दोपहर: सादी मूँग दाल और रोटी।', en: 'Afternoon: Plain Moong dal and roti.' },
      evening: { hi: 'शाम: गरमा-गरम सब्जी का सूप।', en: 'Evening: Piping hot vegetable soup.' }
    },
    safetyAdvice: { hi: 'यदि एसिडिटी या पेट में जलन महसूस हो, तो काली मिर्च की मात्रा कम कर दें।', en: 'If acidity or stomach burning occurs, reduce the quantity of black pepper.' },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'ayurveda-herbs')?.imageUrl || "",
    keywords: "kali mirch adrak tulsi brew fever"
  },
  {
    id: 'gf-9',
    serialNumber: '9',
    name: { hi: 'खस, धनिया और सोंठ का शीतल ज्वरनाशक हिम', en: 'Cooling Infusion of Khus, Coriander and Ginger' },
    illnessId: 'general-fever',
    introduction: {
      hi: "यदि बुखार बहुत तेज हो, पसीना न आ रहा हो और शरीर में भयंकर जलन हो, तो यह शीतल 'हिम' (Cold Infusion) शरीर की अतिरिक्त गर्मी को सोख लेता है। खस और धनिया की तासीर ठंडी होती है जो प्यास को शांत करती है और शरीर को अंदर से राहत देती है। यह नुस्खा विशेष रूप से पित्त-प्रधान बुखारों में बहुत ही उपयोगी सिद्ध होता है।",
      en: "For high fever with intense burning and lack of sweating, this cooling 'Hima' (cold infusion) absorbs excess body heat. Vetiver (Khus) and coriander have cooling properties that quench thirst and provide internal relief. This remedy is particularly effective for Pitta-dominant fevers."
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "आधा कप", en: "Half cup" } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "एक पूरा कप", en: "One full cup" } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "एक पूरा कप", en: "One full cup" } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "आधा कप", en: "Half cup" } }
    ],
    ingredients: {
      hi: ['खस की जड़ (छोटा टुकड़ा)', 'साबुत धनिया (1 चम्मच)', 'सोंठ (एक चुटकी)', 'मिट्टी का नया बर्तन और शुद्ध पानी'],
      en: ['Vetiver (Khus) root (small piece)', 'Whole coriander (1 tsp)', 'Dry ginger (a pinch)', 'New earthen pot and pure water']
    },
    preparation: { hi: 'एक मिट्टी के बर्तन में रात भर इन सामग्रियों को पानी में भिगोकर रखें। सुबह इसे अच्छी तरह मसलकर छान लें। यह ठंडी विधि से तैयार किया जाता है।', en: 'Soak all ingredients in an earthen pot overnight. In the morning, mash them well and strain. This is prepared using the cold extraction method.' },
    usage: { hi: 'इसे दिन में तीन बार थोड़ा-थोड़ा करके पिएं।\nअवधि: बुखार की गर्मी कम होने तक 2-3 दिनों तक।', en: 'Drink small portions thrice daily. Duration: Use for 2-3 days until the feverish heat subsides.' },
    dietEat: { hi: 'भोजन: तरबूज, अनार और ठंडी तासीर वाले ताजे फल।', en: 'Food: Watermelon, pomegranate, and other cooling fresh fruits.' },
    dietAvoid: { hi: 'परहेज़: सीधी तेज धूप और आग के पास बैठना।', en: 'Avoid: Direct strong sunlight and sitting near fire.' },
    strictAvoid: { hi: 'सख्त मनाही: शराब और मांसाहारी आहार।', en: 'Strict Avoid: Alcohol and non-veg diet.' },
    routine: {
      morning: { hi: 'सुबह: शीतल हिम का सेवन।', en: 'Morning: Intake of cooling infusion.' },
      afternoon: { hi: 'दोपहर: हल्का और ठंडा भोजन।', en: 'Afternoon: Light and cool meal.' },
      evening: { hi: 'शाम: ठंडे और शांत वातावरण में रहें।', en: 'Evening: Stay in a cool and calm environment.' }
    },
    safetyAdvice: { hi: 'यदि मरीज को ठंड लग रही हो या कफ जमा हो, तो यह शीतल हिम न लें।', en: 'Do not use if the patient is feeling chills or has heavy congestion.' },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'skincare')?.imageUrl || "",
    keywords: "khus dhania cooling infusion fever"
  },
  {
    id: 'gf-10',
    serialNumber: '10',
    name: { hi: 'बुखार के बाद की भयंकर कमजोरी मिटाकर शरीर में तुरंत ताकत लाने का घरेलू उपाय', en: 'Home Remedy for Post-Fever Weakness' },
    illnessId: 'general-fever',
    introduction: {
      hi: "बुखार उतरने के बाद अक्सर शरीर में भयंकर कमजोरी, थकान और अरुचि महसूस होती है। यह उपाय शरीर में तुरंत नई ऊर्जा और ताकत का संचार करने के लिए डिज़ाइन किया गया है। यह मांसपेशियों को पोषण देता है और शरीर की खोई हुई चमक और स्फूर्ति को वापस लाता है। इसमें शामिल खजूर और घी शरीर को गहरा पोषण प्रदान करते हैं जो पाचन पर भारी पड़े बिना पच जाते हैं।",
      en: "After the fever subsides, severe weakness, fatigue, and loss of interest are commonly felt. This remedy is designed to instantly infuse the body with new energy and strength. It nourishes the muscles and restores the body's lost vitality. The dates and ghee provide deep nourishment that is easily assimilated without burdening the digestion."
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "1-2 खजूर हल्के गरम दूध के साथ", en: "1-2 dates with lukewarm milk" } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "4-5 खजूर गरम दूध के साथ", en: "4-5 dates with hot milk" } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "4-5 खजूर दूध के साथ", en: "4-5 dates with milk" } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "3-4 खजूर दूध के साथ", en: "3-4 dates with milk" } }
    ],
    ingredients: {
      hi: ['पके हुए मुलायम खजूर (बीज निकले हुए)', 'शुद्ध देसी गाय का घी (1 चम्मच)', 'एक गिलास ताज़ा गाय का दूध'],
      en: ['Soft ripe dates (de-seeded)', 'Pure desi cow ghee (1 tsp)', 'One glass of fresh cow milk']
    },
    preparation: { hi: 'खजूर के छोटे टुकड़े कर लें। एक बर्तन में घी डालकर खजूर को हल्का सा भून लें। अब इसमें दूध डालकर एक उबाल आने तक गर्म करें।', en: 'Chop the dates into small pieces. Heat ghee in a pan and lightly roast the dates. Add milk and heat until it reaches a boil.' },
    usage: { hi: 'इसे रात को सोने से पहले गुनगुना पिएं और खजूर को चबा-चबाकर खाएं।\nअवधि: बुखार ठीक होने के बाद 7 से 10 दिनों तक लगातार लें।', en: 'Drink it lukewarm before bedtime and chew the dates thoroughly. Duration: Take for 7 to 10 consecutive days after the fever has subsided.' },
    dietEat: { hi: 'भोजन: पौष्टिक और संतुलित आहार, हरी पत्तेदार सब्जियां।', en: 'Food: Nutritious and balanced diet, green leafy vegetables.' },
    dietAvoid: { hi: 'परहेज़: भारी तली-भुनी चीजें और फास्ट फूड।', en: 'Avoid: Deep-fried oily items and fast food.' },
    strictAvoid: { hi: 'सख्त मनाही: अत्यधिक मानसिक और शारीरिक तनाव।', en: 'Strict Avoid: Excessive mental and physical stress.' },
    routine: {
      morning: { hi: 'सुबह: ताजी हवा में हल्की सैर।', en: 'Morning: Light walk in fresh air.' },
      afternoon: { hi: 'दोपहर: भरपूर पौष्टिक भोजन।', en: 'Afternoon: Full nutritious lunch.' },
      evening: { hi: 'शाम: यह खजूर वाला दूध लें और समय पर सोएं।', en: 'Evening: Take this dates milk and sleep on time.' }
    },
    safetyAdvice: { hi: 'मधुमेह (Diabetes) के रोगी खजूर की मात्रा कम रखें और डॉक्टर से सलाह लें।', en: 'Diabetic patients should limit dates and consult their doctor.' },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'vaidya-expert')?.imageUrl || "",
    keywords: "weakness post fever khajur strength"
  },

  // --- CATEGORY 2: नजला और जुकाम (LOCKED - DO NOT MODIFY) ---
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
      hi: 'भोजन: मूँग दाल की पतली खिचड़ी, साधारण रोटी-सब्जी। फल और सलाद: ताजा हल्का उबला हुआ सलाद (खीरा, गाजर) और अनुकूल फल (पपीता, सेब या अनार) अवश्य लें।',
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
      morning: { 
        hi: 'सुबह: गुनगुने पानी के साथ शुरुआत करें। नाश्ते में हल्का दलिया या सूजी का उपमा लें।', 
        en: 'Morning: Start with lukewarm water. Have light porridge or semolina Upma for breakfast.' 
      },
      afternoon: { 
        hi: 'दुपहर: मूँग दाल की खिचड़ी या साधारण रोटी-सब्जी। भोजन के साथ ताज़ा हल्का उबला हुआ सलाद (जैसे खीरा, गाजर) और इस मौसम के अनुकूल फल (जैसे पपीता, सेब या अनार) अवश्य लें।', 
        en: 'Afternoon: Moong dal khichdi or simple roti-vegetable. Must include fresh lightly boiled salad and seasonal fruits with the meal.' 
      },
      evening: { 
        hi: 'शाम/रात: रात का भोजन हल्का रखें (जैसे लौकी या तोरई की सब्जी और पतली रोटी)। रात में सलाद या फल का सेवन बिल्कुल न करें।', 
        en: 'Evening/Night: Keep dinner light (e.g., bottle gourd vegetable and thin roti). Do not consume salad or fruits at night.' 
      }
    },
    safetyAdvice: { 
      hi: 'सुरक्षा सूचना: यदि जुकाम के साथ तेज सिरदर्द हो, तो भाप (Steam) ज़रूर लें।', 
      en: 'Safety Notice: If cold is accompanied by severe headache, ensure you take steam inhalation.' 
    },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'respiratory')?.imageUrl || "",
    keywords: "sardi khansi cold cough sneezing cheekh nazla jukam respiratory"
  },
  {
    id: 'cc-2',
    serialNumber: '2',
    name: { hi: 'मुलेठी और काली मिर्च का औषधीय काढ़ा', en: 'Medicinal Decoction of Licorice and Black Pepper' },
    illnessId: 'common-cold',
    introduction: {
      hi: "आयुर्वेद में नजला और जुकाम को 'प्रतिश्याय' रोग कहा जाता है, जो मुख्य रूप से शरीर में कफ और वात दोष के असंतुलन तथा मंदाग्नि के कारण उत्पन्न होता है। बदलते मौसम में रोग प्रतिरोधक क्षमता कमजोर होने से वायरस का हमला तेजी से होता है। इसके कारण नाक से निरंतर पानी बहना, अत्यधिक छींकें आना, गले में दर्दभरी खराश, सिर में भारीपन और आंखों से पानी गिरने जैसी समस्याएं मरीज को परेशान कर देती हैं। मुलेठी और काली मिर्च का यह औषधीय काढ़ा श्वसन नली की सूजन को शांत करता है, छाती और फेफड़ों में जमे हुए गाढ़े कफ को पिघलाकर बाहर निकालता है और संक्रमण को जड़ से समाप्त कर शरीर को प्राकृतिक ऊर्जा प्रदान करता है।",
      en: "Common cold is known as 'Pratishyaya' in Ayurveda, caused by Kapha and Vata imbalance. This Mulethi and Black Pepper decoction calms respiratory inflammation, thins chest congestion, and eradicates infection at the root."
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "एक चौथाई कप (लगभग 20ml से 25ml)", en: "Quarter cup (approx. 20ml to 25ml)" } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "आधा कप (लगभग 50ml)", en: "Half a cup (approx. 50ml)" } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "आधा कप (लगभग 50ml)", en: "Half a cup (approx. 50ml)" } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "आधा कप (लगभग 40ml से 50ml)", en: "Half a cup (approx. 40ml to 50ml)" } }
    ],
    ingredients: {
      hi: ['1 इंच मुलेठी का टुकड़ा', '4-5 साबुत काली मिर्च (हल्की कुचली हुई)', '5-6 ताज़ा तुलसी के पत्ते', '2 कप साफ़ पीने का पानी'],
      en: ['1 inch Licorice (Mulethi) stick', '4-5 Whole black peppercorns (crushed)', '5-6 Fresh basil leaves', '2 cups clean drinking water']
    },
    preparation: {
      hi: 'दो कप पानी को किसी बर्तन में डालकर आंच पर रखें। उसमें मुलेठी का टुकड़ा, कुचली हुई काली मिर्च और तुलसी के पत्ते डाल दें। इसे मध्यम आंच पर तब तक अच्छी तरह उबालें जब तक कि दो कप पानी जलकर आधा (अर्थात 1 कप) न रह जाए। इसके बाद इसे आंच से उतारकर छान लें। आपका दिव्य औषधीय काढ़ा तैयार है।',
      en: 'Boil ingredients in 2 cups of water until reduced to 1 cup. Strain and serve.'
    },
    usage: {
      hi: 'विधि: इस छने हुए काढ़े को हमेशा हल्का गुनगुना (चाय की तरह धीरे-धीरे घूंट लेकर) सुबह और शाम को खाली पेट या भोजन करने के ठीक 1 घंटे बाद पिएं। अवधि: इस नुस्खे का सेवन लगातार 3 से 5 दिनों तक करें।',
      en: 'Sip warm like tea morning and evening on an empty stomach or 1 hour after meals. Duration: Use for 3 to 5 days.'
    },
    dietEat: {
      hi: 'भोजन: मूँग दाल की पतली खिचड़ी, बिना तेल-मसाले का सादा दलिया, सूजी का हल्का उपमा, गुनगुना पानी और ताज़ा गर्म सूप। फल और सलाद की मात्रा: दोपहर के भोजन के साथ 1 छोटी कटोरी (लगभग 100 ग्राम) ताज़ा हल्का उबला हुआ सलाद (जैसे भाप में पकी गाजर या खीरा) और इस बीमारी के अनुकूल आधा कप काटा हुआ पका पपीता या एक छोटा सेब छीलकर अवश्य खाएं।',
      en: 'Diet: Moong dal khichdi, oil-free porridge, semolina Upma, lukewarm water, hot soup. Include steamed carrots/cucumbers and papaya or peeled apple for lunch.'
    },
    dietAvoid: {
      hi: 'पैकेट वाले फूड्स: चिप्स, नमकीन, कुरकुरे, चाउमीन, बर्गर और मैदे से बने बिस्कुट पूरी तरह बंद रखें। भारी भोजन: किसी भी प्रकार का मांस, मछली, अंडा या भारी मांसाहारी भोजन और बाजार की तली-भुनी चीजें बिल्कुल न खाएं। ठंडी चीजें: फ्रिज का ठंडा पानी, कोल्ड ड्रिंक्स, दही, मट्ठा, खट्टी चीजें और आइसक्रीम का सेवन पूरी तरह वर्जित है।',
      en: 'Avoid: Packaged snacks, biscuits, heavy non-veg meals, fried foods, cold water, soda, curd, buttermilk, and ice cream.'
    },
    strictAvoid: {
      hi: 'पैकेट वाले तीखे स्नेक्स, भारी मांसाहार और फ्रिज की ठंडी चीजें पूरी तरह वर्जित हैं।',
      en: 'Strictly Avoid: Packaged spicy snacks, heavy meats, and refrigerated items.'
    },
    routine: {
      morning: { hi: 'सुबह: सुबह उठकर सबसे पहले 1-2 गिलास गुनगुना पानी पिएं। हल्के गर्म पानी से गरारे (Kulla) करें।', en: 'Morning: Start with 1-2 glasses of lukewarm water. Gargle with warm water.' },
      afternoon: { hi: 'दोपहर: दोपहर का भोजन हमेशा ताजा और गर्म ही करें। भोजन के तुरंत बाद पानी न पिएं, कम से कम आधा घंटा रुकें।', en: 'Afternoon: Eat fresh hot lunch. Wait 30 minutes before drinking water after meals.' },
      evening: { hi: 'शाम/रात: रात का भोजन बिल्कुल हल्का रखें और सूर्य अस्त के बाद 8 बजे तक हर हाल में कर लें। रात के समय सलाद या फल का सेवन भूलकर भी न करें। छाती और गले को हवा से बचाकर रखें और पूरी नींद लें।', en: 'Evening/Night: Eat light dinner by 8 PM. Avoid fruits/salad at night. Keep chest/throat protected from drafts.' }
    },
    safetyAdvice: { hi: 'यदि 5 दिनों में आराम न मिले तो चिकित्सक से सलाह लें।', en: 'Safety Notice: If no relief in 5 days, consult a doctor.' },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'respiratory')?.imageUrl || "",
    keywords: "nazla jukam mulethi kali mirch cough cold respiratory congestion pratishyaya"
  },
  {
    id: 'cc-3',
    serialNumber: '3',
    name: { hi: 'सोंठ और गुड़ का औषधीय चाटन', en: 'Medicinal Lick of Dry Ginger and Jaggery' },
    illnessId: 'common-cold',
    introduction: {
      hi: "आयुर्वेद में नजला-जुकाम का मुख्य कारण शरीर में कफ और वात दोष का बिगड़ना माना जाता है। इसके चलते नाक बहना, गले में कांटे जैसी चुभन, खांसी और सिरदर्द की समस्या मरीज को परेशान करती है। सोंठ और गुड़ का यह पारंपरिक चाटन शरीर में तुरंत गर्माहट लाता है। सोंठ अपने तीखे और गर्म गुणों से श्वसन मार्ग में जमे गाढ़े कफ को सुखाकर बाहर निकालती है, जबकि पुराना गुड़ गले की खराश दूर कर फेफड़ों को मजबूती देता है।",
      en: "In Ayurveda, the main cause of cold and flu is considered to be the disturbance of Kapha and Vata doshas in the body. This traditional lick of dry ginger and jaggery brings instant warmth. Dry ginger dries up thick phlegm in the respiratory tract with its pungent and hot properties, while old jaggery relieves sore throat and strengthens lungs."
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "आधा छोटा चम्मच (लगभग 2 से 3 ग्राम) सुबह और शाम को।", en: "Half a teaspoon (approx. 2 to 3 grams) morning and evening." } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "एक छोटा चम्मच (लगभग 5 से 6 ग्राम) सुबह और शाम को।", en: "One teaspoon (approx. 5 to 6 grams) morning and evening." } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "एक छोटा चम्मच (लगभग 5 से 6 ग्राम) सुबह और शाम को।", en: "One teaspoon (approx. 5 to 6 grams) morning and evening." } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "एक छोटा चम्मच (लगभग 4 से 5 ग्राम) सुबह और शाम को।", en: "One teaspoon (approx. 4 to 5 grams) morning and evening." } }
    ],
    ingredients: {
      hi: ['सोंठ का पाउडर (सूखा अदरक) — 20 ग्राम', 'पुराना देसी गुड़ — 50 ग्राम', 'शुद्ध गाय का घी — 1 चम्मच', 'कुचली हुई छोटी इलायची — 2 पीस'],
      en: ['Dry ginger powder (Saunth) — 20g', 'Old desi jaggery — 50g', 'Pure cow ghee — 1 teaspoon', 'Crushed green cardamom — 2 pieces']
    },
    preparation: {
      hi: 'सबसे पहले एक कढ़ाई या बर्तन में एक चम्मच गाय का घी डालकर धीमी आंच पर गर्म करें। अब उसमें कुचला हुआ गुड़ डालें और उसे पूरी तरह पिघलने दें। जब गुड़ पिघल जाए, तो आंच बंद कर दें और उसमें सोंठ का पाउडर व इलायची मिलाकर अच्छी तरह चलाएं। ठंडा होने पर इसे एक साफ़ कांच के बर्तन में सुरक्षित रख लें। आपका औषधीय अवलेह (चाटन) तैयार है।',
      en: 'Heat one teaspoon of cow ghee in a pan on low heat. Add crushed jaggery and let it melt completely. Once melted, turn off heat, add dry ginger powder and cardamom, and mix well. Once cool, store in a clean glass jar.'
    },
    usage: {
      hi: 'इस तैयार अवलेह (चटनी) को अपनी उम्र के अनुसार तय खुराक में लेकर सुबह खाली पेट और रात को सोने से ठीक पहले धीरे-धीरे चाटकर खाएं। ध्यान रखें, इसे खाने के बाद कम से कम 1 घंटे तक पानी बिल्कुल नहीं पीना है। अवधि: इस नुस्खे का सेवन लगातार 3 से 5 दिनों तक करें।',
      en: 'Take the prescribed dose based on age and lick it slowly on an empty stomach in the morning and just before bedtime. Note: Do not drink water for at least 1 hour after consuming. Duration: Use for 3 to 5 days.'
    },
    dietEat: {
      hi: 'भोजन: पुराना सादी मूँग दाल का सूप, ताज़ा गर्म बाजरे या मक्के की रोटी (कम मात्रा में), गर्म दलिया, और गुनगुना पानी। फल और सलाद की मात्रा: दोपहर के भोजन के साथ 1 छोटी कटोरी (लगभग 100 ग्राम) हल्के भाप में पके हुए सलाद (जैसे उबली गाजर) और सीजन के अनुसार आधा कटोरा काटा हुआ पका पपीता या एक सेब छीलकर खाएं।',
      en: 'Diet: Plain Moong dal soup, fresh hot Bajra or corn roti (small amount), hot porridge, and lukewarm water. For lunch, include 1 small bowl of steamed salad (like boiled carrots) and half a bowl of papaya or a peeled apple.'
    },
    dietAvoid: {
      hi: 'पैकेट वाले फूड्स: चिप्स, नमकीन, कुरकुरे, समोसा, कचौड़ी और मैदे से बने बिस्कुट पूरी तरह बंद रखें। भारी भोजन: किसी भी प्रकार का मांस, मछली, अंडा या भारी मांसाहारी भोजन, पनीर और उड़द की दाल का सेवन बिल्कुल न करें।',
      en: 'Avoid: Packaged snacks, deep-fried items, refined flour biscuits. Also avoid all non-veg, paneer, and Urad dal.'
    },
    strictAvoid: {
      hi: 'ठंडी चीजें: फ्रिज का पानी, कोल्ड ड्रिंक्स, गन्ने का रस, खट्टे फल, दही और आइसक्रीम का सेवन पूरी तरह वर्जित है।',
      en: 'Strictly Avoid: Cold water, sodas, sugarcane juice, sour fruits, curd, and ice cream.'
    },
    routine: {
      morning: { hi: 'सुबह: सुबह उठकर गुनगुना पानी पिएं। सोंठ और गुड़ के सेवन के तुरंत बाद खुली ठंडी हवा में बाहर न निकलें।', en: 'Morning: Drink lukewarm water. Avoid cold drafts immediately after consuming the remedy.' },
      afternoon: { hi: 'दोपहर: दोपहर का भोजन हमेशा गर्म-गर्म ही करें। भोजन के बाद छाछ या मट्ठा बिल्कुल न लें।', en: 'Afternoon: Always eat a hot lunch. Do not consume buttermilk after meals.' },
      evening: { hi: 'शाम/रात: रात का भोजन सूर्य अस्त के आसपास या 8 बजे तक हर हाल में कर लें। रात को सलाद या फल भूलकर भी न खाएं। सोते समय गले और छाती को सूती कपड़े या मफलर से ढककर रखें।', en: 'Evening/Night: Eat dinner by sunset or 8 PM. Avoid fruits/salad at night. Keep throat and chest covered with a cotton cloth or muffler while sleeping.' }
    },
    safetyAdvice: { hi: 'सुरक्षा सूचना: यदि 5 दिनों में आराम न मिले तो चिकित्सक से सलाह लें।', en: 'Safety Notice: If no relief in 5 days, consult a doctor.' },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'respiratory')?.imageUrl || "",
    keywords: "saunth gud jaggery cold jukam cough sardi pratishyaya"
  },
  {
    id: 'cc-4',
    serialNumber: '4',
    name: { hi: 'भुनी हुई हल्दी और गर्म दूध का योग', en: 'Blend of Roasted Turmeric and Warm Milk' },
    illnessId: 'common-cold',
    introduction: {
      hi: "नजला और जुकाम की स्थिति में जब कफ फेफड़ों और श्वसन नली में जम जाता है, तो सांस लेने में भारीपन और लगातार सूखी खांसी आने लगती है। आयुर्वेद में हल्दी को एक परम शक्तिशाली कफनाशक और एंटी-बायोटिक माना गया है। घी में भुनी हुई हल्दी जब गर्म दूध के साथ शरीर में जाती है, तो यह श्वसन मार्ग की सूजन को तुरंत कम करती है। यह नुस्खा छाती में जमे हुए कड़े बलगम को पिघलाकर बाहर निकालता है, रात को आने वाली खांसी के वेग को रोकता है और सर्दी के कारण होने वाले बदन दर्द में तुरंत आराम देता है।",
      en: "In conditions of cold and flu when phlegm accumulates in the lungs and respiratory tract, heaviness in breathing and continuous dry cough occur. Ayurveda considers turmeric a powerful Kapha-pacifier and antibiotic. Roasted turmeric in ghee with warm milk reduces inflammation of the respiratory tract instantly."
    },
    doses: [
      { 
        ageRange: AGE_BRACKETS.childhood, 
        dose: { hi: "आधा छोटा चम्मच (लगभग 2 से 3 ग्राम) भुनी हल्दी का पाउडर रात को सोने से पहले गर्म दूध के साथ।", en: "Half a teaspoon of roasted turmeric powder with warm milk before bedtime." },
        ingredients: {
          hi: [
            'भुनी हुई हल्दी का पाउडर — आधा छोटा चम्मच (लगभग 2 से 3 ग्राम)',
            'शुद्ध गाय का देसी घी — आधा छोटा चम्मच',
            'ताज़ा उबला हुआ गाय का दूध — आधा ग्लास (लगभग 100 से 150 मिली)'
          ],
          en: [
            'Roasted turmeric powder — half a teaspoon (approx. 2-3g)',
            'Pure cow ghee — half a teaspoon',
            'Fresh boiled cow milk — half a glass (approx. 100-150ml)'
          ]
        }
      },
      { 
        ageRange: AGE_BRACKETS.youth, 
        dose: { hi: "1 छोटा चम्मच (लगभग 5 से 6 ग्राम) भुनी हल्दी का पाउडर रात को सोने से पहले गर्म दूध के साथ।", en: "1 teaspoon of roasted turmeric powder with warm milk before bedtime." },
        ingredients: {
          hi: [
            'भुनी हुई हल्दी का पाउडर — 1 छोटा चम्मच (लगभग 5 से 6 ग्राम)',
            'शुद्ध गाय का देसी घी — 1 छोटा चम्मच',
            'ताज़ा उबला हुआ गाय का दूध — 1 बड़ा ग्लास (लगभग 200 मिली)'
          ],
          en: [
            'Roasted turmeric powder — 1 teaspoon (approx. 5-6g)',
            'Pure cow ghee — 1 teaspoon',
            'Fresh boiled cow milk — 1 large glass (approx. 200ml)'
          ]
        }
      },
      { 
        ageRange: AGE_BRACKETS.middleAge, 
        dose: { hi: "1 छोटा चम्मच (लगभग 5 से 6 ग्राम) भुनी हल्दी का पाउडर रात को सोने से पहले गर्म दूध के साथ।", en: "1 teaspoon of roasted turmeric powder with warm milk before bedtime." },
        ingredients: {
          hi: [
            'भुनी हुई हल्दी का पाउडर — 1 छोटा चम्मच (लगभग 5 से 6 ग्राम)',
            'शुद्ध गाय का देसी घी — 1 छोटा चम्मच',
            'ताज़ा उबला हुआ गाय का दूध — 1 बड़ा ग्लास (लगभग 200 मिली)'
          ],
          en: [
            'Roasted turmeric powder — 1 teaspoon (approx. 5-6g)',
            'Pure cow ghee — 1 teaspoon',
            'Fresh boiled cow milk — 1 large glass (approx. 200ml)'
          ]
        }
      },
      { 
        ageRange: AGE_BRACKETS.oldAge, 
        dose: { hi: "आधा छोटा चम्मच (लगभग 2 से 3 ग्राम) भुनी हल्दी का पाउडर रात को सोने से पहले गर्म दूध के साथ।", en: "Half a teaspoon of roasted turmeric powder with warm milk before bedtime." },
        ingredients: {
          hi: [
            'भुनी हुई हल्दी का पाउडर — आधा छोटा चम्मच (लगभग 2 से 3 ग्राम)',
            'शुद्ध गाय का देसी घी — आधा छोटा चम्मच',
            'ताज़ा उबला हुआ गाय का दूध — आधा ग्लास (लगभग 100 से 150 मिली)'
          ],
          en: [
            'Roasted turmeric powder — half a teaspoon (approx. 2-3g)',
            'Pure cow ghee — half a teaspoon',
            'Fresh boiled cow milk — half a glass (approx. 100-150ml)'
          ]
        }
      }
    ],
    ingredients: {
      hi: ['हल्दी पाउडर (शुद्ध)', 'शुद्ध गाय का घी', 'ताज़ा गाय का दूध'],
      en: ['Turmeric powder (Pure)', 'Pure cow ghee', 'Fresh cow milk']
    },
    preparation: {
      hi: "उम्र के अनुसार ऊपर बताई गई मात्रा में हल्दी पाउडर और घी लें। एक छोटे तवे पर घी डालकर धीमी आंच पर हल्दी को 1 से 2 मिनट के लिए भून लें, जब तक सोंधी खुशबू न आने लगे। अब दूध को अच्छे से उबाल लें।",
      en: "Take the amount of turmeric and ghee as per age. Put ghee on a small pan and roast turmeric on low heat for 1-2 minutes until a pleasant aroma arises. Boil the milk well."
    },
    usage: {
      hi: "विधि: रोजाना रात को सोने से ठीक पहले, गर्म दूध में अपनी उम्र के अनुसार तय की गई यह भुनी हुई हल्दी का पाउडर मिलाएं और अच्छी तरह घोलकर चाय की तरह धीरे-धीरे पिएं। इसके सेवन के बाद पानी बिल्कुल नहीं पीना है।\nअवधि: इस नुस्खे का नियमित सेवन लगातार 3 से 5 दिनों तक करें।",
      en: "Method: Daily just before bedtime, mix this roasted turmeric powder into warm milk according to age and sip slowly like tea. Do not drink water after this.\nDuration: Use regularly for 3 to 5 days."
    },
    dietEat: {
      hi: "भोजन: मूंग की दाल की खिचड़ी, गर्म बाजारे की राबड़ी, सोंठ और तुलसी डली हुई सादी चाय, और गुनगुना पानी कराएं।\nफल और सलाद की मात्रा: दोपहर के भोजन के साथ 1 छोटी कटोरी (लगभग 100 ग्राम) हल्के उबले हुए सलाद (जैसे उबली हुई शलजम या गाजर) और सीजन के अनुसार आधा कप काटा हुआ पका पपीता खा सकते हैं।",
      en: "Diet: Moong dal khichdi, hot Bajra Rabri, plain tea with dry ginger and basil, and lukewarm water. For lunch, eat 1 small bowl of steamed salad (e.g., boiled turnip or carrot) and half a cup of ripe papaya."
    },
    dietAvoid: {
      hi: "पैकेट वाले फूड्स: तली-भुनी चीजें, समोसे, नमकीन, बिस्कुट, बेकरी प्रोडक्ट्स और मैदे से बनी चीजें सख़्ती से बंद रखें।\nभारी भोजन: उड़द की दाल, अरबी, चावल, पनीर, मिठाई, मांसाहारी भोजन और अंडे का सेवन बिल्कुल न करें।\nठंडी चीजें: फ्रिज का ठंडा पानी, आइसक्रीम, कोल्ड ड्रिंक्स, दही, मट्ठा और खट्टे फलों का सेवन पूरी तरह वर्जित है।",
      en: "Avoid: Fried foods, samosas, snacks, biscuits, bakery products, and refined flour items. Do not consume Urad dal, Arbi, rice, paneer, sweets, non-veg, or eggs. Strictly avoid cold water, ice cream, sodas, curd, and sour fruits."
    },
    strictAvoid: {
      hi: "ठंडी चीजें, भारी मांसाहार और पैकेट वाले स्नेक्स पूरी तरह वर्जित हैं।",
      en: "Cold items, heavy non-veg, and packaged snacks are strictly prohibited."
    },
    routine: {
      morning: { hi: "सुबह (Morning): सुबह उठकर सबसे पहले थोड़ा गर्म पानी पिएं और नमक डालकर गुनगुने पानी से गरारे करें।", en: "Morning: Drink warm water and gargle with lukewarm salt water." },
      afternoon: { hi: "दोपहर (Afternoon): दोपहर का खाना हमेशा ताजा and गर्म ही खाएं, बासी भोजन भूलकर भी न लें।", en: "Afternoon: Always eat fresh and hot lunch; never eat stale food." },
      evening: { hi: "शाम/रात (Evening/Night): रात का भोजन 8 बजे से पहले कर लें। सोते समय सिर and कानों को ढककर रखें and रात को भूलकर भी पंखे की तेज हवा या एसी में न सोएं।", en: "Evening/Night: Eat dinner before 8 PM. Keep head and ears covered while sleeping; avoid direct air from fans or AC at night." }
    },
    safetyAdvice: { hi: "यदि इस उपाय को लगातार 5 दिनों तक नियम से करने के बाद भी आपको आराम महसूस न हो, तो बिना देर किए अपने नजदीकी आयुर्वेदिक चिकित्सक से मिलकर उचित परामर्श लें। शरीर का ध्यान रखना ही सबसे पहली प्राथमिकता है।", en: "If you don't find relief after 5 days, consult an Ayurvedic physician immediately. Taking care of your body is the first priority." },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'respiratory')?.imageUrl || "",
    keywords: "haldi dudh turmeric milk cough sardi khansi respiratory throat pain"
  },
  {
    id: 'cc-5',
    serialNumber: '5',
    name: { hi: 'सोंठ, दालचीनी और छोटी इलायची का गुनगुना काढ़ा', en: 'Warm Decoction of Dry Ginger, Cinnamon and Cardamom' },
    illnessId: 'common-cold',
    introduction: {
      hi: "नजला और जुकाम के पुराने हो जाने पर जब नाक के अंदर की श्लेष्मा झिल्ली (Mucous Membrane) में सूजन आ जाती है, तो लगातार पानी बहना या नाक पूरी तरह बंद होना जैसी समस्या होती है। आयुर्वेद के अनुसार सोंठ और दालचीनी तीखे और गर्म स्वभाव के होते हैं, जो शरीर में कफ दोष को शांत करते हैं। यह काढ़ा बंद नाक और बंद साइनस के रास्तों को तुरंत खोलता है, सिर के भारीपन को दूर करता है और सर्दी के कारण होने वाले हल्के बुखार और बदन दर्द को जड़ से मिटाता है।",
      en: "When cold and flu become chronic and the mucous membrane inside the nose becomes inflamed, problems like continuous runny nose or completely blocked nose occur. According to Ayurveda, dry ginger and cinnamon are pungent and hot in nature, which pacify Kapha dosha. This decoction immediately opens blocked nose and sinus passages, removes head heaviness, and eradicates mild fever and body pain caused by cold."
    },
    doses: [
      { 
        ageRange: AGE_BRACKETS.childhood, 
        dose: { hi: "सुबह खाली पेट और शाम को चाय की जगह धीरे-धीरे सिप लेकर पिएं।", en: "Drink slowly morning empty stomach and evening instead of tea." },
        ingredients: {
          hi: [
            'सोंठ का पाउडर (सूखा अदरक) — आधा छोटा चम्मच (लगभग 1 से 2 gram)',
            'दालचीनी का पाउडर या छोटा टुकड़ा — आधा छोटा चम्मच',
            'हरी या छोटी इलायची — 1 पीस (कुचली हुई)',
            'शुद्ध शहद — आधा छोटा चम्मच (काढ़ा गुनगुना होने पर मिलाने के लिए)',
            'पीने का साफ पानी — 1 कप (लगभग 150 मिली)'
          ],
          en: [
            'Dry ginger powder — half a teaspoon (approx. 1-2g)',
            'Cinnamon powder or stick — half a teaspoon',
            'Green cardamom — 1 piece (crushed)',
            'Pure honey — half a teaspoon (to be mixed when lukewarm)',
            'Clean drinking water — 1 cup (approx. 150ml)'
          ]
        }
      },
      { 
        ageRange: AGE_BRACKETS.youth, 
        dose: { hi: "सुबह खाली पेट और शाम को चाय की जगह धीरे-धीरे सिप लेकर पिएं।", en: "Drink slowly morning empty stomach and evening instead of tea." },
        ingredients: {
          hi: [
            'सोंठ का पाउडर (सूखा अदरक) — 1 छोटा चम्मच (लगभग 3 से 4 gram)',
            'दालचीनी का पाउडर या छोटा टुकड़ा — 1 छोटा चम्मच',
            'हरी या छोटी इलायची — 2 पीस (कुचली हुई)',
            'शुद्ध शहद — 1 छोटा चम्मच (काढ़ा गुनगुना होने पर मिलाने के लिए)',
            'पीने का साफ पानी — 1 बड़ा ग्लास (लगभग 250 मिली)'
          ],
          en: [
            'Dry ginger powder — 1 teaspoon (approx. 3-4g)',
            'Cinnamon powder or stick — 1 teaspoon',
            'Green cardamom — 2 pieces (crushed)',
            'Pure honey — 1 teaspoon (to be mixed when lukewarm)',
            'Clean drinking water — 1 large glass (approx. 250ml)'
          ]
        }
      },
      { 
        ageRange: AGE_BRACKETS.middleAge, 
        dose: { hi: "सुबह खाली पेट और शाम को चाय की जगह धीरे-धीरे सिप लेकर पिएं।", en: "Drink slowly morning empty stomach and evening instead of tea." },
        ingredients: {
          hi: [
            'सोंठ का पाउडर (सूखा अदरक) — 1 छोटा चम्मच (लगभग 3 से 4 gram)',
            'दालचीनी का पाउडर या छोटा टुकड़ा — 1 छोटा चम्मच',
            'हरी या छोटी इलायची — 2 पीस (कुचली हुई)',
            'शुद्ध शहद — 1 छोटा चम्मच (काढ़ा गुनगुना होने पर मिलाने के लिए)',
            'पीने का साफ पानी — 1 बड़ा ग्लास (लगभग 250 मिली)'
          ],
          en: [
            'Dry ginger powder — 1 teaspoon (approx. 3-4g)',
            'Cinnamon powder or stick — 1 teaspoon',
            'Green cardamom — 2 pieces (crushed)',
            'Pure honey — 1 teaspoon (to be mixed when lukewarm)',
            'Clean drinking water — 1 large glass (approx. 250ml)'
          ]
        }
      },
      { 
        ageRange: AGE_BRACKETS.oldAge, 
        dose: { hi: "सुबह खाली पेट और शाम को चाय की जगह धीरे-धीरे सिप लेकर पिएं।", en: "Drink slowly morning empty stomach and evening instead of tea." },
        ingredients: {
          hi: [
            'सोंठ का पाउडर (सूखा अदरक) — आधा छोटा चम्मच (लगभग 1 से 2 gram)',
            'दालचीनी का पाउडर या छोटा टुकड़ा — आधा छोटा चम्मच',
            'हरी या छोटी इलायची — 1 पीस (कुचली हुई)',
            'शुद्ध शहद — आधा छोटा चम्मच (काढ़ा गुनगुना होने पर मिलाने के लिए)',
            'पीने का साफ पानी — 1 कप (लगभग 150 मिली)'
          ],
          en: [
            'Dry ginger powder — half a teaspoon (approx. 1-2g)',
            'Cinnamon powder or stick — half a teaspoon',
            'Green cardamom — 1 piece (crushed)',
            'Pure honey — half a teaspoon (to be mixed when lukewarm)',
            'Clean drinking water — 1 cup (approx. 150ml)'
          ]
        }
      }
    ],
    ingredients: {
      hi: ['सोंठ का पाउडर (सूखा अदरक)', 'दालचीनी का पाउडर या छोटा टुकड़ा', 'हरी या छोटी इलायची', 'शुद्ध शहद', 'पीने का साफ पानी'],
      en: ['Dry ginger powder', 'Cinnamon powder or stick', 'Green cardamom', 'Pure honey', 'Clean drinking water']
    },
    preparation: {
      hi: "एक बर्तन में पानी डालें और उसमें अपनी उम्र के अनुसार तय मात्रा में सोंठ, दालचीनी और कुचली हुई इलायची डाल दें। अब इसे धीमी आंच पर तब तक उबालें जब तक कि पानी उबलकर आधा न रह जाए। इसके बाद आंच बंद कर दें और काढ़े को छानकर हल्का गुनगुना होने के लिए रख दें। जब काढ़ा पीने लायक गुनगुना हो जाए, तब उसमें शहद मिलाएं।",
      en: "Add water to a vessel and put the prescribed amount of dry ginger, cinnamon and crushed cardamom as per your age. Now boil it on low flame until the water is reduced to half. After this, turn off the flame and strain the decoction and keep it to become lukewarm. When the decoction becomes lukewarm enough to drink, then add honey to it."
    },
    usage: {
      hi: "इस काढ़े को सुबह खाली पेट और शाम को चाय की जगह पर धीरे-धीरे सिप लेकर (चाय की तरह) पिएं। ध्यान रहे कि शहद हमेशा काढ़ा गुनगुना होने पर ही मिलाएं, उबलते हुए गर्म काढ़े में नहीं।\nइस काढ़े का नियमित सेवन लगातार 3 से 5 दिनों तक करें।",
      en: "Drink this decoction slowly sipping (like tea) in the morning on an empty stomach and in the evening instead of tea. Keep in mind that honey should always be mixed only when the decoction is lukewarm, not in boiling hot decoction.\nUse this decoction regularly for 3 to 5 days."
    },
    dietEat: {
      hi: "भोजन: पुराने चावल की पतली मांड या मांड निकाला हुआ गर्म भात, मूंग दाल का सूप, उबले हुए चने का पानी, और गुनगुना पानी।\nफल और सलाद की मात्रा: दोपहर के भोजन के साथ 1 छोटी कटोरी (लगभग 100 ग्राम) हल्के उबला हुए सलाद (जैसे उबली हुई लौकी या तरोई) खा सकते हैं। कच्चे फल पूरी तरह बंद रखें।",
      en: "Food: Thin gruel of old rice or hot cooked rice with gruel removed, Moong dal soup, boiled gram water, and lukewarm water. For lunch, you can eat 1 small bowl of lightly boiled salad (like boiled bottle gourd or sponge gourd). Keep raw fruits completely off."
    },
    dietAvoid: {
      hi: "पैकेट वाले फूड्स: चिप्स, कुरकुरे, समोसे, कचौड़ी, बिस्कुट, ब्रेड and मैदे से बनी चीजें पूरी तरह से बंद रखें।\nभारी भोजन: राजमा, छोले, पनीर, मलाई, मिठाई, मांसाहारी भोजन and रात के समय भारी दालें न खाएं।\nठंडी चीजें: ठंडा पानी, गन्ने का रस, खट्टा नींबू, दही, छाछ, and फ्रिज में रखा हुआ बासी भोजन बिल्कुल न लें।",
      en: "Packaged foods: Keep chips, snacks, samosas, kachoris, biscuits, bread and items made of refined flour completely off. Heavy food: Do not eat kidney beans, chickpeas, paneer, cream, sweets, non-vegetarian food and heavy pulses at night. Cold things: Do not take cold water, sugarcane juice, sour lemon, curd, buttermilk, and stale food kept in the fridge at all."
    },
    strictAvoid: {
      hi: "ठंडी चीजें, भारी मांसाहार and पैकेट वाले स्नेक्स पूरी तरह वर्जित हैं।",
      en: "Cold items, heavy non-veg, and packaged snacks are strictly prohibited."
    },
    routine: {
      morning: { hi: "सुबह (Morning): सुबह उठकर तुलसी के पत्तों की भाप (Steam) लें और नाक में दो-दो बूंद अणु तेल या सरसों का तेल डालें।", en: "Morning: Take steam of basil leaves after waking up in the morning and put two drops of Anu oil or mustard oil in the nose." },
      afternoon: { hi: "दोपहर (Afternoon): दोपहर में गर्म and सुपाच्य भोजन लें और खाने के तुरंत बाद पानी न पिएं।", en: "Afternoon: Take hot and easily digestible food in the afternoon and do not drink water immediately after eating." },
      evening: { hi: "शाम/रात (Evening/Night): रात का भोजन सूर्यास्त के आसपास या रात 8 बजे से पहले कर लें। सोते समय छाती पर थोड़ा सा गुनगुना सरसों का तेल मलें and खुली हवा या पंखे के नीचे सीधे न सोएं।", en: "Evening/Night: Take dinner around sunset or before 8 pm. Rub a little lukewarm mustard oil on the chest while sleeping and do not sleep directly under open air or fan." }
    },
    safetyAdvice: { hi: "यदि इस उपाय को लगातार 5 दिनों तक नियम से करने के बाद भी आपको आराम महसूस न हो, तो बिना देर किए अपने नजदीकी आयुर्वेदिक चिकित्सक से मिलकर उचित परामर्श लें। शरीर का ध्यान रखना ही सबसे पहली प्राथमिकता है।", en: "If you don't feel relief even after doing this remedy regularly for 5 consecutive days, then consult your nearest Ayurvedic physician for proper advice without delay. Taking care of the body is the first priority." },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'respiratory')?.imageUrl || "",
    keywords: "sardi khansi cold cough sinus nazla jukam saunth dalchini"
  },
  {
    id: 'cc-6',
    serialNumber: '6',
    name: { hi: 'सर्दी-जुकाम, बदन दर्द और हरारत बुखार नाशक काढ़ा', en: 'Relief Decoction for Cold, Body Ache and Fever' },
    illnessId: 'common-cold',
    introduction: {
      hi: "जब मौसम बदलने के कारण अचानक सर्दी, ज़ुकाम, बदन में भयंकर टूटन (दर्द) और हल्की हरारत (ऐसा लगना जैसे बुखार आने वाला है) तीनों समस्याएं एक साथ हमला करती हैं, तो शरीर की रोग प्रतिरोधक क्षमता कमजोर पड़ जाती है। ऐसी स्थिति में यह पारंपरिक घरेलू काढ़ा रामबाण की तरह काम करता है। सोंठ और काली मिर्च मिलकर शरीर के भीतर जमे हुए कफ और वात दोष को शांत करते हैं जिससे बदन का दर्द तुरंत ठीक होता है। तुलसी के दिव्य औषधीय गुण हरारत और जुकाम के वायरस को जड़ से खत्म करते हैं।",
      en: "When weather changes bring cold, intense body ache, and mild feverishness together, the immune system weakens. This traditional decoction works like a panacea. Dry ginger and black pepper calm the accumulated Kapha and Vata doshas, while Tulsi's medicinal properties eradicate the cold virus."
    },
    doses: [
      { 
        ageRange: AGE_BRACKETS.childhood, 
        dose: { hi: "रोजाना सुबह खाली पेट और रात को सोने से पहले।", en: "Daily morning on an empty stomach and before bedtime." },
        ingredients: {
          hi: [
            'सोंठ का पाउडर (सूखा अदरक) — आधा छोटा चम्मच (लगभग 1 से 2 gram)',
            'ताज़ा तुलसी के पत्ते — 4 से 5 पीस (साफ धुले हुए)',
            'साबुत काली मिर्च का पाउडर — 2 दाने (बारीक कुचले हुए)',
            'पुराना साफ़ गुड़ — 10 gram (एक छोटा टुकड़ा)',
            'पीने का साफ पानी — 1 कप (लगभग 150 मिली)'
          ],
          en: [
            'Dry ginger powder — half a teaspoon (approx. 1-2g)',
            'Fresh Tulsi leaves — 4 to 5 pieces (washed)',
            'Whole black pepper powder — 2 grains (finely crushed)',
            'Old clean jaggery — 10g (small piece)',
            'Clean drinking water — 1 cup (approx. 150ml)'
          ]
        }
      },
      { 
        ageRange: AGE_BRACKETS.youth, 
        dose: { hi: "रोजाना सुबह खाली पेट और रात को सोने से पहले।", en: "Daily morning on an empty stomach and before bedtime." },
        ingredients: {
          hi: [
            'सोंठ का पाउडर (सूखा अदरक) — 1 छोटा चम्मच (लगभग 3 से 4 gram)',
            'ताज़ा तुलसी के पत्ते — 8 से 10 पीस (साफ धुले हुए)',
            'साबुत काली मिर्च का पाउडर — 4 से 5 दाने (बारीक कुचले हुए)',
            'पुराना साफ़ गुड़ — 20 gram (एक मध्यम टुकड़ा)',
            'पीने का साफ पानी — 1 बड़ा ग्लास (लगभग 250 मिली)'
          ],
          en: [
            'Dry ginger powder — 1 teaspoon (approx. 3-4g)',
            'Fresh Tulsi leaves — 8 to 10 pieces (washed)',
            'Whole black pepper powder — 4 to 5 grains (finely crushed)',
            'Old clean jaggery — 20g (medium piece)',
            'Clean drinking water — 1 large glass (approx. 250ml)'
          ]
        }
      },
      { 
        ageRange: AGE_BRACKETS.middleAge, 
        dose: { hi: "रोजाना सुबह खाली पेट और रात को सोने से पहले।", en: "Daily morning on an empty stomach and before bedtime." },
        ingredients: {
          hi: [
            'सोंठ का पाउडर (सूखा अदरक) — 1 छोटा चम्मच (लगभग 3 से 4 gram)',
            'ताज़ा तुलसी के पत्ते — 8 से 10 पीस (साफ धुले हुए)',
            'साबुत काली मिर्च का पाउडर — 4 से 5 दाने (बारीक कुचले हुए)',
            'पुराना साफ़ गुड़ — 20 gram (एक मध्यम टुकड़ा)',
            'पीने का साफ पानी — 1 बड़ा ग्लास (लगभग 250 मिली)'
          ],
          en: [
            'Dry ginger powder — 1 teaspoon (approx. 3-4g)',
            'Fresh Tulsi leaves — 8 to 10 pieces (washed)',
            'Whole black pepper powder — 4 to 5 grains (finely crushed)',
            'Old clean jaggery — 20g (medium piece)',
            'Clean drinking water — 1 large glass (approx. 250ml)'
          ]
        }
      },
      { 
        ageRange: AGE_BRACKETS.oldAge, 
        dose: { hi: "रोजाना सुबह खाली पेट और रात को सोने से पहले।", en: "Daily morning on an empty stomach and before bedtime." },
        ingredients: {
          hi: [
            'सोंठ का पाउडर (सूखा अदरक) — आधा छोटा चम्मच (लगभग 1 से 2 gram)',
            'ताज़ा तुलसी के पत्ते — 4 से 5 पीस (साफ धुले हुए)',
            'साबुत काली मिर्च का पाउडर — 2 दाने (बारीक कुचले हुए)',
            'पुराना साफ़ गुड़ — 10 gram (एक छोटा टुकड़ा)',
            'पीने का साफ पानी — 1 कप (लगभग 150 मिली)'
          ],
          en: [
            'Dry ginger powder — half a teaspoon (approx. 1-2g)',
            'Fresh Tulsi leaves — 4 to 5 pieces (washed)',
            'Whole black pepper powder — 2 grains (finely crushed)',
            'Old clean jaggery — 10g (small piece)',
            'Clean drinking water — 1 cup (approx. 150ml)'
          ]
        }
      }
    ],
    ingredients: {
      hi: ['सोंठ का पाउडर (सूखा अदरक)', 'ताज़ा तुलसी के पत्ते', 'साबुत काली मिर्च का पाउडर', 'पुराना साफ़ गुड़', 'पीने का साफ पानी'],
      en: ['Dry ginger powder', 'Fresh Tulsi leaves', 'Whole black pepper powder', 'Old clean jaggery', 'Clean drinking water']
    },
    preparation: {
      hi: "एक बर्तन में अपनी उम्र के अनुसार तय की गई मात्रा में पानी डालें। अब उसमें तुलसी के पत्तों को हाथ से तोड़कर डालें, साथ ही सोंठ का पाउडर, कुचली हुई काली मिर्च और गुड़ डाल दें। अब आंच को धीमा रखें और इसे तब तक उबलने दें जब तक कि यह उबलकर आधा न रह जाए। जब काढ़ा आधा बचे, तो आंच बंद कर दें और इसे कप में छान लें।",
      en: "Add water to a vessel according to age. Add hand-torn Tulsi leaves, dry ginger powder, crushed black pepper and jaggery. Boil on low heat until water reduces to half. Strain into a cup."
    },
    usage: {
      hi: "इस काढ़े को छानने के बाद हल्का गुनगुना (चाय की तरह गर्म) रहते हुए ही धीरे-धीरे सिप लेकर पिएं। इसे पीने के तुरंत बाद शरीर पर चादर या कंबल ओढ़कर सो जाएं ताकि पसीना आए। पसीना आते ही हरारत और बदन दर्द गायब हो जाएगा। इसके बाद 1 घंटे तक हवा में न निकलें।\nअवधि: इस काढ़े का नियमित सेवन रोजाना सुबह खाली पेट और रात को सोने से पहले, लगातार 3 से 5 दिनों तक करें।",
      en: "Sip warm decoction slowly. Immediately cover yourself with a blanket to induce sweating, which helps relieve feverishness and pain. Avoid drafts for 1 hour. Duration: Consume morning and night for 3 to 5 days."
    },
    dietEat: {
      hi: "भोजन और गर्म सूप: मूंग की दाल का गर्म सूप पिएं। ताकत के लिए ताजा पका हुआ टमाटर, अदरक और काली मिर्च का गर्म सूप (1 छोटा बाउल यानी लगभग 150 मिली) शाम को ले सकते हैं, यह बहुत फायदेमंद है। इसके अलावा सोंठ-अजवाइन डाल कर बनाई हुई पतली खिचड़ी, सादी गर्म रोटी और गुनगुना पानी ही लें।\nसलाद की मात्रा: हरारत और जुकाम की स्थिति में कच्चे फल और ठंडे जूस पूरी तरह वर्जित हैं। सलाद के रूप में दोपहर के भोजन के साथ 1 छोटी कटोरी (लगभग 100 ग्राम) हल्के उबले हुए गर्म सलाद (जैसे भाप में पकी हुई गाजर या शलजम) पर हल्का सा सेंधा नमक छिड़क कर खा सकते हैं।",
      en: "Diet: Moong dal soup, hot tomato-ginger-pepper soup (150ml) in the evening. Eat thin khichdi with dry ginger and carom seeds. Drink lukewarm water. Salad: Steamed warm carrots/turnips with rock salt. Avoid raw fruits and juices."
    },
    dietAvoid: {
      hi: "पैकेट वाले फूड्स: बाजार के चिप्स, कुरकुरे, नमकीन, समोसे, तली-भुनी चीजें, बिस्कुट और मैदे से बने सामान सख़्ती से बंद रखें।\nभारी भोजन: उड़द की दाल, चावल, पनीर, मिठाई, भारी तड़का लगा हुआ भोजन और मांसाहार का सेवन बिल्कुल न करें।\nठंडी चीजें और जूस: फ्रिज का ठंडा पानी, फलों के ठंडे जूस, कोल्ड ड्रिंक्स, आइसक्रीम, दही, मट्ठा और कच्चे खट्टे फल पूरी तरह वर्जित हैं।",
      en: "Avoid: Packaged snacks, fried items, refined flour products. Avoid Urad dal, rice, paneer, sweets, spicy food, and non-veg. Strictly avoid cold water, cold juices, sodas, ice cream, curd, and sour fruits."
    },
    strictAvoid: {
      hi: "ठंडी चीजें और जूस, भारी मांसाहार और पैकेट वाले स्नेक्स पूरी तरह वर्जित हैं।",
      en: "Cold items, juices, heavy non-veg, and packaged snacks are strictly prohibited."
    },
    routine: {
      morning: { hi: "सुबह (Morning): सुबह उठकर गुनगुने पानी में थोड़ा सा सेंधा नमक डालकर गरारे करें और गर्म पानी की भाप लें।", en: "Morning: Gargle with warm salt water and take steam inhalation." },
      afternoon: { hi: "दोपहर (Afternoon): दोपहर का खाना हमेशा ताजा और गर्म ही करें, बासी भोजन भूलकर भी न छुएं।", en: "Afternoon: Always eat fresh hot lunch; never eat stale food." },
      evening: { hi: "शाम/रात (Evening/Night): रात का भोजन 8 बजे से पहले खा लें। सोते समय अपने सिर, कान और छाती को सूती कपड़े या मफलर से ढककर रखें और पंखे की तेज हवा के नीचे सीधे न सोएं।", en: "Evening/Night: Eat dinner before 8 PM. Keep head, ears, and chest covered with cotton cloth or muffler while sleeping. Avoid direct air from fans." }
    },
    safetyAdvice: { hi: "यदि इस उपाय को लगातार 3 से 5 दिनों तक नियम से करने के बाद भी आपकी हरारत, जुकाम, बुखार और बदन दर्द में राहत महसूस न हो, तो बिना देर किए अपने नजदीकी आयुर्वेदिक चिकित्सक से मिलकर उचित परामर्श लें। शरीर को सुरक्षित रखना ही हमारी सबसे पहली प्राथमिकता है।", en: "If no relief after 3-5 days, consult an Ayurvedic physician immediately. Body safety is the top priority." },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'respiratory')?.imageUrl || "",
    keywords: "sardi jukam badan dard hararat bukhar tulsi saunth kali mirch"
  }
];
