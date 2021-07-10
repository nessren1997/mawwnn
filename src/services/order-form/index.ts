import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import { Unregistered_User_Model, Registered_User_Model, order_response, verification_code_response } from '../../models';

class OrderService extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api/proxy/api` });
  }

  public Post_Reigstered_User_Order = async (order: Registered_User_Model): Promise<ApiResult<order_response>> =>
    this.post<order_response>(`/orders`, order);

  public Post_Unreigstered_User_Order = async (order: Unregistered_User_Model): Promise<ApiResult<order_response>> =>
    this.post<order_response>(`/orders`, order);

  public Post_Fetch_Verification_Code = async (code: string, order_id: string): Promise<ApiResult<verification_code_response>> =>
    this.post<verification_code_response>(`/verify-order/${order_id}`, {
      otp: code,
      order_id,
    });

  public Fetch_ReSendVerification_Code = async (id: string): Promise<ApiResult<verification_code_response>> =>
    this.get<verification_code_response>(`/orders/resend/otp/${id}`);
}

export const orderService = new OrderService();
