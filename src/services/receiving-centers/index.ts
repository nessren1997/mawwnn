import {
  ReceivingCenter,
  ReceivingCenter_I_Req,
  ReceivingCenter_U_Req,
  ReceivingCenter_D_Req,
  ReceivingCenter_S_Req,
} from '../../models';
import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

class ReceivingCenterService extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api/proxy/api` });
  }

  public Fetch = async (): Promise<ApiResult<ReceivingCenter[]>> => this.get<ReceivingCenter[]>(`/gift-delivery-centers`);

  public Insert = async ({ receiving_center }: ReceivingCenter_I_Req): Promise<ApiResult<ReceivingCenter>> =>
    this.post<ReceivingCenter>(`/gift-delivery-centers`, receiving_center);

  public Update = async ({ receiving_center, id }: ReceivingCenter_U_Req): Promise<ApiResult<ReceivingCenter>> =>
    this.put<ReceivingCenter>(`/gift-delivery-centers/${id}`, receiving_center);

  public Delete = async ({ id }: ReceivingCenter_D_Req): Promise<ApiResult<ReceivingCenter>> =>
    this.delete<ReceivingCenter>(`/gift-delivery-centers/${id}`);

  public Show = async ({ id }: ReceivingCenter_S_Req): Promise<ApiResult<ReceivingCenter>> =>
    this.get<ReceivingCenter>(`/gift-delivery-centers/${id}`);
}

export const receivingCenterService = new ReceivingCenterService();
