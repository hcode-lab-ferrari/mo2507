import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Screen } from '..';
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
import { TimeOption } from '../../types/TimeOption';
import axios from 'axios';
import { useApp } from '../../hooks/useApp';
import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';
import { Address } from '../../types/Address';
import { useAuth } from '../../hooks/useAuth';

const ScheduleAddressesZipCode = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ScheduleAddressesUpdateScreen = ({ route }) => {
  const { navigate } = useDrawerNavigation();
  const { catchAxiosError } = useApp();
  const { setBillingAddressId } = useSchedule();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [complement, setComplement] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const onSubmit = useCallback(() => {

    setLoading(true);

    axios.put<Address>(`/addresses/${route.params.id}`, {
      zipCode,
      street,
      number,
      complement,
      district,
      city,
      state,
      country,
    }, {
      baseURL: vars.baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data: { id } }) => {

      setZipCode("");
      setStreet("");
      setNumber("");
      setDistrict("");
      setComplement("");
      setCity("");
      setState("");
      setCountry("");
      setBillingAddressId(id);
      navigate(Screen.ScheduleAddresses);

    })
    .catch(catchAxiosError)
    .finally(() => {
      setLoading(false);
    });

  }, [zipCode, street, number, complement, district, city, state, country]);

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

    const loadAddress = useCallback((addressId: number, callback?: () => void) => {

        if (addressId) {

            setLoading(true);

            axios.get<Address>(`/addresses/${addressId}`, {
                baseURL: vars.baseURL,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(({ data }) => {

                setZipCode(data.zipCode)
                setStreet(data.street);
                if (data.number) setNumber(data.number);
                setDistrict(data.district);
                if (data.complement) setComplement(data.complement);
                setCity(data.city);
                setState(data.state);
                setCountry(data.country);

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

  useEffect(() => loadAddress(route.params.id), [route]);

  return (
    <Layout
      header={
        <Header onPressBack={() => navigate(Screen.ScheduleAddresses)}
        />
      }
      onRefresh={(finished) => load(finished)}>
      <Page
        title="EDITAR ENDEREÇO"
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
            onPress: () => onSubmit(),
            disabled: loading,
            loading,
            text: 'Atualizar',
          },
        ]}
      />
    </Layout>
  );
};