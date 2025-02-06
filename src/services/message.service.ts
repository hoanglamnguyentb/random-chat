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
  chatSessionId: string
): Promise<Message[]> => {
  const q = query(
    messageCollection,
    where('chatSessionId', '==', chatSessionId),
    orderBy('createdAt', 'asc')
  );
  const querySnapshot = await getDocs(q);
  const messages: Message[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Message[];
  return messages;
};
