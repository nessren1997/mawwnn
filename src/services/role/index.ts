import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import {
  Role,
  Role_D_Req,
  Role_I_Req,
  Role_S_Req,
  Role_U_Req,
} from '../../models/role';

class RoleService extends ApiService {
  constructor() {
    super({ baseURL: `/api/proxy/api` });
    // super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api/proxy/api` });

  }

  public Fetch = async (): Promise<ApiResult<Role[]>> =>
    this.get<Role[]>(`/roles`);

  public Insert = async ({ rule }: Role_I_Req): Promise<ApiResult<Role>> =>
    this.post<Role>(`/roles`, rule);

  public Update = async ({ rule, id }: Role_U_Req): Promise<ApiResult<Role>> =>
    this.put<Role>(`/roles/${id}`, rule);

  public Delete = async ({ id }: Role_D_Req): Promise<ApiResult<Role>> =>
    this.delete<Role>(`/roles/${id}`);

  public Show = async ({ id }: Role_S_Req): Promise<ApiResult<Role>> =>
    this.get<Role>(`/roles/${id}`);
}

export const roleService = new RoleService();
