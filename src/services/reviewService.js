import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';

export const reviewService = {
  async addReview(courseId, userId, review) {
    try {
      await addDoc(collection(db, 'reviews'), {
        courseId,
        userId,
        rating: review.rating,
        comment: review.comment,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error('خطأ في إضافة المراجعة:', error);
      throw error;
    }
  },

  async getCourseReviews(courseId) {
    try {
      const q = query(
        collection(db, 'reviews'),
        where('courseId', '==', courseId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('خطأ في جلب المراجعات:', error);
      throw error;
    }
  }
}; 