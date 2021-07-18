import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { HomeChart } from "../../components/charts";
import { selectApp } from "../../redux";
import { useSelector } from "react-redux";
// import {useRouter} from "next/router"

import LoadingData from "../../components/LoadingData";
import { DashboardAuthenticated } from "../../utils/helpers/dashboard-authenticated";
import useTranslation from "next-translate/useTranslation";

interface Props {
  message?: string;
}

const index: React.FC<Props> = () => {
  // const {replace}=useRouter();
  const { status, user } = useSelector(selectApp);
  const admin = user?.roles[0]?.name === "admin";
  const { t } = useTranslation("dashboard");
  // useEffect(()=>{
  //   if(user?.missing_params===true)
  //   replace("/personal-collection")
  // },[user])
  return (
    <>
      <h1>{t`dashboard`}</h1>
      <LoadingData dataValid={() => true} loading={status === "loading"}>
        {admin ? <HomeChart /> : <></>}
      </LoadingData>
    </>
  );
};
export default index;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;
