import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { enrollmentService } from '../../services/enrollmentService';

const Card = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  margin: 10px;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CourseImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
`;

const CourseTitle = styled.h3`
  margin: 10px 0;
  color: #333;
`;

const CourseInfo = styled.div`
  margin: 10px 0;
  color: #666;
`;

const PriceTag = styled.div`
  font-size: 1.2em;
  color: #2c5282;
  font-weight: bold;
`;

const EnrollButton = styled.button`
  background-color: #4299e1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #3182ce;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

function CourseCard({ course }) {
  const { currentUser } = useAuth();
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState('');

  const handleEnroll = async () => {
    try {
      setEnrolling(true);
      setError('');
      await enrollmentService.enrollInCourse(currentUser.uid, course.id);
      alert('تم التسجيل في الدورة بنجاح!');
    } catch (error) {
      setError('فشل التسجيل في الدورة');
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <Card>
      <CourseImage src={course.image} alt={course.title} />
      <CourseTitle>{course.title}</CourseTitle>
      <CourseInfo>
        <p>{course.description}</p>
        <p>المدرس: {course.instructor}</p>
        <p>المدة: {course.duration}</p>
        <p>المستوى: {course.level}</p>
      </CourseInfo>
      <PriceTag>{course.price} $</PriceTag>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <EnrollButton 
        onClick={handleEnroll} 
        disabled={enrolling}
      >
        {enrolling ? 'جاري التسجيل...' : 'التسجيل في الدورة'}
      </EnrollButton>
    </Card>
  );
}

export default CourseCard; 