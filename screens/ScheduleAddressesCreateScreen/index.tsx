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
import { InputField } from '../../components/InputField';

const ScheduleAddressesZipCode = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ScheduleAddressesCreateScreen = () => {
  const { navigate } = useDrawerNavigation();
  const { scheduleAt, timeOptionId, setTimeOptionId } = useSchedule();
  const { catchAxiosError } = useApp();
  const [items, setItems] = useState<TimeOption[]>([]);
  const [loading, setLoading] = useState(false);
    const [zipCode, setZipCode] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [district, setDistrict] = useState('');
    const [complement, setComplement] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');


  const load = useCallback((callback?: () => void) => {

    if (zipCode) {

      setLoading(true);

      axios.get(`/addresses/zip-code/${zipCode}`, {
        baseURL: vars.baseURL,
      })
      .then(({ data }) => {

        setStreet(data.logradouro);
        setDistrict(data.bairro);
        setComplement(data.complemento);
        setCity(data.localidade);
        setState(data.uf);
        setCountry("Brasil");

      })
      .catch(catchAxiosError)
      .finally(() => {
        setLoading(false);
        if (typeof callback === 'function') {
          callback();          
        }
      });

    }

  }, [zipCode]);

  useEffect(() => {

    if (zipCode.replace('-', '').length === 8) {
        load();
    }

  }, [zipCode]);

  return (
    <Layout
      header={
        <Header onPressBack={() => navigate(Screen.ScheduleAddresses)}
        />
      }
      onRefresh={(finished) => load(finished)}>
      <Page
        title="NOVO ENDEREÇO"
        color="blue"
    >
        <PageForm>
            <ScheduleAddressesZipCode>
                <InputField
                    label='CEP'
                    style={{
                        flex: 1,
                        marginRight: vars.space,
                    }}
                    inputProps={{
                        keyboardType: 'number-pad',
                        value: zipCode,
                        onChangeText: (text) => setZipCode(text)
                    }}
                />
                <Button
                    color='gray'
                    style={{
                        alignSelf: 'stretch',
                    }}
                    onPress={() => load()}
                >
                    BUSCAR
                </Button>
            </ScheduleAddressesZipCode>

            <InputField
                label='Endereço'
                style={{
                    flex: 1,
                    marginTop: vars.space,
                }}
                inputProps={{
                    value: street,
                    onChangeText: (text) => setStreet(text)
                }}
            />

            <InputField
                label='Número'
                style={{
                    flex: 1,
                    marginTop: vars.space,
                }}
                inputProps={{
                    keyboardType: 'numeric',
                    value: number,
                    onChangeText: (text) => setNumber(text)
                }}
            />

            <InputField
                label='Complemento'
                style={{
                    flex: 1,
                    marginTop: vars.space,
                }}
                inputProps={{
                    value: complement,
                    onChangeText: (text) => setComplement(text)
                }}
            />

            <InputField
                label='Bairro'
                style={{
                    flex: 1,
                    marginTop: vars.space,
                }}
                inputProps={{
                    value: district,
                    onChangeText: (text) => setDistrict(text)
                }}
            />

            <InputField
                label='Cidade'
                style={{
                    flex: 1,
                    marginTop: vars.space,
                }}
                inputProps={{
                    value: city,
                    onChangeText: (text) => setCity(text)
                }}
            />
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