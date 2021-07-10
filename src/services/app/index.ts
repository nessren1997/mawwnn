import { SITE_LANGUAGE } from '../../constants/keys';
import { Login_Res, Register_Req, User } from '../../models';
import Login_Req from '../../models/auth/login-req';
import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';
import Update_Req from '../../models/update-user-info/update-req';
import ResetReq from '../../models/reset-password';
import VerfiyReq from '../../models/verfiy-email/index';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
class AppServices extends ApiService {
  constructor() {
    super({ baseURL: `${process.env.NEXT_PUBLIC_PATH}api` });
  }
  public changeLang = async (req: { lang: SITE_LANGUAGE }): Promise<ApiResult<undefined>> =>
    this.post<undefined>(`/change-lang`, req);

  public login = async (req: Login_Req): Promise<ApiResult<Login_Res>> => this.post<Login_Res>(`/proxy/api/login`, req);

  public logout = async (): Promise<ApiResult<undefined>> => this.post<undefined>(`/logout`);

  public getUser = async (): Promise<ApiResult<User>> => this.post<User>('/get-user');

  public register = async (req: Register_Req): Promise<ApiResult<Login_Res>> => this.post<Login_Res>(`/proxy/api/register`, req);

  public getUserInfo = async (): Promise<ApiResult<User>> => this.get<User>(`/proxy/api/profile`);

  public updateInfo = async (req: Update_Req): Promise<ApiResult<User>> => this.put<User>(`/proxy/api/update-profile`, req);

  public resetPass = async (req: ResetReq): Promise<ApiResult<any>> => this.post<any>(`/proxy/api/reset-password`, req);

  public verfiyEmail = async (req: VerfiyReq): Promise<ApiResult<Login_Res>> =>
    this.post<Login_Res>(`/proxy/api/verify-email`, req);

  public resendOTP = async (req: { email: string }): Promise<ApiResult<Login_Res>> =>
    this.post<Login_Res>(`/proxy/api/resend-otp`, req);

  public loginFB = async (req: ReactFacebookLoginInfo, provider: string): Promise<ApiResult<Login_Res>> =>
    this.post<Login_Res>(`/proxy/api/social/login`, { 'access-token': req.accessToken, 'social-provider': provider });
}

export const appServices = new AppServices();
