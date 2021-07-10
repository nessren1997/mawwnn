import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CRUDBuilder from '../../../../utils/CRUDBuilder/CRUDBuilder';
import { ItemType } from '../../../../utils/CRUDBuilder/types';

import { DeleteTagAsync, FetchTagsAsync, InsertTagAsync, selectTag } from '../../../../redux/tag';
import { GetServerSideProps } from 'next';
import { DashboardAuthenticated } from '../../../../utils/helpers/dashboard-authenticated';


export const columnsTags: ItemType[] = [
    {
        columnType: {
            title: 'ID',
            dataIndex: 'id',
            fixed: 'left',
            width: 100,
        },
        type: 'primary-key'
    },
    {
        columnType: {
            title: 'Name',
            dataIndex: 'name',
            width: 'auto',
        },
        type: 'text',
    },
];

const ManageTags: FC = () => {

    const { tags, status } = useSelector(selectTag)

    const { lang } = useTranslation()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(FetchTagsAsync())
    }, [dispatch])

    return (
        <CRUDBuilder
            lang={lang === 'en' ? 'en' : 'ar'}
            items={tags}
            loading={status === 'loading'}
            AddAsync={(el) => InsertTagAsync({ tag: el.item })}
            DeleteAsync={(el) => DeleteTagAsync({ id: el.id })}
            itemsHeader={columnsTags}
        />
    )
}
export default ManageTags;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;