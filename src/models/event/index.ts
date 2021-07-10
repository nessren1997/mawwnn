//---------------Event-Req.ts---------------
export interface Event_Req {
  'name:en': string;
  'name:ar': string;
  'description:en': string;
  'description:ar': string;
  start_date: string;
  end_date: string;
  event_images: string[];
}

//---------------Event.ts---------------
export interface Event {
  id: number;
  name: string;
  'name:en'?: string;
  'name:ar'?: string;
  'description:en'?: string;
  'description:ar'?: string;
  description: string;
  start_date: string;
  end_date: string;
  event_images: [{ id: number; path: string }];
}

//---------------Event-I-Req.ts---------------

export interface Event_I_Req {
  event: Event_Req;
}

//---------------Event-U-Req.ts---------------

export interface Event_U_Req {
  id: number;
  event: Event_Req;
}

//---------------Event-D-Req.ts---------------
export interface Event_D_Req {
  id: number;
}

//---------------Event-S-Req.ts---------------
export interface Event_S_Req {
  id: number;
}
