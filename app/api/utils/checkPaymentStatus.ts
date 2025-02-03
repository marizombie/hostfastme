import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const usePaymentStatus = (sessionId: string) => {
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await axios.get(`/api/payment-status?sessionId=${sessionId}`);
      const { status } = response.data;

      if (status === 'success') {
        toast.success('Payment successful');
        setStatus('success');
        clearInterval(interval);
      } else if (status === 'canceled') {
        toast.error('Payment failed');
        setStatus('canceled');
        clearInterval(interval);
      }
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(interval);
  }, [sessionId]);

  return status;
};

export default usePaymentStatus;
