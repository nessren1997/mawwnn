import React, { FC } from 'react';
import { Product } from '../../../models';
import { useSelector } from 'react-redux';
import { selectIsMobile } from '../../../redux';
import { Col, Row, Space, Typography } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { primaryColor } from '../../../constants/layout/color';

const { Title, Text } = Typography;

interface props {
  product: Product;
}

const ProductDescription: FC<props> = ({ product }) => {
  const { t } = useTranslation('single-product');
  const isMobile = useSelector(selectIsMobile);

  return (
    <Row justify={isMobile ? 'space-around' : 'space-between'}>
      <Col span={24}>
        <Title style={{ fontWeight: 'bold', color: primaryColor }} level={2}>
          {t('product_specification')}
        </Title>
        <Space direction='vertical' size='large'>
          <Text
            style={{ fontSize: '1.2em', fontWeight: 500, color: '#a8a8a8' }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: product.specifications! }}
            />
          </Text>
        </Space>
      </Col>
    </Row>
  );
};
export default ProductDescription;
