import React from 'react';
import { Row, Col, Typography, Space } from 'antd';
import { primaryColor } from '../constants/layout/color';
import useTranslation from 'next-translate/useTranslation';

const { Title } = Typography;

const index = () => {
  const { t } = useTranslation('common');
  return (
    <Row justify='center'>
      <Col span={14}>
        <Space direction='vertical' size={60} style={{ width: '100%', textAlign: 'center' }}>
          <img src='/assets/404.svg' width='100%' />
          <Title level={3} style={{ color: primaryColor }}>
            {t`This page could not be found | 404`}
          </Title>
        </Space>
      </Col>
    </Row>
  );
};
export default index;
