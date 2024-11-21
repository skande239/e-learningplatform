import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  text-align: center;
  padding: 50px 20px;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 20px;
`;

const Description = styled.p`
  color: #34495e;
  max-width: 600px;
  margin: 0 auto;
`;

function Home() {
  return (
    <HomeContainer>
      <Title>مرحباً بك في منصة التعلم الإلكتروني</Title>
      <Description>
        اكتشف مجموعة متنوعة من الدورات التعليمية عالية الجودة
        وابدأ رحلة التعلم الخاصة بك اليوم
      </Description>
    </HomeContainer>
  );
}

export default Home; 