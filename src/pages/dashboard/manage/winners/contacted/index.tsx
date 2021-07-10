import { GetServerSideProps } from 'next';
import React, { FC } from 'react';
import { WinnersPage } from '../../../../../components/winners-page';
import { DashboardAuthenticated } from '../../../../../utils/helpers/dashboard-authenticated';

interface props {}

const index: FC<props> = (props) => {
  return <WinnersPage filter='Contacted' />;
};
export default index;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;
