import { useCallback, useEffect, useState } from 'react';
import { ScheduleContext } from '../../contexts/Schedule';

type ScheduleProviderProps = {
  children: React.ReactNode;
};

export const ScheduleProvider = ({ children }: ScheduleProviderProps) => {
  const [scheduleAt, setScheduleAt] = useState<Date | null>(new Date());
  const [timeOptionId, setTimeOptionId] = useState<number | null>(null);
  const [services, setServices] = useState<number[]>([]);
  const [billingAddressId, setBillingAddressId] = useState<number | null>(null);

  const addService = useCallback(
    (serviceId: number) => {
      const newServices: number[] = [...services];
      newServices.push(serviceId);
      setServices([...newServices]);
    },
    [services, setServices]
  );

  const removeService = useCallback((serviceId: number) => {
    setServices([...services.filter((id) => id !== serviceId)]);
  }, [services, setServices]);

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
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
