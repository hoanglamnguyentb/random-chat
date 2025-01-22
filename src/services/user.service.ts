import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { User } from '../types/user';
import { db } from './firebase';

const usersCollection = collection(db, 'users');

// Tạo người dùng
export const createUser = async (user: User): Promise<string> => {
  const docRef = await addDoc(usersCollection, user);
  return docRef.id;
};

// Kiểm tra xem user có tồn tại dựa vào username
export const checkIfUserExistsByUsername = async (
  username: string
): Promise<boolean> => {
  try {
    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('username', '==', username));

    const querySnapshot = await getDocs(q);

    // Nếu có ít nhất 1 document khớp với username thì user đã tồn tại
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking user existence:', error);
    return false;
  }
};

// Lấy thông tin người dùng
export const getUser = async (userId: string): Promise<User | null> => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as User;
  } else {
    return null;
  }
};

// Cập nhật người dùng
export const updateUser = async (userId: string, data: Partial<User>) => {
  const docRef = doc(db, 'users', userId);
  await updateDoc(docRef, data);
};
