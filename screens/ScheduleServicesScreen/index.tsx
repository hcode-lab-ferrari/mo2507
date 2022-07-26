import { MaterialIcons } from '@expo/vector-icons';
import { format, getDay } from 'date-fns';
import { Fragment, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Screen } from '../';
import { Button } from '../../components/Button';
import Calendar from '../../components/Calendar';
import { Header } from '../../components/Header';
import { Page } from '../../components/Page';
import { BackButton } from '../../components/Page/BackButton';
import { ContinueButton } from '../../components/Page/ContinueButton';
import { PageFooter } from '../../components/Page/PageFooter';
import { PageForm } from '../../components/PageForm';
import { ScheduleServiceItem } from '../../components/ScheduleServiceItem';
import { useDrawerNavigation } from '../../hooks/useDrawerNavigation';
import { useSchedule } from '../../hooks/useSchedule';
import { useScheduleService } from '../../hooks/useScheduleService';
import { Layout } from '../../providers/Layout';
import { ScheduleServiceProvider } from '../../providers/ScheduleService';
import { formatCurrency } from '../../utils/formatCurrency';
import { vars } from '../../values';

const ScheduleServicePanelBody = styled.View`
  background-color: ${vars.gray12}  ;
  position: absolute;
  width: 100%;
`;
const ScheduleServicePanelFooter = styled.View``;

const ScheduleServicePanelBodyWrap = styled.View``;
const ScheduleServicePanelHeader = styled.View``;
const ScheduleServicePanelHeaderText = styled.Text``;

const ScheduleServicePanelContent = styled.View``;
const ScheduleServicePanelItem = styled.View``;
const ScheduleServicePanelItemName = styled.Text``;
const ScheduleServicePanelItemPrice = styled.Text``;

const ScheduleServicePanel = () => {

  return (
    <Fragment>
      <ScheduleServicePanelBody>
        <ScheduleServicePanelBodyWrap>
          <ScheduleServicePanelHeader>
            <ScheduleServicePanelHeaderText>Resumo</ScheduleServicePanelHeaderText>
          </ScheduleServicePanelHeader>
          <ScheduleServicePanelContent>
            <ScheduleServicePanelItem>
              <ScheduleServicePanelItemName>Alinhamento</ScheduleServicePanelItemName>
              <ScheduleServicePanelItemPrice>R$ 400,00</ScheduleServicePanelItemPrice>
              <Button>
                <MaterialIcons name="delete" size={24} color={vars.dark0} />
              </Button>
            </ScheduleServicePanelItem>
          </ScheduleServicePanelContent>
        </ScheduleServicePanelBodyWrap>
      </ScheduleServicePanelBody>
      <ScheduleServicePanelFooter></ScheduleServicePanelFooter>
    </Fragment>
  )

}

const ScheduleServie = () => {
  const { navigate } = useDrawerNavigation();
  const { services } = useScheduleService();
  const {
    scheduleAt,
    timeOptionId,
    setTimeOptionId,
    services: servicesId,
    addService,
    removeService,
  } = useSchedule();

  const onChangeService = useCallback((checkd: boolean, id: number) => {
    if (checkd) {
      addService(id);
    } else {
      removeService(id);
    }
  }, []);

  return (
    <Fragment>
      <Page title="escolha os serviços" color="blue">
        <PageForm>
          {services.map(({ id, name, description, price }) => (
            <ScheduleServiceItem
              key={id}
              title={name}
              subtitle={description}
              price={Number(price)}
              selected={servicesId.includes(id)}
              onChange={(checked) => onChangeService(checked, id)}
            />
          ))}
        </PageForm>
      </Page>
      <ScheduleServicePanel></ScheduleServicePanel>
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
    </Fragment>
  );
};

export const ScheduleServicesScreen = () => {
  const { navigate } = useDrawerNavigation();

  return (
    <Layout
      header={<Header onPressBack={() => navigate(Screen.ScheduleNew)} />}
    >
      <ScheduleServiceProvider>
        <ScheduleServie />
      </ScheduleServiceProvider>
    </Layout>
  );
};
