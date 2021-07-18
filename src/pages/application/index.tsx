import { Col, Row, Typography } from "antd";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { largeShadow } from "../../constants/layout";
import { primaryColor, secondaryColor } from "../../constants/layout/color";
import { responsive_constant } from "../../constants/layout/responsive";

const { Title } = Typography;

const index: React.FC = () => {
  const { t } = useTranslation("application");

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "auto" }}>
      <Row justify="center" style={{ margin: "30px 0" }}>
        <Col {...responsive_constant}>
          <div style={{ backgroundColor: "white", boxShadow: largeShadow, borderRadius: 30, padding: "40px 60px" }}>
            <Row gutter={[0, 16]}>
              <Col span={24} style={{ textAlign: "center" }}>
                <Row justify="center" gutter={[32, 32]}>
                  <Col>
                    <a href="https://apps.apple.com" target="__blank">
                      <img src="/assets/app-store.png" width={200} />
                    </a>
                  </Col>
                  <Col>
                    <a href="https://play.google.com" target="__blank">
                      <img src="/assets/google-play.png" width={200} />
                    </a>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Title level={3} style={{ color: primaryColor }}>
                  {t`title`}
                </Title>
              </Col>
              <Col span={24}>
                <Title level={4} style={{ color: secondaryColor }}>
                  {t`des`}
                </Title>
              </Col>
              <Col span={24}>
                <Title level={5} style={{ color: secondaryColor }}>
                  {t`des2`}
                </Title>
              </Col>
              <Col span={24} style={{ textAlign: "center" }}>
                <img src="/assets/new/online-shopping.jpg" width="100%" />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default index;
