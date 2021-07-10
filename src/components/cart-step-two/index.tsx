// -------------------------------- React --------------------------------
import { useEffect, useState } from 'react';
// -------------------------------- UI & Styles --------------------------------
import { Row, Col, Typography } from 'antd';
import { primaryColor } from '../../constants/layout/color';
import { responsive_constant } from '../../constants/layout/responsive';
// -------------------------------- React Components --------------------------------
import FullOrderDetails from '../../widgets/site/orders-details-sider';
import RegisteredForm from './RegisteredForm';
import UnRegisteredForm from './UnRegisteredForm';
import Steps from '../cart-steps';
// -------------------------------- Redux --------------------------------
import { useDispatch, useSelector } from 'react-redux';
import { setTotalPrice } from '../../redux/cart';
import { selectCoupon } from '../../redux/coupon';
import { FetchCitiesAsync } from '../../redux/cities';
// -------------------------------- Other Imports --------------------------------
import useTranslation from 'next-translate/useTranslation';
import {
  getTotalAfterDiscount,
  totalPrice,
} from '../../utils/helpers/cart_related_functions';
// -------------------------------- Interface --------------------------------
import { Product, User } from '../../models';
import { useWidth } from '../../utils/helpers/use-is-mobile';
interface propsInterface {
  step: number;
  nextStep: () => void;
  cart: { product: Product; quantity: number }[];
  user: User | undefined;
}

const { Text } = Typography;
const index: React.FC<propsInterface> = ({ step, nextStep, cart, user }) => {
  const { isMobile } = useWidth()
  // -------------------Translation-------------------
  const { t, lang } = useTranslation('cart');
  // -------------------Redux-------------------
  const dispatch = useDispatch();
  const coupon = useSelector(selectCoupon);
  const discount = coupon.rate;
  // -------------------State-------------------
  const [fPrice, setFPrice] = useState(0);

  // -------------------Calculate The Total Price-------------------
  const price = totalPrice(cart);
  useEffect(() => {
    let priceAfterDiscount;
    if (coupon.rate !== null) {
      priceAfterDiscount = getTotalAfterDiscount(price, coupon.rate);
    } else {
      priceAfterDiscount = price;
    }

    setFPrice(priceAfterDiscount);
    dispatch(setTotalPrice(priceAfterDiscount));
  }, []);

  // ------------------- Get List Of Cities From The Server-------------------
  useEffect(() => {
    dispatch(FetchCitiesAsync());
  }, [lang]);

  // ------------------- Choose The Right Form Based On User Status-------------------
  const formToDisplay = user ? (
    <RegisteredForm nextStep={nextStep} user={user} cart={cart} />
  ) : (
    <UnRegisteredForm nextStep={nextStep} cart={cart} />
  );

  return (
    <>
      {/* ================================== */}
      {/* Steps */}
      <Steps step={step} />

      <Row>
        <Col span={24} >
          <Row justify='center'>
            <Col {...responsive_constant}>
              <Row style={{ marginBottom: '1.5rem' }}>
                <Col>
                  <Text
                    style={{ color: primaryColor, fontSize: '2.2rem' }}
                  >{t`cod`}</Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Row justify='center'>
            <Col {...responsive_constant}>
              <Row
                justify='center'
                align='middle'
                style={{
                  backgroundColor: '#e6e6e6',
                  textAlign: 'center',
                  borderRadius: '25px',
                  padding: '15px 0 15px 10px',
                  marginBottom: '30px',
                }}
              >
                {!isMobile && <Col span={14}>
                  <Text>{t`cod-info`}</Text>
                </Col>}
                {<Col span={10}>
                  <Text>{t`order-details`}</Text>
                </Col>}
              </Row>
            </Col>
          </Row>
        </Col>

        <Col span={24} >
          <Row justify='center'>
            <Col {...responsive_constant}>
              <Row justify='center' align='stretch' gutter={[15, 30]}>
                <Col flex='1 1 400px' lg={{ order: 1 }} xs={{ order: 2 }}>{formToDisplay}</Col>
                <Col flex='1 1 350px' lg={{ order: 2 }} xs={{ order: 1 }}>
                  <FullOrderDetails
                    originalPrice={price}
                    fullPrice={fPrice}
                    rate={discount}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default index;
