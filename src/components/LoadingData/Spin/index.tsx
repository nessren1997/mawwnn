import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Col, Row, Space, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { primaryColor } from '../../../constants/layout/color';

const Spin = () => {
  const { t } = useTranslation('common');

  return (
    <Row style={{ paddingBottom: 50 }} justify='center' align='middle'>
      <Col>
        <Space size='large' direction='vertical' align='center'>
          <Typography.Title level={3} style={{ color: 'gray' }}>
            {t('loading_date')}
          </Typography.Title>
          <LoadingOutlined style={{ fontSize: '100px', color: primaryColor }} spin />
        </Space>
      </Col>
    </Row>
  );
};

export default Spin;
