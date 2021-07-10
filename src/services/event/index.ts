import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

import {
  Event,
  Event_D_Req,
  Event_I_Req,
  Event_S_Req,
  Event_U_Req,
} from '../../models';

class EventService extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api/proxy/api` });
  }

  public Fetch = async (): Promise<ApiResult<Event[]>> =>
    this.get<Event[]>(`/events`);

  public Insert = async ({ event }: Event_I_Req): Promise<ApiResult<Event>> =>
    this.post<Event>(`/events`, event);

  public Update = async ({
    event,
    id,
  }: Event_U_Req): Promise<ApiResult<Event>> =>
    this.put<Event>(`/events/${id}/update`, event);

  public Delete = async ({ id }: Event_D_Req): Promise<ApiResult<Event>> =>
    this.delete<Event>(`/events/${id}`);

  public Show = async ({ id }: Event_S_Req): Promise<ApiResult<Event>> =>
    this.get<Event>(`/events/${id}/show`);

  public Last = async (): Promise<ApiResult<Event[]>> =>
    this.get<Event[]>(`/events/latest`);
}

export const eventService = new EventService();
