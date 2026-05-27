/**
 * @fileOverview Category 2: Cold & Flu (नजला और जुकाम) Data Store
 * Contains authentic Ayurvedic remedies with dynamic age-calculation logic.
 * Language standard: Strictly Hindi "और" used for connectives.
 */

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
  keywords: string;
};

export const AGE_BRACKETS = {
  childhood: { hi: "5-12 वर्ष", en: "5-12 Years" },
  youth: { hi: "13-40 वर्ष", en: "13-40 Years" },
  middleAge: { hi: "41-60 वर्ष", en: "41-60 Years" },
  oldAge: { hi: "61-80 वर्ष", en: "61-80 Years" }
};

const GENERAL_DISCLAIMER: LocalizedString = {
  hi: "यह जानकारी केवल शैक्षिक उद्देश्य के लिए है, कृपया अपने चिकित्सक से सलाह ज़रूर लें।",
  en: "This information is for educational purposes only, please consult your physician."
};

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
    disclaimer: GENERAL_DISCLAIMER,
    image: "https://picsum.photos/seed/cough/600/400",
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
      en: 'Avoid: Packaged snacks, biscuits, heavy non-veg meals, fried foods, cold water, soda, curd, buttercream, and ice cream.'
    },
    strictAvoid: {
      hi: 'पैकेट वाले तीखे स्नेक्स, भारी मांसाहार और फ्रिज की ठंडी चीजें पूरी तरह वर्जित हैं।',
      en: 'Strictly Avoid: Packaged spicy snacks, heavy meats, and refrigerated items.'
    },
    routine: {
      morning: { hi: 'सुबह: सुबह उठकर सबसे पहले 1-2 गिलास गुनगुना पानी पिएं। हल्के गर्म पानी से गरारे (Kulla) करें।', en: 'Morning: Start with 1-2 glasses of lukewarm water. Gargle with warm water.' },
      afternoon: { hi: 'दोपहर: दोपहर का भोजन हमेशा ताजा और गर्म ही करें। भोजन के तुरंत बाद पानी न पिएं, कम से कम आधा घंटा रुकें।', en: 'Afternoon: Eat fresh hot lunch. Wait 30 minutes before drinking water after meals.' },
      evening: { hi: 'शाम/रात: रात का भोजन बिल्कुल हल्का रखें और सूर्य अस्त के आसपास या 8 बजे तक हर हाल में कर लें। रात के समय सलाद या फल का सेवन भूलकर भी न करें। छाती और गले को हवा से बचाकर रखें और पूरी नींद लें।', en: 'Evening/Night: Eat light dinner by 8 PM. Avoid fruits/salad at night. Keep chest/throat protected from drafts.' }
    },
    safetyAdvice: { hi: 'यदि 5 दिनों में आराम न मिले तो चिकित्सक से सलाह लें।', en: 'Safety Notice: If no relief in 5 days, consult a doctor.' },
    disclaimer: GENERAL_DISCLAIMER,
    image: "https://picsum.photos/seed/cough/600/400",
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
      hi: 'इस तैयार अवलेह (चटनी) को अपनी उम्र के अनुसार लेकर सुबह खाली पेट और रात को सोने से ठीक पहले धीरे-धीरे चाटकर खाएं। ध्यान रखें, इसे खाने के बाद कम से कम 1 घंटे तक पानी बिल्कुल नहीं पीना है। अवधि: इस नुस्खे का सेवन लगातार 3 से 5 दिनों तक करें।',
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
      morning: { hi: 'सुबह: सुबह उठकर गुनगुना पानी पिएं। सोंठ और गुड़ के सेवन के तुरंत बाद खुली ठंडी हवा में बाहर न निकलें।', en: 'Morning: Start with lukewarm water. Avoid cold drafts immediately after consuming the remedy.' },
      afternoon: { hi: 'दोपहर: दोपहर का भोजन हमेशा गर्म-गर्म ही करें। भोजन के बाद छाछ या मट्ठा बिल्कुल न लें।', en: 'Afternoon: Always eat a hot lunch. Do not consume buttercream after meals.' },
      evening: { hi: 'शाम/रात: रात का भोजन सूर्य अस्त के आसपास या 8 बजे तक हर हाल में कर लें। रात को सलाद या फल भूलकर भी न खाएं। सोते समय गले और छाती को सूती कपड़े या मफलर से ढककर रखें।', en: 'Evening/Night: Eat dinner by sunset or 8 PM. Avoid fruits/salad at night. Keep throat and chest covered with a cotton cloth or muffler while sleeping.' }
    },
    safetyAdvice: { hi: 'यदि 5 दिनों में आराम न मिले तो चिकित्सक से सलाह लें।', en: 'Safety Notice: If no relief in 5 days, consult a doctor.' },
    disclaimer: GENERAL_DISCLAIMER,
    image: "https://picsum.photos/seed/cough/600/400",
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
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "भुनी हुई हल्दी का पाउडर — आधा छोटा चम्मच (लगभग 2 से 3 ग्राम), शुद्ध गाय का देसी घी — आधा छोटा चम्मच, ताज़ा उबला हुआ गाय का दूध — आधा ग्लास (लगभग 100 से 150 मिली)।", en: "Roasted turmeric powder — half a teaspoon (approx. 2-3g), Pure cow ghee — half a teaspoon, Fresh boiled cow milk — half a glass (approx. 100-150ml)." } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "भुनी हुई हल्दी का पाउडर — 1 छोटा चम्मच (लगभग 5 से 6 ग्राम), शुद्ध गाय का देसी घी — 1 छोटा चम्मच, ताज़ा उबला हुआ गाय का दूध — 1 बड़ा ग्लास (लगभग 200 मिली)।", en: "Roasted turmeric powder — 1 teaspoon (approx. 5-6g), Pure cow ghee — 1 teaspoon, Fresh boiled cow milk — 1 large glass (approx. 200ml)." } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "भुनी हुई हल्दी का पाउडर — 1 छोटा चम्मच (लगभग 5 से 6 ग्राम), शुद्ध गाय का देसी घी — 1 छोटा चम्मच, ताज़ा उबला हुआ गाय का दूध — 1 बड़ा ग्लास (लगभग 200 मिली)।", en: "Roasted turmeric powder — 1 teaspoon (approx. 5-6g), Pure cow ghee — 1 teaspoon, Fresh boiled cow milk — 1 large glass (approx. 200ml)." } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "भुनी हुई हल्दी का पाउडर — आधा छोटा चम्मच (लगभग 2 से 3 ग्राम), शुद्ध गाय का देसी घी — आधा छोटा चम्मच, ताज़ा उबला हुआ गाय का दूध — आधा ग्लास (लगभग 100 से 150 मिली)।", en: "Roasted turmeric powder — half a teaspoon (approx. 2-3g), Pure cow ghee — half a teaspoon, Fresh boiled cow milk — half a glass (approx. 100-150ml)." } }
    ],
    ingredients: {
      hi: ['भुनी हुई हल्दी का पाउडर', 'शुद्ध गाय का देसी घी', 'ताज़ा उबला हुआ गाय का दूध'],
      en: ['Roasted turmeric powder', 'Pure cow ghee', 'Fresh boiled cow milk']
    },
    preparation: {
      hi: 'उम्र के अनुसार ऊपर बताई गई मात्रा में हल्दी पाउडर और घी लें। एक छोटे तवे पर घी डालकर धीमी आंच पर हल्दी को 1 से 2 मिनट के लिए भून लें, जब तक सोंधी खुशबू न आने लगे। अब दूध को अच्छे से उबाल लें।',
      en: 'Take turmeric powder and ghee as per age. Roast turmeric in ghee on low heat for 1-2 minutes until aromatic. Boil the milk well.'
    },
    usage: {
      hi: 'विधि: रोजाना रात को सोने से ठीक पहले, गर्म दूध में अपनी उम्र के अनुसार तय की गई यह भुनी हुई हल्दी का पाउडर मिलाएं और अच्छी तरह घोलकर चाय की तरह धीरे-धीरे पिएं। इसके सेवन के बाद पानी बिल्कुल नहीं पीना है।\nअवधि: इस नुस्खे का नियमित सेवन लगातार 3 से 5 दिनों तक करें।',
      en: 'Method: Before bedtime, mix the roasted turmeric powder in warm milk as per age and sip slowly. Do not drink water after this. Duration: Use for 3 to 5 days.'
    },
    dietEat: {
      hi: 'भोजन: मूंग की दाल की खिचड़ी, गर्म बाजारे की राबड़ी, सोंठ और तुलसी डली हुई सादी चाय, और गुनगुना पानी कराएं।\nफल और सलाद की मात्रा: दोपहर के भोजन के साथ 1 छोटी कटोरी (लगभग 100 ग्राम) हल्के उबले हुए सलाद (जैसे उबली हुई शलजम या गाजर) और सीजन के अनुसार आधा कप काटा हुआ पका पपीता खा सकते हैं।',
      en: 'Diet: Moong dal khichdi, hot Bajra Rabri, plain tea with dry ginger and basil, and lukewarm water. Include steamed salad and papaya for lunch.'
    },
    dietAvoid: {
      hi: 'पैकेट वाले फूड्स: तली-भुनी चीजें, समोसे, नमकीन, बिस्कुट, बेकरी प्रोडक्ट्स और मैदे से बनी चीजें सख़्ती से बंद रखें। भारी भोजन: उड़द की दाल, अरबी, चावल, पनीर, मिठाई, मांसाहारी भोजन और अंडे का सेवन बिल्कुल न करें। ठंडी चीजें: फ्रिज का ठंडा पानी, आइसक्रीम, कोल्ड ड्रिंक्स, दही, मट्ठा और खट्टे फलों का सेवन पूरी तरह वर्जित है।',
      en: 'Avoid: Fried foods, snacks, bakery items, non-veg, eggs, and cold items like ice cream or curd.'
    },
    strictAvoid: {
      hi: 'ठंडी चीजें, भारी मांसाहार और पैकेट वाले स्नेक्स पूरी तरह वर्जित हैं।',
      en: 'Strictly avoid cold items, heavy non-veg, and packaged snacks.'
    },
    routine: {
      morning: { hi: 'सुबह (Morning): सुबह उठकर सबसे पहले थोड़ा गर्म पानी पिएं और नमक डालकर गुनगुने पानी से गरारे करें।', en: 'Morning: Start with warm water and salt water gargles.' },
      afternoon: { hi: 'दोपहर (Afternoon): दोपहर का खाना हमेशा ताजा और गर्म ही खाएं, बासी भोजन भूलकर भी न लें।', en: 'Afternoon: Eat fresh hot lunch; avoid stale food.' },
      evening: { hi: 'शाम/रात (Evening/Night): रात का भोजन 8 बजे से पहले कर लें। सोते समय सिर और कानों को ढककर रखें और रात को भूलकर भी पंखे की तेज हवा या एसी में न सोएं।', en: 'Evening/Night: Eat dinner before 8 PM. Keep head and ears covered; avoid direct air from fans or AC.' }
    },
    safetyAdvice: { hi: 'यदि इस उपाय को लगातार 5 दिनों तक नियम से करने के बाद भी आपको आराम महसूस न हो, तो बिना देर किए अपने नजदीकी आयुर्वेदिक चिकित्सक से मिलकर उचित परामर्श लें। शरीर का ध्यान रखना ही सबसे पहली प्राथमिकता है।', en: 'Safety Notice: If no relief in 5 days, consult an Ayurvedic physician immediately.' },
    disclaimer: GENERAL_DISCLAIMER,
    image: "https://picsum.photos/seed/cough/600/400",
    keywords: "haldi dudh turmeric milk cough sardi khansi respiratory throat pain"
  },
  {
    id: 'cc-5',
    serialNumber: '5',
    name: { hi: 'सोंठ, दालचीनी और छोटी इलायची का गुनगुना काढ़ा', en: 'Warm Decoction of Dry Ginger, Cinnamon and Cardamom' },
    illnessId: 'common-cold',
    introduction: {
      hi: "नजला और जुकाम के पुराने हो जाने पर जब नाक के अंदर की श्लेष्मा झिल्ली (Mucous Membrane) में सूजन आ जाती है, तो लगातार पानी बहना या नाक पूरी तरह बंद होना जैसी समस्या होती है। आयुर्वेद के अनुसार सोंठ और दालचीनी तीखे और गर्म स्वभाव के होते हैं, जो शरीर में कफ दोष को शांत करते हैं। यह काढ़ा बंद नाक और बंद साइनस के रास्तों को तुरंत खोलता है, सिर के भारीपन को दूर करता है और सर्दी के कारण होने वाले हल्के बुखार और बदन दर्द को जड़ से मिटाता है।",
      en: "In chronic cold and flu, nasal membranes become inflamed. This decoction of dry ginger and cinnamon pacifies Kapha, opens sinus passages, and relieves headaches and body pain."
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "सोंठ का पाउडर (सूखा अदरक) — आधा छोटा चम्मच (लगभग 1 से 2 gram), दालचीनी का पाउडर या छोटा टुकड़ा — आधा छोटा चम्मच, हरी या छोटी इलायची — 1 पीस (कुचली हुई), शुद्ध शहद — आधा छोटा चम्मच (काढ़ा गुनगुना होने पर मिलाने के लिए), पीने का साफ पानी — 1 कप (लगभग 150 मिली)।", en: "Dry ginger powder — 1/2 tsp, Cinnamon — 1/2 tsp, Cardamom — 1 pc, Honey — 1/2 tsp, Water — 1 cup." } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "सोंठ का पाउडर (सूखा अदरक) — 1 छोटा चम्मच (लगभग 3 से 4 gram), दालचीनी का पाउडर या छोटा टुकड़ा — 1 छोटा चम्मच, हरी या छोटी इलायची — 2 पीस (कुचली हुई), शुद्ध शहद — 1 छोटा चम्मच (काढ़ा गुनगुना होने पर मिलाने के लिए), पीने का साफ पानी — 1 बड़ा ग्लास (लगभग 250 मिली)।", en: "Dry ginger powder — 1 tsp, Cinnamon — 1 tsp, Cardamom — 2 pcs, Honey — 1 tsp, Water — 1 large glass." } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "सोंठ का पाउडर (सूखा अदरक) — 1 छोटा चम्मच (लगभग 3 से 4 gram), दालचीनी का पाउडर या छोटा टुकड़ा — 1 छोटा चम्मच, हरी या छोटी इलायची — 2 पीस (कुचली हुई), शुद्ध शहद — 1 छोटा चम्मच (काढ़ा गुनगुना होने पर मिलाने के लिए), पीने का साफ पानी — 1 बड़ा ग्लास (लगभग 250 मिली)।", en: "Dry ginger powder — 1 tsp, Cinnamon — 1 tsp, Cardamom — 2 pcs, Honey — 1 tsp, Water — 1 large glass." } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "सोंठ का पाउडर (सूखा अदरक) — आधा छोटा चम्मच (लगभग 1 से 2 gram), दालचीनी का पाउडर या छोटा टुकड़ा — आधा छोटा चम्मच, हरी या छोटी इलायची — 1 पीस (कुचली हुई), शुद्ध शहद — आधा छोटा चम्मच (काढ़ा गुनगुना होने पर मिलाने के लिए), पीने का साफ पानी — 1 कप (लगभग 150 मिली)।", en: "Dry ginger powder — 1/2 tsp, Cinnamon — 1/2 tsp, Cardamom — 1 pc, Honey — 1/2 tsp, Water — 1 cup." } }
    ],
    ingredients: {
      hi: ['सोंठ का पाउडर (सूखा अदरक)', 'दालचीनी का पाउडर या छोटा टुकड़ा', 'हरी या छोटी इलायची', 'शुद्ध शहद', 'पीने का साफ पानी'],
      en: ['Dry ginger powder', 'Cinnamon powder or stick', 'Green cardamom', 'Pure honey', 'Clean drinking water']
    },
    preparation: {
      hi: 'एक बर्तन में पानी डालें और उसमें अपनी उम्र के अनुसार तय मात्रा में सोंठ, दालचीनी और कुचली हुई इलायची डाल दें। अब इसे धीमी आंच पर तब तक उबालें जब तक कि पानी उबलकर आधा न रह जाए। इसके बाद आंच बंद कर दें और काढ़े को छानकर हल्का गुनगुना होने के लिए रख दें। जब काढ़ा पीने लायक गुनगुना हो जाए, तब उसमें शहद मिलाएं।',
      en: 'Boil water with ginger, cinnamon, and cardamom until reduced to half. Strain and add honey once lukewarm.'
    },
    usage: {
      hi: 'इस काढ़े को सुबह खाली पेट और शाम को चाय की जगह पर धीरे-धीरे सिप लेकर (चाय की तरह) पिएं। ध्यान रहे कि शहद हमेशा काढ़ा गुनगुना होने पर ही मिलाएं, उबलते हुए गर्म काढ़े में नहीं।\nइस काढ़े का नियमित सेवन लगातार 3 से 5 दिनों तक करें।',
      en: 'Drink slowly on an empty stomach in the morning and instead of tea in the evening. Add honey only when lukewarm. Use for 3 to 5 days.'
    },
    dietEat: {
      hi: 'भोजन: पुराने चावल की पतली मांड या मांड निकाला हुआ गर्म भात, मूंग दाल का सूप, उबले हुए चने का पानी, और गुनगुना पानी।\nफल और सलाद की मात्रा: दोपहर के भोजन के साथ 1 छोटी कटोरी (लगभग 100 ग्राम) हल्के उबले हुए सलाद (जैसे उबली हुई लौकी या तरोई) खा सकते हैं। कच्चे फल पूरी तरह बंद रखें।',
      en: 'Diet: Rice gruel, Moong dal soup, boiled gram water, lukewarm water. Include steamed gourd salad; avoid raw fruits.'
    },
    dietAvoid: {
      hi: 'पैकेट वाले फूड्स: चिप्स, कुरकुरे, समोसे, कचौड़ी, बिस्कुट, ब्रेड और मैदे से बनी चीजें पूरी तरह से बंद रखें। भारी भोजन: राजमा, छोले, पनीर, मलाई, मिठाई, मांसाहारी भोजन और रात के समय भारी दालें न खाएं। ठंडी चीजें: ठंडा पानी, गन्ने का रस, खट्टा नींबू, दही, छाछ, और फ्रिज में रखा हुआ बासी भोजन बिल्कुल न लें।',
      en: 'Avoid: Packaged snacks, fried items, refined flour, heavy pulses, non-veg, and cold items.'
    },
    strictAvoid: {
      hi: 'ठंडी चीजें, भारी मांसाहार और पैकेट वाले स्नेक्स पूरी तरह वर्जित हैं।',
      en: 'Strictly avoid cold items, heavy non-veg, and packaged snacks.'
    },
    routine: {
      morning: { hi: 'सुबह (Morning): सुबह उठकर तुलसी के पत्तों की भाप (Steam) लें और नाक में दो-दो बूंद अणु तेल या सरसों का तेल डालें।', en: 'Morning: Inhale Tulsi steam and apply Anu oil to the nose.' },
      afternoon: { hi: 'दोपहर (Afternoon): दोपहर में गर्म और सुपाच्य भोजन लें और खाने के तुरंत बाद पानी न पिएं।', en: 'Afternoon: Eat hot digestible lunch; wait before drinking water.' },
      evening: { hi: 'शाम/रात (Evening/Night): रात का भोजन सूर्यास्त के आसपास या रात 8 बजे से पहले कर लें। सोते समय छाती पर थोड़ा सा गुनगुना सरसों का तेल मलें और खुली हवा या पंखे के नीचे सीधे न सोएं।', en: 'Evening/Night: Eat early dinner. Apply warm mustard oil to the chest; avoid direct drafts.' }
    },
    safetyAdvice: { hi: 'यदि इस उपाय को लगातार 5 दिनों तक नियम से करने के बाद भी आपको आराम महसूस न हो, तो बिना देर किए अपने नजदीकी आयुर्वेदिक चिकित्सक से मिलकर उचित परामर्श लें। शरीर का ध्यान रखना ही सबसे पहली प्राथमिकता है।', en: 'Safety Notice: If no relief in 5 days, consult an Ayurvedic physician immediately.' },
    disclaimer: GENERAL_DISCLAIMER,
    image: "https://picsum.photos/seed/cough/600/400",
    keywords: "sardi khansi cold cough sinus nazla jukam saunth dalchini"
  },
  {
    id: 'cc-6',
    serialNumber: '6',
    name: { hi: 'सर्दी-जुकाम, बदन दर्द और हरारत बुखार नाशक काढ़ा', en: 'Relief Decoction for Cold, Body Ache and Fever' },
    illnessId: 'common-cold',
    introduction: {
      hi: "जब मौसम बदलने के कारण अचानक सर्दी, ज़ुकाम, बदन में भयंकर टूटन (दर्द) और हल्की हरारत (ऐसा लगना जैसे बुखार आने वाला है) तीनों समस्याएं एक साथ हमला करती हैं, तो शरीर की रोग प्रतिरोधक क्षमता कमजोर पड़ जाती है। ऐसी स्थिति में यह पारंपरिक घरेलू काढ़ा रामबाण की तरह काम करता है। सोंठ और काली मिर्च मिलकर शरीर के भीतर जमे हुए कफ और वात दोष को शांत करते हैं जिससे बदन का दर्द तुरंत ठीक होता है। तुलसी के दिव्य औषधीय गुण हरारत और जुकाम के वायरस को जड़ से खत्म करते हैं।",
      en: "This brew targets combined cold, body ache, and mild feverishness. Ginger and black pepper pacify Kapha and Vata, while Tulsi eliminates viral infection."
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "सोंठ का पाउडर (सूखा अदरक) — आधा छोटा चम्मच (लगभग 1 से 2 gram), ताज़ा तुलसी के पत्ते — 4 से 5 पीस (साफ धुले हुए), साबुत काली मिर्च का पाउडर — 2 दाने (बारीक कुचली हुए), पुराना साफ़ गुड़ — 10 gram (एक छोटा टुकड़ा), पीने का साफ पानी — 1 कप (लगभग 150 मिली)।", en: "Ginger — 1/2 tsp, Tulsi — 4-5 leaves, Black pepper — 2 grains, Jaggery — 10g, Water — 1 cup." } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "सोंठ का पाउडर (सूखा अदरक) — 1 छोटा चम्मच (लगभग 3 से 4 gram), ताज़ा तुलसी के पत्ते — 8 से 10 पीस (साफ धुले हुए), साबुत काली मिर्च का पाउडर — 4 से 5 दाने (बारीक कुचले हुए), पुराना साफ़ गुड़ — 20 gram (एक मध्यम टुकड़ा), पीने का साफ पानी — 1 बड़ा ग्लास (लगभग 250 मिली)।", en: "Ginger — 1 tsp, Tulsi — 8-10 leaves, Black pepper — 4-5 grains, Jaggery — 20g, Water — 1 large glass." } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "सोंठ का पाउडर (सूखा अदरक) — 1 छोटा चम्मच (लगभग 3 से 4 gram), ताज़ा तुलसी के पत्ते — 8 से 10 पीस (साफ धुले हुए), साबुत काली मिर्च का पाउडर — 4 से 5 दाने (बारीक कुचले हुए), पुराना साफ़ गुड़ — 20 gram (एक मध्यम टुकड़ा), पीने का साफ पानी — 1 बड़ा ग्लास (लगभग 250 मिली)।", en: "Ginger — 1 tsp, Tulsi — 8-10 leaves, Black pepper — 4-5 grains, Jaggery — 20g, Water — 1 large glass." } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "सोंठ का पाउडर (सूखा अदरक) — आधा छोटा चम्मच (लगभग 1 से 2 gram), ताज़ा तुलसी के पत्ते — 4 से 5 पीस (साफ धुले हुए), साबुत काली मिर्च का पाउडर — 2 दाने (बारीक कुचली हुए), पुराना साफ़ गुड़ — 10 gram (एक छोटा टुकड़ा), पीने का साफ पानी — 1 कप (लगभग 150 मिली)।", en: "Ginger — 1/2 tsp, Tulsi — 4-5 leaves, Black pepper — 2 grains, Jaggery — 10g, Water — 1 cup." } }
    ],
    ingredients: {
      hi: ['सोंठ का पाउडर (सूखा अदरक)', 'ताज़ा तुलसी के पत्ते', 'साबुत काली मिर्च का पाउडर', 'पुराना साफ़ गुड़', 'पीने का साफ पानी'],
      en: ['Dry ginger powder', 'Fresh Tulsi leaves', 'Whole black pepper powder', 'Old clean jaggery', 'Clean drinking water']
    },
    preparation: {
      hi: 'एक बर्तन में अपनी उम्र के अनुसार तय की गई मात्रा में पानी डालें। अब उसमें तुलसी के पत्तों को हाथ से तोड़कर डालें, साथ ही सोंठ का पाउडर, कुचली हुई काली मिर्च और गुड़ डाल दें। अब आंच को धीमा रखें और इसे तब तक उबलने दें जब तक कि यह उबलकर आधा न रह जाए। जब काढ़ा आधा बचे, तो आंच बंद कर दें और इसे कप में छान लें।',
      en: 'Boil water with Tulsi, ginger, pepper, and jaggery until reduced to half. Strain and serve.'
    },
    usage: {
      hi: 'इस काढ़े को छानने के बाद हल्का गुनगुना (चाय की तरह गर्म) रहते हुए ही धीरे-धीरे सिप लेकर पिएं। इसे पीने के तुरंत बाद शरीर पर चादर या कंबल ओढ़कर सो जाएं ताकि पसीना आए। पसीना आते ही हरारत और बदन दर्द गायब हो जाएगा। इसके बाद 1 घंटे तक हवा में न निकलें।\nअवधि: इस काढ़े का नियमित सेवन रोजाना सुबह खाली पेट और रात को सोने से पहले, लगातार 3 से 5 दिनों तक करें।',
      en: 'Sip warm decoction and rest under a blanket to induce sweating. Avoid drafts for 1 hour. Use twice daily for 3 to 5 days.'
    },
    dietEat: {
      hi: 'भोजन और गर्म सूप: मूंग की दाल का गर्म सूप पिएं। ताकत के लिए ताजा पका हुआ टमाटर, अदरक और काली मिर्च का गर्म सूप (1 छोटा बाउल यानी लगभग 150 मिली) शाम को ले सकते हैं, यह बहुत फायदेमंद है। इसके अलावा सोंठ-अजवाइन डाल कर बनाई हुई पतली खिचड़ी, सादी गर्म रोटी और गुनगुना पानी ही लें।\nसलाद की मात्रा: हरारत और जुकाम की स्थिति में कच्चे फल और ठंडे जूस पूरी तरह वर्जित हैं। सलाद के रूप में दोपहर के भोजन के साथ 1 छोटी कटोरी (लगभग 100 ग्राम) हल्के उबले हुए गर्म सलाद (जैसे भाप में पकी हुई गाजर या शलजम) पर हल्का सा सेंधा नमक छिड़क कर खा सकते हैं।',
      en: 'Diet: Moong dal soup, hot tomato-ginger soup. Thin khichdi with carom seeds. Include steamed warm salad; avoid raw fruits/juices.'
    },
    dietAvoid: {
      hi: 'पैकेट वाले फूड्स: बाजार के चिप्स, कुरकुरे, नमकीन, समोसे, तली-भुनी चीजें, बिस्कुट और मैदे से बने सामान सख़्ती से बंद रखें। भारी भोजन: उड़द की दाल, चावल, पनीर, मिठाई, भारी तड़का लगा हुआ भोजन और मांसाहार का सेवन बिल्कुल न करें। ठंडी चीजें और जूस: फ्रिज का ठंडा पानी, फलों के ठंडे जूस, कोल्ड ड्रिंक्स, आइसक्रीम, दही, मट्ठा और कच्चे खट्टे फल पूरी तरह वर्जित हैं।',
      en: 'Avoid: Packaged snacks, fried items, refined flour, heavy pulses, sweets, non-veg, and all cold items/juices.'
    },
    strictAvoid: {
      hi: 'ठंडी चीजें और जूस, भारी मांसाहार और पैकेट वाले स्नेक्स पूरी तरह वर्जित हैं।',
      en: 'Strictly avoid cold items, juices, heavy non-veg, and packaged snacks.'
    },
    routine: {
      morning: { hi: 'सुबह (Morning): सुबह उठकर गुनगुने पानी में थोड़ा सा सेंधा नमक डालकर गरारे करें और गर्म पानी की भाप लें।', en: 'Morning: Gargle with salt water and take steam.' },
      afternoon: { hi: 'दोपहर (Afternoon): दोपहर का खाना हमेशा ताजा और गर्म ही करें, बासी भोजन भूलकर भी न छुएं।', en: 'Afternoon: Eat fresh hot lunch; avoid stale food.' },
      evening: { hi: 'शाम/रात (Evening/Night): रात का भोजन 8 बजे से पहले खा लें। सोते समय अपने सिर, कान और छाती को सूती कपड़े या मफलर से ढककर रखें और पंखे की तेज हवा के नीचे सीधे न सोएं।', en: 'Evening/Night: Eat early dinner. Keep head/chest covered while sleeping; avoid direct fan drafts.' }
    },
    safetyAdvice: { hi: 'यदि इस उपाय को लगातार 3 से 5 दिनों तक नियम से करने के बाद भी आपकी हरारत, जुकाम, बुखार और बदन दर्द में राहत महसूस न हो, तो बिना देर किए अपने नजदीकी आयुर्वेदिक चिकित्सक से मिलकर उचित परामर्श लें। शरीर को सुरक्षित रखना ही हमारी सबसे पहली प्राथमिकता है।', en: 'Safety Notice: If no relief in 3-5 days, consult an Ayurvedic physician immediately.' },
    disclaimer: GENERAL_DISCLAIMER,
    image: "https://picsum.photos/seed/cough/600/400",
    keywords: "sardi jukam badan dard hararat bukhar tulsi saunth kali mirch"
  },
  {
    id: 'cc-7',
    serialNumber: '7',
    name: { hi: 'भुनी अलसी, मुलेठी और मिश्री का कफ-नाशक दिव्य चूर्ण', en: 'Relief Powder of Roasted Flaxseed, Licorice and Sugar Candy' },
    illnessId: 'common-cold',
    introduction: {
      hi: "मौसमी नजला और जुकाम जब पुराना हो जाता है, तो छाती और श्वसन नली में कफ सूख जाता है। इसके कारण गले में हर समय भयंकर खराश बनी रहती है, सूखी खांसी आती है और रात को सोते समय सांस लेने में भारीपन महसूस होता है। अलसी के बीजों में मौजूद प्राकृतिक तत्व छाती में जमे कफ को पिघलाकर बाहर निकालते हैं, मुलेठी गले की सूजन और दर्द को जड़ से शांत करती है, और धागे वाली मिश्री गले के सूखेपन को दूर कर उसे तर रखती है। यह दिव्य चूर्ण पुरानी से पुरानी सूखी खांसी और गले की जकड़न में पहले ही दिन से बहुत आराम देता है।",
      en: "This powder targets chronic cold with dry phlegm and throat irritation. Flaxseed thins congestion, licorice calms inflammation, and sugar candy hydrates the throat."
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "भुनी अलसी का पाउडर — आधा छोटा चम्मच (लगभग 1.5 ग्राम), मुलेठी चूर्ण — 1 चुटकी, धागे वाली मिश्री का पाउडर — आधा छोटा चम्मच।", en: "Roasted flaxseed — 1.5g, Licorice — 1 pinch, Sugar candy — 1/2 tsp." } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "भुनी अलसी का पाउडर — 1 छोटा चम्मच (लगभग 3 ग्राम), मुलेठी चूर्ण — आधा छोटा चम्मच (लगभग 1.5 ग्राम), धागे वाली मिश्री का पाउडर — 1 छोटा चम्मच।", en: "Roasted flaxseed — 3g, Licorice — 1.5g, Sugar candy — 1 tsp." } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "भुनी अलसी का पाउडर — 1 छोटा चम्मच (लगभग 3 ग्राम), मुलेठी चूर्ण — आधा छोटा चम्मच (लगभग 1.5 ग्राम), धागे वाली मिश्री का पाउडर — 1 छोटा चम्मच (यदि शुगर या डायबिटीज न हो)।", en: "Roasted flaxseed — 3g, Licorice — 1.5g, Sugar candy — 1 tsp (if not diabetic)." } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "भुनी अलसी का पाउडर — आधा छोटा चम्मच (लगभग 1.5 ग्राम), मुलेठी चूर्ण — आधा छोटा चम्मच, धागे वाली मिश्री का पाउडर — 1 चुटकी (यदि शुगर की समस्या हो तो मिश्री बिल्कुल न डालें)।", en: "Roasted flaxseed — 1.5g, Licorice — 1/2 tsp, Sugar candy — 1 pinch (omit if diabetic)." } }
    ],
    ingredients: {
      hi: ['भुनी हुई अलसी का बारीक पिसा हुआ पाउडर', 'शुद्ध मुलेठी की जड़ का महीन चूर्ण', 'पीसकर तैयार की गई धागे वाली मिश्री का पाउडर'],
      en: ['Roasted flaxseed powder', 'Fine licorice root powder', 'Threaded sugar candy powder']
    },
    preparation: {
      hi: 'सबसे पहले अलसी के साफ बीजों को एक लोहे या भारी कड़ाही या तवे पर बिना तेल या घी के धीमी आंच पर हल्का सा भून लें। जब बीजों के चटकने की आवाज आना बंद हो जाए, तो इन्हें एक बर्तन में निकालकर ठंडा कर लें। ठंडा होने पर इसे मिक्सी या साफ खरल में पीसकर बारीक चूर्ण बना लें। अब चुनी गई उम्र की सटीक मात्रा के अनुसार, एक छोटी साफ कटोरी में भुनी हुई अलसी का पाउडर, मुलेठी का चूर्ण और मिश्री का पाउडर निकालें और चम्मच की मदद से आपस में अच्छी तरह मिला लें। आपकी एक बार की दिव्य खुराक तैयार है।',
      en: 'Roast flaxseeds until popping stops, then grind. Mix the prescribed amounts of flaxseed, licorice, and sugar candy powders.'
    },
    usage: {
      hi: 'इस तैयार चूर्ण के मिश्रण को सुबह खाली पेट और रात को सोने से ठीक पहले हल्के गुनगुने पानी के साथ फांक लें। इसे लेने के कम से कम 45 मिनट बाद तक पानी के अलावा कुछ भी न खाएं और न ही पिएं।\nअवधि: इसका नियमित सेवन लगातार 3 से 5 दिनों तक करें, या जब तक सूखी खांसी और गले की खराश पूरी तरह ठीक न हो जाए।',
      en: 'Take with lukewarm water in the morning and before bed. Do not eat/drink for 45 mins after. Use for 3 to 5 days.'
    },
    dietEat: {
      hi: 'भोजन: भोजन में केवल हल्के और गरम सूप (जैसे टमाटर या कद्दू का सूप), मूंग दाल की पतली और ढीली खिचड़ी, या उबले चावल का मांड लें। पीने के लिए हमेशा हल्का गुनगुना पानी ही इस्तेमाल करें।\nसब्जियां: तोरई, लौकी, परवल और टिंडा जैसी सुपाच्य सब्जियां हल्के सेंधा नमक और जीरे के तड़के के साथ खाएं।',
      en: 'Diet: Warm soups, thin khichdi, rice gruel, lukewarm water. Include digestible gourd vegetables.'
    },
    dietAvoid: {
      hi: 'पैकेट वाले फूड्स: बाजार के तले-भुने चिप्स, कुरकुरे, पैकेट वाली नमकीन, बिस्कुट, ब्रेड और टोस्ट पूरी तरह वर्जित हैं। भारी भोजन: मांसाहार (चिकन, मटन, मछली, अंडा), पनीर, भारी घी या तेल, मैदा से बनी चीजें (जैसे समोसा, कचौड़ी, नूडल्स) और भारी दालें (उड़द, राजमा) बिल्कुल न खाएं। ठंडी चीजें: फ्रिज का ठंडा पानी, खट्टा दही, छाछ, खट्टे फल (संतरा, नींबू) और आइसक्रीम या कोल्ड ड्रिंक्स का कामना/सेवन सख्त मना है, क्योंकि ये गले को और ज्यादा सुखाकर कफ को जमा देती हैं।',
      en: 'Avoid: Packaged snacks, fried items, heavy oils, non-veg, and cold items that dry the throat.'
    },
    strictAvoid: {
      hi: 'ठंडी चीजें, भारी मांसाहार और पैकेट वाले स्नेक्स पूरी तरह वर्जित हैं।',
      en: 'Strictly avoid cold items, heavy non-veg, and packaged snacks.'
    },
    routine: {
      morning: { hi: 'सुबह (Morning): सुबह उठते ही हल्के गरम पानी में थोड़ा सा सेंधा नमक डालकर कम से कम 2 मिनट तक गरारे ज़रूर करें।', en: 'Morning: Gargle with warm salt water.' },
      afternoon: { hi: 'दोपहर (Afternoon): दोपहर के भोजन के बाद गुनगुने वातावरण में आराम करें। सीधे कूलर, एसी या तेज पंखे की सीधी हवा के नीचे बैठने से बचें।', en: 'Afternoon: Rest in a warm environment; avoid direct fan/AC drafts.' },
      evening: { hi: 'शाम/रात (Evening/Night): रात का भोजन सूरज डूबने के आसपास या 8 बजे तक हर हाल में कर लें। सोते समय अपने गले और कान को सूती कपड़े या हल्के मफलर से ढककर सोएं ताकि रात की ठंडी हवा न लगे।', en: 'Evening/Night: Eat early dinner. Keep throat and ears covered while sleeping.' }
    },
    safetyAdvice: { hi: 'यदि खांसी के साथ बलगम में खून आने की शिकायत हो, छाती में बहुत तेज दर्द हो या सांस लेने में अत्यधिक तकलीफ महसूस हो, तो तुरंत अपने नजदीकी योग्य वैद्य से मिलें। स्वास्थ्य ही सर्वोपरि है।', en: 'Safety Notice: Consult a doctor if you see blood in phlegm or have extreme breathing difficulty.' },
    disclaimer: GENERAL_DISCLAIMER,
    image: "https://picsum.photos/seed/cough/600/400",
    keywords: "alsi mulethi mishri cough cold jukam nazla dry cough throat irritation"
  },
  {
    id: 'cc-8',
    serialNumber: '8',
    name: { hi: 'भुनी अजवाइन, काली मिर्च और सोंठ का दिव्य सेक और काढ़ा', en: 'Roasted Carom, Black Pepper and Ginger Decoction with Compress' },
    illnessId: 'common-cold',
    introduction: {
      hi: "बदलते मौसम या ठंडी हवा के संपर्क में आने से जब नाक से लगातार पानी बहने लगता है, बार-बार छींकें आती हैं, और कफ जमने के कारण माथा और सिर भारी हो जाता है, तो उसे तीव्र नजला-जुकाम कहा जाता है। अजवाइन की तासीर अत्यधिक गर्म और कफ को सुखाने वाली होती है। इसकी गरम भाप और सेक से बंद नसें तुरंत खुलती हैं, जबकि काली मिर्च और सोंठ का काढ़ा छाती के संक्रमण को खत्म करता है। यह दोहरा उपाय बहती नाक और सर्दी के सिरदर्द में रामबाण की तरह काम करता है।",
      en: "Targeting runny nose and head heaviness from cold exposure, this dual remedy uses Ajwain's heat to dry phlegm via steam and compress, while the ginger brew clears infection."
    },
    doses: [
      { ageRange: AGE_BRACKETS.childhood, dose: { hi: "काढ़े के लिए: कुचली अजवाइन — 1 चुटकी, काली मिर्च पाउडर — आधा चुटकी, सोंठ पाउडर — 1 चुटकी, धागे वाली मिश्री — आधा छोटा चम्मच। (पोटली के लिए 1 चम्मच अजवाइन तवे पर भूनें)।", en: "Brew: 1 pinch Ajwain, 1/2 pinch pepper, 1 pinch ginger, 1/2 tsp sugar candy. Compress: 1 tsp Ajwain." } },
      { ageRange: AGE_BRACKETS.youth, dose: { hi: "काढ़े के लिए: कुचली अजवाइन — आधा छोटा चम्मच, काली मिर्च पाउडर — 1 चुटकी, सोंठ पाउडर — आधा छोटा चम्मच, धागे वाली मिश्री — 1 छोटा चम्मच। (पोटली के लिए 2 चम्मच अजवाइन तवे पर भूनें)।", en: "Brew: 1/2 tsp Ajwain, 1 pinch pepper, 1/2 tsp ginger, 1 tsp sugar candy. Compress: 2 tsp Ajwain." } },
      { ageRange: AGE_BRACKETS.middleAge, dose: { hi: "काढ़े के लिए: कुचली अजवाइन — आधा छोटा चम्मच, काली मिर्च पाउडर — 1 चुटकी, सोंठ पाउडर — आधा छोटा चम्मच, धागे वाली मिश्री — 1 छोटा चम्मच (यदि शुगर न हो)। (पोटली के लिए 2 चम्मच अजवाइन तवे पर भूनें)।", en: "Brew: 1/2 tsp Ajwain, 1 pinch pepper, 1/2 tsp ginger, 1 tsp sugar candy. Compress: 2 tsp Ajwain." } },
      { ageRange: AGE_BRACKETS.oldAge, dose: { hi: "काढ़े के लिए: कुचली अजवाइन — 1 चुटकी, काली मिर्च पाउडर — आधा चुटकी, सोंठ पाउडर — आधा छोटा चम्मच, मिश्री — बिल्कुल नहीं (यदि शुगर की समस्या हो)। (पोटली के लिए 1 चम्मच अजवाइन धीमी आंच पर भूनें)।", en: "Brew: 1 pinch Ajwain, 1/2 pinch pepper, 1/2 tsp ginger, No sugar candy. Compress: 1 tsp Ajwain." } }
    ],
    ingredients: {
      hi: ['साफ अजवाइन के दाने, बारीक कुचली हुई काली मिर्च का पाउडर, सोंठ (सूखा अदरक) का महीन चूर्ण, मीठे के लिए धागे वाली मिश्री, और सेक करने के लिए एक साफ सूती कपड़ा।\n\n(ज़रूरी नोट: यह सभी जड़ी-बूटियाँ बाजार से अपनी सुविधा अनुसार 20 या 50 ग्राम की मात्रा में लाकर घर पर साफ डिब्बे में सुरक्षित रख लें। रोज नुस्खा बनाने के लिए ऊपर \'स्मार्ट खुराक\' के बटन में अपनी उम्र के अनुसार बताई गई चुटकी या चम्मच की मात्रा में ही सामान बाहर निकालें।)'],
      en: ['Clean carom seeds, fine black pepper powder, dry ginger powder, threaded sugar candy, and a clean cotton cloth for compress. Note: Store these herbs at home and use small amounts as per age buttons for daily preparation.']
    },
    preparation: {
      hi: 'पोटली सेक विधि: तवे पर अजवाइन को बिना तेल या घी के तेज गर्म कर लें। जब धुआं और खुशबू निकलने लगे, तो इसे सूती कपड़े में बांधकर एक छोटी पोटली बना लें।\nकाढ़ा विधि: एक बर्तन में 1.5 कप पीने का पानी लें। उसमें चुनी गई उम्र के अनुसार कुचली हुई अजवाइन, काली मिर्च और सोंठ का पाउडर डाल दें। इसे धीमी आंच पर तब तक उबालें जब तक पानी जलकर आधा कप न रह जाए। इसे छान लें और गुनगुना होने दें।',
      en: 'Roast Ajwain for a compress. Boil Ajwain, pepper, and ginger in 1.5 cups water until reduced to half a cup.'
    },
    usage: {
      hi: 'उपयोग (पोटली): तैयार गरम पोटली को पहले अपनी हथेली पर छूकर तापमान जांचें, फिर इससे माथे, नाक के दोनों तरफ और छाती पर धीरे-धीरे 5 से 7 मिनट तक सेक करें और इसकी गहरी भाप नाक से अंदर खींचें।\nसेवन (काढ़ा): सेक करने के तुरंत बाद इस छने हुए गुनगुने काढ़े को चाय की तरह धीरे-धीरे सिप लेकर पिएं। इसे सुबह खाली पेट और रात को सोते समय दिन में 2 बार लें।\nअवधि: इस उपाय को नियमित रूप से लगातार 3 से 5 दिनों तक करें।',
      en: 'Apply compress to forehead and chest while inhaling steam. Immediately after, sip the warm brew slowly. Use twice daily for 3 to 5 days.'
    },
    dietEat: {
      hi: 'भोजन: भोजन में गरमा-गरम बाजरे या गेहूं की सादी रोटी, तोरई या कद्दू की सूखी सब्जी (सेंधा नमक और जीरे वाली), और मूंग की दाल का गर्म पानी लें। पीने के लिए केवल गुनगुने पानी का ही प्रयोग करें।',
      en: 'Diet: Hot Bajra/wheat roti, dry gourd vegetables, warm Moong dal water, and lukewarm water.'
    },
    dietAvoid: {
      hi: 'पैकेट वाले फूड्स: बाजार के तले-भुने कुरकुरे, चिप्स, आलू भुजिया, मैदे वाले बिस्कुट, टोस्ट और पैकेट बंद नमकीन पूरी तरह बंद रखें। भारी भोजन: मांसाहार, अंडा, पनीर, गाढ़ा दूध, मक्खन, चावल, समोसा, कचौड़ी और भारी तली हुई चीजें बिल्कुल न खाएं, क्योंकि ये कफ को और गाढ़ा बनाती हैं। ठंडी चीजें: फ्रिज का पानी, कोल्ड ड्रिंक्स, आइसक्रीम, खट्टा दही, मट्ठा, केला, अमरूद और खट्टे फल सख्त वर्जित हैं।',
      en: 'Avoid: Packaged snacks, fried items, non-veg, eggs, paneer, thick milk, and cold items.'
    },
    strictAvoid: {
      hi: 'ठंडी चीजें, भारी मांसाहार और पैकेट वाले स्नेक्स पूरी तरह वर्जित हैं।',
      en: 'Strictly avoid cold items, heavy non-veg, and packaged snacks.'
    },
    routine: {
      morning: { hi: 'सुबह (Morning): सुबह उठकर गुनगुने पानी से चेहरा धोएं। ठंडे पानी के संपर्क में आने से बचें और सिर को ढक कर रखें।', en: 'Morning: Wash face with lukewarm water; keep head covered.' },
      afternoon: { hi: 'दोपहर (Afternoon): दोपहर के भोजन के बाद कम से कम 45 मिनट का विश्राम करें। कूलर या एसी की सीधी हवा के सामने बिल्कुल न बैठें।', en: 'Afternoon: Rest after lunch; avoid direct fan/AC drafts.' },
      evening: { hi: 'शाम/रात (Evening/Night): रात का भोजन 8 बजे से पहले खा लें। सोते समय कान में साफ रुई डाल लें या मफलर बांधें, और पैरों के तलवों में सरसों का तेल हल्का गुनगुना करके मलें।', en: 'Evening/Night: Eat early dinner. Keep ears covered; massage soles with warm mustard oil.' }
    },
    safetyAdvice: { hi: 'यदि सर्दी-जुकाम बहुत पुराना हो या इस उपाय को करने के बाद भी आपको आराम न मिले, तो अपने पास के किसी अच्छे डॉक्टर या आयुर्वेद विशेषज्ञ से एक बार मुस्कुराकर सलाह ज़रूर ले लें। सेहत का ख्याल रखना ही सबसे बड़ी समझदारी है।', en: 'Safety Notice: Consult a doctor if condition is chronic or persists despite remedies.' },
    disclaimer: GENERAL_DISCLAIMER,
    image: "https://picsum.photos/seed/cough/600/400",
    keywords: "sardi jukam badan dard hararat bukhar ajwain kali mirch saunth"
  }
];
