import Cookies from 'cookies';
import { GetServerSideProps } from 'next';
import { KEY_USER_COOKIE } from '../../constants/keys';
import { User } from '../../models';
import isAuth from './is-auth';

export const DashboardAuthenticated: GetServerSideProps<any> = async ({ req, res }) => {
  const arr = req.url!.split('/');
  const pathname = arr[arr.length - 1].replace(/\.json/g, '');
  const cookies = new Cookies(req, res);
  const tmp = cookies.get(KEY_USER_COOKIE);
  if (
    tmp &&
    pathname !== 'winners' &&
    pathname !== 'gifts-items' &&
    pathname !== 'dashboard' &&
    pathname !== 'receiving-centers' &&
    pathname !== 'pending' &&
    pathname !== 'contacted' &&
    pathname !== 'delivered' &&
    pathname !== 'closed-number' &&
    pathname !== 'wrong-number'
  ) {
    const user = JSON.parse(tmp) as User;
    if (user.permissions.findIndex((el) => el.name.includes(pathname)) === -1)
      return { redirect: { destination: '/error/auth', statusCode: 307 } };
  }
  if (!isAuth(req, res)) return { redirect: { destination: '/error/auth', statusCode: 307 } };
  return { props: { message: 'Authonticated' } };
};
