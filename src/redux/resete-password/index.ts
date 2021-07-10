import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';

import isError from '../../utils/helpers/is-error';

import requestStatus from '../../constants/enums/request-status';
import ResetReq from '../../models/reset-password';
import { appServices } from '../../services';

interface ResetState {
  status: requestStatus;

  reset?: ResetReq;
}

let initialState: ResetState = {
  status: 'no-thing',
};

const ResetSlice = createSlice({
  name: 'Reset',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },

    setReset: (state, { payload }: PayloadAction<ResetReq>) => {
      state.reset = payload;
    },
  },
});

const { setStatus: setResetStatus, setReset } = ResetSlice.actions;

export const resetPassAsync = (req: ResetReq): AppThunk => async (dispatch) => {
  dispatch(setResetStatus('loading'));
  const result = await appServices.resetPass(req);
  if (isError(result)) {
    dispatch(setResetStatus('error'));
  } else {
    dispatch(setReset(result.data));

    dispatch(setResetStatus('data'));
    dispatch(setResetStatus('no-thing'));

    // notification["success"]({
    //   message: t("check"),
    // })
  }
};

export const selectReset = (state: RootState) => state.Reset.reset;
export const selectResetStatus = (state: RootState) => state.Reset.status;

export default ResetSlice.reducer;
