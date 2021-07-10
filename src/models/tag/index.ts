//---------------Tag-Req.ts---------------
export interface Tag_Req {
  name: string;
}

//---------------Tag.ts---------------
export interface Tag {
  id: number;
  name: string;
}

//---------------Tag-I-Req.ts---------------

export interface Tag_I_Req {
  tag: Tag_Req;
}

//---------------Tag-U-Req.ts---------------

export interface Tag_U_Req {
  id: number;
  tag: Tag_Req;
}

//---------------Tag-D-Req.ts---------------
export interface Tag_D_Req {
  id: number;
}

//---------------Tag-S-Req.ts---------------
export interface Tag_S_Req {
  id: number;
}
