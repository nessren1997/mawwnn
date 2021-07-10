import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { Coupon_P_REQ } from '../../models';
import isError from '../../utils/helpers/is-error';
import { couponService } from '../../services/coupons';
import requestStatus from '../../constants/enums/request-status';

interface CouponState {
  coupon: string;
  status: requestStatus;
  rate: number;
  message: string | null;
}

let initialState: CouponState = {
  coupon: '',
  status: 'no-thing',
  rate: 0,
  message: null,
};

const CouponsSlice = createSlice({
  name: 'Coupons',
  initialState,
  reducers: {
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
    addCoupon: (
      state,
      {
        payload,
      }: PayloadAction<{ rate: number; message: string; coupon: string }>
    ) => {
      state.coupon = payload.coupon;
      state.rate = payload.rate;
      state.message = payload.message;
    },
    removeCoupon: (state) => {
      state.rate = 0;
      state.message = 'no coupons';
    },
  },
});

export const { setStatus, addCoupon, removeCoupon } = CouponsSlice.actions;
export const selectCoupon = (state: RootState) => state.Coupons;
export const selectCouponStatus = (state: RootState) => state.Coupons.status;
export default CouponsSlice.reducer;

export const ValidateCouponAsync = (coupon: Coupon_P_REQ): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await couponService.Post(coupon);
  if (isError(result)) {
    // ApiErrorNotification(result);
    dispatch(setStatus('error'));
    dispatch(removeCoupon());
  } else {
    dispatch(
      addCoupon({
        rate: +result.data,
        message: result.message,
        coupon: coupon.coupon,
      })
    );
    dispatch(setStatus('data'));
  }
};
