import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { ChatSession } from '@/types/chatSession';

const chatCollection = collection(db, 'chats');

// Tạo đoạn chat
export const createChat = async (chat: ChatSession): Promise<string> => {
  const docRef = await addDoc(chatCollection, {
    ...chat,
    createdAt: serverTimestamp(), // Thêm timestamp để sắp xếp
  });
  return docRef.id;
};

// Đổi tiên cuộc hội thoại
export const renameChatTitle = async (
  chatSessionId: string,
  newName: string
): Promise<void> => {
  const chatDocRef = doc(db, 'chats', chatSessionId);
  await updateDoc(chatDocRef, { title: newName });
};

// Lấy tất cả các sessionChat theo userId
export const getChatsByUserId = async (
  userId: string
): Promise<ChatSession[]> => {
  const q = query(
    chatCollection,
    where('userIds', 'array-contains', userId),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);

  const chats: ChatSession[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ChatSession[];

  return chats;
};

// Xoá chatSession theo id
export const deleteChatSessionById = async (
  chatSessionId: string
): Promise<void> => {
  const chatDocRef = doc(db, 'chats', chatSessionId); // Lấy document reference từ id
  await deleteDoc(chatDocRef); // Xoá document
};

// Xoá tất cả các chatSessions theo userId
export const deleteChatsByUserId = async (userId: string): Promise<void> => {
  const q = query(chatCollection, where('userIds', 'array-contains', userId));
  const querySnapshot = await getDocs(q);
  const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
  await Promise.all(deletePromises);
};
