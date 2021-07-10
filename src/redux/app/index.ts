import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';

import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';

import requestStatus from '../../constants/enums/request-status';
import { DEFAULT_LANG, SITE_LANGUAGE } from '../../constants/keys';
import { appServices } from '../../services';
import { User, Register_Req } from '../../models';
import Login_Req from '../../models/auth/login-req';
import updareReq from '../../models/update-user-info/update-req';
import isResponseError from '../../utils/helpers/is-response-error';
import { ReactFacebookLoginInfo } from 'react-facebook-login';

type errorState = 'no-thing' | 'username-password-error' | 'not-verified-error';

type errorMessageState =
  | 'no-thing'
  | 'The email has already been taken'
  | 'The phone has already been taken'
  | 'The email has already been taken,The phone has already been taken';

interface AppState {
  status: requestStatus;
  statusLogin: requestStatus;
  statusLReg: requestStatus;
  statusGetInfo: requestStatus;
  statusUpdateInfo: requestStatus;

  lang: SITE_LANGUAGE;
  user?: User;
  admin: boolean;
  authenticated: boolean;
  approved: boolean;
  emailforverify?: string;

  error: errorState;
  errMessage: errorMessageState;
}

let initialState: AppState = {
  status: 'no-thing',
  statusLogin: 'no-thing',
  statusLReg: 'no-thing',
  statusGetInfo: 'no-thing',
  statusUpdateInfo: 'no-thing',
  lang: DEFAULT_LANG,
  admin: false,
  authenticated: false,
  approved: false,
  emailforverify: '',

  error: 'no-thing',
  errMessage: 'no-thing',
};

const AppSlice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    setLoginStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.statusLogin = payload;
    },
    setRegStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.statusLReg = payload;
    },
    setGetInfoStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.statusGetInfo = payload;
    },
    setUpdateInfoStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.statusUpdateInfo = payload;
    },

    setLang: (state, { payload }: PayloadAction<SITE_LANGUAGE>) => {
      state.lang = payload;
    },

    setUser: (state, { payload }: PayloadAction<User | undefined>) => {
      state.user = payload;
      if (payload) state.authenticated = true;
      else state.authenticated = false;
      if (payload?.permissions.length !== 0) state.admin = true;
      else state.admin = false;
    },

    setApproved: (state, { payload }: PayloadAction<boolean>) => {
      state.approved = payload;
    },

    setError: (state, { payload }: PayloadAction<errorState>) => {
      state.error = payload;
    },
    setErrorMessage: (state, { payload }: PayloadAction<errorMessageState>) => {
      state.errMessage = payload;
    },
    setResetStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    setEmailForVerify: (state, { payload }: PayloadAction<any>) => {
      state.emailforverify = payload;
    },
  },
});

export const { setUser } = AppSlice.actions;
const {
  setLang,
  setStatus: setAppStatus,
  setLoginStatus,
  setRegStatus,
  setGetInfoStatus,
  setUpdateInfoStatus,
  setError,
  setErrorMessage,
  setApproved,
  setEmailForVerify,
} = AppSlice.actions;

export const selectApp = (state: RootState) => state.App;
export const selectUser = (state: RootState) => state.App.user;
export const selectError = (state: RootState) => state.App.error;
export const selectErrorMess = (state: RootState) => state.App.errMessage;

export const selectAppStatus = (state: RootState) => state.App.status;
export const selectLoginStatus = (state: RootState) => state.App.statusLogin;
export const selectRegStatus = (state: RootState) => state.App.statusLReg;
export const selectGetInfoStatus = (state: RootState) => state.App.statusGetInfo;
export const selectUpdateInfoStatus = (state: RootState) => state.App.statusUpdateInfo;

// export const selecetVerfiyStatus = (state: RootState) => state.App.status;
export const selectLang = (state: RootState) => state.App.lang;
export const selectAdmin = (state: RootState) => state.App.admin;

export const setLangAsync =
  (lang: SITE_LANGUAGE): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatus('loading'));
    const result = await appServices.changeLang({ lang });
    if (isError(result)) {
      ApiErrorNotification(result);
      dispatch(setAppStatus('error'));
    } else {
      dispatch(setLang(lang));
      dispatch(setAppStatus('data'));
    }
  };

