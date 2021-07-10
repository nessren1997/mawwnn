import React, { useEffect } from 'react';
import { Col, Row } from 'antd';
import EventCard from '../../event-card/index';
import Slider from '../../slider';
// import { Blog } from '../../../models/blog';
import { useDispatch, useSelector } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';
import {
  FetchBlogsAsync,
  selectBlogs,
  selectBlogsStatus,
} from '../../../redux/blog';
import LoadingData from '../../LoadingData';

export default function Blog() {
  const { lang } = useTranslation();
  const dispatch = useDispatch();
  const status = useSelector(selectBlogsStatus);
  const blogs = useSelector(selectBlogs);

  useEffect(() => {
    dispatch(FetchBlogsAsync());
  }, [lang]);
  return (
    <Row justify='space-around'>
      <Col xl={24} lg={24} md={24} xs={20}>
        <LoadingData
          dataValid={() => (blogs ? true : false)}
          loading={status === 'loading'}
        >
          <Slider>
            {blogs?.map((blog) => (
              <EventCard key={blog.id} data={blog} />
            ))}
          </Slider>
        </LoadingData>
      </Col>
    </Row>
  );
}
