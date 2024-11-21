import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const NavContainer = styled.nav`
  background: #2c3e50;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  
  &:hover {
    color: #3498db;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: #34495e;
    color: #3498db;
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const UserButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #2980b9;
  }
`;

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('خطأ في تسجيل الخروج:', error);
    }
  };

  return (
    <NavContainer>
      <NavContent>
        <Logo to="/">منصة التعلم الإلكتروني</Logo>
        <NavLinks>
          <NavLink to="/courses">الدورات</NavLink>
          {currentUser ? (
            <>
              <NavLink to="/dashboard">لوحة التحكم</NavLink>
              <UserMenu>
                <NavLink to="/profile">
                  {currentUser.email}
                </NavLink>
                <UserButton onClick={handleLogout}>
                  تسجيل الخروج
                </UserButton>
              </UserMenu>
            </>
          ) : (
            <>
              <NavLink to="/login">تسجيل الدخول</NavLink>
              <NavLink to="/register">إنشاء حساب</NavLink>
            </>
          )}
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
}

export default Navbar; 