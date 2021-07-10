//---------------Applicant-Req.ts---------------
export interface Applicant_Req {
  first_name: string;
  last_name: string;
  description: string;
  email: string;
  cv: File;
}

//---------------Applicant.ts---------------
export interface Applicant {
  id: number;
  first_name: string;
  last_name: string;
  description: string;
  email: string;
  cv_path: string;
}

//---------------Applicant-I-Req.ts---------------

export interface Applicant_I_Req {
  applicant: Applicant_Req;
}

//---------------Applicant-D-Req.ts---------------
export interface Applicant_D_Req {
  id: number;
}
