import firebase from 'firebase/compat/app';
export interface User {
  id?: string;
  username: string;
  // email: string;
  createdAt: firebase.firestore.Timestamp;
  lastActive: firebase.firestore.Timestamp;
}
