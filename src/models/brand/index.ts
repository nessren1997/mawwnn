//---------------Brand-Req.ts---------------
export interface Brand_Req {
  name: string;
  logo: string;
}

//---------------Brand.ts---------------
export interface Brand {
  id: number;
  name: string;
  logo: string;
}

//---------------Brand-I-Req.ts---------------

export interface Brand_I_Req {
  brand: Brand_Req;
}

//---------------Brand-U-Req.ts---------------

export interface Brand_U_Req {
  id: number;
  brand: Brand_Req;
}

//---------------Brand-D-Req.ts---------------
export interface Brand_D_Req {
  id: number;
}

//---------------Brand-S-Req.ts---------------
export interface Brand_S_Req {
  id: number;
}
