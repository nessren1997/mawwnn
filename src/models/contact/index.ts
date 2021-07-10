export interface ContactUs {
  full_name: string;
  email: string;
  subject: string;
  msg: string;
}

export interface ContactUs_Req {
  contact: ContactUs;
}
export interface ContactUs_Res {
  contact: ContactUs;
}
