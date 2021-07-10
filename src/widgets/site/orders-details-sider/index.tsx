import { Row, Col } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { useSelector } from 'react-redux';
import { selectCart, selectIsMobile } from '../../../redux';

import DetailsList from './DetailsList';
import Entry from './Entry';

interface propsInterface {
  originalPrice: number;
  fullPrice: number;
  rate: number;
}

const index: React.FC<propsInterface> = ({
  fullPrice,
  rate,
  originalPrice,
}) => {
  const { t } = useTranslation('cart');
  const cart = useSelector(selectCart);
  const isMobile = useSelector(selectIsMobile);

  return (
    <Row justify='center' gutter={[16, 20]}>
      {isMobile ? null : (
        <Col
          flex='0 0 3px'
          style={{
            backgroundColor: '#e6e6e6ed',
            margin: '30px 35px',
            padding: 0,
          }}
        ></Col>
      )}

      <Col flex='1 1 70%'>
        <Col span={24} style={{ maxHeight: 560, overflowY: 'scroll' }}>
          {cart.length > 0
            ? cart.map((el) => (
              <Entry
                src={el.product.product_images[0].image_path}
                details={el.product.name!}
                price={el.product.price}
                quantity={el.quantity}
                key={el.product.id}
              />
            ))
            : null}
        </Col>

        <Col span={24}>
          <DetailsList
            originalPrice={originalPrice}
            price={fullPrice}
            discount={rate}
            shipping={t`free-delivery`}
          />
        </Col>
      </Col>
    </Row>
  );
};

export default index;
