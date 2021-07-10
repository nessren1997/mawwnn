import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ScreenState {
  isMobile: boolean;
}

let initialState: ScreenState = {
  isMobile: false,
};

const IsMobileSlice = createSlice({
  name: 'IsMobile',
  initialState,
  reducers: {
    SetScreenSize: (state, { payload }: PayloadAction<boolean>) => {
      state.isMobile = payload;
    },
  },
});

export const { SetScreenSize } = IsMobileSlice.actions;

export const selectIsMobile = (state: RootState) => state.IsMobile.isMobile;

export default IsMobileSlice.reducer;
