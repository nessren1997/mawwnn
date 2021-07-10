import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import {
  Unregistered_User_Model,
  Registered_User_Model,
  verification_code_response,
  order_response,
} from '../../models';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';
import { orderService } from '../../services/order-form';
import isResponseError from '../../utils/helpers/is-response-error';

interface State {
  order: {
    status: requestStatus;
    data: order_response | null;
    errors: any | null;
  };
  verification: {
    status: requestStatus;
    data: verification_code_response | null;
    errors: any | null;
    resending: boolean;
  };
}
let initialState: State = {
  order: {
    status: 'no-thing',
    data: null,
    errors: null,
  },
  verification: {
    status: 'no-thing',
    data: null,
    errors: null,
    resending: false,
  },
};

const OrdersSlice = createSlice({
  name: 'Orders',
  initialState,
  reducers: {
    setOrderStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.order.status = payload;
    },
    setOrderDetails: (
      state,
      { payload }: PayloadAction<order_response | null>
    ) => {
      state.order.data = payload;
    },
    setOrderErrors: (state, { payload }: PayloadAction<any>) => {
      state.order.errors = payload;
    },
    clearOrderDetails: (state, _: PayloadAction) => {
      state.order.status = 'no-thing';
      state.order.data = null;
    },
    setVerificationStatus: (
      state,
      { payload }: PayloadAction<requestStatus>
    ) => {
      state.verification.status = payload;
    },
    setVerifcationInfo: (
      state,
      { payload }: PayloadAction<verification_code_response | null>
    ) => {
      state.verification.data = payload;
    },
    setVerifcationErrors: (state, { payload }: PayloadAction<any>) => {
      state.verification.errors = payload;
    },
    setVerifcationReSending: (state, { payload }: PayloadAction<any>) => {
      state.verification.resending = payload;
    },
    clearVerifcationDetails: (state, _: PayloadAction) => {
      state.verification.status = 'no-thing';
      state.verification.data = null;
    },
  },
});

export const {
  setVerificationStatus,
  setOrderStatus,
  setOrderDetails,
  setVerifcationInfo,
  clearOrderDetails,
  setOrderErrors,
  setVerifcationErrors,
  setVerifcationReSending,
} = OrdersSlice.actions;

export const selectOrderStatus = (state: RootState) =>
  state.OrdersForm.order.status;
export const selectOrderDetails = (state: RootState) =>
  state.OrdersForm.order.data;
export const selectOrderErrors = (state: RootState) =>
  state.OrdersForm.order.errors;
export const selectVerificationStatus = (state: RootState) =>
  state.OrdersForm.verification.status;
export const selectVerificationInfo = (state: RootState) =>
  state.OrdersForm.verification.data;
export const selectVerificationErrors = (state: RootState) =>
  state.OrdersForm.verification.errors;
export const selectVerificationReSendingStatus = (state: RootState) =>
  state.OrdersForm.verification.resending;

export const SendRegisteredOrderAsync = (
  order: Registered_User_Model
): AppThunk => async (dispatch) => {
  dispatch(setOrderStatus('loading'));
  const result = await orderService.Post_Reigstered_User_Order(order);
  if (isError(result)) {
    if (isResponseError(result)) {
      dispatch(setOrderErrors(result.message.errors));
    }
    dispatch(setOrderStatus('error'));
  } else {
    dispatch(setOrderStatus('data'));
    dispatch(setOrderDetails(result.data));
  }
};

export const SendUnregisteredOrderAsync = (
  order: Unregistered_User_Model
): AppThunk => async (dispatch) => {
  dispatch(setOrderStatus('loading'));
  const result = await orderService.Post_Unreigstered_User_Order(order);
  if (isError(result)) {
    if (isResponseError(result)) {
      if (isResponseError(result)) {
        dispatch(setOrderErrors(result.message.errors));
      }
    }
    dispatch(setOrderStatus('error'));
  } else {
    dispatch(setOrderStatus('data'));
    dispatch(setOrderDetails(result.data));
  }
};

export const SendVerificationCodeAsync = (
  code: string,
  id: string
): AppThunk => async (dispatch) => {
  dispatch(setVerificationStatus('loading'));
  const result = await orderService.Post_Fetch_Verification_Code(code, id);
  if (isError(result)) {
    if (isResponseError(result))
      dispatch(setVerifcationErrors('Code Is Invalid'));
    dispatch(setVerificationStatus('error'));
  } else {
    dispatch(setVerificationStatus('data'));
    dispatch(setVerifcationInfo(result.data));
  }
};

export const ReSendVerificationCodeAsync = (id: string): AppThunk => async (
  dispatch
) => {
  dispatch(setVerifcationReSending(true));
  await orderService.Fetch_ReSendVerification_Code(id);
  dispatch(setVerifcationReSending(false));
};

export default OrdersSlice.reducer;
