import ApiRequestError from './api-request-error';
import ApiResponseError from './api-response-error';

type ApiError = ApiResponseError | ApiRequestError;
export default ApiError;
