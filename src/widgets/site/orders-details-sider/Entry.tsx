import { Row, Col, Typography } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import thousands_separators from '../../../utils/helpers/thousands_separators';
const { Text } = Typography;

interface propsInterface {
  src: string;
  details: string;
  price: number;
  quantity: number;
}

const Entry: React.FC<propsInterface> = ({ src, details, price, quantity }) => {
  const { t } = useTranslation('cart');
  return (
    <Row
      justify='space-between'
      style={{
        padding: '10px',
        width: '94%',
        marginBottom: 20,
        borderBottom: '1px solid #e6e6e6',
      }}
    >
      <Col
        span={16}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Text>{details}</Text>
        <Text style={{ color: '#2B2E82', marginBottom: 0 }}>
          {t(`quantity`, { num: quantity })}
        </Text>
      </Col>

      <Col span={8} style={{ textAlign: 'center', padding: '0 5px' }}>
        <img
          src={src}
          style={{
            maxWidth: '100%',
            border: '2px solid #aba8a8',
            textAlign: 'center',
            display: 'block',
            borderRadius: 5,
          }}
        />
        <Text
          style={{ margin: '5px 0 0 0', color: '#2B2E82', fontWeight: 'bold' }}
        >
          {thousands_separators(price)} SAR
        </Text>
      </Col>
    </Row>
  );
};

export default Entry;
