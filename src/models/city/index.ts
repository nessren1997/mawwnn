//---------------City-Req.ts---------------
export interface City_Req {
  'name:ar'?: string;
  'name:en'?: string;
}

//---------------City.ts---------------
export interface City {
  id: number;
  name?: string;
  'name:ar'?: string;
  'name:en'?: string;
  cities: {id :number}[];
  is_allowed_for_order: 1 | 0
}

//---------------City-I-Req.ts---------------

export interface City_I_Req {
  city: City_Req;
}

//---------------City-U-Req.ts---------------

export interface City_U_Req {
  id: number;
  city: City_Req;
}

//---------------City-D-Req.ts---------------
export interface City_D_Req {
  id: number;
}

//---------------City-S-Req.ts---------------
export interface City_S_Req {
  id: number;
}
