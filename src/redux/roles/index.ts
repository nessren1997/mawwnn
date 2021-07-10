import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { roleService } from '../../services/role';
import {
  Role,
  Role_U_Req,
  Role_S_Req,
  Role_I_Req,
  Role_D_Req,
} from '../../models/role';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';

interface RolesState {
  status: requestStatus;
  roles: Role[];
  role?: Role;
}

let initialState: RolesState = {
  status: 'no-thing',
  roles: [],
};

const RolesSlice = createSlice({
  name: 'Roles',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    InsertRole: ({ roles }, { payload }: PayloadAction<Role>) => {
      roles.push(payload);
    },
    ShowRole: (state, { payload }: PayloadAction<Role>) => {
      state.role = payload;
    },
    UpdateRole: (state, { payload }: PayloadAction<Role>) => {
      let ind = state.roles.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.roles[ind] = payload;
    },
    DeleteRole: ({ roles }, { payload }: PayloadAction<number>) => {
      let index = roles.findIndex((el) => el.id === payload);
      if (index !== -1) roles.splice(index, 1);
    },
    FetchRoles: (state, { payload }: PayloadAction<Role[]>) => {
      state.roles = payload;
    },
  },
});

const {
  setStatus,
  InsertRole,
  UpdateRole,
  DeleteRole,
  FetchRoles,
  ShowRole,
} = RolesSlice.actions;

export const InsertRoleAsync = (req: Role_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await roleService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertRole(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowRoleAsync = (req: Role_S_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await roleService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowRole(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateRoleAsync = (req: Role_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await roleService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateRole(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteRoleAsync = (req: Role_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await roleService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteRole(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchRolesAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await roleService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchRoles(result.data));
    dispatch(setStatus('data'));
  }
};

export const selectRole = (state: RootState) => state.Roles;

export default RolesSlice.reducer;
