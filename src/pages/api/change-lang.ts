import { NextApiRequest, NextApiResponse } from 'next';
import ApiResponseDone from '../../utils/api/models/api-response-done';
import setLang from '../../utils/helpers/set-lang';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { lang } = req.body;
  if (lang) {
    setLang(req, res, lang);
    return res.status(200).json({});
  } else
    return res.status(400).json({
      data: '',
      message: 'This Language Is Not Avilible',
      status: false,
      code: 400,
    } as ApiResponseDone);
};
