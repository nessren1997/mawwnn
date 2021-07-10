import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row, Typography } from 'antd';
import { selectIsMobile } from '../../redux';
import { primaryColor } from '../../constants/layout/color';

const { Title } = Typography;

const SectionTitle: FC<{ title: string }> = ({ title }) => {
  const isMobile = useSelector(selectIsMobile);
  return (
    <Row align='middle'>
      <Col>
        <Title style={{ color: primaryColor, fontWeight: 500 }} level={isMobile ? 3 : 2}>
          {title}
        </Title>
      </Col>
    </Row>
  );
};
export default SectionTitle;
