import { collection, addDoc } from 'firebase/firestore';
import { Chat } from '../types/chatSession';
import { db } from './firebase';

const chatCollection = collection(db, 'chats');

// Tạo người dùng
export const createChat = async (chat: Chat): Promise<string> => {
  const docRef = await addDoc(chatCollection, chat);
  return docRef.id;
};
