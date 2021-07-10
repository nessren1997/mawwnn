// ----------------------- React Imports---------------------------
import { useEffect, useState } from 'react';
// ----------------------- UI & Style Imports---------------------------
import { Row, Col, Typography, notification } from 'antd';
import { primaryColor } from '../../constants/layout/color';
import { responsive_constant } from '../../constants/layout/responsive';
const { Text } = Typography;
// ----------------------- Components Imports-----------------------
import CartItem from '../../widgets/site/cart-item';
import Steps from '../cart-steps';
import FirstStepFooter from './FirstStepFooter';
// ----------------------- Redux Imports-----------------------
import { useDispatch, useSelector } from 'react-redux';
import { DeleteItem, selectIsMobile, UpdateItem } from '../../redux';
import { selectCouponStatus, ValidateCouponAsync } from '../../redux/coupon';
import { totalPrice } from '../../utils/helpers/cart_related_functions';
// ----------------------- Other Imports -----------------------
import useTranslation from 'next-translate/useTranslation';
// ----------------------- Interfaces -----------------------
import { Product, User } from '../../models';
import { useIsMount } from '../../utils/helpers/is-mount';
interface propsInterface {
  nextStep: () => void;
  step: number;
  cart: { product: Product; quantity: number }[];
  user: User | undefined;
}

const index: React.FC<propsInterface> = ({ nextStep, step, cart, user }) => {
  const { t } = useTranslation('cart');
  const isMobile = useSelector(selectIsMobile);

  const isMount = useIsMount();
  // ------------------------Redux-------------------------------
  const dispatch = useDispatch();

  // ------------------------Coupon Logic-------------------------------

  const couponStatus = useSelector(selectCouponStatus);

  const coupontNotification = (
    msg: string,
    description: string,
    type: string
  ) => {
    notification[type === 'success' ? 'success' : 'error']({
      message: msg,
      description: description,
      placement: 'bottomRight',
      duration: 4,
    });
  };

  const [coupon, setCoupon] = useState<string>('');
  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCoupon(e.target.value);
  const handleCouponSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user) {
      if (coupon.trim().length > 0) {
        dispatch(ValidateCouponAsync({ coupon }));
      }
    } else {
      coupontNotification(
        t`coupon-failed`,
        t`login-to-use-coupon-desc`,
        'fail'
      );
    }
  };

  // --------------------- Product & Cart Management Logic -------------------------

  const fullPrice = totalPrice(cart);

  const handleDelete = (id: number) => {
    dispatch(DeleteItem(id));
  };
  const updateQuantity = (newQuantity: number, id: number) =>
    dispatch(UpdateItem({ quantity: newQuantity, id }));

  useEffect(() => {
    if (!isMount) {
      couponStatus === 'data' &&
        coupontNotification(
          t`coupon-success`,
          t`coupon-success-desc`,
          'success'
        );
      couponStatus === 'error' &&
        coupontNotification(t`coupon-failed`, t`coupon-failed-desc`, 'fail');
    }
  }, [couponStatus]);

  return (
    <>
      {/* ================================== */}
      {/* Steps */}
      {/* ================================== */}
      <Steps step={step} />
      {/* ================================== */}
      {/* Header */}
      <Row justify='center'>
        <Col {...responsive_constant}>
          <Row style={{ marginBottom: '1.5rem' }}>
            <Col>
              <Text style={{ color: primaryColor, fontSize: '2.2rem' }}>
                {t`shopping-cart`}
              </Text>
            </Col>
          </Row>
          <Row
            justify='space-between'
            align='middle'
            style={{
              backgroundColor: '#e6e6e6',
              textAlign: 'center',
              borderRadius: '25px',
              padding: '15px 0 15px 10px',
              marginBottom: '30px',
            }}
            gutter={[4, 0]}
          >
            <Col span={4}>
              <Text
                style={{ margin: 0, fontSize: isMobile ? '.7em' : '1em' }}
              >{t`step-one-header.image`}</Text>
            </Col>
            <Col span={4}>
              <Text
                style={{ margin: 0, fontSize: isMobile ? '.7em' : '1em' }}
              >{t`step-one-header.amount`}</Text>
            </Col>
            <Col span={4}>
              <Text
                style={{ margin: 0, fontSize: isMobile ? '.7em' : '1em' }}
              >{t`step-one-header.price`}</Text>
            </Col>
            <Col span={6}>
              <Text
                style={{ margin: 0, fontSize: isMobile ? '.7em' : '1em' }}
              >{t`step-one-header.description`}</Text>
            </Col>
            <Col span={5}>
              <Text
                style={{ margin: 0, fontSize: isMobile ? '.7em' : '1em' }}
              >{t`step-one-header.total`}</Text>
            </Col>
            <Col span={1}></Col>
          </Row>
        </Col>
      </Row>

      {/* ================================== */}
      {/* Cart items */}
      <Row justify='center' style={{ marginBottom: '30px' }}>
        {cart.length > 0 ? (
          cart.map(({ product, quantity }) => (
            <CartItem
              src={product.product_images[0].image_path}
              price={product.price}
              amount={quantity}
              description={product.name!}
              id={product.id}
              deleteItem={handleDelete}
              updateQuantity={updateQuantity}
              key={product.id}
            />
          ))
        ) : (
          <Row
            style={{
              textAlign: 'center',
              fontSize: '3rem',
              height: '65vh',
            }}
            align='middle'
          >
            <Typography.Text
              style={{ fontSize: isMobile ? '.7em' : '1.2em' }}
              className='empty_cart'
            >
              {t`empty-cart`}
            </Typography.Text>
          </Row>
        )}
      </Row>

      {/* =================================== */}
      {/* Footer */}

      <FirstStepFooter
        fullPrice={fullPrice}
        coupon={coupon}
        handleCouponChange={handleCouponChange}
        handleCouponSubmit={handleCouponSubmit}
        nextStep={nextStep}
        canProcced={cart.length > 0}
      />
    </>
  );
};

export default index;
