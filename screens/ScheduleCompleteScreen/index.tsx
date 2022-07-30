import styled from 'styled-components/native';
import { Screen } from '..';
import { Header } from '../../components/Header';
import { Page } from '../../components/Page';
import { PageColor } from '../../components/Page/PageColor';
import { PageFooter } from '../../components/Page/PageFooter';
import { PageForm } from '../../components/PageForm';
import { PageTitle } from '../../components/PageTitle';
import { useDrawerNavigation } from '../../hooks/useDrawerNavigation';
import { useSchedule } from '../../hooks/useSchedule';
import { Layout } from '../../providers/Layout';
import { Schedule } from '../../types/Schedule';
import { vars } from '../../values';

const ScheduleCompleteText = styled.Text`
  font-size: 22px;
  text-align: center;
  color: ${vars.gray0};
  margin-top: ${vars.spacePx};
`;
const ScheduleCompleteSmallText = styled.Text`
  font-size: 16px;
  text-align: center;
  color: ${vars.gray0};
`;

type PageValuesType = {
  color: PageColor;
  title: string;
};

export const ScheduleCompleteScreen = () => {
  const { navigate } = useDrawerNavigation();
  const { schedule, cardLastFourDigits } = useSchedule();

  const getPageValues = (data: Schedule): PageValuesType => {
    switch (data.paymentSituationId) {
      case 2:
        return {
          color: 'red',
          title: 'Pagamento não autorizado',
        };
      case 3:
        return {
          color: 'green',
          title: 'Pagamento Aprovado',
        };
      default:
        return {
          color: 'yellow',
          title: 'Aguardando Confirmação do Pagamento',
        };
    }
  };

  return (
    <Layout header={<Header />}>
      {schedule && (
        <Page
          title={getPageValues(schedule).title}
          color={getPageValues(schedule).color}
        >
          <PageForm>
            <PageTitle title="Obrigado!" />
            <ScheduleCompleteText>
              Número do Pedido: {schedule?.id.toString().padStart(6, '000000')}
            </ScheduleCompleteText>
            <ScheduleCompleteSmallText>
              Cartão de Crédito final {cardLastFourDigits}
            </ScheduleCompleteSmallText>
          </PageForm>
        </Page>
      )}
      <PageFooter
        buttons={[
          {
            text: 'agendamentos',
            color: 'green',
            onPress: () => navigate(Screen.Schedules),
          },
        ]}
      />
    </Layout>
  );
};
