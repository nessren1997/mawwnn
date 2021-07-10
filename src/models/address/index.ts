//---------------Address-Req.ts---------------
export interface Address_Req {
  address_text: string;
}

//---------------Address.ts---------------
export interface Address {
  id: number;
  address_text: string;
}

//---------------Address-I-Req.ts---------------

export interface Address_I_Req {
  address: Address_Req;
}

//---------------Address-U-Req.ts---------------

export interface Address_U_Req {
  id: number;
  address: Address_Req;
}

//---------------Address-D-Req.ts---------------
export interface Address_D_Req {
  id: number;
}

//---------------Address-S-Req.ts---------------
export interface Address_S_Req {
  id: number;
}
