import { selectOrderErrors, selectOrderStatus, selectVerificationStatus, SendRegisteredOrderAsync } from "../../redux/order-form";
import {
  EmptyCart,
  selectCities,
  FetchAddressesAsync,
  selectAddress,
  InsertAddressAsync,
  selectCitiesAllowedStatus,
} from "../../redux";
import { Row, Col, Select, DatePicker, Form, Button, notification, Modal, Input } from "antd";
import { primaryColor } from "../../constants/layout/color";
import useTranslation from "next-translate/useTranslation";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { selectCoupon } from "../../redux/coupon";
import { Address_I_Req, Address_Req, Product, User } from "../../models";
import React, { useEffect, useState } from "react";
import StepThree from "../cart-step-three";
import Link from "next/link";
import moment from "moment";

import "./style.less";
import { styledInput } from "../../constants/layout/responsive";
import { RootState } from "../../redux/store";

const { Option } = Select;

interface propsInterface {
  nextStep: () => void;
  user: User | undefined;
  cart: { product: Product; quantity: number }[];
}

const RegisteredForm: React.FC<propsInterface> = ({ nextStep, cart }) => {
  const { t } = useTranslation("cart");
  const [verification, setVerification] = useState(false);

  const verificationStatus = useSelector(selectVerificationStatus);

  const verificationtNotification = (msg: string, description: string, type: string) => {
    notification[type === "success" ? "success" : "error"]({
      message: msg,
      description: description,
      placement: "bottomRight",
      duration: 4,
    });
  };

  useEffect(() => {
    if (verificationStatus === "data") {
      verificationtNotification(t`verification-success`, t`verification-success-desc`, "success");
      dispatch(EmptyCart());
      nextStep();
    }
  }, [verificationStatus]);

  useEffect(() => {
    if (verificationStatus === "error") {
      verificationtNotification(t`verification-failed`, t`verification-failed-desc`, "failed");
    }
  }, [verificationStatus]);

  //*********************************************************************************/
  const orderStatus = useSelector(selectOrderStatus);
  const orderErrors = useSelector(selectOrderErrors);
  const { addresses, status: addresses_status } = useSelector(selectAddress);

  const dispatch = useDispatch();
  const { cities, status: citiesStatus } = useSelector(selectCities);
  const { citiesallowed, status: citiesAllowedStatus } = useSelector((state: RootState) => state.CitiesAllowed);

  const { coupon } = useSelector(selectCoupon);

  const ordertNotification = (msg: string, description: string, type: string) => {
    notification[type === "success" ? "success" : "error"]({
      message: msg,
      description: description,
      placement: "bottomRight",
      duration: 4,
    });
  };

  console.log("cccc", cities);

  const handleSubmit = async (vals: any) => {
    // send data to server
    if (coupon.trim()) {
      dispatch(
        SendRegisteredOrderAsync({
          address: vals.address,
          city_id: vals.governorate,
          requested_delivery_date: vals.orderDate.format("YYYY-MM-DD"),
          product: cart.map((el) => ({
            product_id: el.product.id,
            qty: el.quantity,
          })),
          coupon,
        })
      );
    } else {
      dispatch(
        SendRegisteredOrderAsync({
          address: vals.address,
          city_id: vals.governorate,
          requested_delivery_date: vals.orderDate.format("YYYY-MM-DD"),
          product: cart.map((el) => ({
            product_id: el.product.id,
            qty: el.quantity,
          })),
        })
      );
    }
  };

  useEffect(() => {
    if (orderStatus === "data") {
      ordertNotification(t`order-success`, t`order-success-desc`, "success");
      setVerification(true);
    }
    if (orderStatus === "error" && orderErrors) {
      for (const prop in orderErrors) {
        ordertNotification(
          t`cart-errors.order-sent-failed`,
          prop === "phone" ? t`cart-errors.invalid-number` : t`cart-errors.invalid-date`,
          "failed"
        );
      }
    }
  }, [orderStatus]);

  useEffect(() => {
    dispatch(FetchAddressesAsync());
  }, []);

  const [isModalVisible, setisModalVisible] = useState(false);
  const onAddNewAddress = (req: Address_Req) => {
    dispatch(InsertAddressAsync({ address: req }));
    setisModalVisible(false);
  };
  const add_address_modal = (
    <Modal title={t`Add new address`} visible={isModalVisible} footer={false} onCancel={() => setisModalVisible(false)}>
      <Form onFinish={onAddNewAddress}>
        <Form.Item name="address_text" rules={[{ required: true, message: t`please_enter_address` }]}>
          <Input placeholder={t`address`} {...styledInput} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" shape="round" style={{ height: 50 }}>{t`add`}</Button>
        </Form.Item>
      </Form>
    </Modal>
  );

  if (verification) return <StepThree cart={cart} nextStep={nextStep} step={1} />;

  return (
    <Form onFinish={handleSubmit}>
      <Row gutter={[12, 18]}>
        <Col span={21}>
          <div className="address_select">
            <Form.Item name="address" rules={[{ required: true, message: t`cart-errors.address` }]}>
              <Select loading={addresses_status === "loading"} placeholder={t`cart-forms.address`}>
                {addresses?.map((address) => (
                  <Option key={address.id} value={address.id}>
                    {address.address_text}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Col>
        <Col>
          <Button
            type="dashed"
            shape="circle"
            onClick={() => setisModalVisible(true)}
            style={{ width: 50, height: 50 }}
            icon={<PlusOutlined style={{ fontWeight: "bolder", color: primaryColor }} />}
          />
          {add_address_modal}
        </Col>

        <Col flex="1 1 250px" className="select_container">
          <Form.Item name="governorate" rules={[{ required: true, message: t`cart-errors.governorate` }]}>
            <Select
              className="form_select"
              placeholder={t`cart-forms.governorate`}
              style={{ width: "100%" }}
              loading={citiesStatus === "loading"}
            >
              {/* {citiesStatus === "data"
                ? cities.map(
                    ({ id, name }) =>
                      id === 1 && (
                        <Option value={id} key={id}>
                          {name}
                        </Option>
                      )
                  )
                : null} */}

              {citiesStatus === "data"
                ? cities.map(
                    ({ id, is_allowed_for_order, name }) =>
                      is_allowed_for_order === 1 && (
                        <Option value={id} key={id}>
                          {name}
                        </Option>
                      )
                  )
                : null}
            </Select>
          </Form.Item>
        </Col>

        <Col flex="1 1 250px">
          <Form.Item name="orderDate" rules={[{ required: true, message: t`cart-errors.delivery-date` }]}>
            <DatePicker
              disabledDate={(cur) => cur && cur < moment().endOf("day")}
              style={{ width: "100%", borderRadius: 25, padding: "10px 20px" }}
              placeholder={t`cart-forms.delivery-date`}
            />
          </Form.Item>
        </Col>

        <Col flex="1 1 250px">
          <Button
            htmlType="submit"
            style={{
              borderRadius: 25,
              width: "100%",
              height: 60,
              backgroundColor: primaryColor,
              color: "#fff",
            }}
            loading={orderStatus === "loading"}
          >
            {t`cart-forms.confirm`}
          </Button>
        </Col>
        <Col flex="1 1 250px">
          <Link href="/">
            <Button
              style={{
                borderRadius: 25,
                width: "100%",
                height: 56,
                border: `2px solid ${primaryColor}`,
                color: primaryColor,
              }}
            >
              {t`cart-forms.back-shopping`}
            </Button>
          </Link>
        </Col>
      </Row>
    </Form>
  );
};

export default RegisteredForm;
