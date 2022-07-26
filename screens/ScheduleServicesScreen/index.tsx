import { format, getDay } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Screen } from '../';
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

export const ScheduleServicesScreen = () => {
  const { navigate } = useDrawerNavigation();
  const { scheduleAt, timeOptionId, setTimeOptionId } = useSchedule();

  return (
    <Layout
      header={
        <Header onPressBack={() => navigate(Screen.ScheduleNew)}
        />
      }
    >
      <Page title="escolha os serviços" color="blue">
        <PageForm>
          
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
            onPress: () => navigate(Screen.ScheduleTimeOptions),
          },
        ]}
      />
    </Layout>
  );
};
