import { Col, Form, Row } from "antd";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useDispatch } from "react-redux";
import PButton from "../PButton/Buttom";

const DeleteIF: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onFinish = () => {};
  return (
    <Row>
      <Col span={24} style={{ justifyContent: "center", display: "flex" }}>
        <p>هل تريد حذف بيانات حسابك على الفيسبوك من موقعنا</p>
      </Col>
      <Col span={24} style={{ justifyContent: "center", display: "flex" }}>
        <Form onFinish={onFinish}>
          <PButton
            // loading={statusUpdate === 'loading'}
            htmlType="submit"
          >
            {t("حذف")}
          </PButton>
        </Form>
      </Col>
    </Row>
  );
};
export default DeleteIF;
