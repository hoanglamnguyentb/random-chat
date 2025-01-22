import firebase from 'firebase/compat/app';
export interface User {
  username: string;
  // email: string;
  createdAt: firebase.firestore.Timestamp;
  lastActive: firebase.firestore.Timestamp;
}
