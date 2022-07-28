import styled from 'styled-components/native';
import { Header } from '../../components/Header';
import { Page } from '../../components/Page';
import { PageFooter } from '../../components/Page/PageFooter';
import { PageForm } from '../../components/PageForm';
import { PageTitle } from '../../components/PageTitle';
import { useDrawerNavigation } from '../../hooks/useDrawerNavigation';
import { Layout } from '../../providers/Layout';
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

export const ScheduleCompleteScreen = () => {
  const { navigate } = useDrawerNavigation();

  return (
    <Layout
      header={<Header />}
    >
      <Page
        title="pagamento efetuado"
        color="green"
    >
        <PageForm>
            <PageTitle
                title="Obrigado!"
            />
            <ScheduleCompleteText>Número do Pedido: 000123</ScheduleCompleteText>
            <ScheduleCompleteSmallText>Cartão de Crédito final 0604</ScheduleCompleteSmallText>
        </PageForm>
      </Page>
      <PageFooter
        buttons={[
          {
            text: 'agendamentos',
            color: 'green',
            onPress: () => {},
          },
        ]}
      />
    </Layout>
  );
};