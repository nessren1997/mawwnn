import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { orderService } from '../../services/order/index';
import Order_Site, {
  Order,
  Order_proccess_number_Req,
  Order_proccess_number_Res,
  Order_U_Req,
} from '../../models/order/index';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';

interface OrderState {
  status: requestStatus;
  site_orders: Order_Site[];
  orders: Order[];
  orderLimit?: string;
  singleOrderStatus?: Order_proccess_number_Res;
}

let initialState: OrderState = {
  status: 'no-thing',
  site_orders: [],
  orders: [],
};

const OrderSlice = createSlice({
  name: 'Orders',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    setOrderLimit: (state, { payload }: PayloadAction<string>) => {
      state.orderLimit = payload;
    },
    GetOrders: (state, { payload }: PayloadAction<Order_Site[]>) => {
      state.site_orders = payload;
    },
    setOrders: (state, { payload }: PayloadAction<Order[]>) => {
      state.orders = payload;
    },
    GetSingleOrderStatus: (
      state,
      { payload }: PayloadAction<Order_proccess_number_Res>
    ) => {
      state.singleOrderStatus = payload;
    },
    UpdateOrder: (state, { payload }: PayloadAction<Order>) => {
      let ind = state.orders.findIndex(
        (el) => el.order_no === payload.order_no
      );
      if (ind !== -1) state.orders[ind] = payload;
    },
  },
});

const {
  setStatus,
  GetOrders,
  GetSingleOrderStatus,
  setOrders,
  setOrderLimit,
  UpdateOrder,
} = OrderSlice.actions;

export const FetchOrdersAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await orderService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(setOrders(result.data));
    dispatch(setStatus('data'));
  }
};
export const FetchOrderLimitAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await orderService.getOrderLimit();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(setOrderLimit(result.data.min_checkout_limit));
    dispatch(setStatus('data'));
  }
};

export const SetOrderLimitAsync = (req: {
  min_checkout_limit: string;
}): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await orderService.updateOrderLimit(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(setOrderLimit(result.data.min_checkout_limit));
    dispatch(setStatus('data'));
  }
};

export const UpdateOrderAsync = (req: Order_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await orderService.Update(req);
  console.log(result);

  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateOrder(result.data));
    dispatch(setStatus('data'));
  }
};

export const FetchUserOrdersAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await orderService.getAllOrder();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(GetOrders(result.data));
    dispatch(setStatus('data'));
  }
};
export const FetchSingleOrdersAsync = (
  order_no: Order_proccess_number_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await orderService.getOrderStatus(order_no);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(GetSingleOrderStatus(result.data));
    dispatch(setStatus('data'));
  }
};
export const selectSingleOrder = (state: RootState) =>
  state.Orders.singleOrderStatus;
export const selectSiteOrders = (state: RootState) => state.Orders.site_orders;
export const selectOrders = (state: RootState) => state.Orders.orders;
export const selectOrdersStatus = (state: RootState) => state.Orders.status;
export const selectOrderLimit = (state: RootState) => state.Orders.orderLimit;

export default OrderSlice.reducer;
