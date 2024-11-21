import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const RegisterContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Button = styled.button`
  background: #3498db;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #2980b9;
  }

  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-top: 1rem;
  text-align: center;
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  margin-top: 1rem;
  text-align: center;
`;

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // التحقق من تطابق كلمات المرور
    if (password !== confirmPassword) {
      return setError('كلمات المرور غير متطابقة');
    }

    try {
      setError('');
      setSuccess('');
      setLoading(true);
      
      await signup(email, password);
      setSuccess('تم إنشاء الحساب بنجاح!');
      
      // الانتقال إلى لوحة التحكم بعد ثانيتين
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('خطأ في التسجيل:', error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('البريد الإلكتروني مستخدم بالفعل');
          break;
        case 'auth/invalid-email':
          setError('البريد الإلكتروني غير صالح');
          break;
        case 'auth/weak-password':
          setError('كلمة المرور ضعيفة جداً');
          break;
        default:
          setError('حدث خطأ في إنشاء الحساب');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <h2>إنشاء حساب جديد</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="تأكيد كلمة المرور"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
        </Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </RegisterContainer>
  );
}

export default Register; 