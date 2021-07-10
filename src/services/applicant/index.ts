import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import { Applicant, Applicant_D_Req, Applicant_I_Req } from '../../models';

class ApplicantService extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api/proxy/api` });
  }

  public Fetch = async (): Promise<ApiResult<Applicant[]>> =>
    this.get<Applicant[]>(`/careers`);

  public Insert = async (
    job_id: number,
    applicant: Applicant_I_Req
  ): Promise<ApiResult<Applicant>> =>
    this.post<Applicant>(`/jobs/${job_id}/careers`, applicant);

  public Delete = async ({
    id,
  }: Applicant_D_Req): Promise<ApiResult<Applicant>> =>
    this.delete<Applicant>(`/jobs/${id}`);
}

export const applicantService = new ApplicantService();
