import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import isError from '../../utils/helpers/is-error';
import { OrderStatus, OrderStatus_S_Req } from '../../models';
import requestStatus from '../../constants/enums/request-status';
import { orderStatusService } from '../../services/order-status';

interface OrderStatussState {
  status: requestStatus;
  order_status?: OrderStatus;
}

let initialState: OrderStatussState = {
  status: 'no-thing',
};

const OrderStatussSlice = createSlice({
  name: 'OrderStatuss',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },

    ShowOrderStatus: (state, { payload }: PayloadAction<OrderStatus>) => {
      state.order_status = payload;
    },

    clear: (state) => {
      state.order_status = undefined;
    },
  },
});

const { setStatus, ShowOrderStatus, clear } = OrderStatussSlice.actions;

export const ShowOrderStatusAsync = (req: OrderStatus_S_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await orderStatusService.Show(req);
  if (isError(result)) {
    // ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowOrderStatus(result.data));
    dispatch(setStatus('data'));
  }
};

export const ClearOrderStatus = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('no-thing'));
  dispatch(clear());
};

export const selectOrderStatuss = (state: RootState) => state.OrderStatus.order_status;
export const selectOrderStatus = (state: RootState) => state.OrderStatus.status;

export default OrderStatussSlice.reducer;
