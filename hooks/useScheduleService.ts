import { useContext } from 'react';
import { ScheduleServiceContext } from '../contexts/ScheduleService';

export const useScheduleService = () => {
  const context = useContext(ScheduleServiceContext);
  if (!context) {
    throw new Error(
      'useScheduleService must be used within a ScheduleServiceProvider'
    );
  }
  return context;
};
