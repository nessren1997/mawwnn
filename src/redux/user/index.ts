import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { userService } from '../../services/user';
import {
  User,
  User_U_Req,
  User_S_Req,
  User_I_Req,
  User_D_Req,
} from '../../models/user';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';

interface UsersState {
  status: requestStatus;
  users: User[];
  user?: User;
}

let initialState: UsersState = {
  status: 'no-thing',
  users: [],
};

const UsersSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    InsertUser: ({ users }, { payload }: PayloadAction<User>) => {
      users.push(payload);
    },
    ShowUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    UpdateUser: (state, { payload }: PayloadAction<User>) => {
      let ind = state.users.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.users[ind] = payload;
    },
    DeleteUser: ({ users }, { payload }: PayloadAction<number>) => {
      let index = users.findIndex((el) => el.id === payload);
      if (index !== -1) users.splice(index, 1);
    },
    FetchUsers: (state, { payload }: PayloadAction<User[]>) => {
      state.users = payload;
    },
  },
});

const {
  setStatus,
  InsertUser,
  UpdateUser,
  DeleteUser,
  FetchUsers,
  ShowUser,
} = UsersSlice.actions;

export const InsertUserAsync = (req: User_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await userService.Insert(req);
  console.log("res", result);
  
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertUser(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowUserAsync = (req: User_S_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await userService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowUser(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateUserAsync = (req: User_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await userService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateUser(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteUserAsync = (req: User_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await userService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteUser(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchUsersAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await userService.Fetch();
  console.log("redux", result);
  
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchUsers(result.data));
    dispatch(setStatus('data'));
  }
};

export const selectUsers = (state: RootState) => state.Users;

export default UsersSlice.reducer;
