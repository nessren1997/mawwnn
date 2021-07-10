import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import { Address, Address_D_Req, Address_I_Req, Address_S_Req, Address_U_Req } from '../../models';

class AddressService extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api/proxy/api` });
  }

  public Fetch = async (): Promise<ApiResult<Address[]>> => this.get<Address[]>(`/addresses`);

  public Insert = async ({ address }: Address_I_Req): Promise<ApiResult<Address>> => this.post<Address>(`/addresses`, address);

  public Update = async ({ address, id }: Address_U_Req): Promise<ApiResult<Address>> =>
    this.put<Address>(`/addresses/${id}`, address);

  public Delete = async ({ id }: Address_D_Req): Promise<ApiResult<Address>> => this.delete<Address>(`/addresses/${id}`);

  public Show = async ({ id }: Address_S_Req): Promise<ApiResult<Address>> => this.get<Address>(`/addresses/${id}`);
}

export const addressService = new AddressService();
