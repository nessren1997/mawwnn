import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { categoryService } from '../../services';
import { Category, Category_U_Req, Category_S_Req, Category_I_Req, Category_D_Req } from '../../models';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';

interface CategoriesState {
  status: requestStatus;
  categories: Category[];
  category?: Category;
}

let initialState: CategoriesState = {
  status: 'no-thing',
  categories: [],
};

const CategoriesSlice = createSlice({
  name: 'Categories',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    InsertCategory: ({ categories }, { payload }: PayloadAction<Category>) => {
      if (payload.parent_category_id)
        categories.find((el) => el.id === payload.parent_category_id)!.sub_categories!.push(payload);
      else categories.push(payload);
    },
    ShowCategory: (state, { payload }: PayloadAction<Category>) => {
      state.category = payload;
    },
    UpdateCategory: (state, { payload }: PayloadAction<Category>) => {
      let ind = state.categories.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.categories[ind] = payload;
    },
    DeleteCategory: ({ categories }, { payload }: PayloadAction<number>) => {
      let index = categories.findIndex((el) => el.id === payload);
      if (index !== -1) categories.splice(index, 1);
    },
    FetchCategories: (state, { payload }: PayloadAction<Category[]>) => {
      state.categories = payload;
    },
  },
});

const { setStatus, InsertCategory, UpdateCategory, DeleteCategory, FetchCategories, ShowCategory } = CategoriesSlice.actions;

export const InsertCategoryAsync = (req: Category_I_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await categoryService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertCategory(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowCategoryAsync = (req: Category_S_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await categoryService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowCategory(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateCategoryAsync = (req: Category_U_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await categoryService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateCategory(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteCategoryAsync = (req: Category_D_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await categoryService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteCategory(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchCategoriesAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await categoryService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchCategories(result.data));
    dispatch(setStatus('data'));
  }
};

export const selectCategories = (state: RootState) => state.Categories.categories;
export const selectCategory = (state: RootState) => state.Categories.category;
export const selectCategoriesStatus = (state: RootState) => state.Categories.status;

export default CategoriesSlice.reducer;
