import { Button, notification } from 'antd';
import Entry from './Entry';
import useTranslation from 'next-translate/useTranslation';
import thousands_separators from '../../../utils/helpers/thousands_separators';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchOrderLimitAsync, selectOrderLimit } from '../../../redux/orders';

interface propsInterface {
  total: number;
  procced: boolean;
  nextStep: () => void;
}

const index: React.FC<propsInterface> = ({ nextStep, total, procced }) => {
  const { t } = useTranslation('cart');
  const dispatch = useDispatch();
  const min_checkout_limit = useSelector(selectOrderLimit);

  //get min price to order
  useEffect(() => {
    dispatch(FetchOrderLimitAsync());
  }, []);

  const handleClick = () => {
    if (procced) {
      if (total < Number(min_checkout_limit)) {
        notification.warn({
          message: t('sorry'),
          description: t('min_price', { price: min_checkout_limit! }),
          placement: 'bottomRight',
        });
      } else nextStep();
    }
  };

  return (
    <form style={{ width: '100%', margin: '0 auto' }}>
      <Entry
        name={t`details-form.total`}
        value={`${thousands_separators(total)} SAR`}
      />
      <Entry name={t`details-form.delivery`} value={t`details-form.free`} />
      <Entry
        name={t`details-form.total`}
        value={`${thousands_separators(total)} SAR`}
        total={true}
      />
      <Button
        className='completeOrderBtn'
        onClick={handleClick}
        disabled={!procced}
        style={{
          height: 50,
          width: '100%',
          color: '#fff',
          border: 'none',
          display: 'block',
          borderRadius: 25,
          margin: '20px auto 0',
          backgroundColor: '#458100',
        }}
      >{t`details-form.complete-order`}</Button>
    </form>
  );
};

export default index;
