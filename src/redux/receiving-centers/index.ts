import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { receivingCenterService } from '../../services';
import {
  ReceivingCenter,
  ReceivingCenter_U_Req,
  ReceivingCenter_S_Req,
  ReceivingCenter_I_Req,
  ReceivingCenter_D_Req,
} from '../../models';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';

interface ReceivingCentersState {
  status: requestStatus;
  receiving_centers: ReceivingCenter[];
  receiving_center?: ReceivingCenter;
}

let initialState: ReceivingCentersState = {
  status: 'no-thing',
  receiving_centers: [],
};

const ReceivingCentersSlice = createSlice({
  name: 'ReceivingCenters',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    InsertReceivingCenter: ({ receiving_centers }, { payload }: PayloadAction<ReceivingCenter>) => {
      receiving_centers.push(payload);
    },
    ShowReceivingCenter: (state, { payload }: PayloadAction<ReceivingCenter>) => {
      state.receiving_center = payload;
    },
    UpdateReceivingCenter: (state, { payload }: PayloadAction<ReceivingCenter>) => {
      let ind = state.receiving_centers.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.receiving_centers[ind] = payload;
    },
    DeleteReceivingCenter: ({ receiving_centers }, { payload }: PayloadAction<number>) => {
      let index = receiving_centers.findIndex((el) => el.id === payload);
      if (index !== -1) receiving_centers.splice(index, 1);
    },
    FetchReceivingCenters: (state, { payload }: PayloadAction<ReceivingCenter[]>) => {
      state.receiving_centers = payload;
    },
  },
});

const {
  setStatus,
  InsertReceivingCenter,
  UpdateReceivingCenter,
  DeleteReceivingCenter,
  FetchReceivingCenters,
  ShowReceivingCenter,
} = ReceivingCentersSlice.actions;

export const InsertReceivingCenterAsync =
  (req: ReceivingCenter_I_Req): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus('loading'));
    const result = await receivingCenterService.Insert(req);
    if (isError(result)) {
      ApiErrorNotification(result);
      dispatch(setStatus('error'));
    } else {
      dispatch(InsertReceivingCenter(result.data));
      dispatch(setStatus('data'));
    }
  };

export const ShowReceivingCenterAsync =
  (req: ReceivingCenter_S_Req): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus('loading'));
    const result = await receivingCenterService.Show(req);
    if (isError(result)) {
      ApiErrorNotification(result);
      dispatch(setStatus('error'));
    } else {
      dispatch(ShowReceivingCenter(result.data));
      dispatch(setStatus('data'));
    }
  };

export const UpdateReceivingCenterAsync =
  (req: ReceivingCenter_U_Req): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus('loading'));
    const result = await receivingCenterService.Update(req);
    if (isError(result)) {
      ApiErrorNotification(result);
      dispatch(setStatus('error'));
    } else {
      dispatch(UpdateReceivingCenter(result.data));
      dispatch(setStatus('data'));
    }
  };

export const DeleteReceivingCenterAsync =
  (req: ReceivingCenter_D_Req): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus('loading'));
    const result = await receivingCenterService.Delete(req);
    if (isError(result)) {
      ApiErrorNotification(result);
      dispatch(setStatus('error'));
    } else {
      dispatch(DeleteReceivingCenter(req.id));
      dispatch(setStatus('data'));
    }
  };

export const FetchReceivingCentersAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await receivingCenterService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchReceivingCenters(result.data));
    dispatch(setStatus('data'));
  }
};

export default ReceivingCentersSlice.reducer;
