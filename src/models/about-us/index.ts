//---------------About-Req.ts---------------
export interface AboutUs_Req {
  'content:ar': string;
  'content:en': string;
}

//---------------About.ts---------------
export interface AboutUs {
  'content:ar'?: string;
  'content:en'?: string;
  content?: string;
}

//---------------About-I-Req.ts---------------

export interface AboutUs_I_Req {
  aboutUs: AboutUs_Req;
}

//---------------About-U-Req.ts---------------

export interface AboutUs_U_Req {
  id: number;
  aboutUs: AboutUs_Req;
}

//---------------About-D-Req.ts---------------
export interface AboutUs_D_Req {
  id: number;
}

//---------------About-S-Req.ts---------------
export interface AboutUs_S_Req {
  id: number;
}
