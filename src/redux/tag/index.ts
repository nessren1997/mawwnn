import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { tagService } from '../../services/tag';
import {
  Tag,
  Tag_U_Req,
  Tag_S_Req,
  Tag_I_Req,
  Tag_D_Req,
} from '../../models/tag';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';

interface TagsState {
  status: requestStatus;
  tags: Tag[];
  tag?: Tag;
}

let initialState: TagsState = {
  status: 'no-thing',
  tags: [],
};

const TagsSlice = createSlice({
  name: 'Tags',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    InsertTag: ({ tags }, { payload }: PayloadAction<Tag>) => {
      tags.push(payload);
    },
    ShowTag: (state, { payload }: PayloadAction<Tag>) => {
      state.tag = payload;
    },
    UpdateTag: (state, { payload }: PayloadAction<Tag>) => {
      let ind = state.tags.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.tags[ind] = payload;
    },
    DeleteTag: ({ tags }, { payload }: PayloadAction<number>) => {
      let index = tags.findIndex((el) => el.id === payload);
      if (index !== -1) tags.splice(index, 1);
    },
    FetchTags: (state, { payload }: PayloadAction<Tag[]>) => {
      state.tags = payload;
    },
  },
});

const {
  setStatus,
  InsertTag,
  UpdateTag,
  DeleteTag,
  FetchTags,
  ShowTag,
} = TagsSlice.actions;

export const InsertTagAsync = (req: Tag_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await tagService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertTag(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowTagAsync = (req: Tag_S_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await tagService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowTag(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateTagAsync = (req: Tag_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await tagService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateTag(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteTagAsync = (req: Tag_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await tagService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteTag(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchTagsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await tagService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchTags(result.data));
    dispatch(setStatus('data'));
  }
};

export const selectTag = (state: RootState) => state.Tags;

export default TagsSlice.reducer;
