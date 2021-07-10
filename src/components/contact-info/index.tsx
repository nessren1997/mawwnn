import { Col, Row, Space, Typography } from 'antd';
import React, { CSSProperties, FC, useEffect, useState } from 'react';
import { MailOutlined, MobileOutlined, FallOutlined } from '@ant-design/icons';
import useTranslation from 'next-translate/useTranslation';
import { Branch } from '../../models';
import { primaryColor } from '../../constants/layout/color';

const { Text } = Typography;

const icon_layout: { style: CSSProperties } = {
  style: {
    padding: '15px',
    fontSize: '22px',
    borderRadius: '50%',
    backgroundColor: '#fff',
  },
};

const ContactInfo: FC<{ branch: Branch }> = ({ branch }) => {
  const { t, lang } = useTranslation('common');
  const en = lang === 'en';

  return (
    <Row
      align='middle'
      justify='center'
      style={{
        backgroundColor: '#d8dcdc',
        padding: '30px',
        width: '100%',
        height: '100%',
      }}
    >
      <Col span={24} style={{ marginBottom: 30 }}>
        <Row align='middle' justify='space-between'>
          <Col lg={24}>
            <Text style={{ fontWeight: 'bold' }}>{t('contact-information')}</Text>
          </Col>
          {/* <Col lg={24}>
            <Space style={{ margin: '10px 0px' }} direction='horizontal' size='large'>
              <Col>
                <MailOutlined {...icon_layout} />
              </Col>
              <Col>
                <MobileOutlined {...icon_layout} />
              </Col>
              <Col>
                <FallOutlined {...icon_layout} />
              </Col>
            </Space>
          </Col> */}
        </Row>
      </Col>

      <Col span={24}>
        <Row align='middle' justify='space-between'>
          <Col span={24}>
            <Space size='middle' direction='vertical' style={{ direction: 'ltr', width: '100%' }}>
              {branch?.settings.map((el) => (
                <Col key={el.id} span={24}>
                  <Row justify='space-between' gutter={[6, 0]}>
                    <Col lg={2} xs={4}>
                      <img src={el.icon} />
                    </Col>
                    <Col lg={10} xs={24}>
                      <Text style={{ fontWeight: 'bold' }}>{el.key}</Text>
                    </Col>
                    <Col lg={12} xs={24} dir='ltr'>
                      <Text
                        style={{
                          color: primaryColor,
                          fontWeight: 'bold',
                          direction: 'ltr',
                        }}
                      >
                        {el.value}
                      </Text>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ContactInfo;
