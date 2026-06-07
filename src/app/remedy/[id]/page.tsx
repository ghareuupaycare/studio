import React from 'react';
import { Metadata } from 'next';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { Remedy } from '@/lib/remedy-types';
import { RemedyDetail } from '@/components/gharelu/remedy-detail';
import { TopBar } from '@/components/gharelu/top-bar';
import { BottomNav } from '@/components/gharelu/bottom-nav';
import { REMEDIES as STATIC_REMEDIES } from '@/lib/remedy-data';

interface RemedyPageProps {
  params: { id: string };
}

async function getRemedyData(id: string): Promise<Remedy | null> {
  // Check static data first
  const staticRemedy = STATIC_REMEDIES.find(r => r.id === id);
  if (staticRemedy) return staticRemedy;

  // Check Firestore
  try {
    const { firestore } = initializeFirebase();
    const docRef = doc(firestore, 'recipes', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        serialNumber: "Live",
        name: data.remedyTitle,
        diseaseName: data.diseaseName, // Correct mapping for illness display
        illnessId: data.diseaseName?.en?.toLowerCase().replace(/\s+/g, '_') || 'live',
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
  } catch (error) {
    console.error("Error fetching remedy SEO data:", error);
  }
  return null;
}

export async function generateMetadata({ params }: RemedyPageProps): Promise<Metadata> {
  const remedy = await getRemedyData(params.id);
  if (!remedy) return { title: 'Remedy Not Found | Gharelu Upay Care' };

  return {
    title: `${remedy.name.hi} | ${remedy.name.en} - घरेलू उपाय केयर`,
    description: `वैद्य जी द्वारा संचालित: ${remedy.name.hi} के लिए पारंपरिक आयुर्वेदिक घरेलू उपाय। ${Array.isArray(remedy.introduction.hi) ? remedy.introduction.hi[0] : remedy.introduction.hi}`,
    keywords: remedy.keywords.join(', '),
    openGraph: {
      title: remedy.name.hi,
      description: remedy.name.en,
      type: 'article',
    }
  };
}

export default async function RemedyPage({ params }: RemedyPageProps) {
  const remedy = await getRemedyData(params.id);

  if (!remedy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-bold">नुस्खा नहीं मिला | Remedy Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-24">
      <div className="h-14 bg-primary flex items-center px-6">
        <a href="/" className="text-white font-bold text-lg">घरेलू उपाय केयर</a>
      </div>

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
