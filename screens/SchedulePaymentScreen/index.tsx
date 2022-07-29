import { Fragment, useRef, useState } from 'react';
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
import { useScreenFocus } from '../../utils/useScreenFocus';
import { useAuth } from '../../hooks/useAuth';
import { useWithAuthenticated } from '../../utils/useWithAuthenticated';
import { SchedulePaymentCreditCardProvider } from '../../providers/SchedulePaymentCreditCard';
import { useSchedulePaymentCreditCard } from '../../hooks/useSchedulePaymentCreditCard';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { InputField } from '../../components/InputField';
import { CreditCardBack } from '../../components/SchedulePayment/CreditCardBack';
import { CreditCardFront } from '../../components/SchedulePayment/CreditCardFront';
import { ComboBox } from '../../components/ComboBox';
import WebView from 'react-native-webview';

const SchedulePaymentCreditCardHeaderWrap = styled(Animated.View)`
  width: 100%;
  height: 200px;
  margin-top: ${vars.space * 2}px;
  margin-bottom: ${vars.spacePx};
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SchedulePaymentCreditCardFrontWrap = styled(Animated.View)`
  width: 298px;
  height: 185px;
  transform: rotateY(0deg);
  backface-visibility: hidden;
  position: absolute;
`;

const SchedulePaymentCreditCardBackWrap = styled(Animated.View)`
  width: 298px;
  height: 185px;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  position: absolute;
`;

const SchedulePaymentCreditCardHeader = () => {
  const { gestureHandler, styleFront, styleBack } =
    useSchedulePaymentCreditCard();

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <SchedulePaymentCreditCardHeaderWrap>
        <SchedulePaymentCreditCardBackWrap style={styleBack}>
          <CreditCardBack />
        </SchedulePaymentCreditCardBackWrap>
        <SchedulePaymentCreditCardFrontWrap style={styleFront}>
          <CreditCardFront />
        </SchedulePaymentCreditCardFrontWrap>
      </SchedulePaymentCreditCardHeaderWrap>
    </PanGestureHandler>
  );
};

const Fields = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SchedulePaymentPage = () => {
  const wvRef = useRef<WebView | null>(null);
  const { token } = useAuth();
  const { navigate } = useDrawerNavigation();
  const [loading, setLoading] = useState(false);
  const { scheduleAt, billingAddressId, setBillingAddressId } = useSchedule();
  const {
    number,
    setNumber,
    expiry,
    setExpiry,
    cvv,
    setCvv,
    name,
    setName,
    setFlipped,
  } = useSchedulePaymentCreditCard();
  const [cpf, setCpf] = useState('');
  const [installments, setInstallments] = useState(0);

  const onMessageWebView = (event) => {
    console.log('onMessageWebView', event);
  };

  wvRef.current?.injectJavaScript(`window.setAmountValue(100)`);

  useScreenFocus(() => {}, []);

  return (
    <Fragment>
      <Page title={<SchedulePaymentCreditCardHeader />} color="blue">
        <PageForm>
          <InputField
            label="Número do Cartão"
            mask={{
              type: 'credit-card',
            }}
            inputProps={{
              value: number,
              onChangeText: (value) => setNumber(value),
              keyboardType: 'decimal-pad',
              maxLength: 19,
            }}
          />
          <Fields>
            <InputField
              label="Validade"
              mask={{
                type: 'datetime',
                options: {
                  format: 'MM/YY',
                },
              }}
              style={{
                flex: 1,
                marginTop: vars.space,
                marginRight: vars.space / 2,
              }}
              inputProps={{
                value: expiry,
                onChangeText: (value) => setExpiry(value),
                keyboardType: 'decimal-pad',
                maxLength: 5,
                placeholder: 'MM/AA',
              }}
            />
            <InputField
              label="Código de Segurança"
              style={{
                flex: 1,
                marginTop: vars.space,
                marginLeft: vars.space / 2,
              }}
              inputProps={{
                value: cvv,
                onChangeText: (value) => setCvv(value),
                keyboardType: 'decimal-pad',
                maxLength: 4,
                onFocus: () => setFlipped(true),
                onBlur: () => setFlipped(false),
              }}
            />
          </Fields>
          <InputField
            label="Nome"
            style={{ marginTop: vars.space }}
            inputProps={{
              value: name,
              onChangeText: (value) => setName(value),
            }}
          />
          <InputField
            label="CPF do Títular do Cartão"
            style={{ marginTop: vars.space }}
            inputProps={{
              value: cpf,
              onChangeText: (value) => setCpf(value),
              maxLength: 14,
            }}
            mask={{
              type: 'cpf',
            }}
          />
          <ComboBox
            style={{ marginTop: vars.space }}
            items={[
              {
                label: '1x',
                value: 1,
              },
              {
                label: '2x',
                value: 2,
              },
              {
                label: '3x',
                value: 3,
              },
            ]}
            label="Parcelamento"
            selectedValue={installments}
            onChange={(value) => setInstallments(value)}
          />
          <WebView
            source={{
              uri: 'https://ferrari.hcodelab.com.br/schedules-payment-mobile',
            }}
            ref={wvRef}
            javaScriptEnabled={true}
            onMessage={onMessageWebView}
          />
        </PageForm>
      </Page>
      <PageFooter
        buttons={[
          {
            ...BackButton,
            onPress: () => navigate(Screen.ScheduleAddresses),
          },
          {
            ...ContinueButton,
            onPress: () => navigate(Screen.ScheduleServices),
            disabled: loading,
            loading,
          },
        ]}
      />
    </Fragment>
  );
};

export const SchedulePaymentScreen = () => {
  useWithAuthenticated(Screen.ScheduleAddresses);

  const { navigate } = useDrawerNavigation();

  return (
    <Layout
      header={<Header onPressBack={() => navigate(Screen.ScheduleAddresses)} />}
    >
      <SchedulePaymentCreditCardProvider>
        <SchedulePaymentPage />
      </SchedulePaymentCreditCardProvider>
    </Layout>
  );
};
