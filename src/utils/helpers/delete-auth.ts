import { KEY_TOKEN_COOKIE } from '../../constants/keys/index';
import { NextApiRequest, NextApiResponse } from 'next';
import Cookie from 'cookies';

const deleteAuth = (req: NextApiRequest, res: NextApiResponse) =>
  new Cookie(req, res).set(KEY_TOKEN_COOKIE);

export default deleteAuth;
