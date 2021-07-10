import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import { Winner, WinnerStatus_U_Req } from '../../models';

interface Deliver {
  id: number;
  image_path: string;
  used: '0' | '1';
  token: string;
  expires_at: string;
  created_at: string;
  scanned_at: null;
  scan_count: string;
  status: 1;
}

class WinnerService extends ApiService {
  constructor() {
    super({ baseURL: `/api/proxy/api` });
  }

  public Fetch = async (): Promise<ApiResult<Winner[]>> => this.get<Winner[]>(`/winners`);

  public Delivery = async (req: WinnerStatus_U_Req): Promise<ApiResult<Winner>> =>
    this.put<Winner>(`/update-gift-delivery-status/${req.gift_id}`, { status: req.status, delivery_gdc_id: req.center });
}

export const winnerService = new WinnerService();
