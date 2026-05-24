import { PlaceHolderImages } from "./placeholder-images";

export type LocalizedString = {
  hi: string;
  en: string;
};

export type DoseConfig = {
  ageRange: LocalizedString;
  dose: LocalizedString;
};

export type Remedy = {
  id: string;
  serialNumber: string;
  name: LocalizedString;
  illnessId: string;
  introduction: LocalizedString;
  severity: 'mild' | 'moderate' | 'severe';
  severityLabel: LocalizedString;
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
};

export const CATEGORIES = [
  { id: 'fever', label: 'मौसमी बुखार एवं फ्लू', icon: 'Thermometer', image: PlaceHolderImages.find(i => i.id === 'respiratory')?.imageUrl },
  { id: 'joints', label: 'घुटनों का दर्द', icon: 'Accessibility', image: PlaceHolderImages.find(i => i.id === 'joint-pain')?.imageUrl },
  { id: 'respiratory', label: 'खांसी और सर्दी', icon: 'Wind', image: PlaceHolderImages.find(i => i.id === 'respiratory')?.imageUrl },
  { id: 'digestion', label: 'पाचन', icon: 'Stomach', image: PlaceHolderImages.find(i => i.id === 'digestion')?.imageUrl },
];

const GENERAL_DISCLAIMER: LocalizedString = {
  hi: "यह जानकारी केवल शैक्षिक उद्देश्य के लिए है, कृपया अपने चिकित्सक से सलाह ज़रूर लें।",
  en: "This information is for educational purposes only, please consult your physician."
};

const AGE_BRACKETS = {
  childhood: { hi: "5-12 वर्ष (बाल्यावस्था)", en: "5-12 Years (Childhood)" },
  youth: { hi: "13-40 वर्ष (पूर्ण युवावस्था)", en: "13-40 Years (Youth)" },
  middleAge: { hi: "41-60 वर्ष (प्रौढ़ावस्था)", en: "41-60 Years (Middle Age)" },
  oldAge: { hi: "61-80 वर्ष (वृद्धावस्था)", en: "61-80 Years (Old Age)" }
};

