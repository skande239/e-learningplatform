import React, { useState } from 'react';
import styled from 'styled-components';
import CourseCard from './CourseCard';
import { courses } from '../../services/courseData';

const CoursesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const FilterContainer = styled.div`
  margin: 20px;
  padding: 20px;
  background: #f7fafc;
  border-radius: 8px;
`;

const SearchInput = styled.input`
  padding: 8px;
  margin: 0 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
`;

function CourseList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div>
      <FilterContainer>
        <SearchInput
          type="text"
          placeholder="ابحث عن دورة..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
        >
          <option value="all">جميع المستويات</option>
          <option value="مبتدئ">مبتدئ</option>
          <option value="متوسط">متوسط</option>
          <option value="متقدم">متقدم</option>
        </select>
      </FilterContainer>

      <CoursesContainer>
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </CoursesContainer>
    </div>
  );
}

export default CourseList; 