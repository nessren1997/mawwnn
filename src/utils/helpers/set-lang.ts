import { NextApiRequest, NextApiResponse } from 'next';
import { KEY_LANG_COOKIE } from '../../constants/keys';
import Cookie from 'cookies';

const setLang = (req: NextApiRequest, res: NextApiResponse, locale: string) => new Cookie(req, res).set(KEY_LANG_COOKIE, locale);

export default setLang;
