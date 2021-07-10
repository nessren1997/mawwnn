import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';
import { BuyersStatistic, ProductsStatistic } from '../../models/statistic';

class StatisticService extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api/proxy/api/report/` });
  }
  public FetchProducts = async (): Promise<ApiResult<ProductsStatistic[]>> => this.get<ProductsStatistic[]>(`items-per-month`);

  public FetchBuyers = async (): Promise<ApiResult<BuyersStatistic[]>> => this.get<BuyersStatistic[]>(`most-active-buyers`);
}

export const statisticService = new StatisticService();
