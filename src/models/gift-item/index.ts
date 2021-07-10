//---------------GiftItem-Req.ts---------------
export interface GiftItem_Req {
  'name:en': string;
  'name:ar': string;
  'description:en': string;
  'description:ar': string;
  image?: string;
}

//---------------GiftItem.ts---------------
export interface GiftItem {
  id: number;
  image: string;
  'name:en': string;
  'description:en': string;
  'name:ar': string;
  'description:ar': string;
}

//---------------GiftItem-I-Req.ts---------------

export interface GiftItem_I_Req {
  giftItem: GiftItem_Req;
}

//---------------GiftItem-U-Req.ts---------------

export interface GiftItem_U_Req {
  id: number;
  giftItem: GiftItem_Req;
}

//---------------GiftItem-D-Req.ts---------------
export interface GiftItem_D_Req {
  id: number;
}

//---------------GiftItem-S-Req.ts---------------
export interface GiftItem_S_Req {
  id: number;
}
