import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { ScheduleServiceContext } from '../../contexts/ScheduleService';
import { useApp } from '../../hooks/useApp';
import { Service } from '../../types/Service';
import { vars } from '../../values';

type ScheduleProviderProps = {
  children: React.ReactNode;
};

export const ScheduleServiceProvider = ({
  children,
}: ScheduleProviderProps) => {
  const { catchAxiosError } = useApp();
  const [services, setServices] = useState<Service[]>([]);

  const load = useCallback(() => {
    const { baseURL } = vars;

    axios
      .get<Service[]>(`/services`, {
        baseURL,
      })
      .then(({ data }) => setServices(data))
      .catch(catchAxiosError);
  }, []);

  useEffect(() => load(), []);

  return (
    <ScheduleServiceContext.Provider value={{ services }}>
      {children}
    </ScheduleServiceContext.Provider>
  );
};
