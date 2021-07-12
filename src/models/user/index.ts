//---------------User-Req.ts---------------
export interface User_Req {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  city_id: number;

}

//---------------User.ts---------------
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  city_id: number;
  missing_params:boolean;
  facebook: boolean;

  permissions: { name: string }[];

  email_verified_at?: string;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;

  roles: {
    id: number;
    name: string;
    permissions: { name: string }[];
  }[];

  cities: {id :number}[];

}

//---------------User-I-Req.ts---------------

export interface User_I_Req {
  user: User_Req;
}

//---------------User-U-Req.ts---------------

export interface User_U_Req {
  id: number;
  user: User_Req;
}

//---------------User-D-Req.ts---------------
export interface User_D_Req {
  id: number;
}

//---------------User-S-Req.ts---------------
export interface User_S_Req {
  id: number;
}
