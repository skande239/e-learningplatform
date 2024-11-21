import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';

export const forumService = {
  async createDiscussion(courseId, userId, content) {
    try {
      await addDoc(collection(db, 'discussions'), {
        courseId,
        userId,
        content,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error('خطأ في إنشاء النقاش:', error);
      throw error;
    }
  },

  async getDiscussions(courseId) {
    try {
      const q = query(
        collection(db, 'discussions'),
        where('courseId', '==', courseId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('خطأ في جلب النقاشات:', error);
      throw error;
    }
  }
}; 