import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const WelcomeSection = styled.div`
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  color: white;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
  
  h3 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 2rem;
    color: #3498db;
    font-weight: bold;
  }
`;

const CoursesSection = styled.div`
  margin-top: 2rem;
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const CourseCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CourseImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const CourseInfo = styled.div`
  padding: 1.5rem;
`;

const CourseProgress = styled.div`
  background: #f0f2f5;
  height: 8px;
  border-radius: 4px;
  margin: 1rem 0;
  overflow: hidden;

  div {
    background: #3498db;
    height: 100%;
    width: ${props => props.progress}%;
    transition: width 0.3s ease;
  }
`;

const ActionButton = styled(Link)`
  display: inline-block;
  background: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.3s ease;

  &:hover {
    background: #2980b9;
  }
`;

function Dashboard() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    completedCourses: 0,
    inProgressCourses: 0,
    totalHoursLearned: 0,
    certificates: 0
  });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // هنا يمكنك إضافة جلب البيانات الحقيقية من Firebase
    setCourses([
      {
        id: 1,
        title: "مقدمة في برمجة JavaScript",
        progress: 75,
        image: "https://example.com/js-course.jpg",
        lastAccessed: "2024-01-20"
      },
      // يمكنك إضافة المزيد من الدورات هنا
    ]);
  }, []);

  return (
    <DashboardContainer>
      <WelcomeSection>
        <h1>مرحباً {currentUser.email}</h1>
        <p>آخر تسجيل دخول: {new Date().toLocaleDateString('ar-SA')}</p>
      </WelcomeSection>

      <StatsGrid>
        <StatCard>
          <h3>الدورات المكتملة</h3>
          <p>{stats.completedCourses}</p>
        </StatCard>
        <StatCard>
          <h3>الدورات المتدرب عليها</h3>
          <p>{stats.inProgressCourses}</p>
        </StatCard>
        <StatCard>
          <h3>ساعات التعلم الكلية</h3>
          <p>{stats.totalHoursLearned} ساعة</p>
        </StatCard>
        <StatCard>
          <h3>الشهادات</h3>
          <p>{stats.certificates}</p>
        </StatCard>
      </StatsGrid>

      <CoursesSection>
        <h2>دوراتي التدريبية</h2>
        <CourseGrid>
          {courses.map(course => (
            <CourseCard key={course.id}>
              <Link to={`/course/${course.id}`}>
                <CourseImage src={course.image} alt={course.title} />
                <CourseInfo>
                  <h3>{course.title}</h3>
                  <p>آخر نشاط: {course.lastAccessed}</p>
                  <p>التقدم: {course.progress}%</p>
                  <CourseProgress progress={course.progress}>
                    <div />
                  </CourseProgress>
                  <ActionButton to={`/course/${course.id}`}>
                    المزيد من المعلومات
                  </ActionButton>
                </CourseInfo>
              </Link>
            </CourseCard>
          ))}
        </CourseGrid>
      </CoursesSection>
    </DashboardContainer>
  );
}

export default Dashboard; 