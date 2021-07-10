import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import {
  Slider,
  Slider_D_Req,
  Slider_I_Req,
  Slider_S_Req,
  Slider_U_Req,
} from '../../models';

class SliderService extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api/proxy/api` });
  }

  public Fetch = async (): Promise<ApiResult<Slider[]>> =>
    this.get<Slider[]>(`/sliders`);

  public Insert = async ({
    slider,
  }: Slider_I_Req): Promise<ApiResult<Slider>> =>
    this.post<Slider>(`/sliders`, slider);

  public Update = async ({
    slider,
    id,
  }: Slider_U_Req): Promise<ApiResult<Slider>> =>
    this.put<Slider>(`/sliders/${id}/update`, slider);

  public Delete = async ({ id }: Slider_D_Req): Promise<ApiResult<Slider>> =>
    this.delete<Slider>(`/sliders/${id}`);

  public Show = async ({ id }: Slider_S_Req): Promise<ApiResult<Slider>> =>
    this.get<Slider>(`/sliders/${id}/show`);
}

export const sliderService = new SliderService();
