import React, { useEffect } from 'react';
import { Col, Row, Image, Form, Input, Button, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';
import { Order_proccess_number_Req } from '../../models/order';
import { responsive_constant } from '../../constants/layout/responsive';
import {
  ShowOrderStatusAsync,
  selectOrderStatus,
  ClearOrderStatus,
} from '../../redux/order-status';
import { useRouter } from 'next/router';
import { OrderStatus_S_Req } from '../../models';

const Index: React.FC = () => {
  const { t } = useTranslation('check-order');
  const { query } = useRouter();
  const { order: orderNumber } = query;
  const dispatch = useDispatch();
  const status = useSelector(selectOrderStatus);
  const { replace } = useRouter();

  const onFinish = (value: any) => {
    let res: OrderStatus_S_Req = {
      id: value.order_no,
    };
    dispatch(ShowOrderStatusAsync(res));
  };

  useEffect(() => {
    dispatch(ClearOrderStatus());
  }, []);

  useEffect(() => {
    orderNumber && dispatch(ShowOrderStatusAsync({ id: orderNumber.toString() }));
  }, [orderNumber])

  useEffect(() => {
    if (status === 'data') {
      replace('/order-collection');
    }
    if (status === 'error') {
      notification['error']({ message: t`order-not-found` });
    }
  }, [status]);

  return (
    <Row {...responsive_constant} style={{ padding: '60px 0px' }}>
      <Col span={24}>
        <Row justify='center' align='middle' gutter={{ xs: 8, sm: 16, md: 32 }}>
          <Col xl={8} md={12} xs={22}>
            <Image src='./assets/car.png' width={280} preview={false} />
          </Col>
          <Col xxl={10} xl={10} lg={14} md={14} xs={22}>
            <Form style={{ marginTop: '155px' }} onFinish={onFinish}>
              <Form.Item
                name='order_no'
                rules={[{ required: true, message: t('number') }]}
              >
                <Input
                  style={{
                    borderRadius: 20,
                    outline: 'none',
                    height: '47px',
                  }}
                  placeholder={t('number')}
                />
              </Form.Item>

              <Form.Item style={{ margin: 0 }}>
                <Button
                  size='large'
                  type='primary'
                  htmlType='submit'
                  loading={status === 'loading'}
                  style={{ height: 40, borderRadius: 30 }}
                >
                  {t('check')}
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Index;
