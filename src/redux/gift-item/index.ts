import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import isError from '../../utils/helpers/is-error';
import { giftItemService } from '../../services/gift-item';
import requestStatus from '../../constants/enums/request-status';
import ApiErrorNotification from '../../utils/ui/notificationService';
import { GiftItem, GiftItem_U_Req, GiftItem_S_Req, GiftItem_I_Req, GiftItem_D_Req } from '../../models/gift-item';
import { useSelector } from 'react-redux';
import isResponseError from '../../utils/helpers/is-response-error';

interface GiftItemsState {
  status: requestStatus;
  giftItems: GiftItem[];
  giftItem?: GiftItem;
  error_message?: String;
}

let initialState: GiftItemsState = {
  status: 'no-thing',
  giftItems: [],
};

const GiftItemsSlice = createSlice({
  name: 'GiftItems',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    InsertGiftItem: ({ giftItems }, { payload }: PayloadAction<GiftItem>) => {
      giftItems.push(payload);
    },
    ShowGiftItem: (state, { payload }: PayloadAction<GiftItem>) => {
      state.giftItem = payload;
    },
    UpdateGiftItem: (state, { payload }: PayloadAction<GiftItem>) => {
      let ind = state.giftItems.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.giftItems[ind] = payload;
    },
    DeleteGiftItem: ({ giftItems }, { payload }: PayloadAction<number | undefined>) => {
      let index = giftItems.findIndex((el) => el.id === payload);
      if (index !== -1) giftItems.splice(index, 1);
    },
    FetchGiftItems: (state, { payload }: PayloadAction<GiftItem[]>) => {
      state.giftItems = payload;
    },
    //check if giftItem.image !== prev giftItem.image
    //so if they are same u should send req without image key
    filterReq: (state, { payload }: PayloadAction<GiftItem_U_Req>) => {
      state.giftItem = state.giftItems.find((el) => el.id === payload.id);
      if (state.giftItem?.image === payload.giftItem.image) {
        state.giftItem = undefined;
      }
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.error_message = payload;
    },
  },
});

const {
  setStatus,
  InsertGiftItem,
  UpdateGiftItem,
  DeleteGiftItem,
  FetchGiftItems,
  ShowGiftItem,
  setError,
} = GiftItemsSlice.actions;

let last_id: number | undefined = undefined;

export const InsertGiftItemAsync = (req: GiftItem_I_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await giftItemService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertGiftItem(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowGiftItemAsync = (req: GiftItem_S_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await giftItemService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowGiftItem(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateGiftItemAsync = (req: GiftItem_U_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await giftItemService.Update(req);

  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateGiftItem(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteGiftItemAsync = (req?: GiftItem_D_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));

  if (last_id) {
    const result = await giftItemService.Confirm_Delete(last_id);
    if (isError(result)) {
      ApiErrorNotification(result);
      dispatch(setStatus('error'));
    } else {
      dispatch(DeleteGiftItem(last_id));
      dispatch(setStatus('data'));
      last_id = undefined;
    }
  } else {
    const result = await giftItemService.Delete(req!);
    if (isError(result)) {
      dispatch(setStatus('error'));
      if ((result as any).message) {
        dispatch(setError('already gifts tied'));
        last_id = req?.id;
      }
    } else {
      last_id = undefined;
      dispatch(DeleteGiftItem(req?.id));
      dispatch(setStatus('data'));
    }
  }
};

export const FetchGiftItemsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await giftItemService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchGiftItems(result.data));
    dispatch(setStatus('data'));
  }
};

export const selectGiftItem = (state: RootState) => state.GiftItems;

export default GiftItemsSlice.reducer;
