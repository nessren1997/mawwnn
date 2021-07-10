import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';
import { blogService } from '../../services';
import {
  Blog,
  Blog_U_Req,
  Blog_S_Req,
  Blog_I_Req,
  Blog_D_Req,
} from '../../models';
import ApiErrorNotification from '../../utils/ui/notificationService';
import isError from '../../utils/helpers/is-error';
import requestStatus from '../../constants/enums/request-status';

interface BlogsState {
  status: requestStatus;
  blogs: Blog[];
  blog?: Blog;
}

let initialState: BlogsState = {
  status: 'no-thing',
  blogs: [],
};

const BlogsSlice = createSlice({
  name: 'Blogs',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<requestStatus>) => {
      state.status = payload;
    },
    InsertBlog: ({ blogs }, { payload }: PayloadAction<Blog>) => {
      blogs.push(payload);
    },
    ShowBlog: (state, { payload }: PayloadAction<Blog>) => {
      state.blog = payload;
    },
    UpdateBlog: (state, { payload }: PayloadAction<Blog>) => {
      let ind = state.blogs.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.blogs[ind] = payload;
    },
    DeleteBlog: ({ blogs }, { payload }: PayloadAction<number>) => {
      let index = blogs.findIndex((el) => el.id === payload);
      if (index !== -1) blogs.splice(index, 1);
    },
    FetchBlogs: (state, { payload }: PayloadAction<Blog[]>) => {
      state.blogs = payload;
    },
  },
});

const {
  setStatus,
  InsertBlog,
  UpdateBlog,
  DeleteBlog,
  FetchBlogs,
  ShowBlog,
} = BlogsSlice.actions;

export const InsertBlogAsync = (req: Blog_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await blogService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertBlog(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowBlogAsync = (req: Blog_S_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await blogService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowBlog(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateBlogAsync = (req: Blog_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await blogService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateBlog(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteBlogAsync = (req: Blog_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await blogService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteBlog(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchBlogsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await blogService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchBlogs(result.data));
    dispatch(setStatus('data'));
  }
};

export const selectBlogs = (state: RootState) => state.Blogs.blogs;
export const selectBlog = (state: RootState) => state.Blogs.blog;
export const selectBlogsStatus = (state: RootState) => state.Blogs.status;

export default BlogsSlice.reducer;
