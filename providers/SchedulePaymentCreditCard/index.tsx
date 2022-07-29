import { useEffect, useState } from 'react';
import {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { SchedulePaymentCreditCardContext } from '../../contexts/SchedulePaymentCreditCard';

type SchedulePaymentCreditCardProviderProps = {
  children: React.ReactNode;
};

export const SchedulePaymentCreditCardProvider = ({
  children,
}: SchedulePaymentCreditCardProviderProps) => {
  const SPRING_CONFIG = {
    damping: 80,
    stiffness: 500,
  };
  const rotate = useSharedValue(0);
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [flipped, setFlipped] = useState(false);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_event, context) => {
      if (rotate) {
        (context as any).rotate = rotate.value;
      }
    },
    onActive: (event, context) => {
      const newValue = (context as any).rotate + event.translationX;
      if (newValue > -45 && newValue < 225) {
        rotate.value = newValue;
      }
    },
    onEnd: () => {
      if (rotate.value >= -45 && rotate.value <= 90) {
        rotate.value = withSpring(0, SPRING_CONFIG);
        runOnJS(setFlipped)(false);
      } else {
        rotate.value = withSpring(180, SPRING_CONFIG);
        runOnJS(setFlipped)(true);
      }
    },
  });

  const styleFront = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: rotate.value + 'deg',
        },
      ],
    };
  });

  const styleBack = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${rotate.value + 180}deg`,
        },
      ],
    };
  });

  useEffect(() => {
    rotate.value = flipped
      ? withSpring(180, SPRING_CONFIG)
      : withSpring(0, SPRING_CONFIG);
  }, [flipped]);

  return (
    <SchedulePaymentCreditCardContext.Provider
      value={{
        number,
        setNumber,
        name,
        setName,
        expiry,
        setExpiry,
        cvv,
        setCvv,
        flipped,
        setFlipped,
        styleFront,
        styleBack,
        gestureHandler,
      }}
    >
      {children}
    </SchedulePaymentCreditCardContext.Provider>
  );
};