export const logoutAsync = (): AppThunk => async (dispatch) => {
  dispatch(setAppStatus('loading'));
  const result = await appServices.logout();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setAppStatus('error'));
  } else {
    dispatch(setUser());
    dispatch(setAppStatus('data'));
  }
};

export const loginAsync =
  (req: Login_Req): AppThunk =>
  async (dispatch) => {
    dispatch(setLoginStatus('loading'));
    dispatch(setAppStatus('loading'));
    dispatch(setEmailForVerify(req.email));

    const result = await appServices.login(req);

    if (isError(result)) {
      if (isResponseError(result)) {
        switch (result.code) {
          case 404:
            dispatch(setError('username-password-error'));
            break;

          case 405:
            dispatch(setError('not-verified-error'));
            break;

          default:
            ApiErrorNotification(result);
            break;
        }
      } else ApiErrorNotification(result);

      dispatch(setLoginStatus('error'));
      dispatch(setAppStatus('error'));
    } else {
      dispatch(setUser(result.data.user));
      dispatch(setLoginStatus('data'));
      dispatch(setAppStatus('data'));

      if (result.message !== 'Account Not Verified') dispatch(setApproved(true));
      else dispatch(setApproved(false));
    }
  };

export const registerAsync =
  (req: Register_Req): AppThunk =>
  async (dispatch) => {
    dispatch(setRegStatus('loading'));
    dispatch(setAppStatus('loading'));
    const result: any = await appServices.register(req);

    if (isError(result)) {
      if (isResponseError(result)) {
        if (result.message.errors.email) {
          dispatch(setErrorMessage('The email has already been taken'));
          dispatch(setRegStatus('error'));
        }
        if (result.message.errors.phone) {
          dispatch(setErrorMessage('The phone has already been taken'));
          dispatch(setRegStatus('error'));
        }
      } else ApiErrorNotification(result);
      dispatch(setLoginStatus('error'));
      dispatch(setAppStatus('error'));
    } else {
      // dispatch(setUser(result.data.user));
      dispatch(setEmailForVerify(req.email));
      dispatch(setRegStatus('data'));
      dispatch(setAppStatus('data'));
    }
  };
export const getUserInfoAsync = (): AppThunk => async (dispatch) => {
  dispatch(setGetInfoStatus('loading'));
  dispatch(setAppStatus('loading'));

  const result = await appServices.getUserInfo();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setGetInfoStatus('error'));
    dispatch(setAppStatus('error'));
  } else {
    dispatch(setUser(result.data));
    dispatch(setGetInfoStatus('data'));
    dispatch(setAppStatus('data'));
  }
};
export const updateUserInfo =
  (req: updareReq): AppThunk =>
  async (dispatch) => {
    dispatch(setUpdateInfoStatus('loading'));
    dispatch(setAppStatus('loading'));

    const result = await appServices.updateInfo(req);

    if (isError(result)) {
      ApiErrorNotification(result);
      dispatch(setUpdateInfoStatus('error'));
      dispatch(setAppStatus('error'));
    } else {
      dispatch(getUserInfoAsync());
      dispatch(setUpdateInfoStatus('data'));
      dispatch(setAppStatus('data'));
    }
  };

export const clearLoginStatus = (): AppThunk => async (dispatch) => {
  dispatch(setLoginStatus('loading'));
  dispatch(setAppStatus('no-thing'));
  dispatch(setLoginStatus('no-thing'));
  dispatch(setError('no-thing'));
};

export const LoginFBAsync =
  (req: ReactFacebookLoginInfo, provider: string): AppThunk =>
  async (dispatch) => {
    dispatch(setLoginStatus('loading'));
    const result = await appServices.loginFB(req, provider);
    if (isError(result)) {
      ApiErrorNotification(result);
      dispatch(setLoginStatus('error'));
    } else {
      dispatch(setUser(result.data.user));
      dispatch(setLoginStatus('data'));
    }
  };

export default AppSlice.reducer;
