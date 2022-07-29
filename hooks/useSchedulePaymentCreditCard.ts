import { useContext } from 'react';
import { SchedulePaymentCreditCardContext } from '../contexts/SchedulePaymentCreditCard';

export function useSchedulePaymentCreditCard() {
  const context = useContext(SchedulePaymentCreditCardContext);
  if (!context) {
    throw new Error(
      'useSchedulePaymentCreditCard must be used within a SchedulePaymentCreditCardProvider'
    );
  }
  return context;
}
