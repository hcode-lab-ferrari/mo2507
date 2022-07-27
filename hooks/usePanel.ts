import { useContext } from 'react';
import { ScheduleServicePanelContext } from '../contexts/ScheduleServicePanel';

export const usePanel = () => {
  const context = useContext(ScheduleServicePanelContext);
  if (!context) {
    throw new Error(
      'usePanel must be used within a ScheduleServicePanelProvider'
    );
  }
  return context;
};
