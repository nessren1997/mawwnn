import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import { AboutUs, AboutUs_U_Req } from '../../models';

class AboutService extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api/proxy/api` });
  }

  public Fetch = async (): Promise<ApiResult<AboutUs>> =>
    this.get<AboutUs>(`/about-us`);

  public Update = async ({
    aboutUs,
  }: AboutUs_U_Req): Promise<ApiResult<AboutUs>> =>
    this.put<AboutUs>(`/about-us`, aboutUs);
}

export const aboutService = new AboutService();
