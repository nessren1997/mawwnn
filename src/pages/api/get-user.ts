import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';
import { KEY_USER_COOKIE } from '../../constants/keys';
import ApiResponseDone from '../../utils/api/models/api-response-done';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res);  
  const user = cookies.get(KEY_USER_COOKIE);
  if (user) {
    return res.status(200).json({
      data: JSON.parse(decodeURIComponent(user)),
      code: 200,
      status: true,
      message: 'user is received',
    } as ApiResponseDone);
  } else
    return res.status(204).json({
      data: '',
      message: 'user not found',
      status: false,
      code: 204,
    } as ApiResponseDone);
};
