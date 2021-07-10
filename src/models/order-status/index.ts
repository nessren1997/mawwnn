import { OrderStatus as status } from '../../models/order/enum';
//---------------OrderStatus-Req.ts---------------
export interface OrderStatus_Req {}

//---------------OrderStatus.ts---------------
export interface OrderStatus {
  order_status: status;
  total: string;
}

//---------------OrderStatus-I-Req.ts---------------

export interface OrderStatus_I_Req {
  OrderStatus: OrderStatus_Req;
}

//---------------OrderStatus-U-Req.ts---------------

export interface OrderStatus_U_Req {
  id: number;
}

//---------------OrderStatus-D-Req.ts---------------
export interface OrderStatus_D_Req {
  id: number;
}

//---------------OrderStatus-S-Req.ts---------------
export interface OrderStatus_S_Req {
  id: string;
}
