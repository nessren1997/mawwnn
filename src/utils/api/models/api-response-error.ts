import ApiErrorType from '../enums/api-error-type';
import ApiRequestError from './api-request-error';

export default interface ApiResponseError extends ApiRequestError {
  data: any;
  status: boolean;
  errorType: ApiErrorType;
  paginate: any;
  message: {
    text: string;
    errors: {
      email?: string[];
      phone?: string[];
    };
  };
  code: number;
}
