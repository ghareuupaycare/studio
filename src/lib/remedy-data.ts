import { PlaceHolderImages } from "./placeholder-images";

export type Remedy = {
  id: string;
  name: string;
  category: string;
  symptoms: string[];
  ingredients: string[];
  preparation: string;
  usage: string;
  safetyAdvice: string;
  image: string;
};

export const CATEGORIES = [
  { id: 'joints', label: 'घुटनों का दर्द', icon: 'Accessibility', image: PlaceHolderImages.find(i => i.id === 'joint-pain')?.imageUrl },
  { id: 'respiratory', label: 'खांसी और सर्दी', icon: 'Wind', image: PlaceHolderImages.find(i => i.id === 'respiratory')?.imageUrl },
  { id: 'digestion', label: 'पाचन', icon: 'Stomach', image: PlaceHolderImages.find(i => i.id === 'digestion')?.imageUrl },
  { id: 'skin', label: 'त्वचा देखभाल', icon: 'Sparkles', image: PlaceHolderImages.find(i => i.id === 'skincare')?.imageUrl },
];

export const REMEDIES: Remedy[] = [
  {
    id: 'r1',
    name: 'अदरक और शहद',
    category: 'respiratory',
    symptoms: ['खांसी', 'सर्दी', 'Cough', 'Cold'],
    ingredients: ['अदरक का रस', 'शहद'],
    preparation: 'एक चम्मच अदरक का रस निकालें और उसमें एक चम्मच शहद मिलाएं।',
    usage: 'इसे दिन में दो से तीन बार धीरे-धीरे चाटें।',
    safetyAdvice: 'बहुत छोटे बच्चों को शहद देने से पहले डॉक्टर से सलाह लें।',
    image: PlaceHolderImages.find(i => i.id === 'respiratory')?.imageUrl || ""
  },
  {
    id: 'r2',
    name: 'मेथी दाना लेप',
    category: 'joints',
    symptoms: ['घुटनों का दर्द', 'Joint Pain', 'Knee Pain'],
    ingredients: ['मेथी दाना', 'पानी'],
    preparation: 'मेथी दानों को रात भर भिगोकर रखें और सुबह पीसकर पेस्ट बना लें।',
    usage: 'दर्द वाले हिस्से पर इस पेस्ट को लगाएं और सूखने दें।',
    safetyAdvice: 'अगर जलन महसूस हो तो तुरंत धो लें।',
    image: PlaceHolderImages.find(i => i.id === 'joint-pain')?.imageUrl || ""
  },
  {
    id: 'r3',
    name: 'अजवाइन का पानी',
    category: 'digestion',
    symptoms: ['गैस', 'अपच', 'Gas', 'Indigestion'],
    ingredients: ['अजवाइन', 'पानी', 'काला नमक'],
    preparation: 'एक गिलास पानी में एक चम्मच अजवाइन उबालें जब तक पानी आधा न रह जाए।',
    usage: 'गुनगुना होने पर इसमें चुटकी भर काला नमक मिलाकर पिएं।',
    safetyAdvice: 'गर्भवती महिलाएं अधिक मात्रा में सेवन न करें।',
    image: PlaceHolderImages.find(i => i.id === 'digestion')?.imageUrl || ""
  },
  {
    id: 'r4',
    name: 'हल्दी और दूध',
    category: 'joints',
    symptoms: ['बदन दर्द', 'Immunity', 'Body Ache'],
    ingredients: ['दूध', 'हल्दी पाउडर'],
    preparation: 'एक गिलास गरम दूध में आधा चम्मच हल्दी मिलाएं।',
    usage: 'रात को सोने से पहले इसका सेवन करें।',
    safetyAdvice: 'प्योर हल्दी का उपयोग करें, मिलावटी नहीं।',
    image: PlaceHolderImages.find(i => i.id === 'ayurveda-herbs')?.imageUrl || ""
  },
  {
    id: 'r5',
    name: 'तुलसी की चाय',
    category: 'respiratory',
    symptoms: ['बुखार', 'Cold', 'Immunity'],
    ingredients: ['तुलसी के पत्ते', 'पानी', 'काली मिर्च'],
    preparation: 'तुलसी के पत्तों और काली मिर्च को पानी में अच्छी तरह उबालें।',
    usage: 'दिन में दो बार इस काढ़े का सेवन करें।',
    safetyAdvice: 'तुलसी के पत्तों को चबाने के बजाय निगलना या काढ़ा बनाना बेहतर है।',
    image: PlaceHolderImages.find(i => i.id === 'vaidya-expert')?.imageUrl || ""
  }
];
