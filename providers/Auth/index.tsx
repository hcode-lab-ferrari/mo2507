import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import { FormDataLoginType } from '../../contexts/Auth/FormDataLoginType';
import { FormDataRegisterType } from '../../contexts/Auth/FormDataRegisterType';
import { useApp } from '../../hooks/useApp';
import { useDrawerNavigation } from '../../hooks/useDrawerNavigation';
import { Screen } from '../../screens';
import { User } from '../../types/User';
import { vars } from '../../values';
import { Buffer } from 'buffer';
import { FormMeResponse } from './FormMeResponse';
import { LoadUserSuccessFunction } from './LoadUserSuccessFunction';
import { FormEmailResponse } from './FormEmailResponse';
import { FormTokenResponse } from './FormTokenResponse';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const STORAGE_TOKEN_KEY = 'STORAGE_TOKEN_KEY';
  const { catchAxiosError, showToast } = useApp();
  const navigation = useDrawerNavigation();
  const [email, setEmail] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingForget, setIsLoadingForget] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [nextScreen, setNextScreen] = useState(Screen.ScheduleNew);

  const redirectToNextScreen = useCallback(() => {
    if (nextScreen) {
      navigation.navigate(nextScreen);
    }
  }, [nextScreen]);

  const onSubmitEmail = useCallback(() => {
    setIsLoading(true);

    axios
      .post<FormEmailResponse>(
        `/auth`,
        { email },
        {
          baseURL: vars.baseURL,
        }
      )
      .then(({ data }) => {
        if (data.exists) {
          navigation.navigate(Screen.AuthLogin);
        } else {
          navigation.navigate(Screen.AuthRegister);
        }
      })
      .catch(catchAxiosError)
      .finally(() => setIsLoading(false));
  }, [email]);

  const onSubmitRegister = useCallback((data: FormDataRegisterType) => {
    setIsLoading(true);

    const body = { ...data } as any;

    if (data.birthAt) {
      body.birthAt = format(data.birthAt, 'yyyy-MM-dd');
    }

    axios
      .post<FormTokenResponse>(`/auth/register`, body, {
        baseURL: vars.baseURL,
      })
      .then(({ data }) => {
        setToken(data.token);
        setStoreToken(data.token);
        redirectToNextScreen();
      })
      .catch(catchAxiosError)
      .finally(() => setIsLoading(false));
  }, []);

  const onSubmitLogin = useCallback((data: FormDataLoginType) => {
    setIsLoading(true);

    axios
      .post<FormTokenResponse>(`/auth/login`, data, {
        baseURL: vars.baseURL,
      })
      .then(({ data }) => {
        setToken(data.token);
        setStoreToken(data.token);
        redirectToNextScreen();
      })
      .catch(catchAxiosError)
      .finally(() => setIsLoading(false));
  }, []);

  const onSubmitForget = useCallback(() => {
    setIsLoading(true);
    setIsLoadingForget(true);

    axios
      .post<FormTokenResponse>(
        `/auth/forget`,
        {
          email,
        },
        {
          baseURL: vars.baseURL,
        }
      )
      .then(() => {
        showToast(
          'Enviamos um e-mail para você com instruções para recuperar sua senha.'
        );
      })
      .catch(catchAxiosError)
      .finally(() => {
        setIsLoading(false);
        setIsLoadingForget(false);
      });
  }, [email]);

  const loadUser = useCallback(
    (success: LoadUserSuccessFunction = () => {}) => {
      setIsLoading(true);

      axios
        .get<FormMeResponse>(`/auth/me`, {
          baseURL: vars.baseURL,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          setUser(data.user);
          if (typeof success === 'function') {
            success(data);
          }
        })
        .catch(catchAxiosError)
        .finally(() => setIsLoading(false));
    },
    [token]
  );

  const logout = () => {
    setToken(null);
    setUser(null);
    setStoreToken('');
  };

  const setStoreToken = async (token: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_TOKEN_KEY, token);
    } catch (e: any) {
      showToast(e.message);
    }
  };

  const getStoreToken = async () => {
    try {
      return await AsyncStorage.getItem(STORAGE_TOKEN_KEY);
    } catch (e: any) {
      showToast(e.message);
    }
  };

  useEffect(() => {
    getStoreToken()
      .then((token) => {
        if (token) {
          setToken(token);
        }
      })
      .catch((e: any) => {
        showToast(e.message);
      });
  }, []);

  useEffect(() => {
    if (token) {
      setIsLogged(true);
      try {
        const payload = token.split('.')[1];
        const jsonString = Buffer.from(payload, 'base64').toString('utf8');

        const { name, email, id, photo, personId } = JSON.parse(jsonString);

        setUser({
          id,
          email,
          photo,
          personId,
          person: {
            id: personId,
            name,
          },
        });
      } catch (e: any) {
        showToast(e.message);
      }
    } else {
      setIsLogged(false);
      setStoreToken('');
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        logout,
        email,
        setEmail,
        user,
        setUser,
        token,
        isLoading,
        isLoadingForget,
        isLogged,
        loadUser,
        onSubmitEmail,
        setNextScreen,
        onSubmitForget,
        onSubmitLogin,
        onSubmitRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
