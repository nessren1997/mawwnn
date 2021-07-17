import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "../store";
import { cityAllowedService } from "../../services/city-allowed";
import { CityAllowed, CityAllowed_U_Req } from "../../models/city-allowed";

import ApiErrorNotification from "../../utils/ui/notificationService";
import isError from "../../utils/helpers/is-error";
import requestStatus from "../../constants/enums/request-status";

interface CitiesState {
  status: requestStatus;
  citiesallowed: CityAllowed[];
  cityallowed?: CityAllowed;
}

let initialState: CitiesState = {
  status: "no-thing",
  citiesallowed: [],
};

const CitiesAllowedSlice = createSlice({
  name: "CitiesAllowed",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    UpdateCityAllowed: (state, { payload }: PayloadAction<CityAllowed>) => {
      console.log('bbbmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
      let ind = state.citiesallowed.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.citiesallowed[ind] = payload;
      console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
      console.log(state);
    },
    FetchCitiesAllowed: (state, { payload }: PayloadAction<CityAllowed[]>) => {
      state.citiesallowed = payload;
    },
  },
});

const { setStatus, UpdateCityAllowed, FetchCitiesAllowed } = CitiesAllowedSlice.actions;

export const UpdateCityAllowedAsync =
  (req: CityAllowed_U_Req): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    const result = await cityAllowedService.Update(req);
    if (isError(result)) {
      ApiErrorNotification(result);
      dispatch(setStatus("error"));
    } else {
      dispatch(UpdateCityAllowed(result.data));
      dispatch(setStatus("data"));
    }
  };

export const FetchCitiesAllowedAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus("loading"));
  const result = await cityAllowedService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus("error"));
  } else {
    dispatch(FetchCitiesAllowed(result.data));
    dispatch(setStatus("data"));
  }
};

export const selectCitiesAllowedStatus = (state: RootState) => state.CitiesAllowed;

export default CitiesAllowedSlice.reducer;
