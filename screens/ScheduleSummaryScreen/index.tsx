import { Screen } from '..';
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { Page } from '../../components/Page';
import { BackButton } from '../../components/Page/BackButton';
import { ContinueButton } from '../../components/Page/ContinueButton';
import { PageFooter } from '../../components/Page/PageFooter';
import { PageForm } from '../../components/PageForm';
import { useDrawerNavigation } from '../../hooks/useDrawerNavigation';
import { useSchedule } from '../../hooks/useSchedule';
import { Layout } from '../../providers/Layout';
import locale from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { vars } from '../../values';
import { useApp } from '../../hooks/useApp';
import { Schedule } from '../../types/Schedule';

export const ScheduleSummaryScreen = () => {
  const { catchAxiosError } = useApp();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const { navigate } = useDrawerNavigation();
  const {
    schedule,
    cardFirstSixDigits,
    cardLastFourDigits,
    paymentMethod,
    services,
    setSchedule,
  } = useSchedule();

  const onSubmit = useCallback(() => {
    setLoading(true);

    axios
      .post<Schedule>(`payment/${schedule?.id}`, null, {
        baseURL: vars.baseURL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setSchedule(data);
        navigate(Screen.ScheduleComplete);
      })
      .catch(catchAxiosError)
      .finally(() => setLoading(false));
  }, [schedule, token]);

  return (
    <Layout
      header={<Header onPressBack={() => navigate(Screen.SchedulePayment)} />}
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
              value:
                paymentMethod?.toLowerCase() === 'credit_card'
                  ? 'Cartão de Crédito'
                  : 'Cartão de Débito',
            }}
            readOnly={true}
          />

          <InputField
            label="CARTÃO"
            inputProps={{
              value: cardFirstSixDigits + ' **** ' + cardLastFourDigits,
            }}
            readOnly={true}
          />

          <InputField
            label="PARCELAS"
            inputProps={{
              value:
                schedule?.installments === 1
                  ? 'À Vista'
                  : schedule?.installments + 'x',
            }}
            readOnly={true}
          />

          <InputField
            label="QUANTIDADE DE SERVIÇOS"
            inputProps={{
              value: String(services.length),
            }}
            readOnly={true}
          />

          <InputField
            label="DATA DO SERVIÇO"
            inputProps={{
              value: schedule?.scheduleAt
                ? format(
                    new Date(schedule?.scheduleAt),
                    "d 'de' MMMM 'de' yyyy",
                    { locale }
                  )
                : '',
            }}
            readOnly={true}
          />

          <InputField
            label="VALOR TOTAL"
            inputProps={{
              value: formatCurrency(Number(schedule?.total ?? 0)),
            }}
            readOnly={true}
          />
        </PageForm>
      </Page>
      <PageFooter
        buttons={[
          {
            ...BackButton,
            onPress: () => navigate(Screen.SchedulePayment),
          },
          {
            ...ContinueButton,
            text: 'confirmar',
            onPress: () => onSubmit(),
            loading,
            disabled: loading,
          },
        ]}
      />
    </Layout>
  );
};
