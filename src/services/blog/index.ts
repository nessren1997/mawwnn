import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import {
  Blog,
  Blog_D_Req,
  Blog_I_Req,
  Blog_S_Req,
  Blog_U_Req,
} from '../../models';

class BlogService extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api/proxy/api` });
  }

  public Fetch = async (): Promise<ApiResult<Blog[]>> =>
    this.get<Blog[]>(`/articles`);

  public Insert = async ({ blog }: Blog_I_Req): Promise<ApiResult<Blog>> =>
    this.post<Blog>(`/articles`, blog);

  public Update = async ({ blog, id }: Blog_U_Req): Promise<ApiResult<Blog>> =>
    this.put<Blog>(`/articles/${id}`, blog);

  public Delete = async ({ id }: Blog_D_Req): Promise<ApiResult<Blog>> =>
    this.delete<Blog>(`/articles/${id}`);

  public Show = async ({ id }: Blog_S_Req): Promise<ApiResult<Blog>> =>
    this.get<Blog>(`/articles/${id}`);
}

export const blogService = new BlogService();
