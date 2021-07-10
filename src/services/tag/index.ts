import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import {
  Tag,
  Tag_D_Req,
  Tag_I_Req,
  Tag_S_Req,
  Tag_U_Req,
} from '../../models/tag';

class TagService extends ApiService {
  constructor() {
    super({ baseURL: `/api/proxy/api` });
  }

  public Fetch = async (): Promise<ApiResult<Tag[]>> =>
    this.get<Tag[]>(`/tags`);

  public Insert = async ({ tag }: Tag_I_Req): Promise<ApiResult<Tag>> =>
    this.post<Tag>(`/tags`, tag);

  public Update = async ({ tag, id }: Tag_U_Req): Promise<ApiResult<Tag>> =>
    this.put<Tag>(`/tags/${id}`, tag);

  public Delete = async ({ id }: Tag_D_Req): Promise<ApiResult<Tag>> =>
    this.delete<Tag>(`/tags/${id}`);

  public Show = async ({ id }: Tag_S_Req): Promise<ApiResult<Tag>> =>
    this.get<Tag>(`/tags/${id}`);
}

export const tagService = new TagService();
