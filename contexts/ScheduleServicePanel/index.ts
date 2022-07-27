import { createContext } from 'react';
import { ViewStyle } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

type ScheduleServicePanelContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  panelY: SharedValue<number>;
  bottomY: number;
  gestureHandler: any;
  stylePanel: ViewStyle;
  styleArrow: ViewStyle;
};

export const ScheduleServicePanelContext =
  createContext<ScheduleServicePanelContextType>({
    isOpen: false,
    setIsOpen: () => {},
    panelY: {} as SharedValue<number>,
    bottomY: 0,
    gestureHandler: {} as any,
    stylePanel: {} as ViewStyle,
    styleArrow: {} as ViewStyle,
  });
