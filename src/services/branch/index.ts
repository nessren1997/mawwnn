import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import { Branch, Branch_D_Req, Branch_I_Req, Branch_S_Req, Branch_U_Req, Setting, Setting_U_Req } from '../../models';

class BranchService extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api/proxy/api` });
  }

  public Fetch = async (): Promise<ApiResult<Branch[]>> => this.get<Branch[]>(`/branches`);

  public Insert = async ({ branch }: Branch_I_Req): Promise<ApiResult<Branch>> => this.post<Branch>(`/branches`, branch);

  public Update = async ({ branch, id }: Branch_U_Req): Promise<ApiResult<Branch>> =>
    this.put<Branch>(`/branches/only-branch/${id}`, branch);

  public updatesettings = async (req: Setting_U_Req): Promise<ApiResult<Setting[]>> =>
    this.put<Setting[]>(`/settings/bulk-update/${req.branch_id}`, { settings: req.settings });

  public deletesetting = async (id: number): Promise<ApiResult<Setting>> => this.delete<Setting>(`/settings/bulk-update/${id}`);

  public Delete = async ({ id }: Branch_D_Req): Promise<ApiResult<Branch>> => this.delete<Branch>(`/branches/${id}`);

  public Show = async ({ id }: Branch_S_Req): Promise<ApiResult<Branch>> => this.get<Branch>(`/branches/${id}`);

  public GetImage = async (url: string): Promise<ApiResult<any>> => this.get<any>(url);
}

export const branchService = new BranchService();
