import React, { FC, useEffect } from 'react';
import { FBSvg } from './social-icons/index';
import { useDispatch, useSelector } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';
import { primaryColor } from '../../../constants/layout/color';
import { InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Space, Typography, Form, notification } from 'antd';
import { InsertEmailAsync, selectEmailsStatus } from '../../../redux/email';

import './style.less';

const btnProps: {
  type: 'primary';
  shape: 'circle';
  size: 'large';
  style: React.CSSProperties;
} = {
  type: 'primary',
  shape: 'circle',
  size: 'large',
  style: {
    lineHeight: 1.8,
  },
};

const { Title, Text, Link } = Typography;

const FollowUs: FC = () => {
  const { t } = useTranslation('footer');
  const dispatch = useDispatch();
  const status = useSelector(selectEmailsStatus);

  const handleConfirm = (req: { email: string }) => {
    dispatch(InsertEmailAsync(req));
  };

  useEffect(() => {
    status === 'data' &&
      notification.success({
        message: t`Thanks for submitting your email`,
        duration: 2,
        placement: 'bottomRight',
      });
  }, [status]);

  return (
    <Row style={{ fontSize: '1.1em' }} justify='space-between' align='middle' gutter={[{}, { sm: 20, xs: 20 }]}>
      <Col lg={8} md={16} sm={20} xs={24}>
        <Space direction='vertical' size='small'>
          <Title style={{ color: primaryColor }} level={3}>
            {t('company_name')}
          </Title>
          <Text strong>{t('subscribe')}</Text>
        </Space>
      </Col>
      <Col lg={8} md={16} sm={20} xs={24}>
        <Form onFinish={handleConfirm}>
          <Row style={{ direction: 'ltr' }}>
            <Col span={18}>
              <Form.Item
                label={t`e_newsletter`}
                labelCol={{ span: 24 }}
                name='email'
                rules={[
                  { required: true, message: t`required` },
                  { type: 'email', message: t`type_email` },
                ]}
              >
                <Input placeholder={t('enter_email')} className='send-email-input' style={{ width: '100%' }} allowClear />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item style={{ width: 'fit-content' }}>
                <Button
                  className='send-email-btn'
                  loading={status === 'loading'}
                  htmlType='submit'
                  type='primary'
                  size='large'
                  danger
                >
                  {t('confirm')}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>

      <Col lg={4} md={10} sm={20} xs={24}>
        <Title level={4}>{t('follow_us')}</Title>
        <Space direction='horizontal' size='large'>
          <Link href='https://www.facebook.com/dtic.co/' target='_blank'>
            <Button {...btnProps} icon={<FBSvg />} />
          </Link>
          <Link href='https://www.instagram.com/dtic.me/' target='_blank'>
            <Button {...btnProps} icon={<InstagramOutlined />} />
          </Link>
          <Link href='https://twitter.com/home/' target='_blank'>
            <Button {...btnProps} icon={<TwitterOutlined />} />
          </Link>
        </Space>
      </Col>
    </Row>
  );
};
export default FollowUs;
