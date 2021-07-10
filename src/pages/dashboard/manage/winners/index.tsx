import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTranslation from "next-translate/useTranslation";
import { Button, Col, Dropdown, Form, Image, Menu, Modal, Row, Select } from "antd";

import { ItemType } from "../../../../utils/CRUDBuilder/types";
import CRUDBuilder from "../../../../utils/CRUDBuilder/CRUDBuilder";

import { GetServerSideProps } from "next";
import {
  FetchCitiesAsync,
  FetchWinnersAsync,
  UpdateDeliveryStatusAsync,
  selectCities,
  selectWinners,
  FetchReceivingCentersAsync,
} from "../../../../redux";
import { DashboardAuthenticated } from "../../../../utils/helpers/dashboard-authenticated";
import { City, ReceivingCenter, User, Winner } from "../../../../models";
import { giftService } from "../../../../services/gift";
import LoadingData from "../../../../components/LoadingData";
import { DownloadSvg } from "../../../../utils/helpers/download-svg";
import { GiftItem } from "../../../../models/gift-item";
import { exportExcel } from "../../../../utils/helpers/export_jsonToExcel";
import { WinnerStatus } from "../../../../models/order/enum";
import { RootState } from "../../../../redux/store";

const { Option } = Select;

let winners_objToPdf: any = [];