export const REMEDIES: Remedy[] = [
  {
    id: 'gf-1',
    serialNumber: '१',
    name: {
      hi: '१. तुलसी और गिलोय का दिव्य अमृत काढ़ा',
      en: '1. Divine Amrit Decoction of Tulsi and Giloy'
    },
    illnessId: 'general-fever',
    introduction: {
      hi: "जब शरीर का तापमान सामान्य से अधिक हो जाता है, तो उसे सामान्य बुखार कहते हैं। आयुर्वेद में इसे 'ज्वर' कहा जाता है, जो मुख्य रूप से अनुचित खान-पान, मौसम के अचानक बदलाव या शरीर में संचित टॉक्सिंस (आमदोष) के कारण मंदाग्नि होने से होता है। यह शरीर की रक्षा प्रणाली है जो बाहरी संक्रमण से लड़ती है।",
      en: "When the body temperature rises above normal, it is called a general fever. In Ayurveda, it is known as 'Jvara', primarily caused by improper diet, sudden weather changes, or accumulated toxins (Aamdosha) leading to weakened digestion (Mandagni)."
    },
    severity: 'moderate',
    severityLabel: {
      hi: '🟡 हल्का से मध्यम बुखार (Mild to Moderate)',
      en: '🟡 Mild to Moderate Fever'
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "5 से 10 मिलीलीटर", en: "5 to 10 ml" } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "20 से 30 मिलीलीटर", en: "20 to 30 ml" } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "15 से 20 मिलीलीटर", en: "15 to 20 ml" } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "10 से 15 मिलीलीटर (हल्के गुनगुने पानी के साथ)", en: "10 to 15 ml (with lukewarm water)" } }
    ],
    ingredients: {
      hi: ['7-8 ताजी तुलसी की पत्तियां', '3-4 इंच गिलोय की डंडी (कुचली हुई)', '2-3 साबुत काली मिर्च', '1 छोटा टुकड़ा अदरक'],
      en: ['7-8 fresh Tulsi leaves', '3-4 inches Giloy stick (crushed)', '2-3 whole black peppercorns', '1 small piece of ginger']
    },
    preparation: {
      hi: 'एक गिलास पानी में कुचली हुई गिलोय, तुलसी, काली मिर्च और अदरक डालकर धीमी आंच पर तब तक उबालें जब तक पानी आधा गिलास न रह जाए। फिर इसे छान लें।',
      en: 'Add crushed Giloy, Tulsi, black pepper, and ginger into a glass of water. Boil it on low heat until the water reduces to half a glass. Strain it.'
    },
    usage: {
      hi: 'इस काढ़े को हल्का गुनगुना करके सुबह और शाम को खाली पेट (भोजन करने से 1 घंटे पहले) चाय की तरह धीरे-धीरे सिप लेकर पिएं।',
      en: 'Drink this decoction warm twice a day, in the morning and evening on an empty stomach (1 hour before meals), sipping it slowly like tea.'
    },
    dietEat: {
      hi: 'मूंग की पतली खिचड़ी, दलिया, उबले हुए सेब का गूदा (बिना छिलके का), गुनगुना पानी। फायदेमंद फल: अनार और पपीता। फायदेमंद सलाद: खीरा (कम मात्रा में) और उबली हुई लौकी-तोरई।',
      en: 'Thin Moong dal khichdi, porridge, boiled apple pulp (without skin), lukewarm water. Beneficial Fruits: Pomegranate and Papaya. Beneficial Salad: Cucumber (in small amounts) and boiled Bottle Gourd/Sponge Gourd.'
    },
    dietAvoid: {
      hi: 'ठंडा पानी, फ्रिज का खाना, तली-भुनी चीजें, मैदा, भारी भोजन और दूध।',
      en: 'Cold water, refrigerated food, fried items, refined flour (Maida), heavy meals, and milk.'
    },
    strictAvoid: {
      hi: 'पैकेट वाली चीजें (चिप्स, बिस्कुट), प्रोसेस्ड फूड, कोल्ड ड्रिंक्स और बाजार का डिब्बा-बंद सूप।',
      en: 'Packaged items (chips, biscuits), processed food, cold drinks, and market-bought canned soups.'
    },
    routine: {
      morning: {
        hi: 'सुबह: नाश्ते में केवल उबला हुआ सेब या मूंग की दाल का हल्का पानी लें।',
        en: 'Morning: For breakfast, have only boiled apple or light Moong dal water.'
      },
      afternoon: {
        hi: 'दोपहर: अच्छी तरह पकी हुई मूंग की दाल की पतली खिचड़ी खाएं। साथ में थोड़ा सा अनार खाएं।',
        en: 'Afternoon: Eat well-cooked thin Moong dal khichdi along with some pomegranate.'
      },
      evening: {
        hi: 'शाम/रात: सूरज ढलने के आसपास हल्का दलिया या उबली हुई सब्जियों का सूप लें। रात को भारी खाना बिल्कुल न खाएं। शरीर को पूरा आराम दें।',
        en: 'Evening/Night: Have light porridge or boiled vegetable soup around sunset. Avoid heavy food at night. Give the body complete rest.'
      }
    },
    safetyAdvice: {
      hi: 'सुरक्षा सूचना: यदि बुखार 3 दिन से अधिक रहे या तापमान 102°F से ऊपर चला जाए, तो तुरंत डॉक्टर से संपर्क करें।',
      en: 'Safety Notice: If the fever persists for more than 3 days or the temperature exceeds 102°F, consult a doctor immediately.'
    },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'ayurveda-herbs')?.imageUrl || ""
  },
  {
    id: 'gf-2',
    serialNumber: '२',
    name: {
      hi: '२. अदरक और धनिए के बीजों का पाचक पानी',
      en: '2. Digestive Water of Ginger and Coriander Seeds'
    },
    illnessId: 'general-fever',
    introduction: {
      hi: "बुखार के शुरुआती दिनों में भूख एकदम मर जाती है और पाचन क्रिया ठप हो जाती है, जिसे आयुर्वेद में 'आमदोष' कहा जाता है। धनिया और अदरक का यह पाचक पानी पेट की अग्नि को जगाकर बुखार को अंदर से सुखाता है।",
      en: "During the initial days of fever, appetite is completely lost and digestion shuts down, known as 'Aamdosha' in Ayurveda. This digestive water of coriander and ginger kindles the stomach fire and dries up the fever from within."
    },
    severity: 'mild',
    severityLabel: {
      hi: '🟢 शुरुआती या बहुत हल्का बुखार (Mild)',
      en: '🟢 Early or Very Mild Fever'
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "2 से 3 चम्मच", en: "2 to 3 teaspoons" } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "आधा कप (लगभग 50 मिलीलीटर)", en: "Half a cup (approx. 50 ml)" } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "4 से 5 चम्मच (गुनगुने पानी में मिश्रित)", en: "4 to 5 teaspoons (mixed in lukewarm water)" } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "3 चम्मच (हल्का गुनगुना)", en: "3 teaspoons (mildly warm)" } }
    ],
    ingredients: {
      hi: ['2 चम्मच खड़े धनिए के बीज (साबुत धनिया)', 'आधा चम्मच कद्दूकस किया हुआ अदरक', '2 गिलास पानी'],
      en: ['2 teaspoons whole coriander seeds', 'half a teaspoon grated ginger', '2 glasses of water']
    },
    preparation: {
      hi: 'दो गिलास पानी में धनिया के बीज और अदरक डालकर उबालें। जब पानी उबलकर एक गिलास रह जाए, तो छानकर रख लें।',
      en: 'Boil coriander seeds and ginger in two glasses of water. When the water reduces to one glass, strain and store it.'
    },
    usage: {
      hi: 'इसे दिन में तीन बार—सुबह, दोपहर और शाम को भोजन करने के आधे घंटे बाद (भरा पेट) थोड़ा-थोड़ा गुनगुना करके पिएं।',
      en: 'Drink this three times a day—morning, afternoon, and evening, half an hour after meals (full stomach), keeping it slightly warm.'
    },
    dietEat: {
      hi: 'साबूदाना खिचड़ी, मूंग दाल का सूप। फायदेमंद फल: पका हुआ पपीता और मौसंबी का रस (बिना बर्फ और नमक के)। फायदेमंद सलाद: उबला हुआ चुकंदर और गाजर का हल्का सूप।',
      en: 'Sabudana Khichdi, Moong dal soup. Beneficial Fruits: Ripe papaya and sweet lime juice (without ice or salt). Beneficial Salad: Boiled beetroot and light carrot soup.'
    },
    dietAvoid: {
      hi: 'खट्टे फल, दही, छाछ, आइसक्रीम और ठंडी चीजें।',
      en: 'Sour fruits, curd, buttermilk, ice cream, and cold things.'
    },
    strictAvoid: {
      hi: 'पैकेट वाले नूडल्स, पास्ता, मैदा से बनी ब्रेड, बिस्कुट और नमकीन जैसी प्रोसेस्ड चीजें।',
      en: 'Packaged noodles, pasta, white bread, biscuits, and processed salty snacks.'
    },
    routine: {
      morning: {
        hi: 'सुबह: नाश्ते में गुनगुने पानी के साथ थोड़े से भीगे हुए मुनक्के लें।',
        en: 'Morning: Take a few soaked raisins (Munakka) with lukewarm water for breakfast.'
      },
      afternoon: {
        hi: 'दोपहर: सादे उबले चावल और मूंग की पतली दाल लें। साथ में थोड़ा पपीता खाएं।',
        en: 'Afternoon: Have plain boiled rice and thin Moong dal along with some papaya.'
      },
      evening: {
        hi: 'शाम/रात: लौकी या तोरई की सादी उबली सब्जी और एक पतली फुल्का रोटी (बिना घी की)। रात को जल्दी सोएं।',
        en: 'Evening/Night: Simple boiled bottle gourd or sponge gourd vegetable with one thin chapati (without ghee). Go to sleep early.'
      }
    },
    safetyAdvice: {
      hi: 'सुरक्षा सूचना: शुगर के मरीज बिना डॉक्टर की सलाह के अत्यधिक अदरक का सेवन न करें।',
      en: 'Safety Notice: Diabetic patients should not consume excessive ginger without consulting a doctor.'
    },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'digestion')?.imageUrl || ""
  },
  {
    id: 'gf-3',
    serialNumber: '३',
    name: {
      hi: '३. महासुदर्शन चूर्ण और शहद का योग',
      en: '3. Mahasudarshan Churna and Honey Blend'
    },
    illnessId: 'general-fever',
    introduction: {
      hi: "जब पुराना बुखार शरीर के अंदर बैठ जाता है, जिसे 'जीर्ण ज्वर' कहते हैं, या शरीर में हरारत और बदन टूटना लगातार बना रहता है, तब महासुदर्शन चूर्ण शरीर के कोने-कोने से छिपे हुए बुखार को बाहर निकालता है।",
      en: "When old fever settles deep into the body, known as chronic fever ('Jirna Jvara'), or body aches and exhaustion persist continuously, Mahasudarshan Churna flushes out the hidden fever from every corner of the body."
    },
    severity: 'severe',
    severityLabel: {
      hi: '🔴 तेज या पुराना बुखार (Moderate to Severe)',
      en: '🔴 Moderate to Severe Chronic Fever'
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "1 चुटकी (लगभग 250 मिलीग्राम) शहद के साथ", en: "1 pinch (approx. 250 mg) with honey" } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "2 से 3 ग्राम (आधा से 1 छोटा चम्मच)", en: "2 to 3 grams (half to 1 teaspoon)" } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "1.5 से 2 ग्राम (आधा छोटा चम्मच)", en: "1.5 to 2 grams (half teaspoon)" } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "1 ग्राम (सीमित मात्रा में, गुनगुने पानी से)", en: "1 gram (limited dose, with lukewarm water)" } }
    ],
    ingredients: {
      hi: ['आयुर्वेदिक महासुदर्शन चूर्ण', '1 चम्मच शुद्ध शहद'],
      en: ['Ayurvedic Mahasudarshan Churna', '1 teaspoon pure honey']
    },
    preparation: {
      hi: 'तय मात्रा के अनुसार चूर्ण को एक चम्मच शहद में अच्छी तरह मिलाकर पेस्ट बना लें।',
      en: 'Mix the recommended quantity of churna thoroughly into a teaspoon of honey to form a smooth paste.'
    },
    usage: {
      hi: 'इसे सुबह और शाम को खाना खाने के आधे घंटे बाद (भरा पेट) चाटें और ऊपर से आधा गिलास हल्का गुनगुना पानी पिएं।',
      en: 'Lick this paste twice a day, morning and evening, half an hour after meals (full stomach), and follow it with half a glass of lukewarm water.'
    },
    dietEat: {
      hi: 'परवल की सब्जी, लौकी की सब्जी, सादा सुपाच्य भोजन। फायदेमंद फल: सेब (छिलका उतारकर कद्दूकस किया हुआ) और अनार के दाने। फायदेमंद सलाद: उबले हुए पत्तागोभी और टमाटर का हल्का सलाद (भाप में पका हुआ)।',
      en: 'Pointed gourd (Parwal) vegetable, bottle gourd vegetable, simple easily digestible meals. Beneficial Fruits: Peeled and grated apple, and pomegranate seeds. Beneficial Salad: Light steamed cabbage and tomato salad.'
    },
    dietAvoid: {
      hi: 'मिठाई, तेज मसाले, घी, तेल, नया चावल और ज्यादा नमक वाला खाना।',
      en: 'Sweets, hot spices, ghee, oil, newly harvested rice, and heavily salted food.'
    },
    strictAvoid: {
      hi: 'पैकेट बंद नमकीन, रेडी-टू-ईट भोजन, इंस्टेंट सूप और प्रिजर्वेटिव वाले जूस।',
      en: 'Packaged savory snacks, ready-to-eat meals, instant commercial soups, and juices with preservatives.'
    },
    routine: {
      morning: {
        hi: 'सुबह: नाश्ते में पतली लापसी (दलिया) या उबला हुआ सेब लें।',
        en: 'Morning: Have thin sweet porridge (Daliya) or a boiled apple for breakfast.'
      },
      afternoon: {
        hi: 'दोपहर: मूंग की दाल और परवल की सादी सब्जी के साथ एक या दो पतली चपाती।',
        en: 'Afternoon: One or two thin chapatis with Moong dal and simple pointed gourd vegetable.'
      },
      evening: {
        hi: 'शाम/रात: रात का खाना 7 बजे से पहले खा लें, जिसमें सिर्फ मूंग की दाल का पानी या हल्का सूप हो। दिन में सोने से बचें।',
        en: 'Evening/Night: Have dinner before 7 PM, consisting only of Moong dal water or light soup. Avoid sleeping during the day.'
      }
    },
    safetyAdvice: {
      hi: 'सुरक्षा सूचना: यह चूर्ण स्वाद में बहुत कड़वा होता है। बुजुर्गों और बच्चों को देते समय शहद की मात्रा थोड़ी बढ़ाई जा सकती है।',
      en: 'Safety Notice: This powder is very bitter in taste. The quantity of honey can be slightly increased when giving it to children and the elderly.'
    },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'vaidya-expert')?.imageUrl || ""
  },
  {
    id: 'gf-4',
    serialNumber: '४',
    name: {
      hi: '४. किशमिश और मुनक्के का शीतल पानी',
      en: '4. Cooling Infusion of Raisins and Munakka'
    },
    illnessId: 'general-fever',
    introduction: {
      hi: "तेज बुखार और पित्त बढ़ने के कारण जब शरीर में बहुत तेज जलन होने लगती है, आँखें लाल हो जाती हैं, अत्यधिक प्यास लगती है और भयंकर कमजोरी महसूस होती है, तो यह उपाय शरीर की अत्यधिक गर्मी (पित्त) को तुरंत शांत करता है।",
      en: "When high fever or elevated Pitta causes intense burning sensations in the body, red eyes, excessive thirst, and severe weakness, this remedy instantly calms down the body's excessive heat (Pitta)."
    },
    severity: 'moderate',
    severityLabel: {
      hi: '🟡 मध्यम से तेज बुखार (Moderate)',
      en: '🟡 Moderate to High Fever'
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "4 से 5 चम्मच", en: "4 to 5 teaspoons" } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "आधा गिलास पानी (सामान्य तापमान पर)", en: "Half a glass of water (at room temperature)" } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "आधा कप पानी", en: "Half a cup of water" } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "4 चम्मच पानी (बिना ठंडा किए)", en: "4 teaspoons of water (unrefrigerated)" } }
    ],
    ingredients: {
      hi: ['10-12 पीस मुनक्का (बीज निकाले हुए)', '1 छोटा चम्मच सौंफ', '1 गिलास पानी'],
      en: ['10-12 pieces of Munakka (seeded)', '1 teaspoon fennel seeds', '1 glass of water']
    },
    preparation: {
      hi: 'रात में एक गिलास साफ पानी में मुनक्का और सौंफ को भिगोकर रख दें। सुबह मुनक्के को उसी पानी में हाथ से अच्छी तरह मसल लें और फिर पानी को छान लें।',
      en: 'Soak Munakka and fennel seeds in a glass of clean water overnight. In the morning, mash the raisins thoroughly into the same water with clean hands and strain the water.'
    },
    usage: {
      hi: 'इस पानी को बिना गर्म किए सामान्य तापमान पर सुबह खाली पेट और शाम को (चाय के समय, खाली पेट) पिएं।',
      en: 'Drink this infusion without heating it, at room temperature, in the morning on an empty stomach and in the evening (around tea time, empty stomach).'
    },
    dietEat: {
      hi: 'नारियल पानी, जौ का सत्तू। फायदेमंद फल: मीठा अनार, पका हुआ केला (यदि खांसी न हो) और तरबूज-खरबूजा। फायदेमंद सलाद: कच्ची ककड़ी, खीरा और कद्दूकस की हुई गाजर।',
      en: 'Coconut water, barley Sattu. Beneficial Fruits: Sweet pomegranate, ripe banana (if no cough), and watermelon/muskmelon. Beneficial Salad: Raw snake cucumber, field cucumber, and grated carrot.'
    },
    dietAvoid: {
      hi: 'गरम मसाले, लाल मिर्च, चाय, कॉफी, लहसुन और प्याज।',
      en: 'Hot spices, red chili, tea, coffee, garlic, and onions.'
    },
    strictAvoid: {
      hi: 'पैकेट वाले तीखे और मसालेदार चिप्स, कुरकुरे, तली हुई डिब्बाबंद पूरियां या कचौड़ी और अचार।',
      en: 'Packaged spicy and hot chips, snacks, deep-fried store-bought Puris or Kachoris, and pickles.'
    },
    routine: {
      morning: {
        hi: 'सुबह: खाली पेट यह मुनक्के का पानी पिएं। एक घंटे बाद जौ का हल्का दलिया लें।',
        en: 'Morning: Drink this Munakka water on an empty stomach. Eat light barley porridge an hour later.'
      },
      afternoon: {
        hi: 'दोपहर: सादे चावल, मूंग की दाल और तोरई की सब्जी। साथ में ककड़ी-खीरे का सलाद खाएं।',
        en: 'Afternoon: Plain rice, Moong dal, and sponge gourd vegetable along with cucumber salad.'
      },
      evening: {
        hi: 'शाम/रात: कद्दू की सादी सब्जी और दो पतली रोटी। रात को सोने से पहले सिर पर सामान्य पानी की सूती पट्टी रखें।',
        en: 'Evening/Night: Plain pumpkin vegetable and two thin chapatis. Place a wet cotton cloth strip on the forehead before sleeping.'
      }
    },
    safetyAdvice: {
      hi: 'सुरक्षा सूचना: मुनक्का और सौंफ का पानी मीठा होता है, इसलिए डायबिटीज (शुगर) के रोगी मुनक्के की संख्या आधी रखें।',
      en: 'Safety Notice: Since Munakka and fennel water is naturally sweet, diabetes patients should reduce the number of raisins by half.'
    },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'ayurveda-herbs')?.imageUrl || ""
  },
  {
    id: 'gf-5',
    serialNumber: '५',
    name: {
      hi: '५. दालचीनी और लौंग का स्वेदन चाय',
      en: '5. Sudorific Cinnamon and Clove Tea'
    },
    illnessId: 'general-fever',
    introduction: {
      hi: "जब बुखार ठंड लगकर आता है, पूरा शरीर थर-थर कांप रहा हो या जोड़ों में भयंकर जकड़न हो, तब यह गरम तासीर का उपाय शरीर के भीतर तुरंत अग्नि पैदा करता है, रोम-छिद्रों को खोलता है और भरपूर पसीना लाकर बुखार को शरीर से बाहर ढकेलता है।",
      en: "When fever sets in with shivering chills, severe body shaking, or extreme joint stiffness, this warm-potency tea immediately generates internal heat, opens skin pores, and induces sweating to drive the fever out of the body."
    },
    severity: 'moderate',
    severityLabel: {
      hi: '🟡 ठंड के साथ हल्का बुखार (Mild to Moderate)',
      en: '🟡 Mild to Moderate Fever with Chills'
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "5 मिलीलीटर (1 छोटा चम्मच)", en: "5 ml (1 teaspoon)" } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "आधा कप (चाय की तरह गरम-गरम)", en: "Half a cup (piping hot like tea)" } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "30 मिलीलीटर (गुनगुनी हालत में)", en: "30 ml (in warm state)" } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "15 से 20 मिलीलीटर (हल्का गुनगुना)", en: "15 to 20 ml (mildly warm)" } }
    ],
    ingredients: {
      hi: ['1 छोटा टुकड़ा दालचीनी', '2 पीस लौंग', '2 छोटी इलायची', '1 गिलास पानी'],
      en: ['1 small piece of cinnamon', '2 cloves', '2 green cardamoms', '1 glass of water']
    },
    preparation: {
      hi: 'पानी में दालचीनी, लौंग और इलायची को कूटकर डालें। इसे तब तक उबालें जब तक पानी उबलकर आधा न रह जाए।',
      en: 'Crush the cinnamon, cloves, and cardamom and add them to water. Boil until the liquid reduces to half.'
    },
    usage: {
      hi: 'इसे छानकर सुबह नाश्ते के आधे घंटे बाद (भरा पेट) और रात को सोते समय (भोजन के 1 घंटे बाद) गरम-गरम ही चाय की तरह धीरे-धीरे पिएं।',
      en: 'Strain and drink it hot like tea, sipping slowly, half an hour after breakfast (full stomach) and at bedtime (1 hour after dinner).'
    },
    dietEat: {
      hi: 'गरम राब और सूप, बाजरे की कांजी। फायदेमंद फल: चीकू और खजूर। फायदेमंद सलाद: हल्का भुना हुआ चुकंदर (कच्चा और ठंडा सलाद बिल्कुल न खाएं)।',
      en: 'Warm liquid gruel (Raab) or hot soup, pearl millet (Bajra) Kanji. Beneficial Fruits: Sapodilla (Chiku) and dates. Beneficial Salad: Lightly roasted beetroot (strictly avoid raw and cold salads).'
    },
    dietAvoid: {
      hi: 'आइसक्रीम, कोल्ड ड्रिंक, खट्टा खाना, ठंडा पानी और दही।',
      en: 'Ice cream, cold drinks, sour food, cold water, and curd.'
    },
    strictAvoid: {
      hi: 'फ्रीजर में रखा हुआ प्रोसेस्ड मीट, पैकेट बंद सॉस, डिब्बा बंद पनीर।',
      en: 'Frozen processed meats, packaged chemical sauces, and commercial paneer stored in freezers.'
    },
    routine: {
      morning: {
        hi: 'सुबह: नाश्ते में गरम सूजी का उपमा या दलिया लें।',
        en: 'Morning: Eat hot semolina Upma or porridge for breakfast.'
      },
      afternoon: {
        hi: 'दोपहर: गरम-गरम अरहर और मूंग की दाल, चावल और भुनी हुई सब्जियों का सेवन करें।',
        en: 'Afternoon: Consume hot pigeon pea (Arhar) or Moong dal, rice, and roasted vegetables.'
      },
      evening: {
        hi: 'शाम/रात: रात को गरम सूप पीकर तुरंत मोटा कंबल या चादर ओढ़कर सो जाएं ताकि पसीना आए। पसीना आने के बाद बदन को ढककर रखें।',
        en: 'Evening/Night: Drink hot soup at night and immediately cover up with a thick blanket to induce sweating. Keep the body well-covered after sweating.'
      }
    },
    safetyAdvice: {
      hi: 'सुरक्षा सूचना: इस नुस्खे की तासीर बहुत गर्म होती है, इसलिए जिन लोगों के शरीर में जलन रहती हो या बवासीर की शिकायत हो, वे इसका उपयोग बिल्कुल न करें।',
      en: 'Safety Notice: The potency of this remedy is highly heating. Individuals suffering from burning sensations in the body or piles must strictly avoid its use.'
    },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'respiratory')?.imageUrl || ""
  },
  {
    id: 'gf-6',
    serialNumber: '६',
    name: {
      hi: '६. सुदर्शन घनवटी और गिलोय सत्व का तीव्र ज्वरनाशक योग',
      en: '6. Antipyretic Blend of Sudarshan Ghanvati and Giloy Satva'
    },
    illnessId: 'general-fever',
    introduction: {
      hi: "जब बुखार का वेग बहुत तेज होता है, शरीर का तापमान कम नहीं हो रहा हो, या हरारत बार-बार लौटकर आ रही हो, तब सुदर्शन घनवटी और गिलोय सत्व का यह योग अचूक काम करता है। यह शरीर की रोग प्रतिरोधक क्षमता (Immunity) को बढ़ाकर संक्रमण को जड़ से खत्म करता है और बुखार के बाद होने वाली शारीरिक कमजोरी को दूर करता है।",
      en: "When the intensity of the fever is very high, the body temperature fails to drop, or the fever keeps recurring, this combination of Sudarshan Ghanvati and Giloy Satva works wonders. It boosts the body's immunity to eradicate the infection from its roots and eliminates the physical weakness that follows a fever."
    },
    severity: 'severe',
    severityLabel: {
      hi: '🔴 तेज या बार-बार आने वाला बुखार (Moderate to Severe)',
      en: '🔴 High or Recurrent Fever'
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "आधा टैबलेट (बारीक पीसकर गुनगुने पानी या शहद के साथ)", en: "Half tablet (finely crushed with lukewarm water or honey)" } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "1 से 2 टैबलेट (सुबह और शाम)", en: "1 to 2 tablets (Morning and Evening)" } },
      { 
        ageRange: AGE_BRACKETS.middleAge, 
        dose: { 
          hi: "1 टैबलेट सुबह and 1 टैबलेट शाम (कुल 2 टैबलेट प्रतिदिन, भोजन के बाद)", 
          en: "1 tablet in the morning and 1 tablet in the evening (total 2 tablets daily, after meals)" 
        } 
      },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "आधी-आधी टैबलेट दिन में दो बार (कुल 1 टैबलेट प्रतिदिन, भोजन के बाद)", en: "Half tablet twice a day (total 1 tablet daily, after meals)" } }
    ],
    ingredients: {
      hi: ['आयुर्वेदिक सुदर्शन घनवटी (टैबलेट)', '500 मिलीग्राम शुद्ध गिलोय सत्व (पाउडर)', 'आधा गिलास गुनगुना पानी'],
      en: ['Ayurvedic Sudarshan Ghanvati (Tablets)', '500 mg pure Giloy Satva (Powder)', 'half a glass of lukewarm water']
    },
    preparation: {
      hi: 'सुदर्शन घनवटी की तय खुराक को लेकर गिलोय सत्व पाउडर के साथ मिलाकर रख लें। इसे गुनगुने पानी के साथ सेवन के लिए तैयार करें।',
      en: 'Take the recommended dose of Sudarshan Ghanvati and mix it thoroughly with the Giloy Satva powder. Keep it ready to consume with lukewarm water.'
    },
    usage: {
      hi: 'इसे दिन में दो बार—सुबह और शाम को भोजन या हल्का नाश्ता करने के ठीक आधे घंटे बाद गुनगुने पानी के साथ निगल लें। खाली पेट इसका सेवन न करें।',
      en: 'Swallow it twice a day, in the morning and evening, exactly half an hour after meals or a light breakfast with lukewarm water. Do not consume on an empty stomach.'
    },
    dietEat: {
      hi: 'परवल और लौकी का सूप, मूंग की पतली खिचड़ी (बिना घी की), उबला हुआ पानी। फायदेमंद फल: केवल अनार के दाने। फायदेमंद सलाद: उबली हुई तोरई या टिंडा।',
      en: 'Pointed gourd and bottle gourd soup, thin Moong dal khichdi (without ghee), boiled water. Beneficial Fruits: Pomegranate seeds only. Beneficial Salad: Boiled sponge gourd or apple gourd (Tinda).'
    },
    dietAvoid: {
      hi: 'तला-भुना खाना, भारी भोजन, मिठाई, चावल, मैदा, चाय और कॉफी।',
      en: 'Fried food, heavy meals, sweets, rice, refined flour (Maida), tea, and coffee.'
    },
    strictAvoid: {
      hi: 'बेकरी प्रोडक्ट्स (ब्रेड, खारी, टोस्ट), पैकेट बंद चिप्स, ठंडे प्रिजर्वेटिव वाले जूस और मांसाहार।',
      en: 'Bakery products (bread, khari, toast), packaged chips, cold juices with preservatives, and non-vegetarian food.'
    },
    routine: {
      morning: {
        hi: 'सुबह: हल्के गुनगुने पानी के साथ गिलोय का पानी लें, नाश्ते में सिर्फ उबला दलिया खाएं।',
        en: 'Morning: Take Giloy water with mildly lukewarm water, eat only boiled porridge for breakfast.'
      },
      afternoon: {
        hi: 'दोपहर: अच्छी तरह पकी मूंग की दाल और एक पतली रोटी।',
        en: 'Afternoon: Well-cooked Moong dal and one thin chapati.'
      },
      evening: {
        hi: 'शाम/रात: सूरज ढलने के बाद केवल सब्जियों का गरम सूप लें। दिन में ठंडी हवा और पंखे के ठीक नीचे सोने से बचें। शरीर को गर्माहट में रखें।',
        en: 'Evening/Night: Have only hot vegetable soup after sunset. Avoid sleeping directly under a fan or in cold air during the day. Keep the body warm.'
      }
    },
    safetyAdvice: {
      hi: 'सुरक्षा सूचना: गर्भवती महिलाएं और अत्यंत कमजोर व्यक्ति बिना नाड़ी परीक्षण के इसका सेवन न करें।',
      en: 'Safety Notice: Pregnant women and extremely weak individuals should not consume this without a pulse examination (Nadi Parikshan).'
    },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'vaidya-expert')?.imageUrl || ""
  },
  {
    id: 'gf-7',
    serialNumber: '७',
    name: {
      hi: '७. मेथी, सोंठ और भुने जीरे का घरेलू ज्वरनाशक चूर्ण',
      en: '7. Home Remedy Antipyretic Powder of Fenugreek, Dry Ginger, and Cumin'
    },
    illnessId: 'general-fever',
    introduction: {
      hi: "जब अचानक मौसम बदलने से शरीर में दर्द के साथ हल्का या मध्यम बुखार आ जाए, तो किचन में मौजूद मेथी दाना, सोंठ (सूखा अदरक) और जीरे का यह घरेलू मिश्रण रामबाण काम करता है। यह शरीर का तापमान सामान्य करता है, पसीना लाकर बुखार बाहर निकालता है और भूख को दोबारा खोलता है।",
      en: "When sudden seasonal changes cause mild to moderate fever accompanied by body aches, this homemade blend of fenugreek seeds, dry ginger (Saunth), and cumin works wonders. It normalizes body temperature, induces sweating to break the fever, and restores appetite."
    },
    severity: 'moderate',
    severityLabel: {
      hi: '🟡 सामान्य से मध्यम बुखार (Mild to Moderate Fever)',
      en: '🟡 Mild to Moderate Fever'
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "एक चौथाई (1/4) चम्मच चूर्ण सुबह और शाम (आधे चम्मच शहद के साथ)", en: "Quarter (1/4) teaspoon powder morning and evening (with half teaspoon honey)" } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "आधा चम्मच चूर्ण सुबह और आधा चम्मच शाम (गुनगुने पानी के साथ, भोजन के बाद)", en: "Half teaspoon powder in the morning and half teaspoon in the evening (with lukewarm water after meals)" } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "आधा चम्मच चूर्ण सुबह और आधा चम्मच शाम (भोजन के बाद, हल्के गुनगुने पानी से)", en: "Half teaspoon powder morning and evening (Total twice daily, strictly with lukewarm water after meals)" } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "एक चौथाई (1/4) चम्मच चूर्ण दिन में दो बार (केवल हल्के गुनगुने पानी के साथ, भोजन के बाद)", en: "Quarter (1/4) teaspoon powder twice a day (strictly with lukewarm water, after meals)" } }
    ],
    ingredients: {
      hi: ['50 ग्राम मेथी दाना', '20 ग्राम सोंठ पाउडर (सूखा अदरक)', '20 ग्राम भुना हुआ जीरा', '1 चम्मच शहद या गुनगुना पानी'],
      en: ['50 grams of fenugreek seeds', '20 grams of dry ginger powder (Saunth)', '20 grams of roasted cumin', '1 teaspoon of honey or lukewarm water']
    },
    preparation: {
      hi: 'मेथी दाना और भुने हुए जीरे को मिक्सी में बारीक पीस लें। अब इसमें सोंठ का पाउडर अच्छी तरह मिलाकर एक साफ़ कांच के डिब्बे में सुरक्षित रख लें। घरेलू ज्वरनाशक चूर्ण तैयार है।',
      en: 'Finely grind the fenugreek seeds and roasted cumin in a blender. Mix the dry ginger powder thoroughly into it and store it safely in a clean glass jar. Your kitchen antipyretic powder is ready.'
    },
    usage: {
      hi: 'इसे दिन में दो बार—सुबह और शाम को भोजन या नाश्ता करने के ठीक २० मिनट बाद तय मात्रा के अनुसार लें। बच्चों को इसे शहद में मिलाकर चटाएं और बड़ों को गुनगुने पानी से दें।',
      en: 'Consume it twice a day—morning and evening, exactly 20 minutes after meals or breakfast according to the age limit. Give it to children mixed with honey, and to adults with lukewarm water.'
    },
    dietEat: {
      hi: 'गरम मूंग की दाल, सिका हुआ पापड़ (बिना तेल का), उबला हुआ पानी, सादा दलिया। फायदेमंद फल: सेब (छिलका हटाकर)। फायदेमंद सलाद: उबली हुई गाजर।',
      en: 'Hot Moong dal, roasted poppadom (oil-free), boiled water, plain porridge. Beneficial Fruits: Apple (peeled). Beneficial Salad: Boiled carrots.'
    },
    dietAvoid: {
      hi: 'चावल, दही, छाछ, ठंडी चीजें, चीनी या हैवी मिठाई, तला हुआ परांठा।',
      en: 'Rice, curd, buttermilk, cold items, sugar or heavy sweets, fried paranthas.'
    },
    strictAvoid: {
      hi: 'कोल्ड ड्रिंक्स, बाजार का समोसा-कचौड़ी, पैकेट बंद जूस और बासी भोजन।',
      en: 'Cold drinks, market-fried snacks, packaged juices, and stale food.'
    },
    routine: {
      morning: {
        hi: 'सुबह: खाली पेट गुनगुने पानी में चुटकी भर सेंधा नमक डालकर कुल्ला करें।',
        en: 'Morning: Rinse your mouth with lukewarm water mixed with a pinch of rock salt on an empty stomach.'
      },
      afternoon: {
        hi: 'दोपहर: सादी खिचड़ी खाकर चादर ओढ़कर थोड़ी देर आराम करें ताकि पसीना आए।',
        en: 'Afternoon: Eat plain khichdi and rest under a blanket to induce sweating.'
      },
      evening: {
        hi: 'शाम/रात: गरम सूप या पतली लापसी लें। दिन में ठंडे पानी से हाथ-मुंह न धोएं।',
        en: 'Evening/Night: Have hot soup or thin porridge. Avoid washing your face or hands with cold water during the day.'
      }
    },
    safetyAdvice: {
      hi: 'सुरक्षा सूचना: सोंठ और मेथी की तासीर गर्म होती है, इसलिए शरीर में अत्यधिक जलन होने पर इसकी मात्रा आधी कर दें।',
      en: 'Safety Notice: Since dry ginger and fenugreek have a warm potency, reduce the dose to half if you experience an excessive burning sensation in the body.'
    },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'ayurveda-herbs')?.imageUrl || ""
  },
  {
    id: 'gf-8',
    serialNumber: '८',
    name: {
      hi: '८. काली मिर्च, अदरक और तुलसी पत्र का तीखा ज्वरनाशक काढ़ा',
      en: '8. Antipyretic Decoction of Black Pepper, Ginger, and Basil Leaves'
    },
    illnessId: 'general-fever',
    introduction: {
      hi: "जब सर्दी-खांसी के साथ अचानक शरीर जकड़ जाए और बुखार चढ़ने लगे, तो दादी-नानी के जमाने का यह काली मिर्च और तुलसी का काढ़ा सबसे तेज असर करता है। काली मिर्च इन्फेक्शन को मारती है, अदरक शरीर का दर्द खींचता है, और तुलसी के पत्ते खून के तापमान को तुरंत नियंत्रित करने में मदद करते हैं।",
      en: "When sudden fever strikes accompanied by cold, cough, and body stiffness, this traditional decoction of black pepper and basil works fastest. Black pepper fights infection, ginger relieves body aches, and basil leaves quickly help regulate core body temperature."
    },
    severity: 'moderate',
    severityLabel: {
      hi: '🟡 सामान्य से मध्यम बुखार (Mild to Moderate Fever)',
      en: '🟡 Mild to Moderate Fever'
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "2 चम्मच काढ़ा सुबह और 2 चम्मच शाम को (बराबर मात्रा में शहद मिलाकर)", en: "2 teaspoons of decoction morning and evening (mixed with an equal amount of honey)" } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "आधा कप काढ़ा सुबह और आधा कप शाम (भोजन के आधे घंटे बाद, गुनगुना)", en: "Half a cup of decoction morning and evening (half an hour after meals, served lukewarm)" } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "आधा कप काढ़ा सुबह और आधा कप शाम (कुल दो बार प्रतिदिन, छानकर गुनगुना पिएं)", en: "Half a cup of decoction morning and evening (Total twice daily, strained and served lukewarm)" } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "एक चौथाई (1/4) कप काढ़ा दिन में दो बार (हल्का गुनगुना, केवल भोजन के बाद)", en: "Quarter (1/4) cup of decoction twice a day (mildly lukewarm, strictly after meals)" } }
    ],
    ingredients: {
      hi: ['5 से ७ दाने साबुत काली मिर्च', '1 इंच अदरक का टुकड़ा (कुचला हुआ)', '१० से १२ ताजे तुलसी के पत्ते', '१.५ ग्लास साफ़ पानी', '१ चम्मच शहद'],
      en: ['5 to 7 whole black peppercorns', '1-inch crushed ginger piece', '10 to 12 fresh basil leaves', '1.5 glasses of clean water', '1 teaspoon of honey']
    },
    preparation: {
      hi: 'एक बर्तन में डेढ़ ग्लास पानी डालें। उसमें कुचली हुई काली मिर्च, अदरक और तुलसी के पत्ते डालकर धीमी आंच पर उबालें। जब पानी उबलकर आधा ग्लास रह जाए, तो गैस बंद कर दें और इसे छान लें।',
      en: 'Pour 1.5 glasses of water into a vessel. Add the crushed black pepper, ginger, and basil leaves, and simmer on low heat. Once the water reduces to half a glass, turn off the heat and strain it.'
    },
    usage: {
      hi: 'इसे दिन में दो बार—सुबह और शाम को भोजन या हल्का नाश्ता लेने के ३० मिनट बाद चाय की तरह घूंट-घूंट करके गुनगुना पिएं। इसे कभी भी एकदम ठंडा करके न पिएं।',
      en: 'Sip it warm like tea twice a day—morning and evening, exactly 30 minutes after meals or a light breakfast. Never consume it completely cold.'
    },
    dietEat: {
      hi: 'मूंग की पतली दाल का पानी, गरम पानी, उबला हुआ सादा दलिया, गरम सब्जियों का सूप। फायदेमंद फल: केवल पका पपीता। फायदेमंद सलाद: उबली हुई तोरई।',
      en: 'Mutton-free hot vegetable soup, thin Moong dal water, warm water, boiled plain porridge. Beneficial Fruits: Ripe papaya only. Beneficial Salad: Boiled sponge gourd.'
    },
    dietAvoid: {
      hi: 'ठंडा पानी, घी, तेल, मसालेदार सब्जी, दूध, केला, संतरा, बासी खाना।',
      en: 'Cold water, ghee, oil, spicy vegetables, milk, bananas, oranges, stale food.'
    },
    strictAvoid: {
      hi: 'फ्रिज की ठंडी चीजें, आइसक्रीम, डिब्बा बंद जूस और मैदे वाली चीजें।',
      en: 'Cold items from the fridge, ice cream, canned juices, and refined flour products.'
    },
    routine: {
      morning: {
        hi: 'सुबह: उठकर गरम पानी में नमक डालकर गरारे करें।',
        en: 'Morning: Wake up and gargle with warm salt water.'
      },
      afternoon: {
        hi: 'दोपहर: काढ़ा पीने के बाद थोड़ी देर कंबल ओढ़कर सोएं ताकि पसीना आकर बुखार उतरे।',
        en: 'Afternoon: After drinking the decoction, rest under a blanket for a while to sweat out the fever.'
      },
      evening: {
        hi: 'शाम/रात: हल्का और सुपाच्य गरम भोजन लें। कूलर या सीधे पंखे की हवा से बचें।',
        en: 'Evening/Night: Consume a light, easily digestible warm dinner. Avoid coolers or direct fan drafts.'
      }
    },
    safetyAdvice: {
      hi: 'सुरक्षा सूचना: यदि पेट में अल्सर या अत्यधिक एसिडिटी की समस्या हो, तो काली मिर्च की मात्रा कम कर दें।',
      en: 'Safety Notice: If suffering from stomach ulcers or severe acidity, reduce the amount of black pepper.'
    },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'respiratory')?.imageUrl || ""
  },
  {
    id: 'gf-9',
    serialNumber: '९',
    name: {
      hi: '९. खस, धनिया और सोंठ का शीतल ज्वरनाशक हिम',
      en: '9. Cooling Antipyretic Infusion of Vetiver, Coriander, and Dry Ginger'
    },
    illnessId: 'general-fever',
    introduction: {
      hi: "जब बुखार के कारण शरीर में तेज जलन हो, हाथ-पैरों से आग निकल रही हो और बार-बार प्यास लग रही हो, तब धनिया और सोंठ का यह पानी (आयुर्वेद में जिसे 'हिम' कहते हैं) शरीर की अंदरूनी गर्मी को शांत करता है। यह लीवर को ठंडा करता है, पेशाब के रास्ते बुखार की गर्मी को बाहर निकालता है और पाचन को दुरुस्त करता है।",
      en: "When fever causes an intense burning sensation in the body, burning palms or soles, and excessive thirst, this coriander and dry ginger infusion (known as 'Him' in Ayurveda) calms the internal heat. It cools the liver, flushes out fever toxins through urine, and restores digestion."
    },
    severity: 'moderate',
    severityLabel: {
      hi: '🟡 सामान्य से मध्यम बुखार (Mild to Moderate Fever)',
      en: '🟡 Mild to Moderate Fever'
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "2 चम्मच पानी सुबह और 2 चम्मच शाम को (हल्का गुनगुना करके, थोड़े से शहद के साथ)", en: "2 teaspoons of infusion morning and evening (mildly warmed, with a little honey)" } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "आधा कप पानी सुबह और आधा कप शाम (भोजन के २० मिनट बाद, सामान्य तापमान पर)", en: "Half a cup of infusion morning and evening (20 minutes after meals, at room temperature)" } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "आधा कप पानी सुबह और आधा कप शाम (कुल दो बार प्रतिदिन, छानकर सामान्य तापमान पर पिएं)", en: "Half a cup of infusion morning and evening (Total twice daily, strained and served at room temperature)" } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "एक चौथाई (1/4) कप पानी दिन में दो बार (बिना फ्रिज का सामान्य पानी, केवल भोजन के बाद)", en: "Quarter (1/4) cup of infusion twice a day (at room temperature, strictly after meals)" } }
    ],
    ingredients: {
      hi: ['1 चम्मच साबुत धनिया दाना', 'आधा चम्मच सूखी सोंठ का टुकड़ा या पाउडर', 'थोड़ा सा खस (यदि उपलब्ध हो)', '1 ग्लास साफ़ पानी', 'आधा चम्मच मिश्री या शहद'],
      en: ['1 teaspoon of whole coriander seeds', 'half a teaspoon of dry ginger piece or powder', 'a small pinch of vetiver (Khus, optional)', '1 glass of clean water', 'half a teaspoon of rock candy (Mishri) or honey']
    },
    preparation: {
      hi: 'एक मिट्टी के बर्तन या कांच के ग्लास में एक ग्लास पानी लें। उसमें धनिया दाना और सोंठ को हल्का कूटकर डाल दें। इसे रातभर के लिए ढककर छोड़ दें। सुबह उठकर इसे अच्छी तरह हाथ से मसल लें और कपड़े से छान लें।',
      en: 'Take a glass of water in an earthen pot or glass jar. Lightly crush the coriander seeds and dry ginger, then add them to the water. Leave it covered overnight. In the morning, mash it well with clean hands and strain through a cloth.'
    },
    usage: {
      hi: 'इसे दिन में दो बार—सुबह और शाम को भोजन या नाश्ता करने के २० से ३० मिनट बाद तय मात्रा के अनुसार लें। ध्यान रखें कि इस पानी को न तो उबालना है और न ही फ्रिज में रखकर ठंडा करना है, इसे कमरे के सामान्य तापमान पर ही लेना है।',
      en: 'Consume it twice a day—morning and evening, exactly 20 to 30 minutes after meals or breakfast according to the age limit. Note that this infusion must neither be boiled nor refrigerated; it must be taken at standard room temperature.'
    },
    dietEat: {
      hi: 'मूंग की दाल की पतली खिचड़ी, सादा पानी, उबला हुआ दलिया। फायदेमंद फल: केवल पका हुआ मीठा अनार। फायदेमंद सलाद: उबली हुई तोरई या पेठा (ऐशगार्ड)।',
      en: 'Thin Moong dal khichdi, plain water, boiled porridge. Beneficial Fruits: Sweet ripe pomegranate only. Beneficial Salad: Boiled sponge gourd or ash gourd.'
    },
    dietAvoid: {
      hi: 'चाय, कॉफी, अचार, गरम मसाले, लहसुन, प्याज, तला हुआ भोजन, गुड़।',
      en: 'Tea, coffee, pickles, hot spices, garlic, onions, fried food, jaggery.'
    },
    strictAvoid: {
      hi: 'मिर्च-मसालेदार चाट, समोसे, डिब्बा बंद तीखी नमकीन और फ्रिज का एकदम चिल्ड पानी।',
      en: 'Spicy street food, samosas, packaged hot savories, and chilled fridge water.'
    },
    routine: {
      morning: {
        hi: 'सुबह: खाली पेट सादे पानी से कुल्ला करें।',
        en: 'Morning: Rinse your mouth with plain water on an empty stomach.'
      },
      afternoon: {
        hi: 'दोपहर: सुपाच्य भोजन के बाद खुली और साफ हवा वाले कमरे में आराम करें।',
        en: 'Afternoon: After an easily digestible lunch, rest in a well-ventilated, clean room.'
      },
      evening: {
        hi: 'शाम/रात: हल्का सूप या पतली लापसी लें। धूप में जाने या भारी मेहनत करने से पूरी तरह बचें।',
        en: 'Evening/Night: Have light soup or thin porridge. Avoid going out in the sun or doing heavy physical work.'
      }
    },
    safetyAdvice: {
      hi: 'सुरक्षा सूचना: यह नुस्खा शरीर को शीतलता देता है, इसलिए यदि बुखार के साथ अत्यधिक ठंड या कंपकंपी लग रही हो, तो इसका सेवन न करें।',
      en: 'Safety Notice: This remedy provides a cooling effect; do not consume it if the fever is accompanied by severe chills or shivering.'
    },
    disclaimer: GENERAL_DISCLAIMER,
    image: PlaceHolderImages.find(i => i.id === 'ayurveda-herbs')?.imageUrl || ""
  }
];
