import { createContext } from 'react';
import { Schedule } from '../../types/Schedule';

type ScheduleContextType = {
  scheduleAt: Date | null;
  setScheduleAt: (date: Date | null) => void;
  timeOptionId: number | null;
  setTimeOptionId: (timeOptionId: number | null) => void;
  services: number[];
  setServices: (services: number[]) => void;
  addService: (serviceId: number) => void;
  removeService: (serviceId: number) => void;
  billingAddressId: number | null;
  setBillingAddressId: (billingAddressId: number) => void;
  cardFirstSixDigits: string;
  setCardFirstSixDigits: (cardFirstSixDigits: string) => void;
  cardLastFourDigits: string;
  setCardLastFourDigits: (cardLastFourDigits: string) => void;
  paymentMethod: string;
  setPaymentMethod: (paymentMethod: string) => void;
  schedule: Schedule | null;
  setSchedule: (schedule: Schedule | null) => void;
};

export const ScheduleContext = createContext<ScheduleContextType>({
  scheduleAt: null,
  setScheduleAt: () => {},
  timeOptionId: null,
  setTimeOptionId: () => {},
  services: [],
  setServices: () => {},
  addService: () => {},
  removeService: () => {},
  billingAddressId: null,
  setBillingAddressId: () => {},
  cardFirstSixDigits: '',
  setCardFirstSixDigits: () => {},
  cardLastFourDigits: '',
  setCardLastFourDigits: () => {},
  paymentMethod: '',
  setPaymentMethod: () => {},
  schedule: null,
  setSchedule: () => {},
});
