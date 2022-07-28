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

const ScheduleAddressesHeader = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: ${vars.gray3};
    padding-bottom: ${vars.spacePx};
`;

const ScheduleAddressesItemWrap = styled.View`
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: ${vars.gray3};
    padding-vertical: ${vars.spacePx};
`;
const ScheduleAddressesItemInput = styled.TouchableOpacity`
    margin-right: ${vars.spacePx};
`;
const ScheduleAddressesItemDetails = styled.View`
    flex: 1;
`;
const ScheduleAddressesItemDetailsText = styled.Text`
    font-size: 16px;
    color: ${vars.dark0};
`;

const ScheduleAddressesItem = () => {

    return (
        <ScheduleAddressesItemWrap>
            <ScheduleAddressesItemInput>
                <InputRadio
                    checked={true}
                />
            </ScheduleAddressesItemInput>
            <ScheduleAddressesItemDetails>
                <ScheduleAddressesItemDetailsText>Av. Paulista, 500</ScheduleAddressesItemDetailsText>

                <ScheduleAddressesItemDetailsText>Bela Vista</ScheduleAddressesItemDetailsText>

                <ScheduleAddressesItemDetailsText>São Paulo - SP</ScheduleAddressesItemDetailsText>

                <ScheduleAddressesItemDetailsText>01310-100</ScheduleAddressesItemDetailsText>
            </ScheduleAddressesItemDetails>
            <Button
                color='gray'
                onPress={() => {}}
                style={{
                    minWidth: 50,
                    alignSelf: 'flex-start',
                }}
            >
                <MaterialIcons
                    name="edit"
                    size={24}
                    color={vars.gray0}
                />
            </Button>
        </ScheduleAddressesItemWrap>
    )

}

export const ScheduleAddressesScreen = () => {
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
      <Page
        title="Endereço de Cobrança"
        color="blue"
    >
        <PageForm>
            <ScheduleAddressesHeader>
                <Button
                    color="green"
                    onPress={() => navigate(Screen.ScheduleAddressesCreate)}
                >
                    NOVO ENDEREÇO
                </Button>
            </ScheduleAddressesHeader>
            {[1, 2].map((item, index) => (
                <ScheduleAddressesItem
                    key={index}
                />
            ))}
        </PageForm>
      </Page>
      <PageFooter
        buttons={[
          {
            ...BackButton,
            onPress: () => navigate(Screen.ScheduleServices),
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
