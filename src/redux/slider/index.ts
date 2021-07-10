import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { sliderService } from '../../services';
import {
  Slider,
  Slider_U_Req,
  Slider_S_Req,
  Slider_I_Req,
  Slider_D_Req,
} from '../../models';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';

interface SlidersState {
  status: requestStatus;
  sliders: Slider[];
  slider?: Slider;
}

let initialState: SlidersState = {
  status: 'no-thing',
  sliders: [],
};

const SlidersSlice = createSlice({
  name: 'Sliders',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    InsertSlider: ({ sliders }, { payload }: PayloadAction<Slider>) => {
      sliders.push(payload);
    },
    ShowSlider: (state, { payload }: PayloadAction<Slider>) => {
      state.slider = payload;
    },
    UpdateSlider: (state, { payload }: PayloadAction<Slider>) => {
      let ind = state.sliders.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.sliders[ind] = payload;
    },
    DeleteSlider: ({ sliders }, { payload }: PayloadAction<number>) => {
      let index = sliders.findIndex((el) => el.id === payload);
      if (index !== -1) sliders.splice(index, 1);
    },
    FetchSliders: (state, { payload }: PayloadAction<Slider[]>) => {
      state.sliders = payload;
    },
  },
});

const {
  setStatus,
  InsertSlider,
  UpdateSlider,
  DeleteSlider,
  FetchSliders,
  ShowSlider,
} = SlidersSlice.actions;

export const InsertSliderAsync = (req: Slider_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await sliderService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertSlider(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowSliderAsync = (req: Slider_S_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await sliderService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowSlider(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateSliderAsync = (req: Slider_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await sliderService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateSlider(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteSliderAsync = (req: Slider_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await sliderService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteSlider(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchSlidersAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await sliderService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchSliders(result.data));
    dispatch(setStatus('data'));
  }
};

export const selectSliders = (state: RootState) => state.Sliders.sliders;
export const selectSlider = (state: RootState) => state.Sliders.slider;
export const selectSlidersStatus = (state: RootState) => state.Sliders.status;

export default SlidersSlice.reducer;
