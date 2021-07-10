import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { branchService } from '../../services';
import { Branch, Branch_U_Req, Branch_S_Req, Branch_I_Req, Branch_D_Req, Setting, Setting_U_Req } from '../../models';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';

interface BranchsState {
  status: requestStatus;
  branchs: Branch[];
  branch?: Branch;
}

let initialState: BranchsState = {
  status: 'no-thing',
  branchs: [],
};

const BranchsSlice = createSlice({
  name: 'Branchs',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    InsertBranch: ({ branchs }, { payload }: PayloadAction<Branch>) => {
      branchs.push(payload);
    },
    ShowBranch: (state, { payload }: PayloadAction<Branch>) => {
      state.branch = payload;
    },
    UpdateBranch: (state, { payload }: PayloadAction<Branch>) => {
      let ind = state.branchs.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.branchs[ind] = payload;
    },
    UpdateSettings: (state, { payload }: PayloadAction<Setting_U_Req>) => {
      let ind = state.branchs.findIndex((el) => el.id === payload.branch_id);
      if (ind !== -1) state.branchs[ind].settings = payload.settings;
    },
    DeleteBranch: ({ branchs }, { payload }: PayloadAction<number>) => {
      let index = branchs.findIndex((el) => el.id === payload);
      if (index !== -1) branchs.splice(index, 1);
    },
    FetchBranchs: (state, { payload }: PayloadAction<Branch[]>) => {
      state.branchs = payload;
    },
  },
});

const { setStatus, InsertBranch, UpdateBranch, DeleteBranch, FetchBranchs, ShowBranch, UpdateSettings } = BranchsSlice.actions;

export const InsertBranchAsync = (req: Branch_I_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await branchService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertBranch(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowBranchAsync = (req: Branch_S_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await branchService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowBranch(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateBranchAsync = (req: Branch_U_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await branchService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateBranch(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateSettingAsync = (req: Setting_U_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await branchService.updatesettings(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    const data = { settings: result.data, branch_id: req.branch_id };

    dispatch(UpdateSettings(data));
    dispatch(setStatus('data'));
  }
};

export const DeleteSettingAsync = (id: number): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await branchService.deletesetting(id);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(setStatus('data'));
  }
};

export const DeleteBranchAsync = (req: Branch_D_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await branchService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteBranch(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchBranchesAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await branchService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchBranchs(result.data));
    dispatch(setStatus('data'));
  }
};

export const selectBranches = (state: RootState) => state.Branchs.branchs;
export const selectBranch = (state: RootState) => state.Branchs.branch;
export const selectBranchesStatus = (state: RootState) => state.Branchs.status;

export default BranchsSlice.reducer;
