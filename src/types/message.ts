import firebase from 'firebase/compat/app';
export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  sentAt: firebase.firestore.Timestamp;
}
