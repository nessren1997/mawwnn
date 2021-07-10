import { useDispatch, useSelector } from "react-redux";
import { FetchGiftsPerPageAsync, selectGift } from "../redux/gift";
import React, { FC, useEffect, useState } from "react";
import { Button, Col, Form, InputNumber, Row, Spin } from "antd";
import { Gift } from "../models/gift";
import { exportExcel } from "../utils/helpers/export_jsonToExcel";

let token_object: any = [];

interface props {}

let last_page = 1;
const index: FC<props> = (props) => {
  let {
    status,
    giftsPerPage: { data, links },
  } = useSelector(selectGift);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [filterd, setFilterd] = useState<Gift[]>([]);
  useEffect(() => {
    let arr = links?.last.split("=");
    last_page = Number(arr?.[1]);
  }, [links]);

  const onSelectPage = (value: { page: number }) => {
    //get gifts by page
    dispatch(FetchGiftsPerPageAsync(value.page));
    setFilterd([]);
    form.resetFields();
  };

  const onFilter = (req: { from: number; to: number }) => {
    //gilter gifts by id's -- from id - to id
    setFilterd(data.filter((el) => el.id >= req.from && el.id <= req.to));
  };
  useEffect(() => {
    //get first page of gifts
    dispatch(FetchGiftsPerPageAsync(1));
  }, []);

  useEffect(() => {
    token_object = filterd.map((el: Gift) => ({
      id: el.id,
      token: el.token,
    }));
  }, [filterd]);

  return (
    <Spin spinning={status === "loading"}>
      <Row justify="space-around" className="noPrint">
        <Form onFinish={onSelectPage}>
          <Row justify="center">
            <Form.Item name="page" label={`Select page from 1 - ${last_page}`}>
              <InputNumber style={{ width: "100%" }} placeholder="page number" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Submit</Button>
            </Form.Item>
          </Row>
        </Form>

        <Form form={form} onFinish={onFilter}>
          <Row justify="center">
            <Form.Item name="from">
              <InputNumber style={{ width: "100%" }} placeholder="from" />
            </Form.Item>
            <Form.Item name="to">
              <InputNumber style={{ width: "100%" }} placeholder="to" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Filter</Button>
            </Form.Item>
          </Row>
        </Form>

        <Col span={24} style={{ textAlign: "center" }}>
          <Button onClick={() => exportExcel(token_object, "orders", "xls")}>Export Excel</Button>
        </Col>
      </Row>

      {filterd.length !== 0 ? (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto auto" }}>
            {filterd?.map((el) => (
              <div style={{ display: "grid", justifyContent: "center", padding: 10, textAlign: "center" }}>
                <p style={{ fontSize: ".6em" }}>{el.token}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        data && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto auto" }}>
              {data?.map((el) => (
                <div style={{ display: "grid", justifyContent: "center", padding: 10, textAlign: "center" }}>
                  <p style={{ fontSize: ".6em" }}>{el.token}</p>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </Spin>
  );
};

export default index;
