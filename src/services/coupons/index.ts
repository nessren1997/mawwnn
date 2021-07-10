import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import {
  Coupon,
  Coupon_D_Req,
  Coupon_I_Req,
  Coupon_Site,
  Coupon_S_Req,
  Coupon_U_Req,
} from '../../models/coupon';

class CouponService extends ApiService {
  constructor() {
    super({ baseURL: `/api/proxy/api` });
  }

  public Fetch = async (): Promise<ApiResult<Coupon[]>> =>
    this.get<Coupon[]>(`/coupons`);

  public Insert = async ({
    coupon,
  }: Coupon_I_Req): Promise<ApiResult<Coupon>> =>
    this.post<Coupon>(`/coupons`, coupon);

  public Update = async ({
    coupon,
    id,
  }: Coupon_U_Req): Promise<ApiResult<Coupon>> =>
    this.put<Coupon>(`/coupons/${id}`, coupon);

  public Delete = async ({ id }: Coupon_D_Req): Promise<ApiResult<Coupon>> =>
    this.delete<Coupon>(`/coupons/${id}`);

  public Show = async ({ id }: Coupon_S_Req): Promise<ApiResult<Coupon>> =>
    this.get<Coupon>(`/coupons/${id}`);

  public Post = async (Coupon: Coupon_Site): Promise<ApiResult<Event>> =>
    this.post<Event>(`/validate-coupon`, Coupon);
}

export const couponService = new CouponService();
