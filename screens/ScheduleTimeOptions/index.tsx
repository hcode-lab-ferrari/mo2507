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

export const ScheduleTimeOptionsScreen = () => {
  const { navigate } = useDrawerNavigation();
  const { scheduleAt } = useSchedule();

  return (
    <Layout header={<Header onPressBack={() => navigate(Screen.Home)} />}>
      <Page title="Escolha o Horário" color="blue"></Page>
      <PageFooter
        buttons={[
          {
            ...BackButton,
            onPress: () => navigate(Screen.ScheduleNew),
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
