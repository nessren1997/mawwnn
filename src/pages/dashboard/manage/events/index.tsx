import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CRUDBuilder from '../../../../utils/CRUDBuilder/CRUDBuilder';
import { ItemType } from '../../../../utils/CRUDBuilder/types';

import {
  DeleteEventAsync,
  FetchEventsAsync,
  InsertEventAsync,
  selectEvents,
  selectEventsStatus,
  UpdateEventAsync,
} from '../../../../redux/event';
import { Event_Req } from '../../../../models/event';
import { DATE_FORMAT } from '../../../../constants/keys';
import { GetServerSideProps } from 'next';
import { filesToArray } from '../../../../utils/helpers/files-to-array';
import { DashboardAuthenticated } from '../../../../utils/helpers/dashboard-authenticated';

const mapper = async (values: any): Promise<Event_Req> => ({
  'name:en': values['name:en'],
  'name:ar': values['name:ar'],
  'description:ar': values['description:ar'],
  'description:en': values['description:en'],
  start_date: values.start_date.format(DATE_FORMAT),
  end_date: values.end_date.format(DATE_FORMAT),
  event_images: await filesToArray(values.event_images),
});

const ManageEvents: FC = () => {
  const events = useSelector(selectEvents);
  const status = useSelector(selectEventsStatus);

  const { t, lang } = useTranslation('dashboard');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchEventsAsync());
  }, [dispatch]);

  const columnsEvents: ItemType[] = [
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
      trans: true,
    },
    {
      columnType: {
        title: t`description`,
        dataIndex: 'description',
        width: 500,
      },
      type: 'text-area',
      trans: true,
    },
    {
      columnType: {
        title: t`start_date`,
        dataIndex: 'start_date',
        width: 150,
      },
      type: 'date',
    },
    {
      columnType: {
        title: t`end_date`,
        dataIndex: 'end_date',
        width: 150,
      },
      type: 'date',
    },
    {
      columnType: {
        title: t`images`,
        dataIndex: 'event_images',
        width: 150,
      },
      type: 'multi-images',
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={events.map((el) => ({ ...el, event_images: el.event_images.map((el) => el.path) }))}
      loading={status === 'loading'}
      AddAsync={(el) => InsertEventAsync({ event: el.item })}
      UpdateAsync={(el) => UpdateEventAsync({ id: el.id, event: el.item })}
      DeleteAsync={(el) => DeleteEventAsync({ id: el.id })}
      Mapper={mapper}
      itemsHeader={columnsEvents}
    />
  );
};
export default ManageEvents;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;
