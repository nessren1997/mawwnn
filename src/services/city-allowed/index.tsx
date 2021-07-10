import { CityAllowed, CityAllowed_U_Req } from "../../models";
import ApiService from "../../utils/api/api-service";
import ApiResult from "../../utils/api/models/api-result";

class CityAllowedService extends ApiService {
  constructor() {
    super({ baseURL: `/api/proxy/api` });
  }

  public Fetch = async (): Promise<ApiResult<CityAllowed[]>> => this.get<CityAllowed[]>(`/get_allowed_cities`);

  public Update = async ({ cityallowed, id }: CityAllowed_U_Req): Promise<ApiResult<CityAllowed>> =>
    this.put<CityAllowed>(`/allow_cities/${id}`, cityallowed);
}

export const cityAllowedService = new CityAllowedService();
