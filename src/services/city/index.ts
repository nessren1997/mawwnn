import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import {
  City,
  City_D_Req,
  City_I_Req,
  City_S_Req,
  City_U_Req,
} from '../../models/city';

class CityService extends ApiService {
  constructor() {
    super({ baseURL: `/api/proxy/api` });
    // super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api/proxy/api` });


  }

  public Fetch = async (): Promise<ApiResult<City[]>> =>
    this.get<City[]>(`/cities`);

  public Insert = async ({ city }: City_I_Req): Promise<ApiResult<City>> =>
    this.post<City>(`/cities`, city);

  public Update = async ({ city, id }: City_U_Req): Promise<ApiResult<City>> =>
    this.put<City>(`/cities/${id}`, city);

  public Delete = async ({ id }: City_D_Req): Promise<ApiResult<City>> =>
    this.delete<City>(`/cities/${id}`);

  public Show = async ({ id }: City_S_Req): Promise<ApiResult<City>> =>
    this.get<City>(`/cities/${id}`);
}

export const cityService = new CityService();
