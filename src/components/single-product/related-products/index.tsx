import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row, Typography } from 'antd';
import ProductCard from '../../product-card';
import { selectIsMobile } from '../../../redux';
import { Product } from '../../../models/product';
import { productService } from '../../../services';
import isError from '../../../utils/helpers/is-error';
import useTranslation from 'next-translate/useTranslation';
import { primaryColor } from '../../../constants/layout/color';

const { Title } = Typography;

interface props {
  product: Product;
}

const RelatedProducts: FC<props> = ({ product }) => {
  const { t } = useTranslation('single-product');
  const isMobile = useSelector(selectIsMobile);
  const { lang } = useTranslation();

  return (
    <Row justify={isMobile ? 'space-around' : 'space-between'}>
      <Col span={24}>
        <Title style={{ fontWeight: 'bold', color: primaryColor }} level={2}>
          {t('related_products')}
        </Title>
      </Col>
      <Col span={24}>
        <Row justify='space-around'>
          {product.similar_products.map((product: Product) => (
            <ProductCard product={product} />
          ))}
        </Row>
      </Col>
    </Row>
  );
};
export default RelatedProducts;
