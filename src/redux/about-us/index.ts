import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { aboutService } from '../../services';
import { AboutUs, AboutUs_U_Req } from '../../models';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';

interface AboutsState {
  status: requestStatus;
  about?: AboutUs;
}

let initialState: AboutsState = {
  status: 'no-thing',
};

const AboutsSlice = createSlice({
  name: 'Abouts',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    UpdateAboutUs: (state, { payload }: PayloadAction<AboutUs>) => {
      state.about = payload;
    },
    FetchAboutUs: (state, { payload }: PayloadAction<AboutUs>) => {
      state.about = payload;
    },
  },
});

const { setStatus, UpdateAboutUs, FetchAboutUs } = AboutsSlice.actions;

export const UpdateAboutUsAsync = (req: AboutUs_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await aboutService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateAboutUs(result.data));
    dispatch(setStatus('data'));
  }
};

export const FetchAboutUsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await aboutService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchAboutUs(result.data));
    dispatch(setStatus('data'));
  }
};

export const selectAboutUs = (state: RootState) => state.Abouts.about;
export const selectAboutUsStatus = (state: RootState) => state.Abouts.status;

export default AboutsSlice.reducer;
