import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import { SearchCategory } from '../../models';

class SearchCategoriesService extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api/proxy/api` });
  }

  public Fetch = async (): Promise<ApiResult<SearchCategory[]>> =>
    this.get<SearchCategory[]>(`/categories`);
}

export const searchCategoriesService = new SearchCategoriesService();
