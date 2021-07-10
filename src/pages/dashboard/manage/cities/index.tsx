import useTranslation from "next-translate/useTranslation";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CRUDBuilder from "../../../../utils/CRUDBuilder/CRUDBuilder";
import { ItemType } from "../../../../utils/CRUDBuilder/types";

import { DeleteCityAsync, FetchCitiesAsync, InsertCityAsync, selectCities, UpdateCityAsync } from "../../../../redux/cities";
import { GetServerSideProps } from "next";
import { DashboardAuthenticated } from "../../../../utils/helpers/dashboard-authenticated";

const ManageCities: FC = () => {
  const { lang } = useTranslation();
  const dispatch = useDispatch();
  const { t } = useTranslation("dashboard");

  const { cities, status } = useSelector(selectCities);

  useEffect(() => {
    dispatch(FetchCitiesAsync());
  }, [dispatch]);

  const columnsCities: ItemType[] = [
    {
      columnType: {
        title: t`id`,
        dataIndex: "id",
        fixed: "left",
        width: 100,
      },
      type: "primary-key",
    },
    {
      columnType: {
        title: t`name`,
        dataIndex: "name",
        width: "auto",
      },
      type: "text",
      trans: true,
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === "en" ? "en" : "ar"}
      items={cities}
      loading={status === "loading"}
      AddAsync={(el) => InsertCityAsync({ city: el.item })}
      UpdateAsync={(el) => UpdateCityAsync({ city: el.item, id: el.id })}
      // DeleteAsync={(el) => DeleteCityAsync({ id: el.id })}
      itemsHeader={columnsCities}
    />
  );
};
export default ManageCities;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;
