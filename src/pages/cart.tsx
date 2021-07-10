// ---------------------React Imports---------------------
import { useEffect, useState } from 'react';
// ---------------------Redux Imports---------------------
import {
  selectCart,
  selectUser,
  setOrderDetails,
  setOrderStatus,
} from '../redux';
import { useDispatch, useSelector } from 'react-redux';
// ---------------------Components Imports---------------------
import CartStepOne from '../components/cart-step-one';
import CartStepTwo from '../components/cart-step-two';
import ThankYou from '../components/thank-you-page';

const cart: React.FC = () => {
  // ---------------------Redux & State---------------------
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);

  const [step, setStep] = useState<number>(0);
  const next = () => (step >= 3 ? null : setStep(step + 1));

  useEffect(() => {
    // if user leaves the checkout process, rest it, but keep carts items
    return () => {
      setStep(0);
      dispatch(setOrderStatus('no-thing'));
      dispatch(setOrderDetails(null));
    };
  }, []);

  const currentPage = (currentStep: number) => {
    switch (currentStep) {
      case 0:
        return (
          <CartStepOne nextStep={next} step={step} cart={cart} user={user} />
        );
      case 1:
        return (
          <CartStepTwo step={step} nextStep={next} cart={cart} user={user} />
        );
      case 2:
        return <ThankYou />;

      default:
        return null;
    }
  };
  return currentPage(step);
};

export default cart;
