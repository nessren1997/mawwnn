import ApiResponseDone from './api-response-done';
import ApiResponseError from './api-response-error';

type ApiResponse<T = any> = ApiResponseError | ApiResponseDone<T>;

export default ApiResponse;
