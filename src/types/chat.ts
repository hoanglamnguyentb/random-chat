import firebase from 'firebase/compat/app';

export interface Chat {
  id: string;
  userIds: string[];
  createdAt: firebase.firestore.Timestamp;
  endedAt?: firebase.firestore.Timestamp;
}
