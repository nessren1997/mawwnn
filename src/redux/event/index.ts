import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { eventService } from '../../services';
import {
  Event,
  Event_U_Req,
  Event_S_Req,
  Event_I_Req,
  Event_D_Req,
} from '../../models';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';

interface EventsState {
  status: requestStatus;
  events: Event[];
  event?: Event;
}

let initialState: EventsState = {
  status: 'no-thing',
  events: [],
};

const EventsSlice = createSlice({
  name: 'Events',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    InsertEvent: ({ events }, { payload }: PayloadAction<Event>) => {
      events.push(payload);
    },
    ShowEvent: (state, { payload }: PayloadAction<Event>) => {
      state.event = payload;
    },
    UpdateEvent: (state, { payload }: PayloadAction<Event>) => {
      let ind = state.events.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.events[ind] = payload;
    },
    DeleteEvent: ({ events }, { payload }: PayloadAction<number>) => {
      let index = events.findIndex((el) => el.id === payload);
      if (index !== -1) events.splice(index, 1);
    },
    FetchEvents: (state, { payload }: PayloadAction<Event[]>) => {
      state.events = payload;
    },
  },
});

const {
  setStatus,
  InsertEvent,
  UpdateEvent,
  DeleteEvent,
  FetchEvents,
  ShowEvent,
} = EventsSlice.actions;

export const InsertEventAsync = (req: Event_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await eventService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertEvent(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowEventAsync = (req: Event_S_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await eventService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowEvent(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateEventAsync = (req: Event_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await eventService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateEvent(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteEventAsync = (req: Event_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await eventService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteEvent(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchEventsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await eventService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchEvents(result.data));
    dispatch(setStatus('data'));
  }
};

export const selectEvents = (state: RootState) => state.Events.events;
export const selectEvent = (state: RootState) => state.Events.event;
export const selectEventsStatus = (state: RootState) => state.Events.status;

export default EventsSlice.reducer;
