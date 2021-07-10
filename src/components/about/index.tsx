import React, { FC, useEffect } from 'react';
import { Col, Image, Row, Space, Typography } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { selectAboutUs, selectAboutUsStatus, FetchAboutUsAsync } from '../../redux/about-us';
import './style.less';
import LoadingData from '../LoadingData';
import { primaryColor } from '../../constants/layout/color';

const { Title } = Typography;

const AboutUs: FC = () => {
  const { t } = useTranslation('common');
  const { lang } = useTranslation();
  const dispatch = useDispatch();
  const status = useSelector(selectAboutUsStatus);
  const about = useSelector(selectAboutUs);

  useEffect(() => {
    dispatch(FetchAboutUsAsync());
  }, [lang]);
  return (
    <LoadingData dataValid={() => (about ? true : false)} loading={status === 'loading'}>
      <div className='about-back' />
      <div className='about-card'>
        <Image preview={false} className='about-img' width='100%' src='/assets/new/about-us.png' />
        <div className='about-content'>
          <Title level={2} style={{ fontWeight: 'normal', color: primaryColor }}>
            {t('introduction')}
          </Title>
          <Row
            justify='center'
            style={{
              fontWeight: 500,
              lineHeight: 2.6,
            }}
          >
            <Col span={23}>
              <Space direction='vertical' size={40}>
                <p style={{ color: 'GrayText' }} dangerouslySetInnerHTML={{ __html: about?.content! }} />
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </LoadingData>
  );
};
export default AboutUs;
