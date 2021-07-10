//---------------Job-Req.ts---------------
export interface Job_Req {
  image_path?: string;
  'description:ar': string;
  'description:en': string;
  'title:ar': string;
  'title:en': string;
}

//---------------Job.ts---------------
export interface Job {
  id: number;
  image_path: string;
  description: string;
  title: string;
}

//---------------Job-I-Req.ts---------------

export interface Job_I_Req {
  job: Job_Req;
}

//---------------Job-U-Req.ts---------------

export interface Job_U_Req {
  id: number;
  job: Job_Req;
}

//---------------Job-D-Req.ts---------------
export interface Job_D_Req {
  id: number;
}

//---------------Job-S-Req.ts---------------
export interface Job_S_Req {
  id: number;
}
