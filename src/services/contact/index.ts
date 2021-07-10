import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import { ContactUs_Req, ContactUs_Res } from '../../models';

class ContactService extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api/proxy/api` });
  }

  public Fetch = async (): Promise<ApiResult<ContactUs_Res[]>> =>
    this.get<ContactUs_Res[]>(`/contact-us`);

  public Insert = async (
    contact: ContactUs_Req
  ): Promise<ApiResult<ContactUs_Res>> =>
    this.post<ContactUs_Res>(`/contact-us`, contact);
}

export const contactService = new ContactService();
