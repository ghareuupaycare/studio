/**
 * @fileOverview Modular utility for managing Chat Sync and LocalStorage persistence.
 * This ensures that both Admin and User sides use identical structures and keys.
 */

import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  doc,
  updateDoc
} from 'firebase/firestore';

export const CHAT_USER_ID_KEY = 'gharelu_user_id';

/**
 * Gets or generates a unique anonymous User ID for the device.
 */
export function getChatUserId(): string {
  if (typeof window === 'undefined') return '';
  let uid = localStorage.getItem(CHAT_USER_ID_KEY);
  if (!uid) {
    uid = 'user_' + Math.random().toString(36).substring(2, 11);
    localStorage.setItem(CHAT_USER_ID_KEY, uid);
  }
  return uid;
}

/**
 * Shared storage key for caching chat history locally.
 */
export function getChatCacheKey(remedyId: string, userId: string): string {
  return `gharelu_chat_v2_${remedyId}_${userId}`;
}

/**
 * Listens to a specific chat thread from Firestore.
 * Sorts in memory to avoid requiring complex composite indexes.
 */
export function listenToChatThread(
  db: any, 
  remedyId: string, 
  userId: string, 
  onUpdate: (messages: any[]) => void
) {
  if (!db || !remedyId || !userId) return () => {};

  const q = query(
    collection(db, 'questions'),
    where('remedyId', '==', remedyId),
    where('userId', '==', userId)
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Local timestamp fallback for sorting before server sync
        _sortTs: data.timestamp?.toMillis() || Date.now()
      };
    }).sort((a, b) => a._sortTs - b._sortTs);
    
    onUpdate(messages);
  }, (error) => {
    console.error("Chat sync error:", error);
  });
}

/**
 * Sends a new message from the user side.
 */
export async function postUserExperience(
  db: any, 
  remedyId: string, 
  remedyName: any, 
  userId: string, 
  text: string
) {
  if (!db || !userId || !text.trim()) return;

  return addDoc(collection(db, 'questions'), {
    remedyId,
    remedyName,
    userId,
    question: text.trim(),
    answer: null,
    hasAnswer: false,
    isRead: false,
    timestamp: serverTimestamp()
  });
}

/**
 * Sends a reply from the admin side.
 */
export async function postAdminReply(
  db: any, 
  questionId: string, 
  replyText: string
) {
  if (!db || !questionId || !replyText.trim()) return;

  return updateDoc(doc(db, 'questions', questionId), {
    answer: replyText.trim(),
    hasAnswer: true,
    isRead: false,
    answeredAt: serverTimestamp()
  });
}
