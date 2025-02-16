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
import { compare, hash } from 'bcryptjs';
import { Role } from '@/consts/role';

const usersCollection = collection(db, 'users');

// Tạo người dùng
export const createUser = async (user: User): Promise<string> => {
  const hashedPassword = await hash(user.password, 10);
  const newUser = {
    username: user.username,
    role: user.role ?? Role.USER,
    createdAt: new Date().toISOString(),
    password: hashedPassword,
  };
  const docRef = await addDoc(usersCollection, newUser);
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

// Đăng nhập
export const loginUser = async (
  username: string,
  password: string
): Promise<string> => {
  try {
    // Tìm user trong Firestore theo email
    const q = query(usersCollection, where('username', '==', username));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error('*Email hoặc mật khẩu không đúng.');
    }

    // Lấy thông tin user đầu tiên tìm thấy
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data() as User;

    // So sánh mật khẩu nhập vào với mật khẩu trong database
    if (!userData.password) {
      throw new Error('*Email hoặc mật khẩu không đúng.');
    }

    const isPasswordValid = await compare(password, userData.password);

    if (!isPasswordValid) {
      throw new Error('*Email hoặc mật khẩu không đúng.');
    }

    return userDoc.id; // Trả về userId nếu đăng nhập thành công
  } catch (error) {
    console.log(error);
    throw error;
  }
};
