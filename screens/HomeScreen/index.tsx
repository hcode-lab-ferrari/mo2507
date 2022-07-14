import { Header } from '../../components/Header';
import { HomeBanner } from '../../components/HomeBanner';
import { Layout } from '../../providers/Layout';
import ferrariAmarela from '../../assets/ferrari-amarela.png';
import ferrariInterior from '../../assets/ferrari-interior.png';
import ferrariAzul from '../../assets/ferrari-azul.png';
import { Gallery } from '../../components/Gallery';
import { ScheduleService } from '../../components/ScheduleService';
import { Contact } from '../../components/Contact';
import { Footer } from '../../components/Footer';

export const HomeScreen = () => {
  return (
    <Layout header={<Header />}>
      <HomeBanner />
      <Gallery
        items={[
          {
            image: ferrariAmarela,
            title: 'Esportivas',
            subtitle: 'Ferrari F1000',
          },
          {
            image: ferrariInterior,
            title: 'Esportivas',
            subtitle: 'Ferrari F1000',
          },
          {
            image: ferrariAzul,
            title: 'Esportivas',
            subtitle: 'Ferrari F1000',
          },
        ]}
      />
      <ScheduleService />
      <Contact />
      <Footer />
    </Layout>
  );
};
