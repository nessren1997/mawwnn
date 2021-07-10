import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { applicantService } from '../../services';
import { Applicant, Applicant_I_Req, Applicant_D_Req } from '../../models';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';

interface ApplicantsState {
  status: requestStatus;
  applicants: Applicant[];
}

let initialState: ApplicantsState = {
  status: 'no-thing',
  applicants: [],
};

const ApplicantsSlice = createSlice({
  name: 'Applicants',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    InsertApplicant: (
      { applicants },
      { payload }: PayloadAction<Applicant>
    ) => {
      applicants.push(payload);
    },
    DeleteApplicant: ({ applicants }, { payload }: PayloadAction<number>) => {
      let index = applicants.findIndex((el) => el.id === payload);
      if (index !== -1) applicants.splice(index, 1);
    },
    FetchApplicants: (state, { payload }: PayloadAction<Applicant[]>) => {
      state.applicants = payload;
    },
  },
});

const {
  setStatus,
  InsertApplicant,
  DeleteApplicant,
  FetchApplicants,
} = ApplicantsSlice.actions;

export const InsertApplicantAsync = (
  job_id: number,
  req: Applicant_I_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));

  console.log(job_id, req);

  const result = await applicantService.Insert(job_id, req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertApplicant(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteApplicantAsync = (req: Applicant_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await applicantService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteApplicant(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchApplicantsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await applicantService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchApplicants(result.data));
    dispatch(setStatus('data'));
  }
};

export const selectApplicants = (state: RootState) =>
  state.Applicants.applicants;
export const selectApplicantsStatus = (state: RootState) =>
  state.Applicants.status;

export default ApplicantsSlice.reducer;
