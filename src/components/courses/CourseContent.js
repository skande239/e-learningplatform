import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
  padding: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  height: fit-content;
`;

const MainContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const LessonList = styled.ul`
  list-style: none;
  padding: 0;
`;

const LessonItem = styled.li`
  padding: 10px;
  margin: 5px 0;
  cursor: pointer;
  border-radius: 4px;
  background: ${props => props.active ? '#e3e3e3' : 'transparent'};
  
  &:hover {
    background: #e3e3e3;
  }
`;

function CourseContent() {
  const { courseId } = useParams();
  const { currentUser } = useAuth();
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // هنا سنقوم بجلب دروس الدورة وتقدم الطالب
    const fetchLessons = async () => {
      try {
        // سيتم إضافة كود جلب البيانات من Firebase لاحقاً
      } catch (error) {
        console.error('خطأ في جلب الدروس:', error);
      }
    };

    fetchLessons();
  }, [courseId]);

  const handleLessonComplete = async (lessonId) => {
    try {
      // سيتم إضافة كود تحديث التقدم لاحقاً
    } catch (error) {
      console.error('خطأ في تحديث التقدم:', error);
    }
  };

  return (
    <ContentContainer>
      <Sidebar>
        <h3>محتويات الدورة</h3>
        <LessonList>
          {lessons.map(lesson => (
            <LessonItem
              key={lesson.id}
              active={currentLesson?.id === lesson.id}
              onClick={() => setCurrentLesson(lesson)}
            >
              {lesson.title}
              {lesson.completed && '✓'}
            </LessonItem>
          ))}
        </LessonList>
        <div>
          <p>التقدم الكلي: {progress}%</p>
        </div>
      </Sidebar>

      <MainContent>
        {currentLesson ? (
          <>
            <h2>{currentLesson.title}</h2>
            {currentLesson.type === 'video' && (
              <video
                controls
                src={currentLesson.videoUrl}
                style={{ width: '100%' }}
              />
            )}
            {currentLesson.type === 'text' && (
              <div>{currentLesson.content}</div>
            )}
            <button
              onClick={() => handleLessonComplete(currentLesson.id)}
            >
              إكمال الدرس
            </button>
          </>
        ) : (
          <p>الرجاء اختيار درس من القائمة</p>
        )}
      </MainContent>
    </ContentContainer>
  );
}

export default CourseContent; 