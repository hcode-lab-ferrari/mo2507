import { format, getDay } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Screen } from '..';
import Calendar from '../../components/Calendar';
import { Header } from '../../components/Header';
import { Page } from '../../components/Page';
import { BackButton } from '../../components/Page/BackButton';
import { ContinueButton } from '../../components/Page/ContinueButton';
import { PageFooter } from '../../components/Page/PageFooter';
import { PageForm } from '../../components/PageForm';
import { useDrawerNavigation } from '../../hooks/useDrawerNavigation';
import { useSchedule } from '../../hooks/useSchedule';
import { Layout } from '../../providers/Layout';
import { vars } from '../../values';
import locale from 'date-fns/locale/pt-BR';
import { ScheduleTimeOptionItem } from '../../components/ScheduleTimeOptionItem';
import { TimeOption } from '../../types/TimeOption';
import axios from 'axios';
import { useApp } from '../../hooks/useApp';
import { useScreenFocus } from '../../utils/useScreenFocus';

const ScheduleTimeOptionTitle = styled.Text`
  font-size: 16px;
  color: ${vars.gray9};
  text-transform: uppercase;
`;
const ScheduleTimeOptionSelectedDate = styled.Text`
  color: ${vars.black};
  font-size: 20px;
  text-transform: uppercase;
  font-weight: bold;
`;
const ScheduleTimeOptionList = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const ScheduleTimeOptionsScreen = () => {
  const { navigate } = useDrawerNavigation();
  const { scheduleAt, timeOptionId, setTimeOptionId } = useSchedule();
  const { catchAxiosError } = useApp();
  const [items, setItems] = useState<TimeOption[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback((callback?: () => void) => {

    if (scheduleAt) {

      setLoading(true);

      axios.get<TimeOption[]>("/time-options", {
        baseURL: vars.baseURL,
        params: {
          day: getDay(scheduleAt),
        }
      })
      .then(({ data }) => setItems(data))
      .catch(catchAxiosError)
      .finally(() => {
        setLoading(false);
        if (typeof callback === 'function') {
          callback();          
        }
      });

    }

  }, [scheduleAt]);

  useScreenFocus(() => {

    if (scheduleAt === null) {
      navigate(Screen.ScheduleNew);
      return;
    }
    
    load();

  }, []);

  return (
    <Layout
      header={
        <Header onPressBack={() => navigate(Screen.ScheduleNew)}
        />
      }
      onRefresh={(finished) => load(finished)}>
      <Page title="Escolha o Horário" color="blue">
        <PageForm>
          <ScheduleTimeOptionTitle>horários do dia</ScheduleTimeOptionTitle>
          {scheduleAt && (
            <ScheduleTimeOptionSelectedDate>{format(scheduleAt, "EEEE, d 'de' MMMM 'de' yyyy", { locale })}</ScheduleTimeOptionSelectedDate>
          )}

          <ScheduleTimeOptionList>
            {items.map(({ time, id }) => (
              <ScheduleTimeOptionItem
                key={id}
                value={format(new Date(time), 'HH:mm')}
                selected={timeOptionId === id}
                onChecked={(checked) => {

                  if (checked && timeOptionId !== id) {
                    setTimeOptionId(id);
                  } else if (!checked && timeOptionId === id) {
                    setTimeOptionId(null);
                  }

                }}
              />
            ))}
          </ScheduleTimeOptionList>
        </PageForm>
      </Page>
      <PageFooter
        buttons={[
          {
            ...BackButton,
            onPress: () => navigate(Screen.ScheduleNew),
          },
          {
            ...ContinueButton,
            onPress: () => navigate(Screen.ScheduleServices),
            disabled: loading || timeOptionId === null,
            loading,
          },
        ]}
      />
    </Layout>
  );
};
