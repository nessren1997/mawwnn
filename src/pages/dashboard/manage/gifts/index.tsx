import useTranslation from "next-translate/useTranslation";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CRUDBuilder from "../../../../utils/CRUDBuilder/CRUDBuilder";
import { ItemType } from "../../../../utils/CRUDBuilder/types";

import { GetServerSideProps } from "next";
import { EditOutlined } from "@ant-design/icons";
import { Gift_Req } from "../../../../models/gift";
import { giftService } from "../../../../services/gift";
import { GiftItem } from "../../../../models/gift-item";
import LoadingData from "../../../../components/LoadingData";
import { Button, Col, DatePicker, Form, Image, Input, Modal, Row, Select } from "antd";
import { downloadImage } from "../../../../utils/helpers/download-svg";
import { FetchGiftItemsAsync, selectGiftItem } from "../../../../redux/gift-item";
import { DashboardAuthenticated } from "../../../../utils/helpers/dashboard-authenticated";
import { DeleteGiftAsync, FetchGiftsAsync, FetchPaginatedGiftsAsync, InsertGiftAsync, selectGift } from "../../../../redux/gift";
import { selectApp } from "../../../../redux";
import moment from "moment";
import { DATE_FORMAT } from "../../../../constants/keys";
import Link from "next/link";

function convertTZ(date: any) {
  return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: "Asia/Damascus" }));
}

let prevPage: number[] = [];

