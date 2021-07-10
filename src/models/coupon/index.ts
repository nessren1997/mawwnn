// ------------------------------Coupon Post Request------------------------------
export interface Coupon_Site {
  coupon: string;
}
// ------------------------------Coupon Post Request------------------------------
export interface Coupon_P_REQ {
  coupon: string;
}

//---------------Coupon-Req.ts---------------
export interface Coupon_Req {
  token: string;
  amount: number;
  expiry_date: string;
}

//---------------Coupon.ts---------------
export interface Coupon {
  id: number;
  token: string;
  amount: number;
  expiry_date: string;
}

//---------------Coupon-I-Req.ts---------------

export interface Coupon_I_Req {
  coupon: Coupon_Req;
}

//---------------Coupon-U-Req.ts---------------

export interface Coupon_U_Req {
  id: number;
  coupon: Coupon_Req;
}

//---------------Coupon-D-Req.ts---------------
export interface Coupon_D_Req {
  id: number;
}

//---------------Coupon-S-Req.ts---------------
export interface Coupon_S_Req {
  id: number;
}
