// -------------------------React Imports-------------------------
import { useEffect, useMemo, useState } from 'react';
// -------------------------UI Imports-------------------------
import { Row, Col, Typography, notification, Button } from 'antd';
import { primaryColor } from '../../constants/layout/color';
import { responsive_constant } from '../../constants/layout/responsive';
// -------------------------Components Imports-------------------------
import ConfirmOrderForm from '../../widgets/site/pill-input';
// -------------------------Redux Imports-------------------------
import { useDispatch, useSelector } from 'react-redux';
import {
  EmptyCart,
  ReSendVerificationCodeAsync,
  selectOrderDetails,
  selectVerificationReSendingStatus,
  selectVerificationStatus,
  SendVerificationCodeAsync,
  setTotalPrice,
} from '../../redux';
import { selectCoupon } from '../../redux/coupon';
// -------------------------Other Imports-------------------------
import useTranslation from 'next-translate/useTranslation';
import {
  getTotalAfterDiscount,
  totalPrice,
} from '../../utils/helpers/cart_related_functions';
// -------------------------Interface-------------------------
import { Product } from '../../models';
import { OrderStatus } from '../../models/order/enum';
interface PropsInterface {
  step: number;
  nextStep: () => void;
  cart: { product: Product; quantity: number }[];
}
const index: React.FC<PropsInterface> = ({ step, nextStep, cart }) => {

  // -------------notification-------------
  const verificationtNotification = (
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

  const { t } = useTranslation('cart');
  // --------------State--------------
  const [verificationCode, setVerificationCode] = useState('');
  // --------------Redux--------------
  const dispatch = useDispatch();
  const verificationStatus = useSelector(selectVerificationStatus);
  const order = useSelector(selectOrderDetails);
  const isResending = useSelector(selectVerificationReSendingStatus);
  const coupon = useSelector(selectCoupon);

  //   --------------Verification Logic--------------
  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setVerificationCode(e.target.value);

  const submitVerificationCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (verificationCode.trim().length > 0)
      dispatch(SendVerificationCodeAsync(verificationCode, order!.id + ''));
  };

  const handleReSendVerificationCode = () => {
    if (order) {
      dispatch(ReSendVerificationCodeAsync(order.id + ''));
    }
  };

  useEffect(() => {
    if (verificationStatus === 'data') {
      verificationtNotification(
        t`verification-success`,
        t`verification-success-desc`,
        'success'
      );
      dispatch(EmptyCart());
      nextStep();
    }
  }, [verificationStatus]);

  useEffect(() => {
    if (verificationStatus === 'error') {
      verificationtNotification(
        t`verification-failed`,
        t`verification-failed-desc`,
        'failed'
      );
    }
  }, [verificationStatus]);

  // -------------------Calculate The Total Price-------------------

  const price = useMemo(() => totalPrice(cart), [cart])
  useEffect(() => {
    if (order && order.status === OrderStatus['verified']) {
      dispatch(EmptyCart());
      nextStep();
    }
    let priceAfterDiscount;
    if (coupon.rate !== null) {
      priceAfterDiscount = getTotalAfterDiscount(price, coupon.rate);
    } else {
      priceAfterDiscount = price;
    }

    dispatch(setTotalPrice(priceAfterDiscount));
  }, []);

  return (
    <>
      {/* ================================== */}
      {/* Steps */}

      <Row justify='center'>
        <Col {...responsive_constant}>
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
        </Col>
      </Row>
    </>
  );
};

export default index;
// // -------------------------React Imports-------------------------
// import { useEffect, useMemo, useState } from 'react';
// // -------------------------UI Imports-------------------------
// import { Row, Col, Typography, notification, Button } from 'antd';
// import { primaryColor } from '../../constants/layout/color';
// import { responsive_constant } from '../../constants/layout/responsive';
// // -------------------------Components Imports-------------------------
// import Steps from '../cart-steps';
// import FullOrderDetails from '../../widgets/site/orders-details-sider';
// import ConfirmOrderForm from '../../widgets/site/pill-input';
// // -------------------------Redux Imports-------------------------
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   EmptyCart,
//   ReSendVerificationCodeAsync,
//   selectOrderDetails,
//   selectVerificationReSendingStatus,
//   selectVerificationStatus,
//   SendVerificationCodeAsync,
//   setTotalPrice,
// } from '../../redux';
// import { selectCoupon } from '../../redux/coupon';
// // -------------------------Other Imports-------------------------
// import useTranslation from 'next-translate/useTranslation';
// import {
//   getTotalAfterDiscount,
//   totalPrice,
// } from '../../utils/helpers/cart_related_functions';
// // -------------------------Interface-------------------------
// import { Product } from '../../models';
// interface PropsInterface {
//   step: number;
//   nextStep: () => void;
//   cart: { product: Product; quantity: number }[];
// }
// const index: React.FC<PropsInterface> = ({ step, nextStep, cart }) => {
//   const { Text } = Typography;

