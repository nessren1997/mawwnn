import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { addressService } from '../../services';
import { Address, Address_U_Req, Address_S_Req, Address_I_Req, Address_D_Req } from '../../models';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';

interface AddressesState {
  status: requestStatus;
  addresses: Address[];
  address?: Address;
}

let initialState: AddressesState = {
  status: 'no-thing',
  addresses: [],
};

const AddressesSlice = createSlice({
  name: 'Addresses',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    InsertAddress: ({ addresses }, { payload }: PayloadAction<Address>) => {
      addresses.push(payload);
    },
    ShowAddress: (state, { payload }: PayloadAction<Address>) => {
      state.address = payload;
    },
    UpdateAddress: (state, { payload }: PayloadAction<Address>) => {
      let ind = state.addresses.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.addresses[ind] = payload;
    },
    DeleteAddress: ({ addresses }, { payload }: PayloadAction<number>) => {
      let index = addresses.findIndex((el) => el.id === payload);
      if (index !== -1) addresses.splice(index, 1);
    },
    FetchAddresses: (state, { payload }: PayloadAction<Address[]>) => {
      state.addresses = payload;
    },
  },
});

const { setStatus, InsertAddress, UpdateAddress, DeleteAddress, FetchAddresses, ShowAddress } = AddressesSlice.actions;

export const InsertAddressAsync = (req: Address_I_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await addressService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertAddress(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowAddressAsync = (req: Address_S_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await addressService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowAddress(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateAddressAsync = (req: Address_U_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await addressService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateAddress(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteAddressAsync = (req: Address_D_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await addressService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteAddress(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchAddressesAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await addressService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchAddresses(result.data));
    dispatch(setStatus('data'));
  }
};

export const selectAddress = (state: RootState) => state.Addresses;

export default AddressesSlice.reducer;
