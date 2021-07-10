import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CRUDBuilder from '../../../../utils/CRUDBuilder/CRUDBuilder';
import { ItemType } from '../../../../utils/CRUDBuilder/types';

import {
  DeleteBranchAsync,
  FetchBranchesAsync,
  InsertBranchAsync,
  selectBranches,
  selectBranchesStatus,
  UpdateBranchAsync,
  UpdateSettingAsync,
} from '../../../../redux/branch';
import { GetServerSideProps } from 'next';
import { FetchCitiesAsync, selectCities } from '../../../../redux';
import { Button, Card, Col, Form, Input, Row, Select, Space, Typography } from 'antd';
import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { DashboardAuthenticated } from '../../../../utils/helpers/dashboard-authenticated';
import { CustomUpload } from '../../../../utils/CRUDBuilder/CustomComponent/CustomUpload';
import { City } from '../../../../models';
interface Setting {
  id: number | null;
  'key:ar': string;
  'key:en': string;
  'value:ar': string;
  'value:en': string;
  icon: string | null;
}

const ManageBranches: FC = () => {
  const { t, lang } = useTranslation('dashboard');
  const dispatch = useDispatch();
  const en = lang === 'en';

  const branchs = useSelector(selectBranches);
  const status = useSelector(selectBranchesStatus);
  const { cities } = useSelector(selectCities);

  useEffect(() => {
    dispatch(FetchBranchesAsync());
    dispatch(FetchCitiesAsync());
  }, [dispatch]);

  //this mapper is mess
  const mapper = async (val: any) => {
    if (val.id) {
      val.city_id = val.city;
      val.coordinates = JSON.stringify({ lan: Number(val.lan), lon: Number(val.lon) });
      delete val.lan;
      delete val.lon;
      delete val.city;

      if (val.settings) {
        val.settings.forEach((el: Setting) => {
          if (!el.id) {
            el.id = null;
          }
          el.icon?.split(':')[0] === 'data' ? (el.icon = el.icon) : (el.icon = null);
        });
      } else val.settings = [];

      dispatch(UpdateSettingAsync({ settings: val.settings, branch_id: val.id }));
      delete val.settings;
    } else {
      val.city_id = val.city;
      val.coordinates = JSON.stringify({ lan: Number(val.lan), lon: Number(val.lon) });
      delete val.lan;
      delete val.lon;
      delete val.city;
    }
    if (!val.settings) {
      val.settings = null;
    }
    return val;
  };

  const columnsBranches: ItemType[] = [
    {
      columnType: {
        title: t`id`,
        dataIndex: 'id',
        fixed: 'left',
        width: 100,
      },
      type: 'primary-key',
    },
    {
      columnType: {
        title: t`region`,
        dataIndex: 'region',
        width: 200,
      },
      type: 'text',
      trans: true,
    },
    {
      columnType: {
        title: t`coordinates`,
        dataIndex: 'coordinates',
        width: 200,
        render: (val: string) => {
          const loc = JSON.parse(val) as { lon: string; lan: string };
          return (
            <a target='__blank' href={`https://www.google.com/maps/place/${loc.lon},${loc.lan}`}>
              {'Go to map'}
            </a>
          );
        },
      },
      type: 'text',
      demo: true,
    },
    {
      columnType: {
        title: 'Longitude',
        dataIndex: 'lon',
      },
      initialValueDataIndex: 'coordinates',
      getInitialValue: (val: string) => {
        const loc = JSON.parse(val) as { lon: string; lan: string };
        return Number(loc.lon);
      },
      type: 'number',
      hidden: true,
    },
    {
      columnType: {
        title: 'Latitude',
        dataIndex: 'lan',
      },
      initialValueDataIndex: 'coordinates',
      hidden: true,
      type: 'number',
    },
    {
      columnType: {
        title: t`settings`,
        dataIndex: 'settings',
        width: 200,
        render: (arr: Setting[]) => (
          <Select style={{ width: '100%' }}>
            {arr?.map((el) => (
              <Select.Option
                key={el.id!}
                value={`${el['key:en']}-${el['value:en']}`}
              >{`${el['key:en']}:${el['value:en']}`}</Select.Option>
            ))}
          </Select>
        ),
      },
      type: 'dynamic-list',
      dynamicListGenerator: (fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <Card size='small'>
              <Form.Item {...field} label='ID' name={[field.name, 'id']}>
                <Input style={{ width: '100%' }} disabled={true} />
              </Form.Item>

              <Row gutter={[16, 0]} wrap={false}>
                <Col flex='auto'>
                  <Space direction='vertical' size='small'>
                    <Form.Item
                      {...field}
                      label='Key AR'
                      name={[field.name, 'key:ar']}
                      fieldKey={[field.fieldKey, 'key:ar']}
                      rules={[{ required: true }]}
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label='Key EN'
                      name={[field.name, 'key:en']}
                      fieldKey={[field.fieldKey, 'key:en']}
                      rules={[{ required: true }]}
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                  </Space>
                </Col>
                <Col flex='auto'>
                  <Space direction='vertical' size='small'>
                    <Form.Item
                      {...field}
                      label='Value AR'
                      name={[field.name, 'value:ar']}
                      fieldKey={[field.fieldKey, 'value:ar']}
                      rules={[{ required: true }]}
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label='Value EN'
                      name={[field.name, 'value:en']}
                      fieldKey={[field.fieldKey, 'value:en']}
                      rules={[{ required: true }]}
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                  </Space>
                </Col>
                <Col flex='auto'>
                  <Form.Item
                    {...field}
                    label='Icon'
                    help={t`Icon size should be 24x24 at most`}
                    name={[field.name, 'icon']}
                    fieldKey={[field.fieldKey, 'icon']}
                    rules={[{ required: true }]}
                    style={{ maxHeight: '100%' }}
                  >
                    <CustomUpload />
                  </Form.Item>
                </Col>
                <Col>
                  <Button
                    size='small'
                    shape='circle'
                    type='text'
                    danger
                    onClick={() => {
                      remove(field.name);
                    }}
                    icon={<DeleteFilled />}
                  />
                </Col>
              </Row>
            </Card>
          ))}
          <Form.Item>
            <Button size='large' type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
              {t`add`}
            </Button>
          </Form.Item>
        </>
      ),
    },
  ];

  const tmp: ItemType[] = [
    {
      columnType: {
        title: t`city`,
        dataIndex: 'city',
        width: 200,
        render: (val: City) => <Typography.Text>{en ? val['name:en'] : val['name:ar']}</Typography.Text>,
      },
      type: 'foreign-key-obj',
      foreignKeyArr: cities.map((el) => ({ title: el['name:en'], value: el.id })),
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={branchs}
      loading={status === 'loading'}
      AddAsync={(el) => InsertBranchAsync({ branch: el.item })}
      UpdateAsync={(el) => UpdateBranchAsync({ branch: el.item, id: el.id })}
      DeleteAsync={(el) => DeleteBranchAsync({ id: el.id })}
      itemsHeader={[...columnsBranches, ...tmp]}
      Mapper={mapper}
    />
  );
};
export default ManageBranches;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;
