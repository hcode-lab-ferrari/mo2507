import { useState } from 'react';
import { Screen } from '..';
import Calendar from '../../components/Calendar';
import { Header } from '../../components/Header';
import { Page } from '../../components/Page';
import { BackButton } from '../../components/Page/BackButton';
import { ContinueButton } from '../../components/Page/ContinueButton';
import { PageFooter } from '../../components/Page/PageFooter';
import { useDrawerNavigation } from '../../hooks/useDrawerNavigation';
import { useSchedule } from '../../hooks/useSchedule';
import { Layout } from '../../providers/Layout';

export const ScheduleNewScreen = () => {
  const { navigate } = useDrawerNavigation();
  const { scheduleAt, setScheduleAt } = useSchedule();

  return (
    <Layout header={<Header onPressBack={() => navigate(Screen.Home)} />}>
      <Page title="Escolha a Data" color="blue">
        <Calendar
          selected={scheduleAt ? scheduleAt : undefined}
          onChange={(dt) => setScheduleAt(dt)}
        />
      </Page>
      <PageFooter
        buttons={[
          {
            ...BackButton,
            onPress: () => navigate(Screen.Home),
          },
          {
            ...ContinueButton,
            onPress: () => navigate(Screen.ScheduleTimeOptions),
          },
        ]}
      />
    </Layout>
  );
};
