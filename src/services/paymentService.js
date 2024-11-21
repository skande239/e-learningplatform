import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_publishable_key');

export const paymentService = {
  async createCheckoutSession(courseId, userId) {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          userId,
        }),
      });
      
      const session = await response.json();
      const stripe = await stripePromise;
      
      return stripe.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (error) {
      console.error('خطأ في عملية الدفع:', error);
      throw error;
    }
  }
}; 