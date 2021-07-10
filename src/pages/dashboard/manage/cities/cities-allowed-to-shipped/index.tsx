import useTranslation from "next-translate/useTranslation";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchCitiesAllowedAsync } from "../../../../../redux";
import CRUDBuilder from "../../../../../utils/CRUDBuilder/CRUDBuilder";
import { ItemType } from "../../../../../utils/CRUDBuilder/types";

const CitiesAllowed = () => {
  const { lang } = useTranslation();
  const dispatch = useDispatch();
  const { t } = useTranslation("dashboard");

  //   useEffect(() => {
  //       dispatch(FetchCitiesAllowedAsync());
  //   }, [dispatch]);

  const citiesallowed = [
    {
      id: 2,
      name: "Damascus",
      is_allowed_for_order: 0,
    },
    {
      id: 3,
      name: "Homs",
      is_allowed_for_order: 1,
    },
  ];

  const columnsCitiesAllowed: ItemType[] = [
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
    },
    {
      columnType: {
        title: t`is_allowed_for_order`,
        dataIndex: "is_allowed_for_order",
        width: "auto",
      },
      type: "check-box",
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === "en" ? "en" : "ar"}
      items={citiesallowed}
      loading={false}
      //   AddAsync={(el) => InsertCityAsync({ city: el.item })}
      //   UpdateAsync={(el) => UpdateCityAsync({ city: el.item, id: el.id })}
      // DeleteAsync={(el) => DeleteCityAsync({ id: el.id })}
      itemsHeader={columnsCitiesAllowed}
    />
  );
};
export default CitiesAllowed;
