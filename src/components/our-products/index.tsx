import React, { FC, useEffect, useState } from 'react';
import { Col, Row, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';
import {
  FetchCategoriesAsync,
  selectCategories,
  selectCategoriesStatus,
} from '../../redux/category';
import LoadingData from '../LoadingData';
import {
  FetchProductsByCategoryAsync,
  selectProducts,
  selectProductsStatus,
} from '../../redux/product';
import ProductCard from '../product-card';
import { Product } from '../../models';

import './style.less';

const tab = {
  height: 80,
  display: 'flex',
  alignItems: 'center',
};

const { TabPane } = Tabs;

const OurProducts: FC = () => {
  //categories
  const { lang } = useTranslation();
  const dispatch = useDispatch();
  const status = useSelector(selectCategoriesStatus);
  const categories = useSelector(selectCategories);

  const [activeTab, setactiveTab] = useState(categories[0]?.id?.toString());
  const [activeChaildTab, setactiveChaildTab] = useState('0');

  const handleTabChange = (e: any) => {
    setactiveChaildTab('0');
    setactiveTab(e);
  };

  const handleChaildTabChange = (e: any) => {
    setactiveChaildTab(e);
    setactiveTab(e);
  };

  useEffect(() => {
    dispatch(FetchCategoriesAsync());
  }, [lang]);

  //products
  const products_status = useSelector(selectProductsStatus);
  const products = useSelector(selectProducts);

  useEffect(() => {
    activeTab && dispatch(FetchProductsByCategoryAsync(parseInt(activeTab)));
  }, [lang, activeTab]);

  useEffect(() => {
    categories &&
      categories.length !== 0 &&
      setactiveTab(categories[0].id.toString());
  }, [categories]);

  return (
    <div className='category-tabs'>
      <LoadingData
        dataValid={() => (categories ? true : false)}
        loading={status === 'loading'}
      >
        <Tabs
          tabBarStyle={tab}
          onChange={handleTabChange}
          type='card'
          size='small'
        >
          {categories.map((category) => (
            <TabPane
              key={category.id}
              tabKey={category.id.toString()}
              tab={category.name}
            >
              {category.sub_categories &&
                category.sub_categories?.length !== 0 && (
                  <Tabs
                    tabBarStyle={tab}
                    onChange={handleChaildTabChange}
                    activeKey={activeChaildTab}
                    type='card'
                    size='small'
                  >
                    {category.sub_categories.map((subcategory) => (
                      <TabPane
                        tabKey={subcategory.id.toString()}
                        key={subcategory.id}
                        tab={subcategory.name}
                      />
                    ))}
                  </Tabs>
                )}
            </TabPane>
          ))}
        </Tabs>
        <LoadingData
          dataValid={() => (products ? true : false)}
          loading={products_status === 'loading'}
        >
          <ProductsByCategories products={products} />
        </LoadingData>
      </LoadingData>
    </div>
  );
};
export default OurProducts;

//content of tab (products by categories)
export const ProductsByCategories: FC<{ products: Product[] }> = ({
  products,
}) => {
  return (
    <Col>
      <Row justify='space-around'>
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </Row>
    </Col>
  );
};
