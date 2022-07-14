import servicesBackgroung from '../../assets/services-bg.png';
import { useDrawerNavigation } from '../../hooks/useDrawerNavigation';
import { Screen } from '../../screens';
import { Button } from '../Button';
import { HomeTitle } from '../Home/HomeTitle';
import { CalendarSvg } from './CalendarSvg';
import { CreditCardsSvg } from './CreditCardsSvg';
import { ScheduleServiceBody } from './ScheduleServiceBody';
import { ScheduleServiceIcon } from './ScheduleServiceIcon';
import { ScheduleServiceIconText } from './ScheduleServiceIconText';
import { ScheduleServiceImage } from './ScheduleServiceImage';
import { ScheduleServiceSubTitle } from './ScheduleServiceSubTitle';
import { ScheduleServiceWrap } from './ScheduleServiceWrap';
import { ToolsSvg } from './ToolsSvg';

export const ScheduleService = () => {
  const navigation = useDrawerNavigation();

  return (
    <ScheduleServiceWrap>
      <ScheduleServiceBody>
        <HomeTitle>Agende seu Serviço</HomeTitle>
        <ScheduleServiceSubTitle>Como funciona?</ScheduleServiceSubTitle>
        <ScheduleServiceIcon>
          <CalendarSvg />
          <ScheduleServiceIconText>
            Escolha a Data e Hora
          </ScheduleServiceIconText>
        </ScheduleServiceIcon>
        <ScheduleServiceIcon>
          <ToolsSvg />
          <ScheduleServiceIconText>Escolha o Serviço</ScheduleServiceIconText>
        </ScheduleServiceIcon>
        <ScheduleServiceIcon>
          <CreditCardsSvg />
          <ScheduleServiceIconText>Pague Online</ScheduleServiceIconText>
        </ScheduleServiceIcon>
        <Button
          color="green"
          onPress={() => navigation.navigate(Screen.ScheduleNew)}
        >
          Agendar Serviço
        </Button>
      </ScheduleServiceBody>
      <ScheduleServiceImage source={servicesBackgroung} />
    </ScheduleServiceWrap>
  );
};
