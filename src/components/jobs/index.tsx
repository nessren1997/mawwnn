import React, { CSSProperties, FC, useEffect } from 'react';
import { Col, Row, Image, Button, Typography } from 'antd';
import Link from 'next/link';
import LoadingData from '../LoadingData';
import { useDispatch, useSelector } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';
import { responsive_constant } from '../../constants/layout/responsive';
import { FetchJobsAsync, selectJobs, selectJobsStatus } from '../../redux/job';

import './style.less';

const { Title } = Typography;

const btn_layout: { style: CSSProperties } = {
  style: {
    width: '160px',
    height: '160px',
    margin: '20px 0px',
    border: 'none',
    borderRadius: '25px',
  },
};

const Options: FC = () => {
  const { lang } = useTranslation();
  const dispatch = useDispatch();
  const status = useSelector(selectJobsStatus);
  const jobs = useSelector(selectJobs);

  useEffect(() => {
    dispatch(FetchJobsAsync());
  }, [lang]);

  return (
    <LoadingData dataValid={() => (jobs ? true : false)} loading={status === 'loading'}>
      <Row justify='space-around' align='middle' gutter={[22, 22]} style={{ textAlign: 'center' }}>
        {jobs.map((job) => (
          <Col lg={8} sm={12} xs={24} key={job.id}>
            <Link href={`/jobs/apply/${job.id}`}>
              <Button {...btn_layout} className='btn'>
                <Image preview={false} src={job.image_path} />
              </Button>
            </Link>
            <Title level={3}>{job.title}</Title>
          </Col>
        ))}
      </Row>
    </LoadingData>
  );
};

const Jobs: FC = () => {
  return (
    <>
      <Col span={24}>
        <Image preview={false} width={'100%'} src='/assets/new/jobs.png' />
      </Col>
      <Col {...responsive_constant}>
        <Options />
      </Col>
    </>
  );
};
export default Jobs;
