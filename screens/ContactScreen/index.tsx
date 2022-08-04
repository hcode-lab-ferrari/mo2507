import { Screen } from '..';
import { Contact } from '../../components/Contact';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { Layout } from '../../providers/Layout';

export const ContactScreen = (props) => {
  return (
    <Layout
      header={
        <Header onPressBack={() => props.navigation.navigate(Screen.Home)} />
      }
    >
      <Contact />
      <Footer />
    </Layout>
  );
};
