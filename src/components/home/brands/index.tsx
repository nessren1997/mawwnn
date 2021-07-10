import React, { useEffect } from 'react';
import { Image, Col, Row } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import {
  FetchBrandsAsync,
  selectBrands,
  selectBrandsStatus,
} from '../../../redux/brand';
import LoadingData from '../../LoadingData';

import Slider from '../../slider';
import './style.less';
import Link from 'next/link';

export default function Brands() {
  const dispatch = useDispatch();
  const { lang } = useTranslation();
  const status = useSelector(selectBrandsStatus);
  const brands = useSelector(selectBrands);

  useEffect(() => {
    dispatch(FetchBrandsAsync());
  }, [lang]);

  return (
    <Row justify='space-around'>
      <Col xl={24} lg={24} md={24} xs={20}>
        <LoadingData
          dataValid={() => (brands ? true : false)}
          loading={status === 'loading'}
        >
          <Slider>
            {brands.map((brand) => (
              <Link href={`/brand/${brand.id}`}>
                <img className='brand_img' key={brand.name} src={brand.logo} />
              </Link>
            ))}
          </Slider>
        </LoadingData>
      </Col>
    </Row>
  );
}
