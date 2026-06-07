import { MetadataRoute } from 'next';
import { collection, getDocs, getFirestore, query, orderBy } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { REMEDIES as STATIC_REMEDIES } from '@/lib/remedy-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ghareluupaycare.com';

  // Base pages
  const routes = [
    '',
    '/admin-login',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }));

  // Static remedies
  const staticRoutes = STATIC_REMEDIES.map((remedy) => ({
    url: `${baseUrl}/remedy/${remedy.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Dynamic remedies from Firestore
  let dynamicRoutes: any[] = [];
  try {
    const { firestore } = initializeFirebase();
    const q = query(collection(firestore, 'recipes'), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    
    dynamicRoutes = snapshot.docs.map((doc) => ({
      url: `${baseUrl}/remedy/${doc.id}`,
      lastModified: doc.data().timestamp?.toDate() || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error generating dynamic sitemap:", error);
  }

  return [...routes, ...staticRoutes, ...dynamicRoutes];
}