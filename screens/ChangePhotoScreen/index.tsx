import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import axios from 'axios';
import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
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
import noPhoto from '../../assets/no-photo.jpg';
import { Button } from '../../components/Button';
import { Platform, TouchableOpacity } from 'react-native';

const CurrentPhoto = styled.Image`
    width: 200px;
    height: 200px;
    border-radius: 100px;
    align-self: center;
    margin: 30px 0;
`;

const Fields = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ChangePhotoScreen = (props) => {
  const navigation = useDrawerNavigation();
  const { user, token, setUser, loadUser } = useAuth();
  const { showToast, catchAxiosError } = useApp();
  const [loading, setLoading] = useState(false);

  return (
    <Layout
      header={
        <Header onPressBack={() => props.navigation.navigate(Screen.Home)} />
      }
      onRefresh={(finish) => loadUser(finish)}
    >
      <Page title="mudar foto">
        <PageForm>
            <PageTitle title="Foto Atual" />
            <TouchableOpacity>
                {/* <CurrentPhoto source={user?.photo ? { uri }} /> */}
            </TouchableOpacity>
            <Fields>
                <Button color="green">
                    Escolher Foto
                </Button>
                <Button color="green">
                    Tirar Foto
                </Button>
            </Fields>
        </PageForm>
      </Page>
      <PageFooter
        buttons={[
          {
            ...BackButton,
            onPress: () => props.navigation.navigate(Screen.Home),
          },
          {
            onPress: () => {},
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
