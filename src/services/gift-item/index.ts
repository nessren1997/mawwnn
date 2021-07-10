import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import { GiftItem, GiftItem_I_Req, GiftItem_S_Req, GiftItem_U_Req } from '../../models/gift-item';
import axios from 'axios';

class GiftItemService extends ApiService {
  constructor() {
    super({ baseURL: `/api/proxy/api` });
  }

  public Fetch = async (): Promise<ApiResult<GiftItem[]>> => this.get<GiftItem[]>(`/gift-items`);

  public Insert = async ({ giftItem }: GiftItem_I_Req): Promise<ApiResult<GiftItem>> =>
    this.post<GiftItem>(`/gift-items`, giftItem);

  public Update = async ({ giftItem, id }: GiftItem_U_Req): Promise<ApiResult<GiftItem>> =>
    this.put<GiftItem>(`/gift-items/${id}`, giftItem);

  public Delete = async ({ id }: any): Promise<ApiResult<GiftItem>> => this.delete<GiftItem>(`/gift-items/${id}`);

  public Confirm_Delete = async (id: number): Promise<ApiResult<GiftItem>> =>
    this.delete<GiftItem>(`/gift-items/${id}?bulk_delete=1`);

  public Show = async ({ id }: GiftItem_S_Req): Promise<ApiResult<GiftItem>> => this.get<GiftItem>(`/gift-items/${id}`);
}

export const giftItemService = new GiftItemService();
