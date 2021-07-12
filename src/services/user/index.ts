import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import {
  User,
  User_D_Req,
  User_I_Req,
  User_S_Req,
  User_U_Req,
} from '../../models/user';

class UserService extends ApiService {
  constructor() {
    super({ baseURL: `/api/proxy/api` });
    // super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api/proxy/api` });

  }

  public Fetch = async (): Promise<ApiResult<User[]>> =>
    this.get<User[]>(`/users`);

  public Insert = async ({ user }: User_I_Req): Promise<ApiResult<User>> =>
    this.post<User>(`/users`, user);

  public Update = async ({ user, id }: User_U_Req): Promise<ApiResult<User>> =>
    this.put<User>(`/users/${id}`, user);

  public Delete = async ({ id }: User_D_Req): Promise<ApiResult<User>> =>
    this.delete<User>(`/users/${id}`);

  public Show = async ({ id }: User_S_Req): Promise<ApiResult<User>> =>
    this.get<User>(`/users/${id}`);
}

export const userService = new UserService();
