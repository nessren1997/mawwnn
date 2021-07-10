import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import { Email, Email_I_Req, Email_D_Req } from '../../models';

class EmailService extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api/proxy/api` });
  }

  public Insert = async ({ email }: Email_I_Req): Promise<ApiResult<Email>> =>
    this.post<Email>(`/news-letter`, { email: email });

  public Delete = async ({ id }: Email_D_Req): Promise<ApiResult<Email>> =>
    this.delete<Email>(`/news-letter/${id}`);
}
export const emailService = new EmailService();
