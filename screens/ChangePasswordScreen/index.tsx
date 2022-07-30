import axios from 'axios';
import { useCallback, useState } from 'react';
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
import { Layout } from '../../providers/Layout';
import { User } from '../../types/User';
import { vars } from '../../values';

export const ChangePasswordScreen = (props) => {
  const { token, loadUser } = useAuth();
  const { showToast, catchAxiosError } = useApp();
  const [loading, setLoading] = useState(false);
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const onSubmit = useCallback(() => {

    if (passwordNew !== passwordConfirm) {
      showToast('Senhas não conferem.');
      return;
    }

    setLoading(true);

    axios
      .put<User>(`/auth/password`, {
        passwordCurrent,
        passwordNew,
      }, {
        baseURL: vars.baseURL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        showToast('Senha alterada com sucesso.');
        setPasswordConfirm('');
        setPasswordCurrent('');
        setPasswordNew('');
      })
      .catch(catchAxiosError)
      .finally(() => setLoading(false));
  }, [passwordCurrent, passwordNew, passwordConfirm]);

  return (
    <Layout
      header={
        <Header onPressBack={() => props.navigation.navigate(Screen.Home)} />
      }
      onRefresh={(finish) => loadUser(finish)}
    >
      <Page title="Alterar senha">
        <PageForm>
            <PageTitle title="Informe a sua Senha" />
            <InputField
                label="Senha Atual"
                style={{ marginTop: vars.space }}
                inputProps={{
                  secureTextEntry: true,
                  value: passwordCurrent,
                  onChangeText: setPasswordCurrent,
                }}
            />
            
            <PageTitle title="Crie uma Nova Senha" />
            <InputField
                label="Nova Senha"
                style={{ marginTop: vars.space }}
                inputProps={{
                  secureTextEntry: true,
                  value: passwordNew,
                  onChangeText: setPasswordNew,
                }}
            />
            <InputField
                label="Confirme a Nova Senha"
                style={{ marginTop: vars.space }}
                inputProps={{
                  secureTextEntry: true,
                  value: passwordConfirm,
                  onChangeText: setPasswordConfirm,
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