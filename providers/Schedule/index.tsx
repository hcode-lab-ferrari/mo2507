import { useCallback, useEffect, useState } from 'react';
import { ScheduleContext } from '../../contexts/Schedule';
import { Schedule } from '../../types/Schedule';

type ScheduleProviderProps = {
  children: React.ReactNode;
};

export const ScheduleProvider = ({ children }: ScheduleProviderProps) => {
  const [scheduleAt, setScheduleAt] = useState<Date | null>(new Date());
  const [timeOptionId, setTimeOptionId] = useState<number | null>(null);
  const [services, setServices] = useState<number[]>([]);
  const [billingAddressId, setBillingAddressId] = useState<number | null>(null);
  const [cardFirstSixDigits, setCardFirstSixDigits] = useState('');
  const [cardLastFourDigits, setCardLastFourDigits] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [schedule, setSchedule] = useState<Schedule | null>(null);

  const addService = useCallback(
    (serviceId: number) => {
      const newServices: number[] = [...services];
      newServices.push(serviceId);
      setServices([...newServices]);
    },
    [services, setServices]
  );

  const removeService = useCallback(
    (serviceId: number) => {
      setServices([...services.filter((id) => id !== serviceId)]);
    },
    [services, setServices]
  );

  return (
    <ScheduleContext.Provider
      value={{
        scheduleAt,
        setScheduleAt,
        timeOptionId,
        setTimeOptionId,
        services,
        setServices,
        addService,
        removeService,
        billingAddressId,
        setBillingAddressId,
        cardFirstSixDigits,
        setCardFirstSixDigits,
        cardLastFourDigits,
        setCardLastFourDigits,
        paymentMethod,
        setPaymentMethod,
        schedule,
        setSchedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
