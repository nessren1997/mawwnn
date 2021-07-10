import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { jobService } from '../../services';
import { Job, Job_U_Req, Job_S_Req, Job_I_Req, Job_D_Req } from '../../models';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';

interface JobsState {
  status: requestStatus;
  jobs: Job[];
  job?: Job;
}

let initialState: JobsState = {
  status: 'no-thing',
  jobs: [],
};

const JobsSlice = createSlice({
  name: 'Jobs',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    InsertJob: ({ jobs }, { payload }: PayloadAction<Job>) => {
      jobs.push(payload);
    },
    ShowJob: (state, { payload }: PayloadAction<Job>) => {
      state.job = payload;
    },
    UpdateJob: (state, { payload }: PayloadAction<Job>) => {
      let ind = state.jobs.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.jobs[ind] = payload;
    },
    DeleteJob: ({ jobs }, { payload }: PayloadAction<number>) => {
      let index = jobs.findIndex((el) => el.id === payload);
      if (index !== -1) jobs.splice(index, 1);
    },
    FetchJobs: (state, { payload }: PayloadAction<Job[]>) => {
      state.jobs = payload;
    },
  },
});

const { setStatus, InsertJob, UpdateJob, DeleteJob, FetchJobs, ShowJob } = JobsSlice.actions;

export const InsertJobAsync = (req: Job_I_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await jobService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertJob(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowJobAsync = (req: Job_S_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await jobService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowJob(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateJobAsync = (req: Job_U_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await jobService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateJob(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteJobAsync = (req: Job_D_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await jobService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteJob(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchJobsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await jobService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchJobs(result.data));
    dispatch(setStatus('data'));
  }
};

export const clearStatus = (): AppThunk => (dispatch) => {
  dispatch(setStatus('no-thing'));
};

export const selectJobs = (state: RootState) => state.Jobs.jobs;
export const selectJob = (state: RootState) => state.Jobs.job;
export const selectJobsStatus = (state: RootState) => state.Jobs.status;

export default JobsSlice.reducer;
