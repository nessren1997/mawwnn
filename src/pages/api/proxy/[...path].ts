import { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import Cookies from 'cookies';
import url from 'url';

import { KEY_TOKEN_HEADER, KEY_TOKEN_COOKIE, KEY_LANG_HEADER, KEY_USER_COOKIE } from '../../../constants/keys';
import ApiResponseDone from '../../../utils/api/models/api-response-done';
import ApiResult from '../../../utils/api/models/api-result';
import { Login_Res } from '../../../models/auth/login-res';
import ApiResponseError from '../../../utils/api/models/api-response-error';

// Get the actual API_URL as an environment variable. For real
// applications, you might want to get it from 'next/config' instead.
const API_URL = process.env.API_URL!;

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>((resolve, reject) => {
    const pathname = url.parse(req.url!).pathname;

    const isLogin = pathname?.endsWith('login') || pathname?.endsWith('verify-email');

    const cookies = new Cookies(req, res);

    const token = cookies.get(KEY_TOKEN_COOKIE);
    const lang = url.parse(req.headers['referer']!).pathname?.split('/').includes('en') ? 'en' : 'ar';
    let multiLang = req.headers['referer'] && req.headers['referer'].includes('dashboard');
    // Rewrite URL, strip out leading '/api'
    // '/api/proxy/*' becomes '${API_URL}/*'
    req.url = req.url!.replace(/^\/api\/proxy/, '');
    // Don't forward cookies to API
    req.headers.cookie = '';

    // Set auth-token header from cookie
    req.headers[KEY_TOKEN_HEADER] = `Bearer ${token}`;

    if (!multiLang) req.headers[KEY_LANG_HEADER] = lang;

    req.headers['accept'] = 'application/json';

    proxy
      .once('proxyRes', (proxyRes?: any, req?: NextApiRequest, res?: NextApiResponse) => {
        if (isLogin) {
          let responseBody = '';
          proxyRes.on('data', (chunk: string) => {
            responseBody += chunk;
          });

          proxyRes.on('end', () => {
            try {
              const cookies = new Cookies(req!, res!);

              const result: ApiResult<Login_Res> = JSON.parse(responseBody);

              if (!(result as ApiResponseError).status) {
                cookies.set(KEY_TOKEN_COOKIE, undefined, {
                  httpOnly: true,
                  sameSite: 'lax', // CSRF protection
                });

                res!.status((result as ApiResponseError).code).json(result);
              } else {
                const {
                  data: { user, token },
                  status,
                  code,
                  message,
                } = result as ApiResponseDone;

                cookies.set(KEY_TOKEN_COOKIE, token, {
                  httpOnly: true,
                  sameSite: 'lax', // CSRF protection
                });

                cookies.set(KEY_USER_COOKIE, JSON.stringify(user), {
                  sameSite: 'lax', // CSRF protection
                });

                res!.status(200).json({
                  data: { user: user, token: '' },
                  status,
                  message,
                  code,
                } as ApiResponseDone);
              }
              resolve();
            } catch (err) {
              reject(err);
            }
          });
        } else {
          resolve();
        }
      })
      .once('error', reject)
      .web(
        req,
        res,
        {
          target: API_URL,
          autoRewrite: false,
          selfHandleResponse: isLogin,
          changeOrigin: true,
        },
        (e) => console.error(e)
      );
  });
};
