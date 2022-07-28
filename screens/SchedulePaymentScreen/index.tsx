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
import { Button } from '../../components/Button';
import { MaterialIcons } from '@expo/vector-icons';
import { InputRadio } from '../../components/InputRadio';
import { Address } from '../../types/Address';
import { useAuth } from '../../hooks/useAuth';
import { useWithAuthenticated } from '../../utils/useWithAuthenticated';

export const SchedulePaymentScreen = () => {
  useWithAuthenticated(Screen.ScheduleAddresses);

  const { scheduleAt, billingAddressId,
   setBillingAddressId } = useSchedule();
  const { token } = useAuth();
  const { navigate } = useDrawerNavigation();
  const { catchAxiosError } = useApp();
  const [items, setItems] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback((callback?: () => void) => {

    if (token) {

      setLoading(true);

      axios.get<Address[]>("/me/addresses", {
        baseURL: vars.baseURL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  }, [token]);

  useScreenFocus(() => {

    if (scheduleAt === null) {
      navigate(Screen.ScheduleNew);
      return;
    }
    
    load();

  }, [load]);

  return (
    <Layout
      header={
        <Header onPressBack={() => navigate(Screen.ScheduleAddresses)}
        />
      }
      onRefresh={(finished) => load(finished)}>
      <Page
        title="Endereço de Cobrança"
        color="blue"
    >
        <PageForm>
            
        </PageForm>
      </Page>
      <PageFooter
        buttons={[
          {
            ...BackButton,
            onPress: () => navigate(Screen.ScheduleAddresses),
          },
          {
            ...ContinueButton,
            onPress: () => navigate(Screen.ScheduleServices),
            disabled: loading,
            loading,
          },
        ]}
      />
    </Layout>
  );
};