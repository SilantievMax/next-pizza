export interface PaymentData {
  id: string;
  test: boolean;
  paid: boolean;
  amount: Amount;
  status: string;
  metadata: Metadata;
  created_at: string;
  refundable: boolean;
  description: string;
  recipient: Recipient;
  confirmation: Confirmation;
}

export interface Amount {
  value: string;
  currency: string;
}

export interface Recipient {
  account_id: string;
  gateway_id: string;
}

export interface Confirmation {
  type: string;
  confirmation_url: string;
}

export interface Metadata {
  order_id: string;
}

export interface PaymentCallbackData {
  type: string;
  event: string;
  object: {
    id: string;
    paid: boolean;
    test: boolean;
    status: string;
    refundable: true;
    created_at: string;
    captured_at: string;
    description: string;
    metadata: { order_id: string };
    amount: { value: string; currency: 'RUB' };
    income_amount: { value: string; currency: 'RUB' };
    refunded_amount: { value: string; currency: 'RUB' };
    recipient: { account_id: string; gateway_id: string };
    authorization_details: { rrn: string; auth_code: string };
    payment_method: { id: string; type: string; saved: boolean; title: string };
  };
}
