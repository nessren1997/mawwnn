//---------------CityAllowed-Req.ts---------------
export interface CityAllowed_Req {
  is_allowed_for_order: 0 | 1;
  id: number;
}

//---------------CityAllowed.ts---------------
export interface CityAllowed {
  id: number;
  name?: string;
  "name:ar"?: string;
  "name:en"?: string;
  is_allowed_for_order: 0 | 1;
}

//---------------CityAllowed-I-Req.ts---------------

export interface CityAllowed_I_Req {
  cityallowed: CityAllowed_Req;
}

//---------------CityAllowed-U-Req.ts---------------

export interface CityAllowed_U_Req {
  cityallowed: CityAllowed_Req;
}

//---------------CityAllowed-D-Req.ts---------------
export interface CityAllowed_D_Req {
  id: number;
}

//---------------CityAllowed-S-Req.ts---------------
export interface CityAllowed_S_Req {
  id: number;
}
