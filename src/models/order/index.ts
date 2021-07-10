import { OrderStatus } from './enum';

export default interface Order_Site {
  id: number;
  status: OrderStatus;
  requested_delivery_date: string;
  order_no: string;
  total: number;
}

//---------------Product-S-Req.ts---------------

export interface Order_proccess_number_Req {
  order_no: string;
}

export interface Order_proccess_number_Res {
  order_status: string;
  total: number;
}

//---------------Order.ts---------------
export interface Order {
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  order_no: string;
  status: OrderStatus;
  requested_delivery_date: string;
  coupon_discount: string;
  order_details: [
    {
      product_id: string;
      qty: string;
    },
    {
      product_id: string;
      qty: string;
    }
  ];
}

//---------------Order-U-Req.ts---------------

export interface Order_U_Req {
  order_id: number;
  status: number;
}

//---------------Order-D-Req.ts---------------
export interface Order_D_Req {
  id: number;
}
