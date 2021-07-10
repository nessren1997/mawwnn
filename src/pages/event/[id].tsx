import React, { FC, useEffect } from 'react';
import { Col, Row } from 'antd';
import SingleEvent from '../../components/single-event';
import { responsive_constant } from '../../constants/layout/responsive';
import useTranslation from 'next-translate/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import LoadingData from '../../components/LoadingData';
import {
  selectEvent,
  selectEventsStatus,
  ShowEventAsync,
} from '../../redux/event';
import { useRouter } from 'next/router';
import SectionTitle from '../../components/section-title';

const index: FC = () => {
  const { query } = useRouter();
  const { lang } = useTranslation();
  const dispatch = useDispatch();
  const status = useSelector(selectEventsStatus);
  const event = useSelector(selectEvent);
  const { t } = useTranslation('common');

  const { id } = query;

  useEffect(() => {
    dispatch(ShowEventAsync({ id: parseInt(id as string) }));
  }, [lang]);

  return (
    <Row justify='center' gutter={[0, 40]}>
      <Col style={{ marginTop: 40 }} {...responsive_constant}>
        <SectionTitle title={t`events`} />
        <LoadingData
          dataValid={() => (event ? true : false)}
          loading={status === 'loading'}
        >
          <SingleEvent event={event!} />
        </LoadingData>
      </Col>
    </Row>
  );
};
export default index;
