import axios from 'axios';
import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { Screen } from '..';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Page } from '../../components/Page';
import { PageFooter } from '../../components/Page/PageFooter';
import { PageForm } from '../../components/PageForm';
import { PageTitle } from '../../components/PageTitle';
import { useApp } from '../../hooks/useApp';
import { useAuth } from '../../hooks/useAuth';
import { useDrawerNavigation } from '../../hooks/useDrawerNavigation';
import { Layout } from '../../providers/Layout';
import { Schedule } from '../../types/Schedule';
import { formatCurrency } from '../../utils/formatCurrency';
import { useScreenFocus } from '../../utils/useScreenFocus';
import { vars } from '../../values';

const ScheduleItemWrap = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${vars.gray3};
  padding-bottom: ${vars.spacePx};
  margin-vertical: ${vars.spacePx};
`;

const ScheduleFields = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const ScheduleItemField = styled.View`
  width: 50%;
  margin-bottom: ${vars.space / 2}px;
`;

const ScheduleItemFieldTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const ScheduleItemFieldValue = styled.Text`
  font-size: 16px;
`;

type ScheduleItemProps = {
    data: Schedule;
    onCanceled: (schedule: Schedule) => void;
    hasDeleteButton?: boolean;
}

const ScheduleItem = ({ data, onCanceled, hasDeleteButton = true }: ScheduleItemProps) => {

    const { token } = useAuth();
    const { catchAxiosError } = useApp();
    const [loading, setLoading] = useState(false);
    
    const onClickCancel = useCallback(() => {

        Alert.alert('Confirmação', 'Deseja realmente cancelar este agendamento?', [
            {
                text: 'Não',
                style: 'cancel',
            },
            {
                text: 'Sim',
                onPress: () => {
                    setLoading(true);
                    axios
                        .delete(`schedules/${data.id}`, {
                            baseURL: vars.baseURL,
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then(() => {
                            if (typeof onCanceled === 'function') {
                                onCanceled(data);
                            }
                        })
                        .catch(catchAxiosError)
                        .finally(() => setLoading(false));
                },
            }
        ])

    }, [token]);

    return (
        <ScheduleItemWrap>
            <ScheduleFields>
                <ScheduleItemField>
                    <ScheduleItemFieldTitle>Data</ScheduleItemFieldTitle>
                    <ScheduleItemFieldValue>
                    {format(new Date(data.scheduleAt), 'dd/MM/yyyy')}
                    {data.timeOption?.time
                    ? ' às ' + format(new Date(data.timeOption?.time), 'HH:mm')
                    : ''}
                    </ScheduleItemFieldValue>
                </ScheduleItemField>

                <ScheduleItemField>
                    <ScheduleItemFieldTitle>Status</ScheduleItemFieldTitle>
                    <ScheduleItemFieldValue>
                        {data.paymentSituation?.name}
                    </ScheduleItemFieldValue>
                </ScheduleItemField>

                <ScheduleItemField>
                    <ScheduleItemFieldTitle>Valor</ScheduleItemFieldTitle>
                    <ScheduleItemFieldValue>
                        {formatCurrency(Number(data.total))}
                    </ScheduleItemFieldValue>
                </ScheduleItemField>

                <ScheduleItemField>
                    <ScheduleItemFieldTitle>Serviço</ScheduleItemFieldTitle>
                    <ScheduleItemFieldValue>
                        {data.ScheduleService?.map((s) => s.service?.name).join(", ")}
                    </ScheduleItemFieldValue>
                </ScheduleItemField>
            </ScheduleFields>
            {hasDeleteButton && (
                <Button
                    color="red"
                    style={{ alignSelf: 'center' }}
                    onPress={() => onClickCancel()}
                    disabled={loading}
                    loading={loading}
                >
                    Cancelar
                </Button>
            )}
        </ScheduleItemWrap>
    )

}

const ScheduleListWrap = styled.View`
    margin: ${vars.spacePx} 0;
`;
export const ScheduleListEmptyText = styled.Text`
  text-align: center;
`;

type ScheduleListProps = {
    data: Schedule[];
    emptyText: string;
    deleteButton?: boolean;
}

const ScheduleList = ({ data, emptyText, deleteButton = true }: ScheduleListProps) => {

    const [items, setItems] = useState(data);

    useEffect(() => setItems(data), [data]);

    return (
        <ScheduleListWrap>
            {items.length === 0 && (
                <ScheduleListEmptyText>{emptyText}</ScheduleListEmptyText>
            )}
            {items.map((item, index) => (
                <ScheduleItem
                    key={index}
                    data={item}
                    onCanceled={() => {
                        setItems((items) => items.filter((i) => i.id !== item.id))
                    }}
                    hasDeleteButton={deleteButton}
                />
            ))}
        </ScheduleListWrap>
    );

}

export const SchedulesScreen = (props) => {
  const { navigate } = useDrawerNavigation();
  const { token } = useAuth();
  const { catchAxiosError } = useApp();
  const [loading, setLoading] = useState(false);
  const [nextSchedules, setNextSchedules] = useState<Schedule[]>([]);
  const [historySchedules, seHistorySchedules] = useState<Schedule[]>([]);

  const load = useCallback((callback?: () => void) => {
    
    setLoading(true);

    axios
        .get<Schedule[]>(`schedules`, {
            baseURL: vars.baseURL,
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
      .then(({ data }) => {
        setNextSchedules(
            data.filter(
              (schedule) =>
                new Date(schedule.scheduleAt).getTime() > new Date().getTime()
            )
        );
        seHistorySchedules(
            data.filter(
              (schedule) =>
                new Date(schedule.scheduleAt).getTime() <= new Date().getTime()
            )
        );
      })
      .catch(catchAxiosError)
      .finally(() => {
        setLoading(false);
        if (typeof callback === 'function') {
            callback();
        }
      });
  }, [token]);

  useScreenFocus(() => {
    load();
  });

  return (
    <Layout
      header={
        <Header onPressBack={() => props.navigation.navigate(Screen.Home)} />
      }
      onRefresh={(finish) => load(finish)}
    >
      <Page title="Agendamentos">
        <PageForm>
            <PageTitle title="Próximos" />
            <ScheduleList
                data={nextSchedules}
                emptyText="Não há próximos agendamentos."
            />

            <PageTitle title="Histórico" />
            <ScheduleList
                data={historySchedules}
                emptyText="Não há histórico de agendamentos."
                deleteButton={false}
            />
        </PageForm>
      </Page>
      <PageFooter
        buttons={[
          {
            onPress: () => navigate(Screen.ScheduleNew),
            text: 'Novo agendamento',
            color: 'black',
            loading,
            disabled: loading,
          },
        ]}
      />
    </Layout>
  );
};