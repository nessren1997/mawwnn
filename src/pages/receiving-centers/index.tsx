import { City } from '../../models';
import { RootState } from '../../redux/store';
import React, { FC, useEffect } from 'react';
import { Row, Col, Image, Table, Space, Typography } from 'antd';
import { largeShadow } from '../../constants/layout';
import { useDispatch, useSelector } from 'react-redux';
import { FetchReceivingCentersAsync } from '../../redux';
import SectionTitle from '../../components/section-title';
import useTranslation from 'next-translate/useTranslation';

const index: FC = () => {
  const { t, lang } = useTranslation('dashboard');
  const dispatch = useDispatch();

  const { receiving_centers, status } = useSelector((state: RootState) => state.ReceivingCenter);

  useEffect(() => {
    dispatch(FetchReceivingCentersAsync());
  }, [lang]);

  const columns = [
    {
      title: t`image`,
      dataIndex: 'image',
      key: 'image',
      render: (val: string) => <Image src={val} width={100} height={100} />,
    },
    {
      title: t`name`,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t`address`,
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: t`description`,
      dataIndex: 'description',
      width: 'auto',
    },
    {
      title: t`working_time`,
      dataIndex: 'working_time',
      width: 'auto',
    },
    {
      title: t`city`,
      dataIndex: 'city',
      key: 'city',
      render: (city: City) => city.name,
    },
  ];

  return (
    <Row justify='center' gutter={[12, 12]} style={{ marginTop: '6%' }}>
      <Col md={20} sm={22} xs={24}>
        <SectionTitle title={t`reciving_centers`} />
      </Col>
      <Col md={20} sm={22} xs={24} style={{ boxShadow: largeShadow, padding: 30, borderRadius: 30, margin: '15px 0' }}>
        <Table
          dataSource={receiving_centers}
          scroll={{ x: 1000 }}
          columns={columns}
          pagination={false}
          loading={status === 'loading'}
          style={{ padding: 0, borderRadius: 30 }}
        />
      </Col>
      <Col>
        <Space>
          <Typography.Text>
            {t`for contact`} :{' '}
            <a href='tel:0119284'>
              <span>011 9284</span>
            </a>{' '}
            |{' '}
            <a href='tel:00963991999690'>
              <span>0991999690</span>
            </a>
          </Typography.Text>
        </Space>
      </Col>
    </Row>
  );
};
export default index;
