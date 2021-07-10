import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CRUDBuilder from '../../../../utils/CRUDBuilder/CRUDBuilder';
import { ItemType } from '../../../../utils/CRUDBuilder/types';

import {
  DeleteNewsLetterAsync,
  FetchNewsLettersAsync,
  InsertNewsLetterAsync,
  selectNewsLetter,
} from '../../../../redux/news-letters';
import { GetServerSideProps } from 'next';
import { DashboardAuthenticated } from '../../../../utils/helpers/dashboard-authenticated';

const ManageNewsLetters: FC = () => {
  const { newsLetters, status } = useSelector(selectNewsLetter);

  const { t, lang } = useTranslation('dashboard');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchNewsLettersAsync());
  }, [dispatch]);

  const columnsNewsLetters: ItemType[] = [
    {
      columnType: {
        title: t`id`,
        dataIndex: 'id',
        fixed: 'left',
        width: 100,
        sorter: (a, b) => a.id - b.id,
      },
      type: 'primary-key',
    },
    {
      columnType: {
        title: t`email`,
        dataIndex: 'email',
        width: 'auto',
      },
      type: 'text',
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={newsLetters}
      loading={status === 'loading'}
      AddAsync={(el) => InsertNewsLetterAsync({ newsLetter: el.item })}
      DeleteAsync={(el) => DeleteNewsLetterAsync({ id: el.id })}
      itemsHeader={columnsNewsLetters}
    />
  );
};
export default ManageNewsLetters;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;
