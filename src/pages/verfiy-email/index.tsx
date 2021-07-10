import { Col, Form, Input, notification, Row, Typography } from 'antd';
import React, { useEffect } from 'react';
import ContainerShadow from '../../components/container-shadow';
import { responsive_constant } from '../../constants/layout/responsive';
import { styledInput } from '../../constants/layout/responsive';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import { clearStatus, resendOTPAsync, selectVerfiyStatus, verfiyAsync } from '../../redux/verfiy';
import VerfiyReq from '../../models/verfiy-email';
import { selectApp, selectUser } from '../../redux/app';
import PLButton from '../../components/PLButton';
import { CheckCircleTwoTone, PoweroffOutlined } from '@ant-design/icons';
import { GetStaticProps } from 'next';
import { RootState } from '../../redux/store';
import { useIsMount } from '../../utils/helpers/is-mount';

const Index: React.FC = () => {
  const { t, lang } = useTranslation('verfiy-email');
  const isMount = useIsMount();
  const dispatch = useDispatch();
  const { replace } = useRouter();
  const app = useSelector(selectApp);
  const [form] = Form.useForm();
  const status = useSelector(selectVerfiyStatus);
  const { otp_status } = useSelector((state: RootState) => state.Verify);

  const onFinish = (values: any) => {
    if (app.emailforverify) {
      let res: VerfiyReq = {
        otp: values.otp,
        email: app.emailforverify,
      };
      dispatch(verfiyAsync(res));
    } else {
      replace('/login');
    }
  };

  const onResendCode = () => {
    if (app.emailforverify) {
      dispatch(resendOTPAsync({ email: app.emailforverify }));
    }
  };

  useEffect(() => {
    if (status === 'data') {
      replace('/');
    } else if (status === 'error') {
      notification['error']({
        message: t('errorVer'),
      });
    }
  }, [status]);

  useEffect(() => {
    if (!isMount) {
      if (otp_status === 'data') {
        notification.success({ message: t`code sent successfully` });
      }
    }
  }, [otp_status]);

  useEffect(() => {
    dispatch(clearStatus());
    form.resetFields();
  }, [lang]);

  return (
    <>
      <Row justify='center' style={{ padding: '30px 0px' }}>
        <Col {...responsive_constant}>
          <Row justify='center'>
            <ContainerShadow>
              <Form onFinish={onFinish} form={form}>
                <Row>
                  <Col flex='auto'>
                    <Form.Item name='otp' rules={[{ required: true, message: t('otpReq') }]}>
                      <Input {...styledInput} placeholder={t('verfyCode')} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify='space-between'>
                  <Form.Item>
                    <PLButton
                      htmlType='submit'
                      loading={status === 'loading'}
                      icon={
                        status === 'loading' ? (
                          <PoweroffOutlined />
                        ) : status === 'data' ? (
                          <CheckCircleTwoTone twoToneColor='#52c41a' />
                        ) : (
                          ''
                        )
                      }
                    >
                      {t('verfiy')}
                    </PLButton>
                  </Form.Item>
                  <Typography.Link
                    disabled={otp_status === 'loading'}
                    onClick={onResendCode}
                  >{t`resend the code`}</Typography.Link>
                </Row>
              </Form>
            </ContainerShadow>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
