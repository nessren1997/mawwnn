import React, { FC, useEffect } from 'react';
import { Col, Row } from 'antd';
import { responsive_constant } from '../../constants/layout/responsive';
import { useRouter } from 'next/router';
import SectionTitle from '../../components/section-title';
import { useDispatch, useSelector } from 'react-redux';
import {
  FetchCategoriesAsync,
  FetchProductsByCategoryAsync,
  selectCategories,
  selectCategoriesStatus,
  selectProducts,
  selectProductsStatus,
} from '../../redux';
import useTranslation from 'next-translate/useTranslation';
import ProductCard from '../../components/product-card';
import LoadingData from '../../components/LoadingData';

const id: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { lang } = useTranslation();
  //category
  const category_status = useSelector(selectCategoriesStatus);
  const categories = useSelector(selectCategories);
  const category = categories.find(
    (category) => category.id === parseInt(id as string)
  );
  //products
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);

  useEffect(() => {
    dispatch(FetchCategoriesAsync());
    dispatch(FetchProductsByCategoryAsync(parseInt(id as string)));
  }, [lang, id]);

  return (
    <LoadingData
      dataValid={() => (products ? true : false)}
      loading={status === 'loading' || category_status === 'loading'}
    >
      <Row justify='center' style={{ marginTop: 20 }}>
        <Col {...responsive_constant}>
          {category && <SectionTitle title={category.name!} />}

          <Row justify='space-around'>
            {products.map((product) => (
              <ProductCard product={product} />
            ))}
          </Row>
        </Col>
      </Row>
    </LoadingData>
  );
};
export default id;
