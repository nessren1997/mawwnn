import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { searchProductsService } from '../../services';
import { Search_Result_Model } from '../../models';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';

interface ProductsState {
  status: requestStatus;
  requsted_products: Search_Result_Model[];
}

let initialState: ProductsState = {
  status: 'no-thing',
  requsted_products: [],
};

const RequestedProductsSlice = createSlice({
  name: 'RequestedProducts',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    FetchProducts: (
      state,
      { payload }: PayloadAction<Search_Result_Model[]>
    ) => {
      state.requsted_products = payload;
    },
    ClearProducts: (state, _: PayloadAction) => {
      state.status = 'no-thing';
      state.requsted_products = [];
    },
  },
});

const { setStatus, FetchProducts } = RequestedProductsSlice.actions;

export const { ClearProducts } = RequestedProductsSlice.actions;

export const FetchProductsByNameAsync = (
  search_vals?: any[],
  brand?: string
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));

  const result = await searchProductsService.Get_Products({
    tags: search_vals,
    brand: brand,
  });
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchProducts(result.data));
    dispatch(setStatus('data'));
  }
};

export const selectRequestedProducts = (state: RootState) =>
  state.RequestedProducts.requsted_products;
export const selectRequestedProductsStatus = (state: RootState) =>
  state.RequestedProducts.status;

export default RequestedProductsSlice.reducer;
