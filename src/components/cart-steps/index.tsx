import { Row, Col } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { responsive_constant } from '../../constants/layout/responsive';
import Step from '../../widgets/site/step';

interface propsInterface {
  step: number;
}

const index: React.FC<propsInterface> = ({ step }) => {
  const { t } = useTranslation('cart');
  return (
    <Row justify='center' style={{ margin: '40px 0', fontSize: '0.9em' }}>
      <Col {...responsive_constant}>
        <Row justify='space-between' align='middle'>
          <Step text={t`shopping-cart`} isActive={step >= 0} />

          <Step text={t`cod`} isActive={step >= 1} />
        </Row>
      </Col>
    </Row>
  );
};

export default index;
