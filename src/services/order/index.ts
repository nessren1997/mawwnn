import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import Order_Site, { Order_proccess_number_Res, Order_proccess_number_Req, Order, Order_U_Req } from '../../models/order/index';

class OrderService extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api/proxy/api` });
  }

  public getAllOrder = async (): Promise<ApiResult<Order_Site[]>> => this.get<Order_Site[]>(`/user/orders`);

  public getOrderLimit = async (): Promise<ApiResult<{ min_checkout_limit: string }>> =>
    this.get<{ min_checkout_limit: string }>(`/orders/limit`);

  public updateOrderLimit = async (req: { min_checkout_limit: string }): Promise<ApiResult<{ min_checkout_limit: string }>> =>
    this.put<{ min_checkout_limit: string }>(`/orders/settings`, req);

  public Fetch = async (): Promise<ApiResult<Order[]>> => this.get<Order[]>(`/orders/all`);

  public Update = async (req: Order_U_Req): Promise<ApiResult<Order>> => this.put<Order>(`/orders`, req);

  public getOrderStatus = async ({ order_no }: Order_proccess_number_Req): Promise<ApiResult<Order_proccess_number_Res>> =>
    this.get<Order_proccess_number_Res>(`/orders/${order_no}/status`);
}

export const orderService = new OrderService();
