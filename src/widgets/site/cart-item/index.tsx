// React imports
import { useState } from 'react';
// Ant-design imports
import { DeleteOutlined } from '@ant-design/icons';
import { Col, Row, Typography, Button, InputNumber } from 'antd';
// other imports
import { responsive_constant } from '../../../constants/layout/responsive';
import thousands_separators from '../../../utils/helpers/thousands_separators';
import styles from './style.module.css';

const { Text } = Typography;

interface PropsInterface {
  src: string;
  amount: number;
  price: number;
  description: string;
  id: number;
  deleteItem: (id: number) => void;
  updateQuantity: (newQuantity: number, id: number) => void;
}

const index: React.FC<PropsInterface> = ({
  src,
  amount,
  price,
  description,
  id,
  deleteItem,
  updateQuantity,
}) => {
  const [currentAmount, setCurrentAmount] = useState(amount);
  return (
    <Col
      {...responsive_constant}
      style={{ textAlign: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}
    >
      <Row
        justify='space-between'
        align='middle'
        style={{
          borderBottom: '2px solid #dcdcdc',
          marginBottom: '26px',
          paddingBottom: '15px',
        }}
      >
        <Col span={4}>
          <img
            src={src}
            style={{
              width: '100%',
              maxWidth: '100px',
              border: '2px solid #aba8a8',
              textAlign: 'center',
              borderRadius: 5,
            }}
          />
        </Col>

        <Col span={4}>
          <InputNumber
            style={{
              display: 'inline-block',
              padding: 5,
              minWidth: 50,
              width: 60,
              lineHeight: 2.39,
            }}
            value={currentAmount}
            onChange={(val) => {
              const num = Number(val);
              if (num >= 1) {
                setCurrentAmount(num);
                updateQuantity(num, id);
              }
            }}
          />
        </Col>

        <Col span={4}>
          <Text style={{ marginBottom: '0px' }}>
            <span className={styles.main_color}>
              {thousands_separators(price)}
            </span>
          </Text>
        </Col>

        <Col span={6} style={{ fontSize: '0.8rem' }}>
          <Text style={{ marginBottom: '0px' }}>{description}</Text>
        </Col>

        <Col span={5}>
          <Text style={{ marginBottom: '0px' }}>
            <span className={styles.main_color}>
              {thousands_separators(amount * price)}
            </span>
          </Text>
        </Col>

        <Col span={1}>
          <Button
            style={{
              flex: '0 0 1%',
              padding: 1,
              margin: 0,
              border: 'none',
              backgroundColor: 'transparent',
            }}
            onClick={() => deleteItem(id)}
          >
            <DeleteOutlined />
          </Button>
        </Col>
      </Row>
    </Col>
  );
};

export default index;
