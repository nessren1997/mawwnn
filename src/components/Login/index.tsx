import React, { FC, useEffect } from 'react';
import { Form, Input, Row, Button, Checkbox, notification, Col, Space, Typography, Divider } from 'antd';
import { styledInput } from '../../constants/layout/responsive';
import useTranslation from 'next-translate/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginAsync,
  selectLoginStatus,
  selectUser,
  selectError,
  selectAdmin,
  clearLoginStatus,
  LoginFBAsync,
} from '../../redux/app';
import Link from 'next/link';
import { useForm } from 'antd/lib/form/Form';
import { useRouter } from 'next/dist/client/router';
import Login_Req from '../../models/auth/login-req';
import { useIsMount } from '../../utils/helpers/is-mount';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { FBSvg } from '../../widgets/site/Footer/social-icons';
import { GoogleSvg } from '../../constants/svgs';

const { Text } = Typography;

const Login: FC = () => {
  const { t, lang } = useTranslation('login');
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const status = useSelector(selectLoginStatus);
  const admin = useSelector(selectAdmin);
  const error = useSelector(selectError);
  const [form] = useForm();
  const { replace } = useRouter();
  const isMount = useIsMount();

  useEffect(() => {
    dispatch(clearLoginStatus());
  }, []);

  useEffect(() => {
    if (!isMount && status === 'error' && error === 'not-verified-error') {
      replace('/verfiy-email');
      notification['error']({
        message: t('notValid'),
      });
    } else if (!isMount && status === 'error' && error === 'username-password-error') {
      notification['error']({
        message: t('errorLogin'),
      });
    }
  }, [error, status]);

  useEffect(() => {
    if (status === 'data' && user) {
      if (admin) replace('/dashboard');
      else replace('/');
    }
  }, [user, admin, status]);

  useEffect(() => {
    form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const onFinish = (value: Login_Req) => {
    dispatch(loginAsync(value));
  };

  const responseFacebook = (req: ReactFacebookLoginInfo) => {
    if (!isMount) {
      dispatch(LoginFBAsync(req, 'facebook'));
    }
  };

  const responseGoogle = (req: any) => {
    if (!isMount) {
      dispatch(LoginFBAsync(req, 'google'));
    }
  };

  return (
    <>
      <Form onFinish={onFinish} form={form}>
        <Form.Item name='email' rules={[{ required: true, message: t('emailReq') }]}>
          <Input {...styledInput} placeholder={t('email')} type='email' />
        </Form.Item>

        <Form.Item
          name='password'
          style={{ margin: '0px' }}
          rules={[
            { required: true, message: t('passwordReq') },
            () => ({
              validator(_, value) {
                if (value && value.length >= 8) {
                  return Promise.resolve();
                }
                return Promise.reject(t('passwordLength'));
              },
            }),
          ]}
        >
          <Input.Password {...styledInput} placeholder={t('password')} type='password' />
        </Form.Item>
        <Row justify='space-between' style={{ paddingTop: '30px' }}>
          <Form.Item>
            <Button type='link'>
              <Checkbox>
                <span
                  style={{
                    color: '#8d2cd3',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  {t('save-this-information')}
                </span>
              </Checkbox>
            </Button>
          </Form.Item>
          <Form.Item>
            <Link href='/reset-password'>
              <Button type='link' style={{ color: '#8d2cd3' }}>
                <span style={{ textDecoration: 'underline' }}>{t('forgot-your-password')}</span>
              </Button>
            </Link>
          </Form.Item>
        </Row>
        <Row>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              style={{ minHeight: 40, minWidth: 100 }}
              shape='round'
              type='primary'
              htmlType='submit'
              loading={status === 'loading'}
            >
              {t('sign-in')}
            </Button>
          </Form.Item>
        </Row>
      </Form>

      <Divider />

      <Row justify='center' style={{ marginTop: 30 }}>
        <Col span={22}>
          <Space direction='vertical' style={{ width: '100%', textAlign: 'center' }}>
            <Text>or</Text>

            <FacebookLogin
              appId='213310907289939'
              fields='name,email,picture.width(640)'
              callback={responseFacebook}
              scope='public_profile'
              buttonStyle={{ width: '100%'  }}
              autoLoad={false}
              size='small'
              icon={<FBSvg style={{ margin: '0 10px 0 0' }} />}
            />

            <GoogleLogin
              clientId='426725736753-ojtqd0023of60nhftbtgp2gu3as3fje1.apps.googleusercontent.com'
              buttonText='Login with Google'
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              autoLoad={false}
              cookiePolicy={'single_host_origin'}
              render={(renderProps: any) => (
                <Button
                  block
                  color='primary'
                  onClick={renderProps.onClick}
                  icon={<GoogleSvg />}
                  style={{ fontWeight: 'bold', padding: '6px', height: 'auto' }}
                >
                  Login with Google
                </Button>
              )}
            />
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default Login;
