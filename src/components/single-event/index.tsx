import React, { FC } from 'react';
import { Row, Typography, Image, Col, Space } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { Event } from '../../models/event';
import './style.less';
import { primaryColor } from '../../constants/layout/color';

interface props {
  event: Event;
}

const { Title, Text } = Typography;

const SingleEvent: FC<props> = ({ event }) => {
  const { t } = useTranslation('common');

  return (
    <>
      <div className='single-event-card'>
        <Image
          preview={false}
          className='single-event-img'
          width='100%'
          src={event.event_images[0].path}
        />
        <div className='single-event-content'>
          <Title
            style={{ fontWeight: 'normal', color: primaryColor }}
            level={2}
          >
            {event.name}
          </Title>
          <Row
            justify='center'
            style={{
              fontSize: '1.1em',
              fontWeight: 500,
              lineHeight: 2.6,
            }}
          >
            <Col span={23}>
              <Space direction='vertical' size='small'>
                <Text type='secondary'>
                  {event.start_date} {t('to')} {event.end_date}
                </Text>
                <Text type='secondary'>{event.description}</Text>
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
export default SingleEvent;
