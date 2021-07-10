import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { brandService } from '../../services';
import {
  Brand,
  Brand_U_Req,
  Brand_S_Req,
  Brand_I_Req,
  Brand_D_Req,
} from '../../models';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';

interface BrandsState {
  status: requestStatus;
  brands: Brand[];
  brand?: Brand;
}

let initialState: BrandsState = {
  status: 'no-thing',
  brands: [],
};

const BrandsSlice = createSlice({
  name: 'Brands',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    InsertBrand: ({ brands }, { payload }: PayloadAction<Brand>) => {
      brands.push(payload);
    },
    ShowBrand: (state, { payload }: PayloadAction<Brand>) => {
      state.brand = payload;
    },
    UpdateBrand: (state, { payload }: PayloadAction<Brand>) => {
      let ind = state.brands.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.brands[ind] = payload;
    },
    DeleteBrand: ({ brands }, { payload }: PayloadAction<number>) => {
      let index = brands.findIndex((el) => el.id === payload);
      if (index !== -1) brands.splice(index, 1);
    },
    FetchBrands: (state, { payload }: PayloadAction<Brand[]>) => {
      state.brands = payload;
    },
  },
});

const {
  setStatus,
  InsertBrand,
  UpdateBrand,
  DeleteBrand,
  FetchBrands,
  ShowBrand,
} = BrandsSlice.actions;

export const InsertBrandAsync = (req: Brand_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await brandService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertBrand(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowBrandAsync = (req: Brand_S_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await brandService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowBrand(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateBrandAsync = (req: Brand_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await brandService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateBrand(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteBrandAsync = (req: Brand_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await brandService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteBrand(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchBrandsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await brandService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchBrands(result.data));
    dispatch(setStatus('data'));
  }
};

export const selectBrands = (state: RootState) => state.Brands.brands;
export const selectBrand = (state: RootState) => state.Brands.brand;
export const selectBrandsStatus = (state: RootState) => state.Brands.status;

export default BrandsSlice.reducer;
