import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { emailService } from '../../services';
import { Email, Email_I_Req, Email_D_Req } from '../../models';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';
import { message } from 'antd';

interface EmailsState {
  status: requestStatus;
  emails: Email[];
  email?: Email;
}

let initialState: EmailsState = {
  status: 'no-thing',
  emails: [],
};

const EmailsSlice = createSlice({
  name: 'Emails',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    InsertEmail: ({ emails }, { payload }: PayloadAction<Email>) => {
      emails.push(payload);
    },
    DeleteEmail: ({ emails }, { payload }: PayloadAction<number>) => {
      let index = emails.findIndex((el) => el.id === payload);
      if (index !== -1) emails.splice(index, 1);
    },
  },
});

const { setStatus, InsertEmail, DeleteEmail } = EmailsSlice.actions;

export const InsertEmailAsync = (req: Email_I_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await emailService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertEmail(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteEmailAsync = (req: Email_D_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await emailService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteEmail(req.id));
    dispatch(setStatus('data'));
  }
};

export const selectEmailsStatus = (state: RootState) => state.Emails.status;

export default EmailsSlice.reducer;
