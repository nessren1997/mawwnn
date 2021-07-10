import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import { Gift, Gift_D_Req, Gift_I_Req, Gift_S_Req, Gift_U_Req, Links } from '../../models/gift';

class GiftService extends ApiService {
  constructor() {
    super({ baseURL: `/api/proxy/api` });
  }

  public Fetch = async (page: number): Promise<ApiResult<{ data: Gift[]; links: Links }>> =>
    this.get<{ data: Gift[]; links: Links }>(`/gifts?page=${page}`);

  public Insert = async ({ gift }: Gift_I_Req, qun: number): Promise<ApiResult<Gift>> => this.post<Gift>(`/gifts/${qun}`, gift);

  public Update = async ({ gift, id }: Gift_U_Req): Promise<ApiResult<Gift>> => this.put<Gift>(`/gifts/${id}`, gift);

  public Delete = async ({ id }: Gift_D_Req): Promise<ApiResult<Gift>> => this.delete<Gift>(`/gifts/${id}`);

  public Show = async ({ id }: Gift_S_Req): Promise<ApiResult<Gift>> => this.get<Gift>(`/gifts/show/${id}`);

  public ShowCode = async (req: String): Promise<ApiResult<React.ReactNode>> => this.get<React.ReactNode>(`/${req}`);
}

export const giftService = new GiftService();
