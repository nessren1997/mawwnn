import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { newsLetterService } from '../../services/news-letter';
import {
  NewsLetter,
  NewsLetter_I_Req,
  NewsLetter_D_Req,
} from '../../models/news-letter';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';

interface NewsLettersState {
  status: requestStatus;
  newsLetters: NewsLetter[];
  newsLetter?: NewsLetter;
}

let initialState: NewsLettersState = {
  status: 'no-thing',
  newsLetters: [],
};

const NewsLettersSlice = createSlice({
  name: 'NewsLetters',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    InsertNewsLetter: (
      { newsLetters },
      { payload }: PayloadAction<NewsLetter>
    ) => {
      newsLetters.push(payload);
    },
    DeleteNewsLetter: ({ newsLetters }, { payload }: PayloadAction<number>) => {
      let index = newsLetters.findIndex((el) => el.id === payload);
      if (index !== -1) newsLetters.splice(index, 1);
    },
    FetchNewsLetters: (state, { payload }: PayloadAction<NewsLetter[]>) => {
      state.newsLetters = payload;
    },
  },
});

const {
  setStatus,
  InsertNewsLetter,
  DeleteNewsLetter,
  FetchNewsLetters,
} = NewsLettersSlice.actions;

export const InsertNewsLetterAsync = (
  req: NewsLetter_I_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await newsLetterService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertNewsLetter(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteNewsLetterAsync = (
  req: NewsLetter_D_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await newsLetterService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteNewsLetter(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchNewsLettersAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await newsLetterService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchNewsLetters(result.data));
    dispatch(setStatus('data'));
  }
};

export const selectNewsLetter = (state: RootState) => state.NewsLetters;

export default NewsLettersSlice.reducer;
