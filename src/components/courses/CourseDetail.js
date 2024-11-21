import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const CourseContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const CourseHeader = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CourseImage = styled.img`
  width: 400px;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
`;

const CourseInfo = styled.div`
  flex: 1;
`;

const ReviewSection = styled.div`
  margin-top: 30px;
`;

const ReviewForm = styled.form`
  margin-top: 20px;
`;

function CourseDetail() {
  const { courseId } = useParams();
  const { currentUser } = useAuth();
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    // هنا سنقوم بجلب تفاصيل الدورة
    const fetchCourseDetails = async () => {
      try {
        // سيتم إضافة كود جلب البيانات من Firebase لاحقاً
      } catch (error) {
        console.error('خطأ في جلب تفاصيل الدورة:', error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    // سيتم إضافة كود حفظ المراجعة لاحقاً
  };

  if (!course) return <div>جاري التحميل...</div>;

  return (
    <CourseContainer>
      <CourseHeader>
        <CourseImage src={course.image} alt={course.title} />
        <CourseInfo>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <div>
            <p>المدرس: {course.instructor}</p>
            <p>المدة: {course.duration}</p>
            <p>المستوى: {course.level}</p>
            <p>السعر: ${course.price}</p>
          </div>
        </CourseInfo>
      </CourseHeader>

      <ReviewSection>
        <h2>المراجعات والتقييمات</h2>
        <ReviewForm onSubmit={handleSubmitReview}>
          <div>
            <label>التقييم:</label>
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({...newReview, rating: e.target.value})}
            >
              {[5,4,3,2,1].map(num => (
                <option key={num} value={num}>{num} نجوم</option>
              ))}
            </select>
          </div>
          <div>
            <label>التعليق:</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              required
            />
          </div>
          <button type="submit">إرسال المراجعة</button>
        </ReviewForm>

        <div>
          {reviews.map(review => (
            <div key={review.id}>
              <p>التقييم: {review.rating} نجوم</p>
              <p>{review.comment}</p>
              <small>بواسطة: {review.userName}</small>
            </div>
          ))}
        </div>
      </ReviewSection>
    </CourseContainer>
  );
}

export default CourseDetail; 