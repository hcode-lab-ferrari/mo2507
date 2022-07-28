import { format, getDay } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Screen } from '..';
import Calendar from '../../components/Calendar';
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
import locale from 'date-fns/locale/pt-BR';
import { ScheduleTimeOptionItem } from '../../components/ScheduleTimeOptionItem';
import { TimeOption } from '../../types/TimeOption';
import axios from 'axios';
import { useApp } from '../../hooks/useApp';
import { useScreenFocus } from '../../utils/useScreenFocus';
import { Button } from '../../components/Button';
import { MaterialIcons } from '@expo/vector-icons';
import { InputRadio } from '../../components/InputRadio';
import { Address } from '../../types/Address';
import { useAuth } from '../../hooks/useAuth';
import { useWithAuthenticated } from '../../utils/useWithAuthenticated';

const ScheduleAddressesHeader = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: ${vars.gray3};
    padding-bottom: ${vars.spacePx};
`;

const ScheduleAddressesItemWrap = styled.TouchableOpacity`
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: ${vars.gray3};
    padding-vertical: ${vars.spacePx};
`;
const ScheduleAddressesItemInput = styled.TouchableOpacity`
    margin-right: ${vars.spacePx};
`;
const ScheduleAddressesItemDetails = styled.View`
    flex: 1;
`;
const ScheduleAddressesItemDetailsText = styled.Text`
    font-size: 16px;
    color: ${vars.dark0};
`;

type ScheduleAddressesItemProps = {
  data: Address;
  selected: boolean;
  onSelected: (id: number) => void;
}

const ScheduleAddressesItem = ({
  data: {
    street,
    number,
    district,
    city,
    state,
    zipCode,
    id,
  },
  selected,
  onSelected,
}: ScheduleAddressesItemProps) => {

  const { navigate } = useDrawerNavigation();
  
  const [selectedAddress, setSelectedAddress] = useState(selected);

  useEffect(() => setSelectedAddress(selected), [selected]);

  return (
    <ScheduleAddressesItemWrap onPress={() => onSelected(id)}>
        <ScheduleAddressesItemInput>
            <InputRadio
              checked={selectedAddress}
              onChange={() => onSelected(id)}
            />
        </ScheduleAddressesItemInput>
        <ScheduleAddressesItemDetails>
            <ScheduleAddressesItemDetailsText>{street}{number && number.length > 0 && `, ${number}`}</ScheduleAddressesItemDetailsText>

            <ScheduleAddressesItemDetailsText>{district}</ScheduleAddressesItemDetailsText>

            <ScheduleAddressesItemDetailsText>{city} - {state}</ScheduleAddressesItemDetailsText>

            <ScheduleAddressesItemDetailsText>{zipCode}</ScheduleAddressesItemDetailsText>
        </ScheduleAddressesItemDetails>
        <Button
          color='gray'
          onPress={() => {
            navigate(Screen.ScheduleAddressesUpdate, {
              id,
            })
          }}
          style={{
              minWidth: 50,
              alignSelf: 'flex-start',
          }}
        >
          <MaterialIcons
            name="edit"
            size={24}
            color={vars.gray0}
          />
        </Button>
    </ScheduleAddressesItemWrap>
  )

}

export const ScheduleAddressesScreen = () => {
  useWithAuthenticated(Screen.ScheduleAddresses);

  const { scheduleAt, billingAddressId,
   setBillingAddressId } = useSchedule();
  const { token } = useAuth();
  const { navigate } = useDrawerNavigation();
  const { catchAxiosError } = useApp();
  const [items, setItems] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback((callback?: () => void) => {

    if (token) {

      setLoading(true);

      axios.get<Address[]>("/me/addresses", {
        baseURL: vars.baseURL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => setItems(data))
      .catch(catchAxiosError)
      .finally(() => {
        setLoading(false);
        if (typeof callback === 'function') {
          callback();          
        }
      });

    }

  }, [token]);

  useScreenFocus(() => {

    if (scheduleAt === null) {
      navigate(Screen.ScheduleNew);
      return;
    }
    
    load();

  }, [load]);

  return (
    <Layout
      header={
        <Header onPressBack={() => navigate(Screen.ScheduleServices)}
        />
      }
      onRefresh={(finished) => load(finished)}>
      <Page
        title="Endereço de Cobrança"
        color="blue"
    >
        <PageForm>
            <ScheduleAddressesHeader>
                <Button
                  color="green"
                  onPress={() => navigate(Screen.ScheduleAddressesCreate)}
                >
                  NOVO ENDEREÇO
                </Button>
            </ScheduleAddressesHeader>
            {items.map((item, index) => (
              <ScheduleAddressesItem
                key={index}
                data={item}
                selected={billingAddressId === item.id}
                onSelected={(addressId) => setBillingAddressId(addressId)}
              />
            ))}
        </PageForm>
      </Page>
      <PageFooter
        buttons={[
          {
            ...BackButton,
            onPress: () => navigate(Screen.ScheduleServices),
          },
          {
            ...ContinueButton,
            onPress: () => navigate(Screen.SchedulePayment),
            disabled: loading,
            loading,
          },
        ]}
      />
    </Layout>
  );
};
