import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ItemType } from '../../../../utils/CRUDBuilder/types';
import CRUDBuilder from '../../../../utils/CRUDBuilder/CRUDBuilder';

import { GetServerSideProps } from 'next';
import { DashboardAuthenticated } from '../../../../utils/helpers/dashboard-authenticated';
import { RootState } from '../../../../redux/store';
import {
  FetchReceivingCentersAsync,
  InsertReceivingCenterAsync,
  UpdateReceivingCenterAsync,
  DeleteReceivingCenterAsync,
  FetchCitiesAsync,
} from '../../../../redux';
import { City } from '../../../../models';

const mapper = async (val: any) => {
  val.city_id = val.city;
  delete val.city;
  if ((val.image as string).startsWith('http')) val.image = null;

  return val;
};

const ManageReceivingCenters: FC = () => {
  const { lang } = useTranslation();
  const en = lang === 'en';
  const dispatch = useDispatch();
  const { t } = useTranslation('dashboard');

  const { receiving_centers, status } = useSelector((state: RootState) => state.ReceivingCenter);
  const { cities } = useSelector((state: RootState) => state.Cities);

  useEffect(() => {
    dispatch(FetchCitiesAsync());
    dispatch(FetchReceivingCentersAsync());
  }, [dispatch]);

  const columnsReceivingCenters: ItemType[] = [
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
        title: t`image`,
        dataIndex: 'image',
        width: 'auto',
      },
      type: 'image',
    },
    {
      columnType: {
        title: t`city`,
        dataIndex: 'city',
        width: 200,
        render: (city: City) => (city && en ? city?.['name:en'] : city?.['name:ar']),
      },
      type: 'multi-foreign-key',
      foreignKeyArr: cities.map((el) => ({
        title: en ? el['name:en']! : el['name:ar']!,
        value: el.id,
      })),
    },
    {
      columnType: {
        title: t`city`,
        dataIndex: 'city',
        width: 200,
      },
      hidden: true,
      type: 'foreign-key-obj',
      foreignKeyArr: cities.map((el) => ({
        title: en ? el['name:en']! : el['name:ar']!,
        value: el.id,
      })),
    },
    {
      columnType: {
        title: t`name`,
        dataIndex: 'name',
        width: 'auto',
      },
      type: 'text',
      trans: true,
    },
    {
      columnType: {
        title: t`address`,
        dataIndex: 'address',
        width: 'auto',
      },
      type: 'text',
      trans: true,
    },

    {
      columnType: {
        title: t`description`,
        dataIndex: 'description',
        width: 'auto',
      },
      type: 'text',
      trans: true,
      required: false,
    },
    {
      columnType: {
        title: t`working_time`,
        dataIndex: 'working_time',
        width: 'auto',
      },
      type: 'text',
      trans: true,
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={receiving_centers}
      loading={status === 'loading'}
      AddAsync={(el) => InsertReceivingCenterAsync({ receiving_center: el.item })}
      UpdateAsync={(el) => UpdateReceivingCenterAsync({ receiving_center: el.item, id: el.id })}
      DeleteAsync={(el) => DeleteReceivingCenterAsync({ id: el.id })}
      itemsHeader={columnsReceivingCenters}
      Mapper={mapper}
    />
  );
};
export default ManageReceivingCenters;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;