const ManageCities: FC = () => {
  const { t, lang } = useTranslation("dashboard");
  const en = lang === "en";
  const dispatch = useDispatch();

  const [showSelectCenter, setshowSelectCenterSelectCenter] = useState<{ val: any; rec: Winner; center?: number } | undefined>();
  const { receiving_centers, status: centers_status } = useSelector((state: RootState) => state.ReceivingCenter);
  const { winners, status } = useSelector(selectWinners);
  const { cities } = useSelector(selectCities);

  const [preview, setPreview] = useState<{
    previewVisible: boolean;
    previewImage?: React.ReactNode;
  }>({ previewVisible: false, previewImage: undefined });

  useEffect(() => {
    dispatch(FetchReceivingCentersAsync());
    dispatch(FetchWinnersAsync());
    dispatch(FetchCitiesAsync());
  }, [dispatch]);

  const onSelectDeliveryStatus = (val: any, rec: Winner) => {
    setshowSelectCenterSelectCenter({ val: val, rec: rec });
  };

  const updateDeliveryStatus = (req: { center: number }) => {
    setshowSelectCenterSelectCenter(undefined);

    dispatch(
      UpdateDeliveryStatusAsync({
        gift_id: showSelectCenter?.rec.id!,
        status: showSelectCenter?.val.key,
        center: req.center,
      })
    );
  };

  //select delivery center modal
  const select_center_modal = (
    <Modal
      visible={showSelectCenter !== undefined}
      footer={false}
      onCancel={() => setshowSelectCenterSelectCenter(undefined)}
      closable={false}
      style={{ padding: "30px 20px" }}
    >
      <Form onFinish={updateDeliveryStatus}>
        <Row justify="end" gutter={[24, 24]}>
          <Col span={24}>
            <Form.Item name="center" required style={{ width: "100%" }}>
              <Select allowClear style={{ width: "100%" }} placeholder={t`Please select your center`}>
                {receiving_centers.map((el) => (
                  <Option key={el.id} value={el.id}>
                    {en ? el["name:en"] : el["name:ar"]}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {t`submit`}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );

  const winner_status_menu = (rec: Winner) => (
    <Menu>
      <Menu.Item key={0} onClick={(val) => onSelectDeliveryStatus(val, rec)}>
        Pending
      </Menu.Item>
      <Menu.Item key={1} onClick={(val) => onSelectDeliveryStatus(val, rec)}>
        Contacted
      </Menu.Item>
      <Menu.Item key={2} onClick={(val) => onSelectDeliveryStatus(val, rec)}>
        Delivered
      </Menu.Item>
      <Menu.Item key={3} onClick={(val) => onSelectDeliveryStatus(val, rec)}>
        Closed number
      </Menu.Item>
      <Menu.Item key={4} onClick={(val) => onSelectDeliveryStatus(val, rec)}>
        Wrong number
      </Menu.Item>
    </Menu>
  );

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
        title: t`used`,
        dataIndex: "used",
        width: 200,
      },
      type: "check-box",
    },
    {
      columnType: {
        title: t`user_name`,
        dataIndex: "name",
        width: 200,
      },
      type: "text",
    },
    {
      columnType: {
        title: t`user_email`,
        dataIndex: "email",
        width: 200,
      },
      type: "text",
    },
    {
      columnType: {
        title: t`user_phone`,
        dataIndex: "phone_number",
        width: 200,
      },
      type: "text",
    },
    {
      columnType: {
        title: t`gift_item_image`,
        dataIndex: "gift_item",
        width: 200,
        render: (el: GiftItem) => el && <Image src={el.image} />,
      },
      type: "foreign-key-obj",
    },

    {
      columnType: {
        title: t`scanned_at`,
        dataIndex: "scanned_at",
        width: 200,
      },
      type: "text",
    },
    {
      columnType: {
        title: t`user_city`,
        dataIndex: "user",
        width: 200,
        render: (el: User) =>
          el && en ? (
            <p>{cities.find((e: City) => Number(e.id) === Number(el.city_id))?.["name:en"]}</p>
          ) : (
            <p>{cities.find((e: City) => Number(e.id) === Number(el.city_id))?.["name:ar"]}</p>
          ),
      },
      type: "foreign-key-obj",
    },
    {
      columnType: {
        title: t`gift_item_name`,
        dataIndex: "gift_item",
        width: 200,
        render: (el: GiftItem) =>
          el && <div dangerouslySetInnerHTML={{ __html: lang === "en" ? el?.["name:en"] : el["name:ar"] }} />,
      },
      type: "foreign-key-obj",
    },
    {
      columnType: {
        title: t`gift_item_description`,
        dataIndex: "gift_item",
        width: 200,
        render: (el: GiftItem) =>
          el && <div dangerouslySetInnerHTML={{ __html: lang === "en" ? el["description:en"] : el["description:ar"] }} />,
      },
      type: "foreign-key-obj",
    },
    {
      columnType: {
        title: t`image`,
        dataIndex: "image_path",
        width: 200,
        render: (val: string) => (
          <Button
            type="default"
            size="large"
            onClick={() => {
              setPreview({ ...preview, previewVisible: true });
              const arr = val.split("/");
              const l = arr.length;
              const url = `${arr[l - 3]}/${arr[l - 2]}/${arr[l - 1]}`;
              giftService.ShowCode(url).then((el) => setPreview({ previewVisible: true, previewImage: el }));
            }}
          >
            Show
          </Button>
        ),
      },
      type: "image",
    },
    {
      columnType: {
        title: t`last_status_update`,
        dataIndex: "updated_at",
        width: 200,
      },
      type: "date",
    },
    {
      columnType: {
        title: t`delivery_center`,
        dataIndex: "delivery_center",
        width: 200,
        render: en ? (val: ReceivingCenter) => val?.["address:en"] : (val: ReceivingCenter) => val?.["address:ar"],
      },
      type: "foreign-key-obj",
    },
    {
      columnType: {
        title: t`delivery_user`,
        dataIndex: "delivery_user",
        width: 200,
        render: (val: User) => val?.first_name,
      },
      type: "foreign-key-obj",
    },
    {
      columnType: {
        title: t`status`,
        dataIndex: "status",
        width: 150,
        render: (val: string, rec: Winner) => (
          <Dropdown overlay={winner_status_menu(rec)} trigger={["click"]}>
            <Button type={Number(val) === 2 ? "primary" : "default"} size="large" loading={centers_status === "loading"}>
              {WinnerStatus[Number(val)].toString()}
            </Button>
          </Dropdown>
        ),
        filters: [
          { text: "Pending", value: 0 },
          { text: "Contacted", value: 1 },
          { text: "Delivered", value: 2 },
          { text: "Closed number", value: 3 },
          { text: "Wrong number", value: 4 },
        ],
        filterMultiple: false,
        onFilter: (value, record) => Number(record.status) === value,
      },
      type: "foreign-key",
    },
  ];

  //winners to excel obj
  useEffect(() => {
    winners_objToPdf = winners.map((el: Winner) => ({
      id: el.id,
      used: el.used === "1" ? "yes" : "no",
      "winner email": el.user.email,
      "winner phone": el.user.phone,
      "winner city-ar": cities.find((city) => city.id === Number(el.user.city_id))?.["name:ar"],
      "winner city-en": cities.find((city) => city.id === Number(el.user.city_id))?.["name:en"],
      "gift item name-ar": el.gift_item["name:ar"],
      "gift item name-en": el.gift_item["name:en"],
      "scanned at": el.scanned_at ?? undefined,
      "scan count": el.scan_count,
      "expires at": el.expires_at,
    }));
  }, [cities, winners]);

  return (
    <>
      {select_center_modal}
      <Col span={24}>
        <Button onClick={() => exportExcel(winners_objToPdf, "orders", "xls")}>{t`export_as_excel`}</Button>
      </Col>
      <CRUDBuilder
        lang={lang === "en" ? "en" : "ar"}
        items={winners}
        loading={status === "loading"}
        itemsHeader={columnsCities}
      />
      <Modal
        visible={preview.previewVisible}
        footer={null}
        onCancel={() => setPreview({ previewImage: undefined, previewVisible: false })}
      >
        <LoadingData dataValid={() => (preview.previewImage ? true : false)} loading={preview.previewImage ? false : true}>
          <Row justify="space-around" align="middle">
            <Col>
              <img src={`data:image/png;base64, ${preview.previewImage}`} />
            </Col>
            <Col>
              <Button size="large" type="primary" onClick={() => DownloadSvg("#divv svg", "QR")}>
                {"Download"}
              </Button>
            </Col>
          </Row>
        </LoadingData>
      </Modal>
    </>
  );
};
export default ManageCities;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;
