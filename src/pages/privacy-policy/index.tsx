import { Col, Row, Typography } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { primaryColor, secondaryColor } from '../../constants/layout/color';
import { responsive_constant } from '../../constants/layout/responsive';

const { Paragraph, Title } = Typography;

interface Trans {
  title: string;
  des: string[];
}

const index: React.FC = () => {
  const { t } = useTranslation('privacy-policy');

  const arr: Trans[] = t(`content`, { name: 'MAWN' }, { returnObjects: true });

  return (
    <Row justify='center' style={{ marginTop: 100 }}>
      <Col {...responsive_constant}>
        <Row gutter={[0, 64]}>
          <Col span={24}>
            <Title level={1} style={{ color: primaryColor, direction: 'ltr' }}>
              {t(`title`, { name: 'MAWN' })}
            </Title>
            {(t(`des`, { name: 'MAWN' }, { returnObjects: true }) as string[]).map(el => <Paragraph style={{ color: secondaryColor, direction: 'ltr' }}>{el}</Paragraph>)}
          </Col>
          {arr.map(el => <Col span={24}>
            <Title style={{ direction: 'ltr' }} level={2}>{el.title}</Title>
            {el.des.map(el => <Paragraph style={{ direction: 'ltr' }} >{el}</Paragraph>)}
          </Col>
          )}
        </Row>
      </Col>
    </Row >
  );
};
export default index;
