import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FetchOrderLimitAsync, selectOrderLimit, selectOrdersStatus, SetOrderLimitAsync } from "../../../redux/orders";
import { GetServerSideProps } from "next";
import { DashboardAuthenticated } from "../../../utils/helpers/dashboard-authenticated";
import LoadingData from "../../../components/LoadingData";
import { Button, Col, Form, Input, Row } from "antd";
import useTranslation from "next-translate/useTranslation";

const OrderLimitTags: FC = () => {
  const status = useSelector(selectOrdersStatus);
  const orderLimit = useSelector(selectOrderLimit);
  const { t } = useTranslation("dashboard");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchOrderLimitAsync());
    console.log("dd", orderLimit);
  }, [dispatch]);

  return (
    <Row justify="center" style={{ marginTop: 200 }}>
      <Col span={10}>
        <LoadingData loading={status === "loading"} dataValid={() => (orderLimit ? true : false && status === "data")}>
          <Form layout="inline" onFinish={(val: any) => dispatch(SetOrderLimitAsync(val))}>
            <Form.Item name="min_checkout_limit" label="Order Price Limit">
              <Input size="large" defaultValue={orderLimit} />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" size="large" type="primary">
                {t`update`}
              </Button>
            </Form.Item>
          </Form>
        </LoadingData>
      </Col>
    </Row>
  );
};
export default OrderLimitTags;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;
