import React from 'react';
import Link from 'next/link';
import { Product } from '../../models';
import { Row, Col, Button, Result } from 'antd';
import useTranslation from 'next-translate/useTranslation';

interface propsInterface {
  nextStep: () => void;
  cart: { product: Product; quantity: number }[];
}

const UnRegisteredForm: React.FC<propsInterface> = () => {
  const { t } = useTranslation('cart');
  return (
    <Row>
      <Col span={24}>
        <Result
          status='warning'
          title={t`new-step-two.auth.title`}
          extra={
            <Link href='/login'>
              <a>
                <Button shape='round' type='primary' size='large'>
                  {t`new-step-two.auth.login`}
                </Button>
              </a>
            </Link>
          }
        />
      </Col>
    </Row>
  );
};

export default UnRegisteredForm;
