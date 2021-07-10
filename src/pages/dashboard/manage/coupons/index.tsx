import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CRUDBuilder from '../../../../utils/CRUDBuilder/CRUDBuilder';
import { ItemType } from '../../../../utils/CRUDBuilder/types';

import { DeleteCouponAsync, FetchCouponsAsync, InsertCouponAsync, selectCoupons } from '../../../../redux/coupons';
import { GetServerSideProps } from 'next';
import { Coupon_Req } from '../../../../models';
import { DATE_FORMAT } from '../../../../constants/keys';
import { DashboardAuthenticated } from '../../../../utils/helpers/dashboard-authenticated';
import { DatePicker, Form } from 'antd';
import moment from 'moment';

const mapper = (values: any): Coupon_Req => ({
  amount: values.amount,
  token: values.token,
  expiry_date: moment(values.expiry_date).format(DATE_FORMAT),
});

const ManageCoupons: FC = () => {
  const { coupons, status } = useSelector(selectCoupons);

  const { t, lang } = useTranslation('dashboard');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchCouponsAsync());
  }, [dispatch]);

  const columnsCoupons: ItemType[] = [
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
        title: t`token`,
        dataIndex: 'token',
        width: 200,
      },
      type: 'text',
    },
    {
      columnType: {
        title: t`amount`,
        dataIndex: 'amount',
        width: 200,
      },
      type: 'number',
    },
    {
      columnType: {
        title: t`expiry_date`,
        dataIndex: 'expiry_date',
        width: 200,
      },
      customFormItem: (
        <Form.Item label='Expiry Date' labelCol={{ span: 24 }} name='expiry_date' required={true}>
          <DatePicker disabledDate={(current) => current && current < moment().endOf('day')} />
        </Form.Item>
      ),
      type: 'date',
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={coupons}
      loading={status === 'loading'}
      AddAsync={(el) => InsertCouponAsync({ coupon: el.item })}
      DeleteAsync={(el) => DeleteCouponAsync({ id: el.id })}
      itemsHeader={columnsCoupons}
      Mapper={mapper}
    />
  );
};
export default ManageCoupons;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;
