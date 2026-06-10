import React from 'react';
import { Metadata } from 'next';
import { doc, getDoc, getDocs, collection, query, where, limit } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { Remedy } from '@/lib/remedy-types';
import { RemedyDetail } from '@/components/gharelu/remedy-detail';
import { REMEDIES as STATIC_REMEDIES } from '@/lib/remedy-data';

interface RemedyPageProps {
  params: Promise<{ id: string }>;
}

async function getRemedyData(id: string): Promise<Remedy | null> {
  // Sanitize the ID: Trim spaces and decode URI characters to ensure a pure string
  const cleanId = decodeURIComponent(id.trim());

  // 1. Check static data first by ID or Slug
  const staticRemedy = STATIC_REMEDIES.find(r => r.id === cleanId || r.slug === cleanId);
  if (staticRemedy) return staticRemedy;

  // 2. Check Firestore
  try {
    const { firestore } = initializeFirebase();
    
    // Primary Fetch: Fetch directly by the exact Firestore Document ID
    const docRef = doc(firestore, 'recipes', cleanId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return mapDocToRemedy(docSnap.id, docSnap.data());
    }

    // Secondary Fallback: Try fetching by the SEO Slug field (if any legacy links exist)
    const q = query(collection(firestore, 'recipes'), where('slug', '==', cleanId), limit(1));
    const querySnap = await getDocs(q);
    
    if (!querySnap.empty) {
      const firstDoc = querySnap.docs[0];
      return mapDocToRemedy(firstDoc.id, firstDoc.data());
    }
  } catch (error) {
    console.error("Error fetching remedy data from Firestore:", error);
  }
  return null;
}

function mapDocToRemedy(id: string, data: any): Remedy {
  return {
    id: id,
    serialNumber: "Live",
    name: data.remedyTitle,
    diseaseName: data.diseaseName,
    illnessId: data.diseaseName?.en?.toLowerCase().replace(/\s+/g, '_') || 'live',
    slug: data.slug || id,
    categoryId: data.mainCategory?.en?.toLowerCase().replace(/\s+/g, '_') || 'live',
    mainCategory: data.mainCategory,
    introduction: data.introduction,
    doses: data.doses || [],
    ingredients: data.ingredients,
    preparation: data.preparation,
    usage: data.usage,
    dietEat: data.dietEat,
    dietAvoid: data.dietAvoid,
    routine: data.routine,
    safetyAdvice: data.safetyAdvice,
    disclaimer: { hi: "", en: "" },
    keywords: data.keywords || []
  } as Remedy;
}

export async function generateMetadata({ params }: RemedyPageProps): Promise<Metadata> {
  const { id } = await params;
  const remedy = await getRemedyData(id);
  if (!remedy) return { title: 'Remedy Not Found | Gharelu Upay Care' };

  const introText = Array.isArray(remedy.introduction.hi) 
    ? remedy.introduction.hi[0] 
    : remedy.introduction.hi;

  return {
    title: `${remedy.name.hi} | ${remedy.name.en} - घरेलू उपाय केयर`,
    description: `वैद्य जी द्वारा संचालित: ${remedy.name.hi} के लिए पारंपरिक आयुर्वेदिक घरेलू उपाय। ${introText}`,
    keywords: remedy.keywords.join(', '),
    openGraph: {
      title: remedy.name.hi,
      description: remedy.name.en,
      type: 'article',
      url: `https://studio-xi-mocha.vercel.app/remedy/${remedy.id}`,
    }
  };
}

export default async function RemedyPage({ params }: RemedyPageProps) {
  const { id } = await params;
  const remedy = await getRemedyData(id);

  if (!remedy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] p-6 text-center">
        <div className="space-y-6 max-w-sm animate-in fade-in zoom-in duration-500">
          <div className="text-6xl">🌿</div>
          <h1 className="text-2xl font-black text-primary font-headline">नुस्खा नहीं मिला | Remedy Not Found</h1>
          <p className="text-muted-foreground font-medium">क्षमा करें, यह नुस्खा उपलब्ध नहीं है या लिंक गलत है।</p>
          <a href="/" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg transition-transform active:scale-95">
            होम पेज पर जाएं
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-24 selection:bg-primary selection:text-white">
      <header className="h-14 bg-primary flex items-center px-6 sticky top-0 z-50 shadow-md">
        <a href="/" className="text-white font-black text-lg font-headline tracking-wide">घरेलू उपाय केयर</a>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-10">
        <RemedyDetail 
          remedy={remedy} 
          theme="cream" 
          lang="hi" 
          isFavorite={false} 
        />
      </main>
    </div>
  );
}