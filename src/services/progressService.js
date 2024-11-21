import { db } from './firebase';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';

export const progressService = {
  async updateLessonProgress(userId, courseId, lessonId, completed) {
    try {
      const progressRef = doc(db, 'progress', `${userId}_${courseId}_${lessonId}`);
      await setDoc(progressRef, {
        userId,
        courseId,
        lessonId,
        completed,
        completedAt: completed ? new Date() : null
      }, { merge: true });
    } catch (error) {
      console.error('خطأ في تحديث التقدم:', error);
      throw error;
    }
  },

  async getCourseProgress(userId, courseId) {
    try {
      const q = query(
        collection(db, 'progress'),
        where('userId', '==', userId),
        where('courseId', '==', courseId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error('خطأ في جلب التقدم:', error);
      throw error;
    }
  }
}; 