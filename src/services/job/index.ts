import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import { Job, Job_D_Req, Job_I_Req, Job_S_Req, Job_U_Req } from '../../models';

class JobService extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api/proxy/api` });
  }

  public Fetch = async (): Promise<ApiResult<Job[]>> =>
    this.get<Job[]>(`/jobs`);

  public Insert = async ({ job }: Job_I_Req): Promise<ApiResult<Job>> =>
    this.post<Job>(`/jobs`, job);

  public Update = async ({ job, id }: Job_U_Req): Promise<ApiResult<Job>> =>
    this.put<Job>(`/jobs/${id}`, job);

  public Delete = async ({ id }: Job_D_Req): Promise<ApiResult<Job>> =>
    this.delete<Job>(`/jobs/${id}`);

  public Show = async ({ id }: Job_S_Req): Promise<ApiResult<Job>> =>
    this.get<Job>(`/jobs/${id}`);
}

export const jobService = new JobService();
