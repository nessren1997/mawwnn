import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import requestStatus from '../../constants/enums/request-status';
import { ProductsStatistic, BuyersStatistic } from '../../models/statistic';
import { statisticService } from '../../services/statistic';
import isError from '../../utils/helpers/is-error';
import ApiErrorNotification from '../../utils/ui/notificationService';

import { AppThunk } from '../store';

interface StatisticssState {
  status: requestStatus;
  products_data: ProductsStatistic[];
  buyers_data: BuyersStatistic[];
}

let initialState: StatisticssState = {
  status: 'no-thing',
  products_data: [],
  buyers_data: [],
};

const StatisticssSlice = createSlice({
  name: 'Statisticss',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    FetchProductsStatistics: (state, { payload }: PayloadAction<ProductsStatistic[]>) => {
      state.products_data = payload;
    },
    FetchBuyersStatistics: (state, { payload }: PayloadAction<BuyersStatistic[]>) => {
      state.buyers_data = payload;
    },
  },
});

const { setStatus, FetchProductsStatistics, FetchBuyersStatistics } = StatisticssSlice.actions;

export const FetchProductsStatisticsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await statisticService.FetchProducts();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchProductsStatistics(result.data));
    dispatch(setStatus('data'));
  }
};

export const FetchBuyersStatisticsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await statisticService.FetchBuyers();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchBuyersStatistics(result.data));
    dispatch(setStatus('data'));
  }
};

export default StatisticssSlice.reducer;
