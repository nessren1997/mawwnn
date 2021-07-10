import { NextApiRequest, NextApiResponse } from 'next';

import deleteAuth from '../../utils/helpers/delete-auth';
import deleteUser from '../../utils/helpers/delete-user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  deleteAuth(req, res);
  deleteUser(req, res);
  return res.status(200).json({});
};