const ManageGifts: FC = () => {
  const { t, lang } = useTranslation("dashboard");
  const dispatch = useDispatch();

  const { gifts, status } = useSelector(selectGift);
  const { giftItems } = useSelector(selectGiftItem);
  const { user } = useSelector(selectApp);
  const sales = user?.roles[0].name === "sales";
  const customer_care = user?.roles[0].name === "customer care";

  const [visible, setVisible] = useState(false);

  const [preview, setPreview] = useState<{ previewVisible: boolean; previewImage?: string }>({
    previewVisible: false,
    previewImage: undefined,
  });

  let page = 1;

  useEffect(() => {
    dispatch(FetchGiftsAsync(page));
    dispatch(FetchGiftItemsAsync());
  }, [dispatch]);

  const onFinishAdd = (gift: Gift_Req) => {
    setVisible(false);
    gift.expires_at = (gift.expires_at as unknown as moment.Moment).format(DATE_FORMAT);

    dispatch(InsertGiftAsync({ gift }, (gift as any).quantity));
  };

  const columnsGifts: ItemType[] = [
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
        title: t`scan_count`,
        dataIndex: "scan_count",
        width: 150,
      },
      type: "number",
    },
    {
      columnType: {
        title: t`used_count`,
        dataIndex: "used",
        width: 150,
      },
      type: "number",
    },
    {
      columnType: {
        title: t`expires_at`,
        dataIndex: "expires_at",
        width: 150,
        sorter: (a, b) => a.id - b.id,
        render: (val: Date) => (val ? val : "-"),
      },
      type: "date",
    },
  ];

  let tmp: ItemType[] = [
    {
      columnType: {
        title: t`gift_item_name`,
        dataIndex: "gift_item",
        width: 200,

        render: (el: GiftItem) =>
          el && <div dangerouslySetInnerHTML={{ __html: lang === "en" ? el["name:en"] : el["name:ar"] }} />,
      },
      type: "foreign-key-obj",
    },
    {
      columnType: {
        title: t`gift_item_description`,
        dataIndex: "gift_item",
        width: 300,
        render: (el: GiftItem) =>
          el && <div dangerouslySetInnerHTML={{ __html: lang === "en" ? el["description:en"] : el["description:ar"] }} />,
      },
      type: "foreign-key-obj",
    },
    {
      columnType: {
        title: t`gift_item_image`,
        dataIndex: "gift_item",
        width: 180,
        render: (el: GiftItem) => el && <Image src={el.image} style={{ width: 150, height: 150, objectFit: "cover" }} />,
      },
      type: "foreign-key-obj",
    },
    {
      columnType: {
        title: t`token`,
        dataIndex: "token",
        width: 200,
      },
      type: "text",
    },
    {
      columnType: {
        title: t`created_at`,
        dataIndex: "created_at",
        width: 200,
        render: (val: any) => moment(val).toString(),
      },
      type: "date",
    },
    {
      columnType: {
        title: "QR",
        dataIndex: "image_path",
        width: 150,
        render: (val: string) => (
          <Button
            type="default"
            size="large"
            onClick={() => {
              setPreview({ ...preview, previewVisible: true });
              const arr = val.split("/");
              const l = arr.length;
              const url = `${arr[l - 3]}/${arr[l - 2]}/${arr[l - 1]}`;
              giftService.ShowCode(url).then((el: any) => setPreview({ previewVisible: true, previewImage: el }));
            }}
          >
            Show
          </Button>
        ),
      },
      type: "image",
    },
  ];

  let last_page: any = gifts.links?.last.split("=");
  last_page = last_page?.[1] * 10;

  return (
    <>
      {sales ? (
        <></>
      ) : (
        <>
          <Button loading={status === "loading"} size="large" type="primary" onClick={() => setVisible(true)}>
            Add
          </Button>
          <Link href="/generate-qr">
            <Button loading={status === "loading"} style={{ margin: 10 }} size="large" type="primary">
              Print
            </Button>
          </Link>

          <Link href="/filter-token">
            <Button loading={status === "loading"} style={{ margin: 10 }} size="large" type="primary">
              Export To Excel
            </Button>
          </Link>
        </>
      )}
      <CRUDBuilder
        lang={lang === "en" ? "en" : "ar"}
        items={gifts.data}
        loading={status === "loading"}
        DeleteAsync={sales || customer_care ? undefined : (el) => DeleteGiftAsync({ id: el.id })}
        itemsHeader={[...columnsGifts, ...tmp]}
        getPage={(page) => {
          let ind = prevPage.findIndex((el) => el === page);
          ind === -1 && dispatch(FetchPaginatedGiftsAsync(page));
          prevPage.push(page);
        }}
        totalItems={gifts.data.length + 1}
        showSizeChanger={false}
      />
      <Modal
        visible={preview.previewVisible}
        footer={null}
        onCancel={() => setPreview({ previewImage: undefined, previewVisible: false })}
      >
        <LoadingData dataValid={() => (preview.previewImage ? true : false)} loading={preview.previewImage ? false : true}>
          <Row justify="space-around" align="middle">
            <Col>
              {/* <div id='divv' dangerouslySetInnerHTML={{ __html: preview.previewImage as any }} /> */}
              <img src={`data:image/png;base64, ${preview.previewImage}`} />
            </Col>
            <Col>
              <Button size="large" type="primary" onClick={() => downloadImage(`data:image/png;base64, ${preview.previewImage}`)}>
                {"Download"}
              </Button>
            </Col>
          </Row>
        </LoadingData>
      </Modal>
      <Modal
        width={800}
        footer={false}
        title={
          <React.Fragment>
            <EditOutlined />
            {`  Add`}
          </React.Fragment>
        }
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <Form encType="multipart/form-data" scrollToFirstError={true} name="Add" layout="vertical" onFinish={onFinishAdd}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="gift_item_id" label="Gift Item" rules={[{ required: true }]}>
                <Select style={{ width: "100%" }}>
                  {giftItems.map((el) => (
                    <Select.Option key={el.id} value={el.id}>
                      {lang === "ar" ? el["name:ar"] : el["name:en"]}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="expires_at" label="Expire date" rules={[{ required: true }]}>
                <DatePicker disabledDate={(current) => current && current < moment().endOf("day")} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button style={{ margin: 10 }} size="large" htmlType="submit" type="primary">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ManageGifts;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;