//   // -------------notification-------------
//   const verificationtNotification = (
//     msg: string,
//     description: string,
//     type: string
//   ) => {
//     notification[type === 'success' ? 'success' : 'error']({
//       message: msg,
//       description: description,
//       placement: 'bottomRight',
//       duration: 4,
//     });
//   };

//   const { t } = useTranslation('cart');
//   // --------------State--------------
//   const [verificationCode, setVerificationCode] = useState('');
//   const [fPrice, setFPrice] = useState(0);
//   // --------------Redux--------------
//   const dispatch = useDispatch();
//   const verificationStatus = useSelector(selectVerificationStatus);
//   const orderId = useSelector(selectOrderDetails)?.id;
//   const coupon = useSelector(selectCoupon);
//   const discount = coupon.rate;
//   const isResending = useSelector(selectVerificationReSendingStatus);

//   //   --------------Verification Logic--------------
//   const handleVerificationCodeChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => setVerificationCode(e.target.value);

//   const submitVerificationCode = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (verificationCode.trim().length > 0)
//       dispatch(SendVerificationCodeAsync(verificationCode, orderId + ''));
//   };

//   const handleReSendVerificationCode = () => {
//     if (orderId) {
//       dispatch(ReSendVerificationCodeAsync(orderId + ''));
//     }
//   };

//   useEffect(() => {
//     if (verificationStatus === 'data') {
//       verificationtNotification(
//         t`verification-success`,
//         t`verification-success-desc`,
//         'success'
//       );
//       dispatch(EmptyCart());
//       nextStep();
//     }
//   }, [verificationStatus]);

//   useEffect(() => {
//     if (verificationStatus === 'error') {
//       verificationtNotification(
//         t`verification-failed`,
//         t`verification-failed-desc`,
//         'failed'
//       );
//     }
//   }, [verificationStatus]);

//   // -------------------Calculate The Total Price-------------------

//   const price = useMemo(() => totalPrice(cart), [cart])
//   useEffect(() => {
//     let priceAfterDiscount;
//     if (coupon.rate !== null) {
//       priceAfterDiscount = getTotalAfterDiscount(price, coupon.rate);
//     } else {
//       priceAfterDiscount = price;
//     }

//     setFPrice(priceAfterDiscount);
//     dispatch(setTotalPrice(priceAfterDiscount));
//   }, []);

//   return (
//     <>
//       {/* ================================== */}
//       {/* Steps */}
//       <Steps step={step} />

//       <Row justify='center'>
//         <Col {...responsive_constant}>
//           <Row style={{ marginBottom: '1.5rem' }}>
//             <Col>
//               <Text style={{ color: primaryColor, fontSize: '2.2rem' }}>
//                 {t`cod`}
//               </Text>
//             </Col>
//           </Row>
//         </Col>
//       </Row>

//       <Row justify='center'>
//         <Col {...responsive_constant}>
//           <Row
//             justify='center'
//             align='middle'
//             style={{
//               backgroundColor: '#e6e6e6',
//               textAlign: 'center',
//               borderRadius: '25px',
//               padding: '15px 0 15px 10px',
//               marginBottom: '30px',
//             }}
//           >
//             <Col span={14}>
//               <Text>{t`cod-info`}</Text>
//             </Col>
//             <Col span={10}>
//               <Text>{t`order-details`}</Text>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//       <Row justify='center'>
//         <Col {...responsive_constant}>
//           <Row justify='center' align='stretch' gutter={[15, 30]}>
//             <Col flex='1 1 400px'>
//               <Col span={24} style={{ padding: '10px' }}>
//                 <Typography.Text>{t`verification-text`} </Typography.Text>
//                 <ConfirmOrderForm
//                   placeholder={t`cart-forms.enter-confirmation`}
//                   name='confirmation'
//                   button_text={t`verify`}
//                   handleSubmit={submitVerificationCode}
//                   handleChange={handleVerificationCodeChange}
//                   val={verificationCode}
//                   isLoading={verificationStatus === 'loading'}
//                 />

//                 <Typography.Text>
//                   {t`verification-resend`} <br />
//                   <Button
//                     style={{
//                       backgroundColor: 'transparent',
//                       border: 'none',
//                       boxShadow: 'none',
//                       padding: 0,
//                       color: primaryColor,
//                     }}
//                     onClick={handleReSendVerificationCode}
//                     loading={isResending}
//                   >
//                     {t`click-here`}
//                   </Button>
//                 </Typography.Text>
//               </Col>
//             </Col>
//             <Col flex='1 1 350px'>
//               <FullOrderDetails
//                 originalPrice={price}
//                 fullPrice={fPrice}
//                 rate={discount}
//               />
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default index;
