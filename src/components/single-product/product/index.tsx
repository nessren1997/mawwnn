import React, { FC, useState, CSSProperties } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { MinusCircleFilled, PlusCircleFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Typography, Image, notification, InputNumber } from 'antd';
import { Product } from '../../../models/product';
import { primaryColor } from '../../../constants/layout/color';
import { useDispatch } from 'react-redux';
import { InsertItem } from '../../../redux';

import './style.less';
import Link from 'next/link';
import { useWidth } from '../../../utils/helpers/use-is-mobile';

const { Title, Text } = Typography;

const small_img_layout: {
  preview: boolean;
  height: number;
  style: CSSProperties;
} = {
  preview: false,
  height: 120,
  style: { objectFit: 'cover', border: '1px solid #cfcfcf' },
};

const buy_btn_layout: {
  type: 'primary';
  block: boolean;
  style: CSSProperties;
} = {
  type: 'primary',
  block: true,
  style: {
    height: 60,
    width: '100%',
    display: 'flex',
    borderRadius: 40,
    fontSize: '1.4em',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

interface product_props {
  product: Product;
}

const ProductSection: FC<product_props> = ({ product }) => {
  const { t } = useTranslation('single-product');
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const { isMobile } = useWidth();

  const cartNotification = (msg: string, type: string) => {
    notification[type === 'success' ? 'success' : 'warning']({
      message: msg,
      placement: 'bottomRight',
      duration: 3,
    });
  };

  const [amount, setamount] = useState(1);

  const handleBuy = () => {
    if (amount < 1) {
      cartNotification(t('common:error.added-to-cart-failed'), 'failed');
    } else {
      setVisible(true);
      cartNotification(t('common:added-to-cart'), 'success');
      dispatch(InsertItem({ product, quantity: amount }));
      setamount(1);
    }
  };
  return (
    <Row
      justify={isMobile ? 'space-around' : 'space-between'}
      gutter={[
        { xs: 0, sm: 0, md: 24, lg: 0 },
        { xs: 24, sm: 24, md: 24, lg: 24 },
      ]}
      style={{ marginTop: 64 }}
    >
      <Col xs={{ span: 24, order: 2 }} sm={{ span: 22, order: 2 }} md={{ span: 12, order: 1 }} lg={{ span: 10, order: 1 }}>
        <Space style={{ width: '100%' }} size={45} direction='vertical'>
          <Title style={{ fontWeight: 'bold', color: primaryColor }} level={2}>
            {product.name}
          </Title>
          <Text style={{ fontSize: '1.2em', fontWeight: 500 }}>
            <Text style={{ fontWeight: 500, color: primaryColor }}>{t('overview')}</Text>
            <br />
            <div dangerouslySetInnerHTML={{ __html: product.overview! }} />
          </Text>

          <Text style={{ fontSize: '1.2em', fontWeight: 500, color: primaryColor }}>{t('required_quantity')}</Text>

          <Row align='middle' justify='space-between' gutter={[16, 16]}>
            <Col lg={12} span={24}>
              <div className='product-amount'>
                <Button
                  danger
                  onClick={() => {
                    setamount((amount) => (amount - 1 > 0 ? amount - 1 : 1));
                  }}
                  type='text'
                  size='small'
                  style={{
                    width: 'fit-content',
                    height: 'fit-content',
                  }}
                  icon={<MinusCircleFilled style={{ fontSize: '4rem', lineHeight: 0 }} />}
                />
                {amount}
                {/* {typeof window !== 'undefined' && <InputNumber min={0} onChange={(val) => val && setamount(Number(val))} style={{ fontSize: '2rem' }} />} */}
                <Button
                  onClick={() => {
                    setamount((amount) => amount + 1);
                  }}
                  type='text'
                  size='small'
                  style={{
                    width: 'fit-content',
                    height: 'fit-content',
                  }}
                  icon={
                    <PlusCircleFilled
                      style={{
                        color: primaryColor,
                        fontSize: '4rem',
                        lineHeight: 0,
                      }}
                    />
                  }
                />
              </div>
            </Col>
            <Col md={12} span={24}>
              <Row justify='space-around'>
                <Text
                  style={{
                    fontSize: '1.6em',
                    fontWeight: 500,
                    color: primaryColor,
                  }}
                >
                  {product.price}
                </Text>
                <Text
                  style={{
                    fontSize: '1.6em',
                    fontWeight: 500,
                    color: primaryColor,
                  }}
                >
                  SYR
                </Text>
              </Row>
            </Col>
          </Row>
          <Col span={24}>
            <Button onClick={handleBuy} {...buy_btn_layout}>
              {t('buy_product')}
              <ShoppingCartOutlined
                style={{
                  display: 'flex',
                  margin: '0 20px',
                  fontSize: '1.4em',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            </Button>
          </Col>
          <Col span={24} style={{ textAlign: 'center' }}>
            {visible && (
              <Link href='/cart'>
                <a>
                  <Button type='primary' size='large' ghost icon={<ShoppingCartOutlined />}>
                    {t`go-to-cart`}
                  </Button>
                </a>
              </Link>
            )}
          </Col>
        </Space>
      </Col>
      <Col xs={{ span: 24, order: 1 }} sm={{ span: 22, order: 1 }} md={{ span: 12, order: 2 }} lg={{ span: 10, order: 2 }}>
        <Image
          style={{ ...small_img_layout.style, maxWidth: 400 }}
          width={'100%'}
          height={400}
          preview={false}
          src={product.product_images[0]?.thumbnail_600}
        />
        <Row gutter={[8, 8]} style={{ marginTop: '15px', maxWidth: '400px' }}>
          {product.product_images.map((image) => (
            <Col span={8}>
              <Image {...small_img_layout} src={image.image_path} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};
export default ProductSection;
