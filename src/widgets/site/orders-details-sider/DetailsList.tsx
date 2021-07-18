import { List, Typography } from 'antd';
const { Text } = Typography;
import useTranslation from 'next-translate/useTranslation';
import thousands_separators from '../../../utils/helpers/thousands_separators';

interface PropsInterface {
  price: number;
  shipping: string;
  discount: number;
  originalPrice: number;
}

const listStyle = {
  marginBottom: 15,
  display: 'flex',
  width: '94%',
  justifyContent: 'space-between',
  padding: '25px 10px 10px 25px',
  borderBottom: '1px solid #e6e6e6',
};

const DetailsList: React.FC<PropsInterface> = ({
  price,
  shipping,
  discount,
  originalPrice,
}) => {
  const { t } = useTranslation('cart');

  return (
    <List size='small' style={{ listStyle: 'none', padding: 0 }}>
      <List.Item className='list_item' style={listStyle}>
        <Text>{t`step-one-header.total`}</Text>{' '}
        <Text className='gray' style={{ color: '#545454' }}>
          {thousands_separators(originalPrice)} SAR
        </Text>
      </List.Item>
      <List.Item className='list_item' style={listStyle}>
        <Text>{t`details-form.delivery`}</Text>{' '}
        <Text className='gray' style={{ color: '#545454' }}>
          {shipping}
        </Text>
      </List.Item>
      <List.Item className='list_item' style={listStyle}>
        <Text>{t`discount`}</Text>{' '}
        <Text className='gray' style={{ color: '#545454' }}>
          {discount}%
        </Text>
      </List.Item>
      <List.Item className='list_item' style={listStyle}>
        <Text>{t`step-one-header.total`}</Text>{' '}
        <Text style={{ color: 'red', fontWeight: 'bold' }}>
          {thousands_separators(price)} SAR
        </Text>
      </List.Item>
    </List>
  );
};

export default DetailsList;
