import { db, auth } from './firebase';
import {
  collection,
  addDoc,
  query,
  getDocs,
  deleteDoc,
  where,
  Timestamp,
  runTransaction,
} from 'firebase/firestore';

// Hàm tìm bạn chat
export const findMatch = async (userId: string) => {
  const waitingRef = collection(db, 'waiting_users');
  return await runTransaction(db, async (transaction) => {
    // Kiểm tra có ai khác đang chờ ghép đôi không
    const q = query(waitingRef, where('userId', '!=', userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Nếu có ai đó đang chờ, lấy người đầu tiên
      const waitingUser = querySnapshot.docs[0];
      const partnerId = waitingUser.data().userId;

      // Xóa người đó khỏi hàng đợi
      transaction.delete(waitingUser.ref);

      // Tạo phòng chat mới (chỉ một lần)
      const chatRoomRef = await addDoc(collection(db, 'chats'), {
        userIds: [userId, partnerId],
        createdAt: Timestamp.fromDate(new Date()),
        lastActive: Timestamp.fromDate(new Date()),
      });

      return chatRoomRef.id; // Trả về ID phòng chat
    } else {
      // Nếu không ai chờ, thêm người dùng vào hàng đợi
      const userDoc = await addDoc(waitingRef, {
        userId,
        createdAt: new Date(),
      });
      return null; // Chưa có ai ghép đôi
    }
  });
};
