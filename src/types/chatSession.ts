import firebase from 'firebase/compat/app';

export interface ChatSession {
  id?: string;
  userIds: string[];
  createdAt: firebase.firestore.Timestamp;
  endedAt?: firebase.firestore.Timestamp;
}
