import firebase from 'firebase/compat/app';
export interface Connection {
  id: string;
  user1Id: string;
  user2Id: string;
  connectedAt: firebase.firestore.Timestamp;
  endedAt?: firebase.firestore.Timestamp;
}
