import { CityAllowed, CityAllowed_U_Req } from "../../models";
import ApiService from "../../utils/api/api-service";
import ApiResult from "../../utils/api/models/api-result";

class CityAllowedService extends ApiService {
  constructor() {
    super({ baseURL: `/api/proxy/api` });
    // super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api/proxy/api` });
  }

  public Fetch = async (): Promise<ApiResult<CityAllowed[]>> => this.get<CityAllowed[]>(`/get_allowed_cities`);

  public Update = async ({ cityallowed }: CityAllowed_U_Req): Promise<ApiResult<CityAllowed>> =>
    this.put<CityAllowed>(`/order-cities`, cityallowed);
}

export const cityAllowedService = new CityAllowedService();
