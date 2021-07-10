import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import { OrderStatus, OrderStatus_S_Req } from '../../models';

class OrderStatusService extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api/proxy/api` });
  }

  public Show = async ({
    id,
  }: OrderStatus_S_Req): Promise<ApiResult<OrderStatus>> =>
    this.get<OrderStatus>(`/orders/${id}/status`);
}

export const orderStatusService = new OrderStatusService();
