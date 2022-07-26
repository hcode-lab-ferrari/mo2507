import { Screen } from '..';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { ScheduleService } from '../../components/ScheduleService';
import { Layout } from '../../providers/Layout';

export const ServicesScreen = (props) => {
  return (
    <Layout
      header={
        <Header onPressBack={() => props.navigation.navigate(Screen.Home)} />
      }
    >
      <ScheduleService />
      <Footer />
    </Layout>
  );
};
