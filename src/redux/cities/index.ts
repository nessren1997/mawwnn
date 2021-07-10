import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { cityService } from '../../services/city';
import {
  City,
  City_U_Req,
  City_S_Req,
  City_I_Req,
  City_D_Req,
} from '../../models/city';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';

interface CitiesState {
  status: requestStatus;
  cities: City[];
  city?: City;
}

let initialState: CitiesState = {
  status: 'no-thing',
  cities: [],
};

const CitiesSlice = createSlice({
  name: 'Cities',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    InsertCity: ({ cities }, { payload }: PayloadAction<City>) => {
      cities.push(payload);
    },
    ShowCity: (state, { payload }: PayloadAction<City>) => {
      state.city = payload;
    },
    UpdateCity: (state, { payload }: PayloadAction<City>) => {
      let ind = state.cities.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.cities[ind] = payload;
    },
    DeleteCity: ({ cities }, { payload }: PayloadAction<number>) => {
      let index = cities.findIndex((el) => el.id === payload);
      if (index !== -1) cities.splice(index, 1);
    },
    FetchCities: (state, { payload }: PayloadAction<City[]>) => {
      state.cities = payload;
    },
  },
});

const {
  setStatus,
  InsertCity,
  UpdateCity,
  DeleteCity,
  FetchCities,
  ShowCity,
} = CitiesSlice.actions;

export const InsertCityAsync = (req: City_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await cityService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertCity(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowCityAsync = (req: City_S_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await cityService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowCity(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateCityAsync = (req: City_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await cityService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateCity(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteCityAsync = (req: City_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await cityService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteCity(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchCitiesAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await cityService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchCities(result.data));
    dispatch(setStatus('data'));
  }
};

export const selectCities = (state: RootState) => state.Cities;

export default CitiesSlice.reducer;
