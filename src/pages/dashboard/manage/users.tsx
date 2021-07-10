import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CRUDBuilder from '../../../utils/CRUDBuilder/CRUDBuilder';
import { ItemType } from '../../../utils/CRUDBuilder/types';

import { DeleteUserAsync, FetchUsersAsync, InsertUserAsync, selectUsers, UpdateUserAsync } from '../../../redux/user';
import { GetServerSideProps } from 'next';
import { DashboardAuthenticated } from '../../../utils/helpers/dashboard-authenticated';
import { Button, Col, Select } from 'antd';
import { FetchRolesAsync, selectRole } from '../../../redux';
import { exportExcel } from '../../../utils/helpers/export_jsonToExcel';
import { City, User } from '../../../models';
import { RootState } from '../../../redux/store';
import { FetchCitiesAsync } from '../../../redux/cities';

let users_objToPdf: any = [];

const ManageUsers: FC = () => {
  const { users, status } = useSelector(selectUsers);
  const { roles } = useSelector(selectRole);
  const { cities } = useSelector((state: RootState) => state.Cities);

  const { t, lang } = useTranslation('dashboard');
  const en = lang === 'en';

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchCitiesAsync());
    dispatch(FetchUsersAsync());
    dispatch(FetchRolesAsync());
  }, [dispatch]);

  const columnsUsers: ItemType[] = [
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
        title: t`first_name`,
        dataIndex: 'first_name',
        width: 200,
      },
      type: 'text',
    },
    {
      columnType: {
        title: t`last_name`,
        dataIndex: 'last_name',
        width: 200,
      },
      type: 'text',
    },
    {
      columnType: {
        title: t`email`,
        dataIndex: 'email',
        width: 200,
      },
      type: 'text',
    },
    {
      columnType: {
        title: t`password`,
        dataIndex: 'password',
        width: 200,
      },
      type: 'text-not-required',
      hidden: true,
    },
    {
      columnType: {
        title: t`phone`,
        dataIndex: 'phone',
        width: 200,
      },
      type: 'text',
    },
    {
      columnType: {
        title: t`permissions`,
        dataIndex: 'permissions',
        width: 300,

        render: (arr: { name: string }[]) => (
          <Select style={{ width: '100%' }}>
            {arr.map((el) => (
              <Select.Option key={el.name} value={el.name}>
                {el.name}
              </Select.Option>
            ))}
          </Select>
        ),
      },
      required: true,
      type: 'selectable-multi-foreign-key',
      foreignKeyArr: [{ title: 'Don`t choose', value: 'Don`t choose' }],
      demo: true,
    },
  ];

  const tmp: ItemType[] = [
    {
      columnType: {
        title: t`city`,
        dataIndex: 'city_id',
        width: 200,
        render: (id: string) =>
          en
            ? cities.find((city) => city.id === Number(id))?.['name:en']
            : cities.find((city) => city.id === Number(id))?.['name:ar'],
      },
      type: 'text',
    },
    {
      columnType: {
        title: t`role`,
        dataIndex: 'roles',
        width: 200,
        render: (arr: { name: string }[]) => arr[0]?.name,
      },
      type: 'signable-multi-foreign-key',
      foreignKeyArr: roles.map((el) => ({ title: el.name, value: el.name })),
      getInitialValue: (val: { id: number; name: string }[]) => val[0]?.name,
      required: false,
    },
  ];
  //map data in object to export as excel
  useEffect(() => {
    users_objToPdf = users.map((el: User) => ({
      ...el,
      city_id: cities.find((city: City) => city.id === Number(el.city_id))?.['name:ar'],
      permissions: undefined,
      roles: el.roles?.[0]?.name,
    }));
  }, [users, cities]);

  return (
    <>
      <Col span={24}>
        <Button onClick={() => exportExcel(users_objToPdf, 'users', 'xls')}>{t`export_as_excel`}</Button>
      </Col>
      <CRUDBuilder
        lang={lang === 'en' ? 'en' : 'ar'}
        items={users}
        loading={status === 'loading'}
        AddAsync={(el) => InsertUserAsync({ user: el.item })}
        UpdateAsync={(el) => UpdateUserAsync({ user: el.item, id: el.id })}
        DeleteAsync={(el) => DeleteUserAsync({ id: el.id })}
        itemsHeader={[...columnsUsers, ...tmp]}
      />
    </>
  );
};
export default ManageUsers;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;
