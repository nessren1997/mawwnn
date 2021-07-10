//---------------Branch-Req.ts---------------
export interface Branch_Req {
  coordinates: string;
  city_id: number;
  'region:ar': string;
  'region:en': string;
  settings: { key: string; value: string; icon: string }[];
}

export interface Setting {
  id: number;
  key: string;
  value: string;
  'key:ar'?: string;
  'value:ar'?: string;
  'key:en'?: string;
  'value:en'?: string;
  icon: string;
}

//---------------Branch.ts---------------
export interface Branch {
  id: number;
  coordinates: { lan: string; lon: string };
  city: {
    id: number;
    name: string;
  };
  region?: string;
  'region:ar'?: string;
  'region:en'?: string;
  settings: Setting[];
}

//---------------Branch-I-Req.ts---------------

export interface Branch_I_Req {
  branch: Branch_Req;
}

//---------------Branch-U-Req.ts---------------

export interface Branch_U_Req {
  id: number;
  branch: Branch_Req;
}

export interface Setting_U_Req {
  branch_id: number;
  settings: Setting[];
}

//---------------Branch-D-Req.ts---------------
export interface Branch_D_Req {
  id: number;
}

//---------------Branch-S-Req.ts---------------
export interface Branch_S_Req {
  id: number;
}
