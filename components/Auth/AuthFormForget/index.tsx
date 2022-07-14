import { useDrawerNavigation } from '../../../hooks/useDrawerNavigation';
import { Screen } from '../../../screens';
import { vars } from '../../../values';
import { Button } from '../../Button';
import { PageTitle } from '../../PageTitle';
import { AuthFormFooter } from '../AuthFormFooter';
import { AuthFormForgetWrap } from '../AuthFormForgetWrap';
import check from '../../../assets/check.png';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { AuthForgetMessage } from '../AuthForgetMessage';
import { AuthForgetText } from '../AuthForgetText';
import { AuthForgetIcon } from '../AuthForgetIcon';
import { useAuth } from '../../../hooks/useAuth';

export const AuthFormForget = () => {
  const { isLoadingForget, onSubmitForget } = useAuth();

  const navigation = useDrawerNavigation();

  useEffect(
    () => navigation.addListener('focus', () => onSubmitForget()),
    [navigation]
  );

  return (
    <AuthFormForgetWrap>
      <PageTitle title="Esqueci a senha" />
      {isLoadingForget && (
        <AuthForgetMessage>
          <ActivityIndicator size="small" color={vars.green} />
          <AuthForgetText>Enviando e-mail...</AuthForgetText>
        </AuthForgetMessage>
      )}
      {!isLoadingForget && (
        <AuthForgetMessage>
          <AuthForgetIcon source={check} />
          <AuthForgetText>
            Verifique as instruções no seu e-mail.
          </AuthForgetText>
        </AuthForgetMessage>
      )}
      <AuthFormFooter style={{ justifyContent: 'center' }}>
        <Button
          color="text"
          onPress={() => navigation.navigate(Screen.AuthLogin)}
        >
          Voltar para o login
        </Button>
      </AuthFormFooter>
    </AuthFormForgetWrap>
  );
};
