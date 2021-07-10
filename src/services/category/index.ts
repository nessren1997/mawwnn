import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import { Category, Category_D_Req, Category_I_Req, Category_S_Req, Category_U_Req } from '../../models';

class CategoryService extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api/proxy/api` });
  }

  public Fetch = async (): Promise<ApiResult<Category[]>> => this.get<Category[]>(`/categories`);

  public Insert = async ({ category }: Category_I_Req): Promise<ApiResult<Category>> =>
    this.post<Category>(`/categories`, category);

  public Update = async ({ category, id }: Category_U_Req): Promise<ApiResult<Category>> =>
    this.post<Category>(`/categories/${id}/update`, category);

  public Delete = async ({ id }: Category_D_Req): Promise<ApiResult<Category>> => this.delete<Category>(`/categories/${id}`);

  public Show = async ({ id }: Category_S_Req): Promise<ApiResult<Category>> => this.get<Category>(`/categories/${id}`);
}

export const categoryService = new CategoryService();
