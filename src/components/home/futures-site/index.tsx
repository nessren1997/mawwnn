import React, { CSSProperties, FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Col, Row, Typography, Image } from 'antd';
import './style.less';

interface Props {}

const title_layout: { level: 5; style: CSSProperties } = {
  level: 5,
  style: { color: '#fff', fontWeight: 400 },
};

const subtitle_layout: { style: CSSProperties } = {
  style: { color: '#fff', fontSize: '.8em', fontWeight: 100 },
};

const img_layout: { preview: boolean; width: number; style: CSSProperties } = {
  preview: false,
  width: 100,
  style: { marginBottom: 20 },
};

const { Text, Title } = Typography;

const FuturesSite: FC<Props> = () => {
  const { t } = useTranslation('home');

  return (
    <Row
      justify='space-around'
      align='middle'
      gutter={[16, 40]}
      className='futuresSite'
    >
      <Col lg={7} md={8} sm={24} className='column'>
        <Image {...img_layout} src={'/assets/3.png'} />
        <Title {...title_layout}>{t('help_center_title')}</Title>
        {/* <Text {...subtitle_layout}>{t('help_center_subtitle')}</Text> */}
      </Col>
      <Col lg={7} md={8} sm={24} className='column'>
        <Image {...img_layout} src={'/assets/2.png'} />
        <Title {...title_layout}>{t('money_back_title')}</Title>
        {/* <Text {...subtitle_layout}>{t('money_back_subtitle')}</Text> */}
      </Col>
      <Col lg={7} md={8} sm={24} className='column'>
        <Image {...img_layout} src={'/assets/1.png'} />
        <Title {...title_layout}>{t('free_shipping_title')}</Title>
        {/* <Text {...subtitle_layout}>{t('free_shipping_subtitle')}</Text> */}
      </Col>
    </Row>
  );
};
export default FuturesSite;
