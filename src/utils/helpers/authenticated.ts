import { GetServerSideProps } from 'next';
import isAuth from './is-auth';

const Authenticated: GetServerSideProps<any> = async ({ req, res }) => {
  if (!isAuth(req, res)) return { redirect: { destination: '/error/auth', statusCode: 307 } };
  return { props: { message: 'Authenticated' } };
};

export default Authenticated;
