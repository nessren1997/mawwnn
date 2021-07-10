import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CRUDBuilder from '../../../../utils/CRUDBuilder/CRUDBuilder';
import { ItemType } from '../../../../utils/CRUDBuilder/types';

import { FetchAboutUsAsync, selectAboutUs, selectAboutUsStatus, UpdateAboutUsAsync } from '../../../../redux/about-us';
import { GetServerSideProps } from 'next';
import { DashboardAuthenticated } from '../../../../utils/helpers/dashboard-authenticated';

const ManageAboutUss: FC = () => {
  const { lang } = useTranslation();
  const dispatch = useDispatch();
  const { t } = useTranslation('dashboard');

  const aboutUs = useSelector(selectAboutUs);
  const status = useSelector(selectAboutUsStatus);

  useEffect(() => {
    dispatch(FetchAboutUsAsync());
  }, [dispatch]);

  const columnsAboutUs: ItemType[] = [
    {
      columnType: {
        title: t`content`,
        dataIndex: 'content',
        width: 'auto',
      },
      type: 'html-editor',
      trans: true,
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={[aboutUs]}
      loading={status === 'loading'}
      UpdateAsync={(el) => UpdateAboutUsAsync({ aboutUs: el.item, id: el.id })}
      itemsHeader={columnsAboutUs}
    />
  );
};
export default ManageAboutUss;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;
