import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';
import { searchCategoriesService } from '../../services/categories';
import { SearchCategory } from '../../models';

interface CategoriesState {
  status: requestStatus;
  categories: SearchCategory[];
}

let initialState: CategoriesState = {
  status: 'no-thing',
  categories: [],
};

const SearchCategoriesSlice = createSlice({
  name: 'SearchCategories',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    setCategories: (state, { payload }: PayloadAction<SearchCategory[]>) => {
      state.categories = payload;
    },
  },
});

const { setStatus, setCategories } = SearchCategoriesSlice.actions;

export const FetchSearchCategoriesAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await searchCategoriesService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(setCategories(result.data));
    dispatch(setStatus('data'));
  }
};

export const selectSearchCategories = (state: RootState) =>
  state.SearchCategories.categories;
export const selectSearchCategoriesStatus = (state: RootState) =>
  state.SearchCategories.status;
export default SearchCategoriesSlice.reducer;
