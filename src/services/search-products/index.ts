import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import { Search_Request_Model, Search_Result_Model } from '../../models';

class SearchProductsService extends ApiService {
  constructor() {
    super({ baseURL: `/api/proxy/api` });
  }

  public Get_Products = async (
    req?: Search_Request_Model
  ): Promise<ApiResult<Search_Result_Model[]>> =>
    this.post<Search_Result_Model[]>(`/product/search`, req);
}

export const searchProductsService = new SearchProductsService();
