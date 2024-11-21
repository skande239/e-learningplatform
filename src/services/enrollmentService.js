import { db } from './firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export const enrollmentService = {
  async enrollInCourse(userId, courseId) {
    try {
      await addDoc(collection(db, 'enrollments'), {
        userId,
        courseId,
        enrollmentDate: new Date(),
        progress: 0,
        status: 'active'
      });
      return true;
    } catch (error) {
      console.error('خطأ في التسجيل:', error);
      throw error;
    }
  },

  async getUserEnrollments(userId) {
    try {
      const q = query(
        collection(db, 'enrollments'),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('خطأ في جلب التسجيلات:', error);
      throw error;
    }
  }
}; 