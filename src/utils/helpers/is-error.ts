import ApiError from '../api/models/api-error';
import ApiResult from '../api/models/api-result';

const isError = (result: ApiResult<any>): result is ApiError =>
  (result as ApiError).errorType !== undefined;

export default isError;
