import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { ScheduleServicePanelContext } from '../../contexts/ScheduleServicePanel';

type ScheduleServicePanelProviderProps = {
  children: React.ReactNode;
};

export const ScheduleServicePanelProvider = ({
  children,
}: ScheduleServicePanelProviderProps) => {
  const SPRING_CONFIG = {
    damping: 80,
    stiffness: 500,
  };
  const [isOpen, setIsOpen] = useState(false);
  const dimensions = useWindowDimensions();
  const spread = 220;
  const bottomY = dimensions.height - spread;
  const panelY = useSharedValue(bottomY);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, context) => {
      if (panelY) {
        (context as any).startPanelY = panelY.value;
      }
    },
    onActive(event, context) {
      console.log(panelY.value);
      const newValue = (context as any).startPanelY + event.translationY;
      if (newValue > 0) {
        panelY.value = newValue;
      }
    },
    onEnd: (event, context) => {
      if (panelY.value > 200) {
        panelY.value = bottomY;
        runOnJS(setIsOpen)(false);
      } else {
        panelY.value = 0;
        runOnJS(setIsOpen)(true);
      }
    },
  });

  const stylePanel = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        panelY.value,
        [bottomY, 0],
        [0.25, 1],
        Extrapolate.CLAMP
      ),
      transform: [
        {
          translateY: withSpring(panelY.value, SPRING_CONFIG),
        },
      ],
    };
  });

  const styleArrow = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate:
            interpolate(
              panelY.value,
              [bottomY, 0],
              [0, 180],
              Extrapolate.CLAMP
            ) + 'deg',
        },
      ],
    };
  });

  useEffect(() => {
    panelY.value = isOpen ? withSpring(0, SPRING_CONFIG) : bottomY;
  }, [isOpen]);

  return (
    <ScheduleServicePanelContext.Provider
      value={{
        isOpen,
        setIsOpen,
        bottomY,
        panelY,
        gestureHandler,
        stylePanel,
        styleArrow,
      }}
    >
      {children}
    </ScheduleServicePanelContext.Provider>
  );
};
