import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CRUDBuilder from '../../../../utils/CRUDBuilder/CRUDBuilder';
import { ItemType } from '../../../../utils/CRUDBuilder/types';

import {
  DeleteJobAsync,
  FetchJobsAsync,
  InsertJobAsync,
  selectJobs,
  selectJobsStatus,
  UpdateJobAsync,
} from '../../../../redux/job';
import { DashboardAuthenticated } from '../../../../utils/helpers/dashboard-authenticated';
import { GetServerSideProps } from 'next';
import { Job_Req } from '../../../../models';

const mapper = (req: Job_Req) => {
  if (req.image_path?.split(':')[0] !== 'data') {
    delete req.image_path;
  }
  return req;
};

const ManageJobs: FC = () => {
  const jobs = useSelector(selectJobs);
  const status = useSelector(selectJobsStatus);

  const { t, lang } = useTranslation('dashboard');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchJobsAsync());
  }, [dispatch]);

  const columnsJobs: ItemType[] = [
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
        title: t`title`,
        dataIndex: 'title',
        width: 200,
      },
      type: 'text',
      trans: true,
    },
    {
      columnType: {
        title: t`description`,
        dataIndex: 'description',
        width: 400,
      },
      type: 'text-area',
      trans: true,
    },
    {
      columnType: {
        title: `image`,
        dataIndex: 'image_path',
        width: 300,
      },
      type: 'image',
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={jobs}
      loading={status === 'loading'}
      AddAsync={(el) => InsertJobAsync({ job: el.item })}
      UpdateAsync={(el) => UpdateJobAsync({ id: el.id, job: el.item })}
      DeleteAsync={(el) => DeleteJobAsync({ id: el.id })}
      itemsHeader={columnsJobs}
      Mapper={mapper}
    />
  );
};
export default ManageJobs;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;
