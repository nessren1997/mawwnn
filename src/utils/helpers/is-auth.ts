import { KEY_TOKEN_COOKIE } from '../../constants/keys/index';
import Cookie from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';

const isAuth = (req: IncomingMessage | NextApiRequest, res: ServerResponse | NextApiResponse): boolean =>
  new Cookie(req, res).get(KEY_TOKEN_COOKIE) ? true : false;

export default isAuth;
