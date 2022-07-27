import { useCallback, useEffect, useState } from 'react';
import { ScheduleContext } from '../../contexts/Schedule';

type ScheduleProviderProps = {
  children: React.ReactNode;
};

export const ScheduleProvider = ({ children }: ScheduleProviderProps) => {
  const [scheduleAt, setScheduleAt] = useState<Date | null>(new Date());
  const [timeOptionId, setTimeOptionId] = useState<number | null>(null);
  const [services, setServices] = useState<number[]>([]);

  const addService = useCallback(
    (serviceId: number) => {
      console.log('atual', services);
      console.log('adiconando', serviceId);

      const newServices: number[] = [...services];
      newServices.push(serviceId);
      console.log('newServices', newServices);
      setServices([...newServices]);
    },
    [services, setServices]
  );

  const removeService = useCallback((serviceId: number) => {
    setServices([...services.filter((id) => id !== serviceId)]);
  }, []);

  useEffect(() => {
    console.log('services change', services);
  }, [services]);

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
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
