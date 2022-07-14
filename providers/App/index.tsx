import { ToastAndroid } from 'react-native';
import { AppContext } from '../../contexts/App';
import { useDrawerNavigation } from '../../hooks/useDrawerNavigation';
import { Screen } from '../../screens';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const navigation = useDrawerNavigation();

  const showToast = (message: string, duration = ToastAndroid.SHORT) => {
    ToastAndroid.show(message, duration);
  };

  const unlogged = () => {
    navigation.navigate(Screen.Auth);
    showToast('Por favor, faça o login.');
  };

  const catchAxiosError = (error: any) => {
    if (error.response) {
      switch (error.response.data.error) {
        case 'Unauthorized':
          unlogged();
          break;
        default:
          showToast(
            error.response.data.message ??
              error.response.data.error ??
              error.response.data ??
              'Erro desconhecido'
          );
      }
    } else {
      switch (error.message) {
        case 'jwt malfomed':
          unlogged();
          break;
        default:
          showToast(error.message ?? 'Erro desconhecido');
      }
    }
  };

  return (
    <AppContext.Provider value={{ showToast, catchAxiosError }}>
      {children}
    </AppContext.Provider>
  );
};
