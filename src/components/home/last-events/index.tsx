import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import EventCard from '../../event-card/index';
import Slider from '../../slider';
import {
  FetchEventsAsync,
  selectEvents,
  selectEventsStatus,
} from '../../../redux/event';
import LoadingData from '../../LoadingData';
import useTranslation from 'next-translate/useTranslation';

export default function LastEvents() {
  const { lang } = useTranslation();
  const dispatch = useDispatch();
  const status = useSelector(selectEventsStatus);
  const events = useSelector(selectEvents);
  //4471232 معجنات الهدى
  useEffect(() => {
    dispatch(FetchEventsAsync());
  }, [lang]);
  return (
    <Row justify='space-around' className='events-section'>
      <Col xl={24} lg={24} md={24} xs={20}>
        <LoadingData
          dataValid={() => (events ? true : false)}
          loading={status === 'loading'}
        >
          <Slider>
            {events.map((event) => (
              <EventCard key={event.id} data={event} />
            ))}
          </Slider>
        </LoadingData>
      </Col>
    </Row>
  );
}
