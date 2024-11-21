import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: #2c3e50;
  color: white;
  padding: 3rem 0;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: #3498db;
    margin-bottom: 1rem;
  }
`;

const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  
  &:hover {
    color: #3498db;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #34495e;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>عن المنصة</h3>
          <p>منصة تعليمية متكاملة تهدف إلى تقديم أفضل تجربة تعلم للطلاب</p>
        </FooterSection>
        
        <FooterSection>
          <h3>روابط سريعة</h3>
          <FooterLink to="/courses">الدورات</FooterLink>
          <FooterLink to="/dashboard">لوحة التحكم</FooterLink>
          <FooterLink to="/profile">الملف الشخصي</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <h3>تواصل معنا</h3>
          <p>البريد الإلكتروني: info@example.com</p>
          <p>الهاتف: +123 456 789</p>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        <p>جميع الحقوق محفوظة © 2024 منصة التعلم الإلكتروني</p>
      </Copyright>
    </FooterContainer>
  );
}

export default Footer; 