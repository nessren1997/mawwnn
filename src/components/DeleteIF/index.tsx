import { Col, Form, Row } from "antd";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect } from "react";
import { ReactFacebookLoginInfo } from "react-facebook-login";
import { useDispatch, useSelector } from "react-redux";
import { DeleteFBAsync, selectUser } from "../../redux";
import PButton from "../PButton/Buttom";

const DeleteIF: React.FC = () => {
  const { t } = useTranslation("personal-collection");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const deleteIf = () => {
    dispatch(DeleteFBAsync());
  };
  return (
    <Row>
      {user?.facebook === true ? (
        <>
          <Col span={24} style={{ justifyContent: "center", display: "flex" }}>
            <p>{t`facebookaccount`}</p>
          </Col>
        </>
      ) : (
        <>
          <Col span={24} style={{ justifyContent: "center", display: "flex" }}>
            <p>{t`deletefi`}</p>
          </Col>
          <Col span={24} style={{ justifyContent: "center", display: "flex", visibility: "visible" }}>
            <PButton htmlType="submit" onClick={() => deleteIf()}>
              {t(`delete`)}
            </PButton>
          </Col>
        </>
      )}
    </Row>
  );
};
export default DeleteIF;
