import { Typography, Table, Button, Col, Row, notification } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import './style.less';
import { useDispatch, useSelector } from 'react-redux';
import { FetchUserOrdersAsync, selectSiteOrders } from '../../redux/orders/index';
import Order_Site from '../../models/order';
import { OrderStatus } from '../../models/order/enum';
import Modal from 'antd/lib/modal/Modal';
import {
  ReSendVerificationCodeAsync,
  selectVerificationReSendingStatus,
  selectVerificationStatus,
  SendVerificationCodeAsync,
} from '../../redux';
import { primaryColor } from '../../constants/layout/color';

import ConfirmOrderForm from '../../widgets/site/pill-input';

const { Text } = Typography;

const textRender = (text: string) => {
  return <Text style={{ color: '#000', fontWeight: 'bold' }}>{text}</Text>;
};

const Orders: React.FC = () => {
  const dispatch = useDispatch();
  const { t, lang } = useTranslation('personal-collection');

  const isResending = useSelector(selectVerificationReSendingStatus);
  const verificationStatus = useSelector(selectVerificationStatus);
  const orders = useSelector(selectSiteOrders);

  const [visible, setVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [order, setOrder] = useState<Order_Site>();

  useEffect(() => {
    dispatch(FetchUserOrdersAsync());
  }, []);

  useEffect(() => {
    if (verificationStatus === 'data') {
      verificationtNotification(t`cart:verification-success`, t`cart:verification-success-desc`, 'success');
      setVisible(false);
    }
  }, [verificationStatus]);

  useEffect(() => {
    if (verificationStatus === 'error') {
      verificationtNotification(t`cart:verification-failed`, t`cart:verification-failed-desc`, 'failed');
    }
  }, [verificationStatus]);

  const textStatus = useCallback(
    (s: OrderStatus) => {
      if (s === OrderStatus['not verified'])
        return <Text style={{ color: '#e12d33', fontWeight: 'bold' }}>{t`order-status.not-verified`}</Text>;
      else if (s === OrderStatus.verified || s === OrderStatus.pending)
        return <Text style={{ color: 'tan', fontWeight: 'bold' }}>{t`order-status.pending`}</Text>;
      else if (s === OrderStatus['on delivery'])
        return <Text style={{ color: 'yellowgreen', fontWeight: 'bold' }}>{t`order-status.on-delivery`}</Text>;
      else if (s === OrderStatus.done)
        return <Text style={{ color: 'forestgreen', fontWeight: 'bold' }}>{t`order-status.done`}</Text>;
      else if (s === OrderStatus.rejected)
        return <Text style={{ color: 'red', fontWeight: 'bold' }}>{t`order-status.rejected`}</Text>;
    },
    [lang]
  );

  const verificationtNotification = (msg: string, description: string, type: string) => {
    notification[type === 'success' ? 'success' : 'error']({
      message: msg,
      description: description,
      placement: 'bottomRight',
      duration: 4,
    });
  };

  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => setVerificationCode(e.target.value);

  const submitVerificationCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (verificationCode.trim().length > 0) dispatch(SendVerificationCodeAsync(verificationCode, order!.id + ''));
  };

  const handleReSendVerificationCode = () => {
    if (order) {
      dispatch(ReSendVerificationCodeAsync(order.id + ''));
    }
  };

  const columns: ColumnsType<Order_Site> = [
    {
      title: textRender(t('processNumber')),
      dataIndex: 'order_no',
      align: 'center',

      width: 200,
      render: (text) => <Text style={{ color: 'rgb(18 51 169)' }}>{text}</Text>,
    },
    {
      title: textRender(t('date')),
      dataIndex: 'requested_delivery_date',
      align: 'center',

      width: 250,
      render: (text) => <Text style={{ color: 'rgb(18 51 169)' }}>{text}</Text>,
    },
    {
      title: textRender(t('status')),
      dataIndex: 'status',
      align: 'center',

      width: 140,
      render: (val: OrderStatus) => textStatus(val),
    },
    {
      title: textRender(t('need-verify')),
      align: 'center',

      width: 160,
      render: (_, rec) => (
        <Button
          type='primary'
          size='middle'
          disabled={rec.status !== OrderStatus['not verified']}
          shape='round'
          onClick={() => {
            setVisible(true);
            setOrder(rec);
          }}
        >
          {rec.status === OrderStatus['not verified'] ? t`verify` : t`order-status.verified`}
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className='order'>
        <Table columns={columns} dataSource={orders} bordered pagination={false} scroll={{ x: true }} />
      </div>
      <Modal visible={visible} onCancel={() => setVisible(false)} footer={false}>
        <Row justify='center' align='stretch' gutter={[15, 30]}>
          <Col flex='1 1 400px'>
            <Col span={24} style={{ padding: '10px' }}>
              <Typography.Text>{t`verification-text`} </Typography.Text>
              <ConfirmOrderForm
                placeholder={t`cart-forms.enter-confirmation`}
                name='confirmation'
                button_text={t`verify`}
                handleSubmit={submitVerificationCode}
                handleChange={handleVerificationCodeChange}
                val={verificationCode}
                isLoading={verificationStatus === 'loading'}
              />

              <Typography.Text>
                {t`verification-resend`} <br />
                <Button
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    padding: 0,
                    color: primaryColor,
                  }}
                  onClick={handleReSendVerificationCode}
                  loading={isResending}
                >
                  {t`click-here`}
                </Button>
              </Typography.Text>
            </Col>
          </Col>
        </Row>
      </Modal>
      {/* {orders.length > 0 ? (
        <LoadingData dataValid={() => (orders ? true : false)} loading={status === 'loading'}>
          <div className='order'>
            <Table columns={columns} dataSource={data} bordered pagination={false} scroll={{ x: true }} />
          </div>
        </LoadingData>
      ) : (
        t('noOrder')
      )} */}
    </>
  );
};

export default Orders;
