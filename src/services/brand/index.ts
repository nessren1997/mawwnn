import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import {
  Brand,
  Brand_D_Req,
  Brand_I_Req,
  Brand_S_Req,
  Brand_U_Req,
} from '../../models';

class BrandService extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api/proxy/api` });
  }

  public Fetch = async (): Promise<ApiResult<Brand[]>> =>
    this.get<Brand[]>(`/brands`);

  public Insert = async ({ brand }: Brand_I_Req): Promise<ApiResult<Brand>> =>
    this.post<Brand>(`/brands`, brand);

  public Update = async ({
    brand,
    id,
  }: Brand_U_Req): Promise<ApiResult<Brand>> =>
    this.put<Brand>(`/brands/${id}`, brand);

  public Delete = async ({ id }: Brand_D_Req): Promise<ApiResult<Brand>> =>
    this.delete<Brand>(`/brands/${id}`);

  public Show = async ({ id }: Brand_S_Req): Promise<ApiResult<Brand>> =>
    this.get<Brand>(`/brands/${id}`);
}

export const brandService = new BrandService();
