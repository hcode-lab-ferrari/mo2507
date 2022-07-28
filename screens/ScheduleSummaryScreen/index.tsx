import { MaterialIcons } from '@expo/vector-icons';
import { format, getDay } from 'date-fns';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Screen } from '..';
import { Button } from '../../components/Button';
import Calendar from '../../components/Calendar';
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { Page } from '../../components/Page';
import { BackButton } from '../../components/Page/BackButton';
import { ContinueButton } from '../../components/Page/ContinueButton';
import { PageFooter } from '../../components/Page/PageFooter';
import { PageForm } from '../../components/PageForm';
import { ScheduleServiceItem } from '../../components/ScheduleServiceItem';
import { ScheduleServicePanelBody } from '../../components/ScheduleServicePanelBody';
import { ScheduleServicePanelFooter } from '../../components/ScheduleServicePanelFooter';
import { useDrawerNavigation } from '../../hooks/useDrawerNavigation';
import { usePanel } from '../../hooks/usePanel';
import { useSchedule } from '../../hooks/useSchedule';
import { useScheduleService } from '../../hooks/useScheduleService';
import { Layout } from '../../providers/Layout';
import { ScheduleServiceProvider } from '../../providers/ScheduleService';
import { ScheduleServicePanelProvider } from '../../providers/ScheduleServicePanel';

export const ScheduleSummaryScreen = () => {
  const { navigate } = useDrawerNavigation();

  return (
    <Layout
      header={<Header onPressBack={() => navigate(Screen.ScheduleNew)} />}
    >
      <Page
        title="resumo do pedido"
        subtitle="confira os detalhes do pedido"
        color="blue"
    >
        <PageForm>
            <InputField
                label="FORMA DE PAGAMENTO"
                inputProps={{
                    value: "CARTÃO DE CRÉDITO",
                }}
                readOnly={true}
            />

            <InputField
                label="CARTÃO FINAL"
                inputProps={{
                    value: "***0604",
                }}
                readOnly={true}
            />

            <InputField
                label="PARCELAS"
                inputProps={{
                    value: "à VISTA",
                }}
                readOnly={true}
            />

            <InputField
                label="QUANTIDADE DE SERVIÇOS"
                inputProps={{
                    value: "1",
                }}
                readOnly={true}
            />

            <InputField
                label="DATA DO SERVIÇO"
                inputProps={{
                    value: "23 DE JULHO DE 2020 ÀS 9:00",
                }}
                readOnly={true}
            />

            <InputField
                label="VALOR TOTAL"
                inputProps={{
                    value: "r$ 400",
                }}
                readOnly={true}
            />
        </PageForm>
      </Page>
      <PageFooter
        buttons={[
          {
            ...BackButton,
            onPress: () => navigate(Screen.ScheduleTimeOptions),
          },
          {
            ...ContinueButton,
            text: 'confirmar',
            onPress: () => navigate(Screen.ScheduleComplete),
          },
        ]}
      />
    </Layout>
  );
};