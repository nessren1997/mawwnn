import requestStatus from '../../constants/enums/request-status';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import isError from '../../utils/helpers/is-error';
import VerfiyReq from '../../models/verfiy-email';
import { AppThunk, RootState } from '../store';
import { appServices } from '../../services';
import { setUser } from '..';

interface VerfiyState {
  status: requestStatus;
  otp_status: requestStatus;
}

let initialState: VerfiyState = {
  status: 'no-thing',
  otp_status: 'no-thing',
};

const VerfiySlice = createSlice({
  name: 'Verfiy',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    setotpStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.otp_status = payload;
    },
  },
});

const { setStatus, setotpStatus } = VerfiySlice.actions;

export const selectVerfiyStatus = (state: RootState) => state.Verify.status;

export const verfiyAsync =
  (req: VerfiyReq): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus('loading'));
    const result = await appServices.verfiyEmail(req);
    if (isError(result)) {
      dispatch(setStatus('error'));
    } else {
      dispatch(setUser(result.data.user));
      dispatch(setStatus('data'));
    }
  };

export const resendOTPAsync =
  (req: { email: string }): AppThunk =>
  async (dispatch) => {
    dispatch(setotpStatus('loading'));
    const result = await appServices.resendOTP(req);
    if (isError(result)) {
      dispatch(setotpStatus('error'));
    } else {
      dispatch(setotpStatus('data'));
    }
  };

export const clearStatus = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('no-thing'));
  dispatch(setotpStatus('no-thing'));
};

export default VerfiySlice.reducer;
