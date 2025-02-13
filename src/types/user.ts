import { Role } from '@/consts/role';
import firebase from 'firebase/compat/app';
export interface User {
  id?: string;
  username: string;
  // email: string;
  password: string;
  role?: Role;
  createdAt?: firebase.firestore.Timestamp;
  lastActive?: firebase.firestore.Timestamp;
}
