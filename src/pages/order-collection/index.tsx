import React, { CSSProperties, FC, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row, Image, Typography, Space } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { responsive_constant } from '../../constants/layout/responsive';
import { selectOrderStatus, selectOrderStatuss } from '../../redux/order-status';
import { useRouter } from 'next/router';
import { primaryColor } from '../../constants/layout/color';
import { OrderStatus } from '../../models/order/enum';

const { Title, Text } = Typography;

const card_layout: {
  style: CSSProperties;
} = {
  style: {
    margin: 80,
    padding: '30px',
    borderRadius: 40,
    backgroundColor: '#f5f5f5',
  },
};

const index: FC = () => {
  const { t, lang } = useTranslation('order-collection');
  const order = useSelector(selectOrderStatuss);
  const status = useSelector(selectOrderStatus);
  const { replace } = useRouter();

  useEffect(() => {
    if (status !== 'data') {
      replace('/check-order');
    }
  }, [status]);

  // const textStatus = (status: string) => {
  //   return <Text style={{ color: '#00a700', fontWeight: 'bold' }}>{status === '0' ? t`pending` : t`received`}</Text>;
  // };

  const textStatus = useCallback(
    (s: OrderStatus) => {
      if (s === OrderStatus['not verified'])
        return <Text style={{ color: '#e12d33', fontWeight: 'bold' }}>{t`personal-collection:order-status.not-verified`}</Text>;
      else if (s === OrderStatus.verified || s === OrderStatus.pending)
        return <Text style={{ color: 'tan', fontWeight: 'bold' }}>{t`personal-collection:order-status.pending`}</Text>;
      else if (s === OrderStatus['on delivery'])
        return (
          <Text style={{ color: 'yellowgreen', fontWeight: 'bold' }}>{t`personal-collection:order-status.on-delivery`}</Text>
        );
      else if (s === OrderStatus.done)
        return <Text style={{ color: 'forestgreen', fontWeight: 'bold' }}>{t`personal-collection:order-status.done`}</Text>;
      else if (s === OrderStatus.rejected)
        return <Text style={{ color: 'red', fontWeight: 'bold' }}>{t`personal-collection:order-status.rejected`}</Text>;
    },
    [lang]
  );

  return (
    <Row justify='center'>
      <Col {...responsive_constant}>
        <Row justify='center'>
          <Col xxl={18} xl={20} lg={22} md={22} xs={24} {...card_layout}>
            <Row justify='center' style={{ paddingBottom: 16, textAlign: 'center' }}>
              <Col>
                <Row justify='center' style={{ paddingBottom: 20 }}>
                  <Col>
                    <Image src='./assets/car.png' width={150} preview={false} />
                  </Col>
                </Row>

                <Title style={{ color: primaryColor }} level={2}>
                  {t('sent')}
                </Title>
              </Col>
            </Row>
            <Row justify='center' align='middle' style={{ textAlign: 'center' }}>
              <Col>
                <Text>{t('procces')}</Text>
                <br />
                <Text style={{ color: '#b9b9b9' }}>{textStatus(order?.order_status!)}</Text>
              </Col>
            </Row>
            <Row justify='center' align='middle' style={{ textAlign: 'center' }}>
              <Col>
                <Text style={{ color: 'red' }}>
                  {t('note')} : {t('can')}
                </Text>
              </Col>
            </Row>
            <Row justify='center' align='middle' style={{ textAlign: 'center' }}>
              <Col>
                <Space direction='horizontal' size='small'>
                  <Text>{t('total')}:</Text>
                  <span style={{ color: '#008000a6' }}>{order?.total}</span>
                  SAR
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default index;
