import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { productService } from '../../services';
import {
  Product,
  Product_U_Req,
  Product_S_Req,
  Product_I_Req,
  Product_D_Req,
} from '../../models';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';

interface ProductsState {
  status: requestStatus;
  products: Product[];
  product?: Product;
  updatePrice: {
    status: requestStatus;
  };
}

let initialState: ProductsState = {
  status: 'no-thing',
  products: [],
  updatePrice: {
    status: 'no-thing',
  },
};

const ProductsSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    setUpdatePriceStatus: (
      { updatePrice },
      { payload }: PayloadAction<requestStatus>
    ) => {
      updatePrice.status = payload;
    },
    InsertProduct: ({ products }, { payload }: PayloadAction<Product>) => {
      products.push(payload);
    },
    ShowProduct: (state, { payload }: PayloadAction<Product>) => {
      state.product = payload;
    },
    UpdateProduct: (state, { payload }: PayloadAction<Product>) => {
      let ind = state.products.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.products[ind] = payload;
    },
    DeleteProduct: ({ products }, { payload }: PayloadAction<number>) => {
      let index = products.findIndex((el) => el.id === payload);
      if (index !== -1) products.splice(index, 1);
    },
    FetchProducts: (state, { payload }: PayloadAction<Product[]>) => {
      state.products = payload;
    },
  },
});

const {
  setStatus,
  InsertProduct,
  UpdateProduct,
  DeleteProduct,
  FetchProducts,
  ShowProduct,
  setUpdatePriceStatus,
} = ProductsSlice.actions;

export const InsertProductAsync = (req: Product_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await productService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertProduct(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowProductAsync = (req: Product_S_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await productService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowProduct(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateProductAsync = (req: Product_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await productService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateProduct(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteProductAsync = (req: Product_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await productService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteProduct(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchDashProductsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await productService.FetchDash();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchProducts(result.data));
    dispatch(setStatus('data'));
  }
};

export const FetchSiteProductsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await productService.FetchSite();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchProducts(result.data));
    dispatch(setStatus('data'));
  }
};

export const FetchProductsByCategoryAsync = (id: number): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await productService.FetchByCategory({ id });
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchProducts(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdatePricesAsync = (file: FormData): AppThunk => async (
  dispatch
) => {
  dispatch(setUpdatePriceStatus('loading'));
  file.append('_method', 'put');

  const result = await productService.updatePrices(file);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setUpdatePriceStatus('error'));
  } else {
    dispatch(setUpdatePriceStatus('data'));
  }
};

export const selectProducts = (state: RootState) => state.Products.products;
export const selectProduct = (state: RootState) => state.Products.product;
export const selectProductsStatus = (state: RootState) => state.Products.status;

export default ProductsSlice.reducer;
