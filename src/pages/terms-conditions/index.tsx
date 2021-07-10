import React, { CSSProperties, FC } from 'react';
import { Col, Row, Typography } from 'antd';
import { responsive_constant } from '../../constants/layout/responsive';
import { primaryColor } from '../../constants/layout/color';
import useTranslation from 'next-translate/useTranslation';
import json_translate from '../../translations/terms-conditions/en.json';

const { Title, Text } = Typography;

const title_layout: { style: CSSProperties } = {
  style: { color: primaryColor, fontSize: '1.6em' },
};

const subtitle_layout: { style: CSSProperties } = {
  style: { fontSize: '1.2em' },
};

const index: FC = () => {
  const { t } = useTranslation('terms-conditions');

  return (
    <Row
      justify='center'
      gutter={[0, 40]}
      style={{ padding: '75px 0', whiteSpace: 'pre-line' }}
    >
      <Col {...responsive_constant}>
        {/* main title */}
        <Title>{t('terms_conditions')}</Title>
        {/* main title */}
      </Col>

      <Col {...responsive_constant}>
        <Title {...title_layout}>{t('main_part.title')}</Title>
        <ul>
          {json_translate.main_part.content.map((_, i) => (
            <Row style={{ margin: '20px  0' }}>
              <li>
                <Title {...subtitle_layout}>
                  {t(`main_part.content.${i}.title`)}
                </Title>
              </li>
              <Text type='secondary' style={{ fontSize: '1.2em' }}>
                {t(`main_part.content.${i}.text`)}
              </Text>
            </Row>
          ))}
        </ul>
      </Col>

      <Col {...responsive_constant}>
        <Title {...title_layout}>{t('part1.title')}</Title>
        <ul>
          {json_translate.part1.content.map((_, i) => (
            <Row style={{ margin: '20px  0' }}>
              <li>
                <Title {...subtitle_layout}>
                  {t(`part1.content.${i}.title`)}
                </Title>
              </li>
              <Text type='secondary' style={{ fontSize: '1.2em' }}>
                {t(`part1.content.${i}.text`)}
              </Text>
            </Row>
          ))}
        </ul>
      </Col>
      <Col {...responsive_constant}>
        <Title {...title_layout}>{t('part2.title')}</Title>
        <ul>
          {json_translate.part2.content.map((_, i) => (
            <Row style={{ margin: '20px  0' }}>
              <li>
                <Title {...subtitle_layout}>
                  {t(`part2.content.${i}.title`)}
                </Title>
              </li>
              <Text type='secondary' style={{ fontSize: '1.2em' }}>
                {t(`part2.content.${i}.text`)}
              </Text>
            </Row>
          ))}
        </ul>
      </Col>
      <Col {...responsive_constant}>
        <Title {...title_layout}>{t('part3.title')}</Title>
        <ul>
          {json_translate.part3.content.map((_, i) => (
            <Row style={{ margin: '20px  0' }}>
              <li>
                <Title {...subtitle_layout}>
                  {t(`part3.content.${i}.title`)}
                </Title>
              </li>
              <Text type='secondary' style={{ fontSize: '1.2em' }}>
                {t(`part3.content.${i}.text`)}
              </Text>
            </Row>
          ))}
        </ul>
      </Col>
    </Row>
  );
};
export default index;
