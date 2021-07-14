import { Typography, Col, Form, Input, Row, notification, Select, Alert } from "antd";
import React, { useEffect, useState } from "react";
import { styledInput, styledInputNotBorderd } from "../../constants/layout/responsive";
import PButton from "../PButton/Buttom";
import useTranslation from "next-translate/useTranslation";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfoAsync,
  selectUser,
  updateUserInfo,
  selectGetInfoStatus,
  selectUpdateInfoStatus,
  selectCitiesProfile,
} from "../../redux/app";
import updateUserInfoReq from "../../models/update-user-info/update-req";
import { PoweroffOutlined } from "@ant-design/icons";

import "./style.less";
import { FetchCitiesAsync } from "../../redux";
import { isValidPhoneNumber } from "libphonenumber-js";

const { Text } = Typography;
const PersonalInfo: React.FC = () => {
  const { t } = useTranslation("personal-collection");

  const [borderd, setborderd] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const [cancel, setCancel] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const status = useSelector(selectGetInfoStatus);
  const statusUpdate = useSelector(selectUpdateInfoStatus);
  const { status: cities_status, cities } = useSelector(selectCitiesProfile);

  const [missingparams, setMissingParams] = useState(user?.missing_params);

  useEffect(() => {
    dispatch(getUserInfoAsync());
    dispatch(FetchCitiesAsync());

    if (missingparams === true) {
      notification["warning"]({
        message: t`compleate-registration`,
        description: t`phone-city`,
      });
    }
  }, []);

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [form, user]);

  useEffect(() => {
    if (statusUpdate === "data") {
      notification["success"]({
        message: t("update"),
      });
      setborderd(false);
      setdisabled(true);
      setCancel(false);
    }
  }, [statusUpdate]);

  // useEffect(() => {
  //   form.resetFields();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [lang]);
  const { Option } = Select;

  const onFinish = (values: any) => {
    if (!borderd) {
      setborderd(true);
      setdisabled(false);
      setCancel(true);
    } else {
      let res: updateUserInfoReq = {
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
        password: values.password,
        city_id: values.city_id,
      };
      if (String(values.phone).charAt(0) === "0") {
        values.phone = values.phone.substring(1);
      }
      values = {
        ...values,
        phone: `${values.code}${(values.phone as string).replace(/\s/g, "")}`,
      };
      delete values.code;

      dispatch(updateUserInfo(res));
      form.resetFields(["password", "confirm"]);
    }
  };

  const canceledHandler = () => {
    setborderd(false);
    setdisabled(true);
    setCancel(false);
  };
  const labelStyled = (text: string) => {
    return <Text style={{ color: "#3f428f", fontWeight: "bold" }}>{text}</Text>;
  };
  useEffect(() => {}, [user]);
  return (
    <>
      <Form labelAlign="right" layout="vertical" onFinish={onFinish} form={form}>
        <Row justify="space-around" gutter={{ lg: 18, xl: 25 }} style={{ padding: "26px 35px 21px 59px" }}>
          <Col>
            <Form.Item name="first_name" label={labelStyled(t("firstName"))}>
              <Input disabled={disabled} bordered={borderd} {...styledInputNotBorderd} />
            </Form.Item>
            <Form.Item name="email" label={labelStyled(t("email"))}>
              <Input disabled={disabled} bordered={borderd} {...styledInputNotBorderd} />
            </Form.Item>
            <Form.Item name="password" label={labelStyled(t("password"))}>
              <Input.Password
                disabled={disabled}
                bordered={borderd}
                {...styledInputNotBorderd}
                minLength={8}
                placeholder="********"
              />
            </Form.Item>
          </Col>

          <Col>
            <Row style={{ direction: "ltr" }}>
              <Col span={8}>
                <div className="select_code">
                  <Form.Item name="code">
                    <Select direction="ltr" style={{ top: 37 }} disabled={disabled}>
                      <Option value="+963">
                        <span dir="ltr">+963</span>
                      </Option>
                    </Select>
                  </Form.Item>
                </div>
              </Col>
              <Col span={16}>
                <Form.Item
                  name="phone"
                  hasFeedback
                  label={labelStyled(t("phone"))}
                  rules={[
                    { message: t("phoneN") },
                    {
                      pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
                      message: t`form-validation.invalid-phone-number`,
                    },
                    () => ({
                      validator(_, value) {
                        if (!value || isValidPhoneNumber(`+963${(value as string).replace(/\s/g, "")}`, "SY"))
                          return Promise.resolve();
                        return Promise.reject(new Error(t`form-validation.invalid-uae-number`));
                      },
                    }),
                  ]}
                >
                  <Input style={{ height: "41px", borderRadius: "0 30px 30px 0" }} placeholder={t("phone")} disabled={disabled} />
                </Form.Item>  
              </Col>
            </Row>

            {/* <Form.Item name="phone" label={labelStyled(t("phone"))}>
              <Input disabled={disabled} bordered={borderd} {...styledInputNotBorderd} />
            </Form.Item> */}

            <div className="city_select">
              <Form.Item name="city_id" label={labelStyled(t("city"))}>
                <Select direction="ltr" placeholder={t`city`} disabled={disabled}>
                  {cities.map(
                    (city) =>
                      city.id === 1 && (
                        <Option key={city.id} value={city.id}>
                          <span dir="ltr">{city.name}</span>
                        </Option>
                      )
                  )}
                </Select>
              </Form.Item>
            </div>

            {cancel ? (
              <Form.Item
                name="confirm"
                label={labelStyled(t("confirmpass"))}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(t("confirm_pass"));
                    },
                  }),
                ]}
              >
                <Input.Password disabled={disabled} bordered={borderd} {...styledInputNotBorderd} />
              </Form.Item>
            ) : null}
          </Col>
        </Row>
        <Row style={{ justifyContent: "flex-end", padding: "0 30px" }} gutter={{ lg: 8, xl: 16 }}>
          <Col>
            <Form.Item>
              <PButton
                ttype={cancel ? "success" : undefined}
                loading={statusUpdate === "loading"}
                icon={statusUpdate === "loading" ? <PoweroffOutlined /> : ""}
                htmlType="submit"
              >
                {t("edit")}
              </PButton>
            </Form.Item>
          </Col>

          {cancel ? (
            <Col>
              <Form.Item>
                <PButton ttype="danger" onClick={() => canceledHandler()} htmlType="button">
                  {t("cancel")}
                </PButton>
              </Form.Item>
            </Col>
          ) : null}
        </Row>
      </Form>
    </>
  );
};

export default PersonalInfo;
