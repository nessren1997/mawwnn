import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CRUDBuilder from '../../../../utils/CRUDBuilder/CRUDBuilder';
import { ItemType } from '../../../../utils/CRUDBuilder/types';

import { FetchApplicantsAsync, selectApplicants, selectApplicantsStatus } from '../../../../redux/applicant';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { DashboardAuthenticated } from '../../../../utils/helpers/dashboard-authenticated';

const ManageApplicants: FC = () => {
  const applicants = useSelector(selectApplicants);
  const status = useSelector(selectApplicantsStatus);
  const { t } = useTranslation('dashboard');

  const { lang } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchApplicantsAsync());
  }, [dispatch]);

  const columnsApplicants: ItemType[] = [
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
        title: t`description`,
        dataIndex: 'description',
        width: 300,
      },
      type: 'text-area',
    },
    {
      columnType: {
        title: t`cv`,
        dataIndex: 'cv_path',
        width: 300,
        render: (val: string) => (
          <Link href={val}>
            <a target='__blank'>{val}</a>
          </Link>
        ),
      },
      type: 'text',
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={applicants}
      loading={status === 'loading'}
      // DeleteAsync={(el) => DeleteApplicantAsync({ id: el.id })}
      itemsHeader={columnsApplicants}
    />
  );
};
export default ManageApplicants;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;
