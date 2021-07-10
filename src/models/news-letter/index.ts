//---------------NewsLetter-Req.ts---------------
export interface NewsLetter_Req {
  email: string;
}

//---------------NewsLetter.ts---------------
export interface NewsLetter {
  id: number;
  email: string;
}

//---------------NewsLetter-I-Req.ts---------------

export interface NewsLetter_I_Req {
  newsLetter: NewsLetter_Req;
}

//---------------NewsLetter-D-Req.ts---------------
export interface NewsLetter_D_Req {
  id: number;
}
