import React, { useState } from 'react';
import styled from 'styled-components';
import { paymentService } from '../../services/paymentService';
import { useAuth } from '../../context/AuthContext';

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

function CheckoutButton({ courseId, price }) {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const handleCheckout = async () => {
    try {
      setLoading(true);
      await paymentService.createCheckoutSession(courseId, currentUser.uid);
    } catch (error) {
      console.error('فشل في بدء عملية الدفع:', error);
      alert('حدث خطأ أثناء معالجة الدفع');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleCheckout} 
      disabled={loading}
    >
      {loading ? 'جاري المعالجة...' : `اشترك الآن - ${price}$`}
    </Button>
  );
}

export default CheckoutButton; 