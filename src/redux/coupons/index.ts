import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { couponService } from '../../services';
import {
  Coupon,
  Coupon_U_Req,
  Coupon_S_Req,
  Coupon_I_Req,
  Coupon_D_Req,
} from '../../models';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';

interface CouponsState {
  status: requestStatus;
  coupons: Coupon[];
  coupon?: Coupon;
}

let initialState: CouponsState = {
  status: 'no-thing',
  coupons: [],
};

const CouponsSlice = createSlice({
  name: 'Coupons',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    InsertCoupon: ({ coupons }, { payload }: PayloadAction<Coupon>) => {
      coupons.push(payload);
    },
    ShowCoupon: (state, { payload }: PayloadAction<Coupon>) => {
      state.coupon = payload;
    },
    UpdateCoupon: (state, { payload }: PayloadAction<Coupon>) => {
      let ind = state.coupons.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.coupons[ind] = payload;
    },
    DeleteCoupon: ({ coupons }, { payload }: PayloadAction<number>) => {
      let index = coupons.findIndex((el) => el.id === payload);
      if (index !== -1) coupons.splice(index, 1);
    },
    FetchCoupons: (state, { payload }: PayloadAction<Coupon[]>) => {
      state.coupons = payload;
    },
  },
});

const {
  setStatus,
  InsertCoupon,
  UpdateCoupon,
  DeleteCoupon,
  FetchCoupons,
  ShowCoupon,
} = CouponsSlice.actions;

export const InsertCouponAsync = (req: Coupon_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await couponService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertCoupon(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowCouponAsync = (req: Coupon_S_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await couponService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowCoupon(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateCouponAsync = (req: Coupon_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await couponService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateCoupon(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteCouponAsync = (req: Coupon_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await couponService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteCoupon(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchCouponsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await couponService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchCoupons(result.data));
    dispatch(setStatus('data'));
  }
};

export const selectCoupons = (state: RootState) => state.Coupon;

export default CouponsSlice.reducer;
