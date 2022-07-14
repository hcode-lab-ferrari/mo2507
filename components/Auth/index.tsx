import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Layout } from '../../providers/Layout';
import { AuthBody } from './AuthBody';
import { AuthFooter } from './AuthFooter';
import { AuthFooterText } from './AuthFooterText';
import { AuthHeader } from './AuthHeader';
import { AuthLogo } from './AuthLogo';
import logo from '../../assets/ferrari-logo.png';
import { AuthLayoutProps } from './AuthLayoutProps';
import { useDrawerNavigation } from '../../hooks/useDrawerNavigation';
import { Screen } from '../../screens';

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { navigate } = useDrawerNavigation();

  return (
    <Layout>
      <AuthHeader onPress={() => navigate(Screen.Home)}>
        <AuthLogo source={logo} />
      </AuthHeader>
      <KeyboardAwareScrollView>
        <AuthBody>{children}</AuthBody>
        <AuthFooter>
          <AuthFooterText>2020 © Hcode. All rights reserved.</AuthFooterText>
        </AuthFooter>
      </KeyboardAwareScrollView>
    </Layout>
  );
};
