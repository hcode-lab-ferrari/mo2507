import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
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
import { addMonths, format } from 'date-fns';
import axios from 'axios';
import { useApp } from '../../hooks/useApp';
import { ActivityIndicator } from 'react-native';

const LoadingWrap = styled.View`
  justify-content: center;
  align-items: center;
  min-height: 100px;
  padding: ${vars.spacePx};
`;

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

type InstallmentsOptionItem = {
  number: number;
  value: number;
  description: string;
};

type SchedulePaymentCreate = {
  installments: number;
  cardToken: string;
  cardFirstSixDigits: string;
  cardLastFourDigits: string;
  cardDocument: string;
  paymentTypeId: string;
  paymentMethodId: string;
};

const SchedulePaymentPage = () => {
  const { catchAxiosError, showToast } = useApp();
  const wvRef = useRef<WebView | null>(null);
  const { token } = useAuth();
  const { navigate } = useDrawerNavigation();
  const [initLoading, setInitLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const {
    scheduleAt,
    billingAddressId,
    services,
    timeOptionId,
    setCardFirstSixDigits,
    setCardLastFourDigits,
    setPaymentMethod,
    setSchedule,
  } = useSchedule();
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
  const [installments, setInstallments] = useState(1);
  const [installmentsOptions, setInstallmentsOptions] = useState<
    InstallmentsOptionItem[]
  >([]);
  const [paymentMethodId, setPaymentMethodId] = useState('');
  const [paymentTypeId, setPaymentTypeId] = useState('');

  const createPayment = useCallback(
    (data: SchedulePaymentCreate) => {
      if (scheduleAt) {
        axios
          .post(
            `payment`,
            {
              ...data,
              timeOptionId,
              billingAddressId,
              scheduleAt: format(scheduleAt, 'yyyy-MM-dd'),
              services,
              paymentMethod: data.paymentMethodId,
              document: data.cardDocument,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              baseURL: vars.baseURL,
            }
          )
          .then((response) => {
            setSchedule(response.data);
            setCardFirstSixDigits(data.cardFirstSixDigits);
            setCardLastFourDigits(data.cardLastFourDigits);
            setPaymentMethod(paymentTypeId);
            navigate(Screen.ScheduleSummary);
          })
          .catch(catchAxiosError)
          .finally(() => setLoading(false));
      }
    },
    [scheduleAt, billingAddressId, services, timeOptionId, token]
  );

  const onMessageWebView = (event) => {
    try {
      const { type, data } = JSON.parse(event.nativeEvent.data);

      console.log('onMessageWebView', type, data);

      switch (type) {
        case 'ready':
          setReady(true);
          break;

        case 'installmentOptions':
          setInstallmentsOptions(data);
          break;

        case 'paymentMethodId':
          setPaymentMethodId(data);
          break;
        case 'paymentTypeId':
          setPaymentTypeId(data);
          break;
        case 'complete':
          setLoading(false);
          createPayment(data);
          break;
        case 'error':
          setLoading(false);
          if (data.error.length) {
            showToast(data.error[0].message);
          }
          break;
      }
    } catch (e: any) {
      showToast(e.message);
    }
  };

  const sendMessageTowebView = (script: string) => {
    if (wvRef.current) {
      wvRef.current.injectJavaScript(script);
    }
  };

  const loadAmount = useCallback(() => {
    axios
      .get<{ amount: number }>(`payment`, {
        params: {
          services: services.toString(),
        },
        baseURL: vars.baseURL,
      })
      .then(({ data }) => setAmount(data.amount))
      .catch(catchAxiosError);
  }, [services]);

  const onHttpErrorWebView = () => console.error('onHttpErrorWebView');
  const onErrorWebView = () => console.error('onErrorWebView');

  const onSubmit = () => {
    setLoading(true);
    sendMessageTowebView(`sendSubmit({
      name: '${name}',
      number: '${number}',
      cvv: '${cvv}',
      expiry: '${expiry}',
      cardDocument: '${cpf}',
      installments: '${installments}',
      paymentMethodId: '${paymentMethodId}',
      paymentTypeId: '${paymentTypeId}',
      amount: '${amount}'
    })`);
  };

  useEffect(() => {
    if (services.length > 0) {
      loadAmount();
    } else {
      navigate(Screen.ScheduleServices);
    }
  }, [services]);

  useEffect(() => {
    if (ready && amount > 0) {
      sendMessageTowebView(`setAmountValue(${amount})`);
      setNumber('5031 4332 1540 6351');
      setExpiry(`${format(addMonths(new Date(), 1), 'MM/yy')}`);
      setCvv('123');
      setName('APRO');
      setInitLoading(false);
    }
  }, [ready, amount]);

  useEffect(() => {
    sendMessageTowebView(`setNumberValue('${number.replace(/ /g, '')}')`);
  }, [number]);

  useEffect(() => {
    console.log({ expiry });
    sendMessageTowebView(`setExpiryValue('${expiry}')`);
  }, [expiry]);

  useEffect(() => {
    sendMessageTowebView(`setCvvValue('${cvv}')`);
  }, [cvv]);

  useEffect(() => {
    sendMessageTowebView(`setNameValue('${name}')`);
  }, [name]);

  useEffect(() => {
    sendMessageTowebView(`setDocumentValue('${cpf}')`);
  }, [cpf]);

  useEffect(() => {
    sendMessageTowebView(`setInstallmentsValue('${installments}')`);
  }, [installments]);

  return (
    <Fragment>
      <WebView
        source={{
          uri: 'https://ferrari.hcodelab.com.br/schedules-payment-mobile',
        }}
        ref={wvRef}
        javaScriptEnabled={true}
        onMessage={onMessageWebView}
        onError={onErrorWebView}
        onHttpError={onHttpErrorWebView}
      />
      <Page title={<SchedulePaymentCreditCardHeader />} color="blue">
        <PageForm>
          {initLoading && (
            <LoadingWrap>
              <ActivityIndicator size="small" color={vars.green} />
            </LoadingWrap>
          )}
          {!initLoading && (
            <Fragment>
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
                items={installmentsOptions.map(({ number, description }) => ({
                  label: description,
                  value: number,
                }))}
                label="Parcelamento"
                selectedValue={installments}
                onChange={(value) => setInstallments(value)}
              />
            </Fragment>
          )}
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
            onPress: () => onSubmit(),
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
