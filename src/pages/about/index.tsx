import React, { FC } from 'react';
import { Col, Row } from 'antd';
import AboutUs from '../../components/about';

const index: FC = () => {
  return (
    <Row justify='center'>
      <Col span={24}>
        <AboutUs />
      </Col>
    </Row>
  );
};

export default index;
