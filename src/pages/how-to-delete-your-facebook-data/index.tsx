import { Col, Row, Typography } from "antd";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { primaryColor, secondaryColor } from "../../constants/layout/color";
import { responsive_constant } from "../../constants/layout/responsive";

const { Paragraph, Title } = Typography;

const index: React.FC = () => {
  const { t } = useTranslation("deleteIF");

  return (
    <Row justify="center" style={{ marginTop: 100 }}>
      <Col {...responsive_constant}>
        <Row gutter={[0, 64]}>
          <Col span={24}>
            <Title level={2} style={{ color: primaryColor, textAlign: "center" }}>
              {t`dif`}
            </Title>
          </Col>
          <Col span={24}>
            <Paragraph style={{ textAlign: "center" }}>{t`paragraph`}</Paragraph>
          </Col>
          <Col span={24} style={{ textAlign: "center" }}>
            <img width="700px" height="400px" src="./assets/deleteIF.png" alt="page delete information account fasebook" />
          </Col>
          <Col span={24}>
            <Paragraph style={{ textAlign: "center" }}>{t`paragraph1`}</Paragraph>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default index;
