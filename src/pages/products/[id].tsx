import React, { FC } from 'react';
import { responsive_constant } from '../../constants/layout/responsive';
import SingleProduct from '../../components/single-product';
import { selectProductsStatus } from '../../redux/product';
import LoadingData from '../../components/LoadingData';
import { KEY_LANG_HEADER } from '../../constants/keys';
import { GetStaticProps, GetStaticPaths } from 'next';
import isError from '../../utils/helpers/is-error';
import { ProductService } from '../../services';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Product } from '../../models';
import { Col, Row } from 'antd';
import Head from 'next/head';

interface Props {
  product: Product;
}

const id: FC<Props> = ({ product }) => {
  const { isFallback, query } = useRouter();
  if (isFallback) return <Row>loading</Row>;

  const status = useSelector(selectProductsStatus);
  const { id } = query;

  return (
    <>
      <Head>
        <title>MAWN</title>
        <meta name='title' content={`MAWN | ${product.name}`} />
        <meta name='description' content={product?.overview} />

        <meta property='og:type' content='website' />
        <meta property='og:url' content={`https://mawn.co/products/${id}`} />
        <meta property='og:title' content={`MAWN | ${product.name}`} />
        <meta property='og:description' content={product?.overview} />
        <meta property='og:image' content={product?.product_images[0].image_path} />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content={`https://mawn.co/products/${id}`} />
        <meta property='twitter:title' content={`MAWN | ${product.name}`} />
        <meta property='twitter:description' content={product?.overview} />
        <meta property='twitter:image' content={product?.product_images[0].image_path} />
      </Head>
      <Row justify="center" gutter={[0, 64]}>
        <Col {...responsive_constant}>
          <LoadingData dataValid={() => (product ? true : false)} loading={status === "loading"}>
            <SingleProduct product={product!} />
          </LoadingData>
        </Col>
      </Row>
    </>
  );
};
export default id;

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({ locale, params }) => {
  const id = params?.id;
  const _id = Number(id);
  const service = new ProductService({
    headers: { [KEY_LANG_HEADER]: locale },
  });
  const result = await service.Show({ id: _id });

  console.log("res", result);

  if (isError(result)) {
    console.error(result);
    return { notFound: true };
  }

  return {
    props: { product: result.data },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const service = new ProductService();
  const result = await service.FetchSite();
  if (isError(result)) {
    throw new Error();
  }

  const pathsAr = result.data.map((el) => ({
    params: { id: el.id.toString() },
    locale: "ar",

  }));
  const pathsEn = result.data.map((el) => ({
    params: { id: el.id.toString() },
    locale: "en",
  }));

  const paths = [...pathsAr, ...pathsEn];

  return {
    paths: paths,
    fallback: true,
  };
};