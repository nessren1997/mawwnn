// -------------------------- UI & Styles --------------------------
import { Row, Col, Typography, Button } from 'antd';
import { dangerColor, primaryColor, successColor } from '../../constants/layout/color';
import { responsive_constant } from '../../constants/layout/responsive';
// -------------------------- Next & React & Redux --------------------------
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
// -------------------------- Other Imports --------------------------
import thousands_separators from '../../utils/helpers/thousands_separators';
import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';
import {
  clearOrderDetails,
  selectFinalPrice,
  selectOrderDetails,
  setOrderStatus,
  setVerifcationInfo,
  setVerificationStatus,
} from '../../redux';

const index: React.FC = () => {
  const { Text } = Typography;
  // ----------------Translation----------------
  const { t } = useTranslation('cart');

  // ----------------Redux----------------
  const dispatch = useDispatch();
  const fullPrice = useSelector(selectFinalPrice);
  const orderDetails = useSelector(selectOrderDetails);

  useEffect(() => {
    return () => {
      dispatch(setVerificationStatus('no-thing'));
      dispatch(setVerifcationInfo(null));
      dispatch(setOrderStatus('no-thing'));
      dispatch(clearOrderDetails());
    };
  }, []);

  return (
    <Row justify='center' align='middle'>
      <Col {...responsive_constant}>
        <Row style={{ textAlign: 'center', minHeight: '40vh', padding: '3rem 0' }} gutter={[0, 20]}>
          <Col span={24} style={{ marginBottom: '3rem' }}>
            <Text
              style={{
                color: primaryColor,
                fontSize: '2.3rem',
                fontWeight: 'bold',
              }}
            >
              {t`thank-you-page.thanks-message`}
            </Text>
          </Col>

          <Row
            style={{
              backgroundColor: '#fff',
              width: '100%',
              borderRadius: 20,
              padding: '1.2rem 0',
            }}
            gutter={[0, 12]}
          >
            <Col span={24}>
              <img src='/assets/check_circle.png' style={{ maxWidth: '150px' }} />
            </Col>
            <Col span={24}>
              <Text
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                }}
              >
                {t`thank-you-page.order-sent-success`}
              </Text>
            </Col>

            <Col span={24} style={{ textAlign: 'center', margin: 0 }}>
              <Text style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{t`thank-you-page.order-num`}</Text>
              <span
                style={{
                  color: '#909090',
                  display: 'block',
                  fontSize: '1.7rem',
                }}
              >
                {orderDetails!.order_no}
              </span>
            </Col>

            <Col span={24} style={{ textAlign: 'center', margin: 0, color: dangerColor }}>
              <span>{t`thank-you-page.note`}</span>
            </Col>

            <Col span={24} style={{ textAlign: 'center', margin: 0 }}>
              <Link href={`/check-order?order=${orderDetails!.order_no}`}>
                <a target='__blank'>
                  <Text style={{ fontSize: '1.2rem' }}>{t`you-can-view`}</Text>
                </a>
              </Link>
            </Col>

            <Col span={24} style={{ textAlign: 'center', margin: 0 }}>
              <Text style={{ color: dangerColor, fontSize: '1rem' }}>{t`note-save-this-url`}</Text>
            </Col>

            <Col
              style={{
                marginBottom: '2rem',
                fontSize: '1.2rem',
                fontWeight: 'lighter',
              }}
              span={24}
            >
              <Text style={{ fontWeight: 'bold', margin: '0 7px' }}>{t`thank-you-page.total-price`}</Text>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 0',
                }}
              >
                <span>SYP</span>
                <span style={{ color: successColor, margin: '0 7px' }}>{thousands_separators(fullPrice)}</span>
              </span>
            </Col>
          </Row>

          <Col span={24}>
            <Link href='/'>
              <Button
                htmlType='submit'
                style={{
                  borderRadius: 25,
                  width: '300px',
                  height: 56,
                  border: `2px solid ${primaryColor}`,
                  color: primaryColor,
                }}
              >
                {t`cart-forms.back-shopping`}
              </Button>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default index;
