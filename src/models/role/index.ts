//---------------Rule-Req.ts---------------
export interface Role_Req {}

//---------------Rule.ts---------------
export interface Role {
  id: number;
  name: string;
  permissions: { name: string }[];
}

//---------------Rule-I-Req.ts---------------

export interface Role_I_Req {
  rule: Role_Req;
}

//---------------Rule-U-Req.ts---------------

export interface Role_U_Req {
  id: number;
  rule: Role_Req;
}

//---------------Rule-D-Req.ts---------------
export interface Role_D_Req {
  id: number;
}

//---------------Rule-S-Req.ts---------------
export interface Role_S_Req {
  id: number;
}
