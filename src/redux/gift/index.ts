import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { giftService } from '../../services/gift';
import { Gift, Gift_U_Req, Gift_S_Req, Gift_I_Req, Gift_D_Req, Links } from '../../models/gift';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';

interface GiftsState {
  status: requestStatus;
  gifts: { data: Gift[]; links?: Links };
  giftsPerPage: { data: Gift[]; links?: Links };
  gift?: Gift;
  reachedMax: boolean;
}

let initialState: GiftsState = {
  status: 'no-thing',
  gifts: { data: [] },
  giftsPerPage: { data: [] },
  reachedMax: false,
};

const GiftsSlice = createSlice({
  name: 'Gifts',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    InsertGift: ({ gifts }, { payload }: PayloadAction<Gift>) => {
      gifts.data.push(payload);
    },
    ShowGift: (state, { payload }: PayloadAction<Gift>) => {
      state.gift = payload;
    },
    UpdateGift: (state, { payload }: PayloadAction<Gift>) => {
      let ind = state.gifts.data.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.gifts.data[ind] = payload;
    },
    DeleteGift: ({ gifts }, { payload }: PayloadAction<number>) => {
      let index = gifts.data.findIndex((el) => el.id === payload);
      if (index !== -1) gifts.data.splice(index, 1);
    },
    FetchGifts: (state, { payload }: PayloadAction<{ data: Gift[]; links: Links }>) => {
      state.gifts.data = payload.data;
      state.gifts.links = payload.links;
    },
    FetchPaginatedGifts: (state, { payload }: PayloadAction<{ data: Gift[]; links: Links }>) => {
      state.gifts.data = [...state.gifts.data, ...payload.data];
      state.reachedMax = (payload.data as Gift[]).length < 50;
      state.gifts.links = payload.links;
    },
    FetchGiftsPerPage: (state, { payload }: PayloadAction<{ data: Gift[]; links: Links }>) => {
      state.giftsPerPage.data = payload.data.sort((a, b) => a.id - b.id);
      state.giftsPerPage.links = payload.links;
    },
  },
});

const {
  setStatus,
  InsertGift,
  UpdateGift,
  DeleteGift,
  FetchGifts,
  ShowGift,
  FetchPaginatedGifts,
  FetchGiftsPerPage,
} = GiftsSlice.actions;

export const InsertGiftAsync = (req: Gift_I_Req, qun: number): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await giftService.Insert(req, qun);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertGift(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowGiftAsync = (req: Gift_S_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await giftService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowGift(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateGiftAsync = (req: Gift_U_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await giftService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateGift(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteGiftAsync = (req: Gift_D_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await giftService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteGift(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchGiftsAsync = (page: number): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await giftService.Fetch(page);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchGifts(result.data));
    dispatch(setStatus('data'));
  }
};

export const FetchPaginatedGiftsAsync = (page: number): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await giftService.Fetch(page);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchPaginatedGifts(result.data));
    dispatch(setStatus('data'));
  }
};

export const FetchGiftsPerPageAsync = (page: number): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await giftService.Fetch(page);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchGiftsPerPage(result.data));
    dispatch(setStatus('data'));
  }
};

export const selectGift = (state: RootState) => state.Gifts;

export default GiftsSlice.reducer;
