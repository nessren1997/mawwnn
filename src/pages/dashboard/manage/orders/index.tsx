import useTranslation from "next-translate/useTranslation";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CRUDBuilder from "../../../../utils/CRUDBuilder/CRUDBuilder";
import { ItemType } from "../../../../utils/CRUDBuilder/types";

import { FetchOrdersAsync, selectOrders, selectOrdersStatus, UpdateOrderAsync } from "../../../../redux/orders";
import { GetServerSideProps } from "next";
import { Button, Col, Modal, Row, Table, Typography } from "antd";
import { DashboardAuthenticated } from "../../../../utils/helpers/dashboard-authenticated";
import { OrderStatus } from "../../../../models/order/enum";
import { FetchDashProductsAsync, selectApp, selectProducts, selectProductsStatus } from "../../../../redux";
import { ColumnsType } from "antd/lib/table";
import { Product } from "../../../../models";
import { EyeFilled } from "@ant-design/icons";
import { exportExcel } from "../../../../utils/helpers/export_jsonToExcel";
import "./style.less";

interface OrderDetails {
  product: string;
  qty: string;
}

const ManageOrders: FC = () => {
  const [visible, setVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState<(Product & { qty: string })[]>();

  const products = useSelector(selectProducts);
  const proStatus = useSelector(selectProductsStatus);
  const orders = useSelector(selectOrders);
  const status = useSelector(selectOrdersStatus);
  const { user } = useSelector(selectApp);
  const sales = user?.roles[0].name === "sales";
  const customer_care = user?.roles[0].name === "customer care";

  const { t, lang } = useTranslation("dashboard");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchOrdersAsync());
    dispatch(FetchDashProductsAsync());
  }, [dispatch]);

  const onClick = (arr: OrderDetails[]) => {
    setVisible(true);
    const pds = products
      .filter((el) => !!arr.find((l) => Number(l.product) === Number(el.id)))
      .map((el) => {
        const pro = arr.find((l) => Number(l.product) === Number(el.id));
        return { ...el, qty: pro!.qty };
      });
    setOrderDetails(pds);
  };

  const columnsOrders: ItemType[] = [
    {
      columnType: {
        title: t`id`,
        dataIndex: "id",
        width: 100,
      },
      type: "primary-key",
    },
    {
      columnType: {
        title: t`order_no`,
        dataIndex: "order_no",
        width: 250,
      },
      type: "text",
      demo: true,
    },
    {
      columnType: {
        title: t`first_name`,
        dataIndex: "first_name",
        width: 200,
      },
      type: "text",
      demo: true,
    },
    {
      columnType: {
        title: t`last_name`,
        dataIndex: "last_name",
        width: 200,
      },
      type: "text",
      demo: true,
    },
    {
      columnType: {
        title: t`phone`,
        dataIndex: "phone",
        width: 200,
      },
      type: "text",
      demo: true,
    },
    {
      columnType: {
        title: t`address`,
        dataIndex: "address",
        width: 250,
      },
      type: "text",
      demo: true,
    },
    {
      columnType: {
        title: t`status`,
        dataIndex: "status",
        width: 250,
        render: (val: number) => <Typography.Text> {OrderStatus[val].toString()}</Typography.Text>,
        filters: [
          { text: "Not verified", value: "not verified" },
          { text: "On Delivery", value: "on delivery" },
          { text: "Rejected", value: "rejected" },
          { text: "Verified", value: "verified" },
          { text: "Pending", value: "pending" },
          { text: "Done", value: "done" },
        ],
        filterMultiple: false,
        onFilter: (value, record) => {
          const ind = Object.keys(OrderStatus)
            .splice(6)
            .findIndex((el) => el === value);
          return Number(record.status) === ind;
        },
      },
      type: "foreign-key",
      foreignKeyArr: Object.keys(OrderStatus)
        .splice(6)
        .map((el, ind) => ({ title: el, value: ind })),
    },
    {
      columnType: {
        title: t`requested_delivery_date`,
        dataIndex: "requested_delivery_date",
        width: 300,
      },
      type: "date",
      demo: true,
    },
  ];

  const pdColumns: ColumnsType<Product> = [
    {
      title: "ID",
      dataIndex: `id`,
      width: 100,
      align: "center",
    },
    {
      title: "Product Name",
      dataIndex: `name:${lang}`,
      width: "auto",
      align: "center",
    },
    {
      title: "Product Quantity",
      dataIndex: `qty`,
      width: 200,
      align: "center",
    },
    {
      title: "Product Price",
      dataIndex: `price`,
      width: 200,
      align: "center",
    },
    {
      title: "Total",
      dataIndex: `total_price`,
      width: 200,
      align: "center",
      render: (_, rec) => rec.price * (rec as any).qty,
    },
  ];

  const tmp: ItemType[] = [
    {
      columnType: {
        title: t`order_details`,
        dataIndex: "order_details",
        width: 100,
        render: (val: OrderDetails[]) => (
          <Button
            size="middle"
            type="primary"
            ghost
            onClick={() => onClick(val)}
            title="SHOW"
            icon={<EyeFilled />}
            loading={proStatus === "loading"}
          />
        ),
      },
      type: "foreign-key",
      demo: true,
    },
  ];

  const total = orderDetails?.map((el) => el.price * Number(el.qty)).reduce((a, b) => a + b, 0);

  const printdiv = () => {
    var content = document.getElementById("divcontents");
    var pri = (document?.getElementById("ifmcontentstoprint") as any).contentWindow;
    pri.document.open();
    pri.document.write(content?.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };
  return (
    <>
      <iframe id="ifmcontentstoprint" style={{ height: "0px", width: "0px", position: "absolute" }}></iframe>

      <Button onClick={() => exportExcel(orders, "orders", "xls")}>{t`export_as_excel`}</Button>
      <CRUDBuilder
        table_id="table-to-xls"
        lang={lang === "en" ? "en" : "ar"}
        items={orders}
        loading={status === "loading"}
        UpdateAsync={
          sales || customer_care ? undefined : (val) => UpdateOrderAsync({ order_id: val.id, status: val.item.status })
        }
        itemsHeader={[...columnsOrders, ...tmp]}
      />
      <Modal width={800} visible={visible} footer={false} onCancel={() => setVisible(false)}>
        <Row justify="center">
          <Button className="no-print" type="primary" onClick={printdiv}>
            print
          </Button>
        </Row>
        <div id="divcontents">
          <Row justify="space-between" style={{ marginTop: 20 }}>
            <Col>
              <img width={100} src="/assets/MAWN_logo.png" />
            </Col>
            <Col></Col>
          </Row>
          <Table
            columns={pdColumns}
            dataSource={orderDetails}
            pagination={false}
            bordered
            style={{
              marginTop: 20,
            }}
          />
          <Row justify="center">
            <Col offset={18}>
              <Typography.Title level={5} style={{ marginTop: 30 }}>
                <span style={{ fontWeight: "normal" }}>Total price </span>
                {total} <span style={{ fontWeight: "normal" }}>SAR</span>
              </Typography.Title>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};
export default ManageOrders;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;
