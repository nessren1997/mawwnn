import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Winner, WinnerStatus_U_Req } from '../../models';
import { AppThunk, RootState } from '../store';
import { winnerService } from '../../services';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';
import ApiErrorNotification from '../../utils/ui/notificationService';

interface WinnersState {
  status: requestStatus;
  winners: Winner[];
}

let initialState: WinnersState = {
  status: 'no-thing',
  winners: [],
};

const WinnersSlice = createSlice({
  name: 'Winners',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    FetchWinners: (state, { payload }: PayloadAction<Winner[]>) => {
      state.winners = payload;
    },
    UpdateWinnerStatus: (state, { payload }: PayloadAction<WinnerStatus_U_Req>) => {
      let ind = state.winners.findIndex((el) => el.id === payload.gift_id);
      state.winners[ind].status = payload.status;
    },
  },
});

const { setStatus, FetchWinners, UpdateWinnerStatus } = WinnersSlice.actions;

export const FetchWinnersAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await winnerService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchWinners(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateDeliveryStatusAsync =
  (req: WinnerStatus_U_Req): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus('loading'));
    const result = await winnerService.Delivery(req);
    if (isError(result)) {
      ApiErrorNotification(result);
      dispatch(setStatus('error'));
    } else {
      dispatch(UpdateWinnerStatus(req));
      dispatch(setStatus('data'));
    }
  };

export const selectWinners = (state: RootState) => state.Winners;

export default WinnersSlice.reducer;
