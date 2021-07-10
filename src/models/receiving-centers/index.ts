//---------------ReceivingCenter-Req.ts---------------
export interface ReceivingCenter_Req {
  'name:ar': string;
  'name:en': string;
  'address:ar': string;
  'address:en': string;
  'working_time:en'?: string;
  'working_time:ar'?: string;
  'description:en'?: string;
  'description:ar'?: string;
  city_id: number;
}

//---------------ReceivingCenter.ts---------------
export interface ReceivingCenter {
  id: number;
  name?: string;
  'name:ar'?: string;
  'name:en'?: string;
  address?: string;
  'address:ar'?: string;
  'address:en'?: string;
  working_time?: string;
  'working_time:en'?: string;
  'working_time:ar'?: string;
  description?: string;
  'description:en'?: string;
  'description:ar'?: string;
  city: number;
}

//---------------ReceivingCenter-I-Req.ts---------------

export interface ReceivingCenter_I_Req {
  receiving_center: ReceivingCenter_Req;
}

//---------------ReceivingCenter-U-Req.ts---------------

export interface ReceivingCenter_U_Req {
  id: number;
  receiving_center: ReceivingCenter_Req;
}

//---------------ReceivingCenter-D-Req.ts---------------
export interface ReceivingCenter_D_Req {
  id: number;
}

//---------------ReceivingCenter-S-Req.ts---------------
export interface ReceivingCenter_S_Req {
  id: number;
}
