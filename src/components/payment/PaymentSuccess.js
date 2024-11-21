import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SuccessContainer = styled.div`
  text-align: center;
  padding: 50px;
  max-width: 600px;
  margin: 0 auto;
`;

const SuccessMessage = styled.div`
  background-color: #dff0d8;
  color: #3c763d;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
`;

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // يمكنك إضافة منطق إضافي هنا مثل تحديث حالة التسجيل في الدورة
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <SuccessContainer>
      <SuccessMessage>
        <h2>تم الدفع بنجاح!</h2>
        <p>شكراً لك على التسجيل في الدورة</p>
        <p>سيتم توجيهك إلى لوحة التحكم خلال 5 ثوانٍ...</p>
      </SuccessMessage>
    </SuccessContainer>
  );
}

export default PaymentSuccess; 