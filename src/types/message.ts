import firebase from 'firebase/compat/app';
export interface Message {
  id?: string;
  chatSessionId: string;
  senderId: string;
  content: string;
  createdAt: firebase.firestore.Timestamp;
}
