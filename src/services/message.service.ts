import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { Message } from '../types/message';
import { db } from './firebase';

const messageCollection = collection(db, 'messages');

// Tạo tin nhắn
export const createMessage = async (message: Message): Promise<string> => {
  const docRef = await addDoc(messageCollection, message);
  return docRef.id;
};

// Lấy tất cả tin nhắn theo sessionId
export const getMessagesBySessionId = async (
  sessionId: string
): Promise<Message[]> => {
  console.log('🚀 ~ sessionId:', sessionId);
  const q = query(
    messageCollection,
    // where('sessionId', '==', sessionId), // Lọc theo sessionId
    orderBy('createdAt', 'asc') // Sắp xếp theo thời gian
  );

  const querySnapshot = await getDocs(q);
  console.log('🚀 ~ querySnapshot:', querySnapshot);

  const messages: Message[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Message[];

  console.log(messages);
  return messages;
};
