import ApiErrorType from '../enums/api-error-type';

export default interface ApiRequestError {
  errorType: ApiErrorType;
}
