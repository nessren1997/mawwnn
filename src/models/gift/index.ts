import { GiftItem } from '../gift-item';
import { Product } from '../product';

//---------------Gift-Req.ts---------------
export interface Gift_Req {
  gift_item_id: number;
  expires_at: string;
}

//---------------Gift.ts---------------
export interface Gift {
  id: number;
  image_path: string;
  product: Product;
  used: number;
  token: string;
  created_at: Date;
  gift_item: GiftItem;
}

export interface Links {
  first: string;
  last: string;
  prev: string;
  next: string;
}

//---------------Gift-I-Req.ts---------------

export interface Gift_I_Req {
  gift: Gift_Req;
}

//---------------Gift-U-Req.ts---------------

export interface Gift_U_Req {
  id: number;
  gift: Gift_Req;
}

//---------------Gift-D-Req.ts---------------
export interface Gift_D_Req {
  id: number;
}

//---------------Gift-S-Req.ts---------------
export interface Gift_S_Req {
  id: number;
}
