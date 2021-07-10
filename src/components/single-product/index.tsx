import React, { FC } from 'react';
import { Col, Row } from 'antd';
import ProductSection from './product';
import ProductDescription from './product-description';
import RelatedProducts from './related-products';
import { Product } from '../../models/product';
import { useWidth } from '../../utils/helpers/use-is-mobile';

interface product_props {
  product: Product;
}

const SingleProduct: FC<product_props> = ({ product }) => {
  const { isMobile } = useWidth();
  return (
    <Row gutter={[0, 64]}>
      <Col span={24}>
        <ProductSection product={product} />
      </Col>
      {!isMobile && (
        <Col span={24}>
          <ProductDescription product={product} />
        </Col>
      )}
      <Col span={24}>
        <RelatedProducts product={product} />
      </Col>
    </Row>
  );
};
export default SingleProduct;
