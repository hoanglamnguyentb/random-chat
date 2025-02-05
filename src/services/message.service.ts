import { collection, addDoc } from 'firebase/firestore';
import { Message } from '../types/message';
import { db } from './firebase';

const messageCollection = collection(db, 'messages');

// Tạo người dùng
export const createMessage = async (message: Message): Promise<string> => {
  const docRef = await addDoc(messageCollection, message);
  return docRef.id;
};
