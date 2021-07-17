import React, { FC } from "react";
import { useSelector } from "react-redux";
import { selectIsMobile } from "../../../redux";
import { Col, Row, Typography, Image } from "antd";
import useTranslation from "next-translate/useTranslation";

import "./style.less";

const { Text } = Typography;

const CopyRight: FC = () => {
  const isMobile = useSelector(selectIsMobile);

  const { t } = useTranslation("footer");
  return (
    <Row align="middle" gutter={[20, 0]} justify={isMobile ? "center" : "space-between"}>
      <Col>
        <Text strong>{t("rights")} © 2021</Text>
      </Col>
      <Col>
        <Text strong> Powerd By Oda</Text>
      </Col>
    </Row>
  );
};
export default CopyRight;
