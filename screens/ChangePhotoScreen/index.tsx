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
import { getPhotoURL } from '../../components/DrawerCustom/getPhotoURL';
import * as ImagePicker from 'expo-image-picker';

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

  const [image, setImage] = useState<null | ImagePicker.ImageInfo>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const pickCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

    const onSubmit = useCallback(() => {

        if (image === null) {
            return;
        }
        
        setLoading(true);

        const formData = new FormData();

        formData.append('file', {
            uri: Platform.OS === 'android' ? image.uri : 'file://' + image.uri,
            name: 'photo.jpg',
            type: 'image/jpeg',
        } as any);

        axios
        .put<User>(`/auth/photo`, formData, {
            baseURL: vars.baseURL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(({ data }) => {
            setUser({
                ...user!,
                photo: data?.photo,
            });
            showToast('Foto atualizada com sucesso.');
            setImage(null);
        })
        .catch(catchAxiosError)
        .finally(() => setLoading(false));
    }, [image]);

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
            <TouchableOpacity onPress={() => pickImage()}>
                <CurrentPhoto source={image ? image : user?.photo ? { uri: getPhotoURL(user?.photo) } : noPhoto} />
            </TouchableOpacity>
            <Fields>
                <Button color="green" onPress={() => pickImage()}>
                    Escolher Foto
                </Button>
                <Button color="green" onPress={() => pickCamera()}>
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
            onPress: () => onSubmit(),
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
