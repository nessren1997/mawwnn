import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CRUDBuilder from '../../../../utils/CRUDBuilder/CRUDBuilder';
import { ItemType } from '../../../../utils/CRUDBuilder/types';

import {
  DeleteBrandAsync,
  FetchBrandsAsync,
  InsertBrandAsync,
  selectBrands,
  selectBrandsStatus,
  UpdateBrandAsync,
} from '../../../../redux/brand';
import { GetServerSideProps } from 'next';
import { DashboardAuthenticated } from '../../../../utils/helpers/dashboard-authenticated';

const mapper = (values: any) => {
  if (values.logo) {
    if (values.logo.includes('http')) {
      delete values.logo;
    }
  }
  return values;
};

const ManageBrands: FC = () => {
  const brands = useSelector(selectBrands);
  const status = useSelector(selectBrandsStatus);

  const { t, lang } = useTranslation('dashboard');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchBrandsAsync());
  }, [dispatch]);

  const columnsBrands: ItemType[] = [
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
        title: t`name`,
        dataIndex: 'name',
        width: 200,
      },
      type: 'text',
    },
    {
      columnType: {
        title: t`logo`,
        dataIndex: 'logo',
        width: 'auto',
      },
      type: 'image',
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={brands}
      loading={status === 'loading'}
      AddAsync={(el) => InsertBrandAsync({ brand: el.item })}
      UpdateAsync={(el) => UpdateBrandAsync({ brand: el.item, id: el.id })}
      DeleteAsync={(el) => DeleteBrandAsync({ id: el.id })}
      itemsHeader={columnsBrands}
      Mapper={mapper}
    />
  );
};
export default ManageBrands;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;
