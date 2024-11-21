import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 15px;
`;

const ProgressBar = styled.div`
  background: #e2e8f0;
  height: 10px;
  border-radius: 5px;
  margin: 10px 0;

  div {
    background: #4CAF50;
    height: 100%;
    border-radius: 5px;
    width: ${props => props.progress}%;
    transition: width 0.3s ease;
  }
`;

function ProgressCard({ course, progress }) {
  return (
    <Card>
      <h4>{course.title}</h4>
      <ProgressBar progress={progress}>
        <div />
      </ProgressBar>
      <p>{progress}% مكتمل</p>
    </Card>
  );
}

export default ProgressCard; 