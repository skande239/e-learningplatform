import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const LoginWrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
`;

const LoginContainer = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

const LoginHeader = styled.div`
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  padding: 30px;
  text-align: center;

  h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
  }

  p {
    margin: 10px 0 0;
    opacity: 0.8;
    font-size: 14px;
  }
`;

const LoginForm = styled.form`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #2c3e50;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
`;

const LoginButton = styled.button`
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  background: #ff7675;
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
`;

const SuccessMessage = styled.div`
  background: #00b894;
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
`;

const RegisterLink = styled.div`
  text-align: center;
  padding: 20px 30px;
  border-top: 1px solid #eee;
  font-size: 14px;
  color: #2c3e50;

  a {
    color: #3498db;
    text-decoration: none;
    font-weight: 600;
    margin-right: 5px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ForgotPassword = styled(Link)`
  color: #3498db;
  text-decoration: none;
  font-size: 14px;
  text-align: left;
  margin-top: -10px;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialLogin = styled.div`
  padding: 0 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: #f8f9fa;
    border-color: #3498db;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setSuccess('');
      setLoading(true);
      await login(email, password);
      setSuccess('تم تسجيل الدخول بنجاح!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Login error:', error);
      switch (error.code) {
        case 'auth/user-not-found':
          setError('البريد الإلكتروني غير مسجل');
          break;
        case 'auth/wrong-password':
          setError('كلمة المرور غير صحيحة');
          break;
        case 'auth/invalid-email':
          setError('البريد الإلكتروني غير صالح');
          break;
        default:
          setError('حدث خطأ في تسجيل الدخول');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginWrapper>
      <LoginContainer>
        <LoginHeader>
          <h2>تسجيل الدخول</h2>
          <p>مرحباً بعودتك! يرجى تسجيل الدخول لحسابك</p>
        </LoginHeader>

        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label>البريد الإلكتروني</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="أدخل بريدك الإلكتروني"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>كلمة المرور</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              required
            />
          </FormGroup>

          <ForgotPassword to="/forgot-password">
            نسيت كلمة المرور؟
          </ForgotPassword>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <LoginButton type="submit" disabled={loading}>
            {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </LoginButton>
        </LoginForm>

        <SocialLogin>
          <SocialButton type="button">
            <img src="https://www.google.com/favicon.ico" alt="Google" />
            تسجيل الدخول باستخدام Google
          </SocialButton>
        </SocialLogin>

        <RegisterLink>
          ليس لديك حساب؟
          <Link to="/register">إنشاء حساب جديد</Link>
        </RegisterLink>
      </LoginContainer>
    </LoginWrapper>
  );
}

export default Login; 