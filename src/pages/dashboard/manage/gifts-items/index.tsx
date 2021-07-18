import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTranslation from "next-translate/useTranslation";
import { ItemType } from "../../../../utils/CRUDBuilder/types";
import CRUDBuilder from "../../../../utils/CRUDBuilder/CRUDBuilder";

import {
  DeleteGiftItemAsync,
  FetchGiftItemsAsync,
  InsertGiftItemAsync,
  selectGiftItem,
  UpdateGiftItemAsync,
} from "../../../../redux/gift-item";
import { Modal, Typography } from "antd";
import { GetServerSideProps } from "next";
import { selectApp } from "../../../../redux";
import { DashboardAuthenticated } from "../../../../utils/helpers/dashboard-authenticated";

const { confirm } = Modal;

const ManageGiftItems: FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectApp);
  const { lang, t } = useTranslation("dashboard");
  const sales = user?.roles[0].name === "sales";
  const customer_care = user?.roles[0].name === "customer care";

  const { giftItems, status, error_message } = useSelector(selectGiftItem);

  useEffect(() => {
    dispatch(FetchGiftItemsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (error_message) {
      confirm({
        title: `Confirm delete`,
        content: (
          <Typography.Text>
            By confirmation, this gift item will be deleted along with all gifts associated with it.
          </Typography.Text>
        ),
        onOk() {
          dispatch(DeleteGiftItemAsync());
        },
      });
    }
  }, [error_message]);

  const columnsGiftItems: ItemType[] = [
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
    {
      columnType: {
        title: t`description`,
        dataIndex: "description",
        width: "auto",
      },
      type: "text",
      trans: true,
    },
    {
      columnType: {
        title: t`image`,
        dataIndex: "image",
        width: 200,
      },
      type: "image",
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === "en" ? "en" : "ar"}
      items={giftItems}
      loading={status === "loading"}
      itemsHeader={[...columnsGiftItems]}
      AddAsync={sales ? undefined : (el) => InsertGiftItemAsync({ giftItem: el.item })}
      UpdateAsync={
        sales || customer_care
          ? undefined
          : (el) =>
              UpdateGiftItemAsync({
                id: el.id,
                giftItem: {
                  ...el.item,
                  image: giftItems.find((e) => e.id === el.id)?.image === el.item.image ? undefined : el.item.image,
                },
              })
      }
      DeleteAsync={sales || customer_care ? undefined : (el) => DeleteGiftItemAsync({ id: el.id })}
    />
  );
};
export default ManageGiftItems;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;
