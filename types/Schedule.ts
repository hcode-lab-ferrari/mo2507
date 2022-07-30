import { Address } from './Address';
import { PaymentSituation } from './PaymentSituation';
import { Person } from './Person';
import { TimeOption } from './TimeOption';

export type Schedule = {
  id: number;
  personId: number;
  timeOptionId: number;
  paymentSituationId: number;
  billingAddressId: number;
  scheduleAt: string;
  total: string;
  installments: number;
  document: string;
  paymentMethod: string;
  cardToken: string;
  createdAt: string;
  updatedAt: string;

  person?: Person;
  timeOption?: TimeOption;
  paymentSituation?: PaymentSituation;
  billingAddress?: Address;
};
