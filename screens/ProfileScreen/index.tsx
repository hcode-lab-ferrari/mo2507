import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import axios from 'axios';
import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { Screen } from '..';
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { Page } from '../../components/Page';
import { BackButton } from '../../components/Page/BackButton';
import { PageFooter } from '../../components/Page/PageFooter';
import { PageForm } from '../../components/PageForm';
import { PageTitle } from '../../components/PageTitle';
import { useApp } from '../../hooks/useApp';
import { useAuth } from '../../hooks/useAuth';
import { useDrawerNavigation } from '../../hooks/useDrawerNavigation';
import { Layout } from '../../providers/Layout';
import { User } from '../../types/User';
import { vars } from '../../values';

export const ProfileScreen = (props) => {
  const navigation = useDrawerNavigation();
  const { user, token, setUser, loadUser } = useAuth();
  const { showToast, catchAxiosError } = useApp();
  const [birthAt, setBirthAt] = useState<Date | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const pickerBirthAt = useCallback(() => {
    DateTimePickerAndroid.open({
      value: birthAt ? birthAt : new Date(),
      mode: 'date',
      maximumDate: new Date(),
      onChange: (_event, date) => {
        if (date) {
          setBirthAt(date);
        }
      },
    });
  }, [birthAt]);

  const onSubmit = useCallback(() => {
    if (!name) {
      showToast('Preencha o nome.');
      return;
    }
    if (!email) {
      showToast('Preencha o e-mail.');
      return;
    }

    setLoading(true);

    const data = {
      name,
      email,
    } as any;

    if (birthAt) {
      data.birthAt = format(birthAt, 'yyyy-MM-dd');
    }

    if (cpf) {
      data.cpf = cpf;
    }

    if (phone) {
      data.phone = phone;
    }

    axios
      .put<User>(`/auth/profile`, data, {
        baseURL: vars.baseURL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setUser(data);
        showToast('Dados atualizados com sucesso.');
      })
      .catch(catchAxiosError)
      .finally(() => setLoading(false));
  }, [name, birthAt, email, cpf, phone, token]);

  useEffect(() => {
    if (user && user.person) {
      setName(user.person.name);
      setEmail(user.email);
      if (user.person.document !== undefined) {
        setCpf(String(user.person.document));
      }
      if (user.person.phone !== undefined) {
        setPhone(String(user.person.phone));
      }
      if (user.person.birthAt) {
        setBirthAt(new Date(user.person.birthAt));
      }
    }
  }, [user]);

  useEffect(
    () => navigation.addListener('focus', () => loadUser()),
    [navigation]
  );

  return (
    <Layout
      header={
        <Header onPressBack={() => props.navigation.navigate(Screen.Home)} />
      }
      onRefresh={(finish) => loadUser(finish)}
    >
      <Page title="Editar Dados">
        <PageForm>
          <PageTitle title="Dados Pessoais" />

          <InputField
            label="Nome Completo"
            style={{ marginTop: vars.space }}
            inputProps={{ value: name, onChangeText: setName }}
          />
          <InputField
            label="E-mail"
            style={{ marginTop: vars.space }}
            inputProps={{
              autoComplete: 'email',
              keyboardType: 'email-address',
              value: email,
              onChangeText: setEmail,
            }}
          />
          <InputField
            label="Data de Nascimento"
            style={{ marginTop: vars.space }}
            inputProps={{
              value:
                birthAt instanceof Date ? format(birthAt, 'dd/MM/yyyy') : '',
              autoComplete: 'birthdate-full',
              onPressIn: pickerBirthAt,
              onChangeText: () => {},
              onKeyPress: ({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  setBirthAt(null);
                } else {
                  setBirthAt(birthAt);
                }
              },
            }}
          />
          <InputField
            label="Documento"
            style={{ marginTop: vars.space }}
            inputProps={{ value: cpf, onChangeText: setCpf }}
            mask={{
              type: 'cpf',
            }}
          />
          <InputField
            label="Telefone"
            style={{ marginTop: vars.space }}
            inputProps={{
              value: phone,
              onChangeText: setPhone,
              keyboardType: 'phone-pad',
            }}
            mask={{
              type: 'cel-phone',
            }}
          />
        </PageForm>
      </Page>
      <PageFooter
        buttons={[
          {
            ...BackButton,
            onPress: () => props.navigation.navigate(Screen.Home),
          },
          {
            onPress: onSubmit,
            text: 'Salvar',
            color: 'black',
            loading,
            disabled: loading,
          },
        ]}
      />
    </Layout>
  );
};
