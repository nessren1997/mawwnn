import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import {
  NewsLetter,
  NewsLetter_D_Req,
  NewsLetter_I_Req,
} from '../../models/news-letter';

class NewsLetterService extends ApiService {
  constructor() {
    super({ baseURL: `/api/proxy/api` });
  }

  public Fetch = async (): Promise<ApiResult<NewsLetter[]>> =>
    this.get<NewsLetter[]>(`/news-letters`);

  public Insert = async ({
    newsLetter,
  }: NewsLetter_I_Req): Promise<ApiResult<NewsLetter>> =>
    this.post<NewsLetter>(`/news-letter`, newsLetter);

  public Delete = async ({
    id,
  }: NewsLetter_D_Req): Promise<ApiResult<NewsLetter>> =>
    this.delete<NewsLetter>(`/news-letter/${id}`);
}

export const newsLetterService = new NewsLetterService();
