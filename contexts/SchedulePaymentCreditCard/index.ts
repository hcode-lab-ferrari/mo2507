import { createContext } from 'react';
import { ViewStyle } from 'react-native';

type SchedulePaymentCreditCard = {
  flipped: boolean;
  setFlipped: (flipped: boolean) => void;
  gestureHandler: any;
  styleFront: ViewStyle;
  styleBack: ViewStyle;
  number: string;
  setNumber: (number: string) => void;
  name: string;
  setName: (name: string) => void;
  expiry: string;
  setExpiry: (expiry: string) => void;
  cvv: string;
  setCvv: (cvv: string) => void;
};

export const SchedulePaymentCreditCardContext =
  createContext<SchedulePaymentCreditCard>({
    flipped: false,
    setFlipped: () => {},
    gestureHandler: {} as any,
    styleFront: {} as ViewStyle,
    styleBack: {} as ViewStyle,
    number: '',
    setNumber: () => {},
    name: '',
    setName: () => {},
    expiry: '',
    setExpiry: () => {},
    cvv: '',
    setCvv: () => {},
  });
