import ApiErrorType from '../api/enums/api-error-type';
import ApiError from '../api/models/api-error';
import ApiResponseError from '../api/models/api-response-error';

const isResponseError = (result: ApiError): result is ApiResponseError =>
    (result as ApiResponseError).errorType !== ApiErrorType.UNKNOWN && (result as ApiResponseError).errorType !== ApiErrorType.CONNECTION;
export default isResponseError;
