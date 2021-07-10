import { OrderStatus } from '../order/enum';

// -------------------- Unregistered User Model --------------------

export interface Unregistered_User_Model {
  first_name: string;
  last_name: string;
  address: string;
  city_id: string;
  requested_delivery_date: string;
  phone: string;
  product: {}[];
}
// -------------------- Registered User Model --------------------

export interface Registered_User_Model {
  address: string;
  city_id: string;
  requested_delivery_date: string;
  product: {}[];
  coupon?: string;
}

// -------------------- Verfication Response Model --------------------
export interface order_response {
  id: number;
  status: OrderStatus;
  requested_delivery_date: string;
  order_no: string;
  total: string;
}

// -------------------- Verfication Response Model --------------------

export interface verification_code_response {
  id: number;
  status: OrderStatus;
  requested_delivery_date: string;
  order_no: string;
  total: string;
}
