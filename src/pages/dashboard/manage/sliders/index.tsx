import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CRUDBuilder from '../../../../utils/CRUDBuilder/CRUDBuilder';
import { ItemType } from '../../../../utils/CRUDBuilder/types';

import {
  DeleteSliderAsync,
  FetchSlidersAsync,
  InsertSliderAsync,
  selectSliders,
  selectSlidersStatus,
} from '../../../../redux/slider';
import { GetServerSideProps } from 'next';
import { DashboardAuthenticated } from '../../../../utils/helpers/dashboard-authenticated';

const ManageSliders: FC = () => {
  const dispatch = useDispatch();
  const { t, lang } = useTranslation('dashboard');

  const sliders = useSelector(selectSliders);
  const status = useSelector(selectSlidersStatus);

  useEffect(() => {
    dispatch(FetchSlidersAsync());
  }, [dispatch]);

  const columnsSliders: ItemType[] = [
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
        dataIndex: 'image_path',
        width: 'auto',
      },
      type: 'image',
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={sliders}
      loading={status === 'loading'}
      AddAsync={(el) => InsertSliderAsync({ slider: el.item })}
      DeleteAsync={(el) => DeleteSliderAsync({ id: el.id })}
      itemsHeader={columnsSliders}
    />
  );
};
export default ManageSliders;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;
