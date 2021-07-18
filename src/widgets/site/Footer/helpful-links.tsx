import React, { FC } from "react";
import useTranslation from "next-translate/useTranslation";
import { Button, Col, Typography, Image, Row, Space } from "antd";
import { primaryColor } from "../../../constants/layout/color";
import NextLink from "next/link";

import "./style.less";

const { Title, Link } = Typography;

const linkLayout: {
  type: "secondary";
  style: React.CSSProperties;
} = {
  type: "secondary",
  style: {},
};

const HelpfulLinks: FC = () => {
  const { t } = useTranslation("footer");

  return (
    <>
      <Row justify="space-between" gutter={[0, 32]}>
        <Col xs={24} sm={18} md={8} lg={6}>
          <Space direction="vertical" size="middle">
            <Title level={3} style={{ color: primaryColor }}>
              {t("help")}
            </Title>
            <NextLink href={"/#EVENTS_SECTION"}>
              <Link {...linkLayout}>{t("events")}</Link>
            </NextLink>

            <NextLink href={"/terms-conditions"}>
              <Link {...linkLayout}>{t("terms-conditions")}</Link>
            </NextLink>

            <NextLink href={"/privacy-policy"}>
              <Link {...linkLayout}>{t("privacy-policy")}</Link>
            </NextLink>

            {/* <NextLink href={"/how-to-delete-your-facebook-data"}>
              <Link {...linkLayout}>{t("delete-information-facebook")}</Link>
            </NextLink> */}
          </Space>
        </Col>
        <Col xs={24} sm={18} md={8} lg={6}>
          <Space direction="vertical" size="middle">
            <Title level={3} style={{ color: primaryColor }}>
              {t("social_media")}
            </Title>
            <Link href="https://www.facebook.com/" target="_blank" {...linkLayout}>
              {t("facebook")}
            </Link>
            <Link href="https://www.instagram.com/" target="_blank" {...linkLayout}>
              {t("instagram")}
            </Link>
            <Link href="https://twitter.com" target="_blank" {...linkLayout}>
              {t("twitter")}
            </Link>
            <Link href="https://www.linkedin.com/" target="_blank" {...linkLayout}>
              {t("linked_in")}
            </Link>
          </Space>
        </Col>
        <Col xs={24} sm={18} md={8} lg={6}>
          <Space direction="vertical" size="middle">
            <Title style={{ color: primaryColor }} level={3}>
              {t("about_company")}
            </Title>

            <NextLink href={"/privacy-policy"}>
              <Link {...linkLayout}>{t("who_us")}</Link>
            </NextLink>

            <NextLink href={"/products"}>
              <Link {...linkLayout}>{t("our_products")}</Link>
            </NextLink>

            <NextLink href={"/jobs"}>
              <Link {...linkLayout}>{t("jobs")}</Link>
            </NextLink>

            <NextLink href={"/contact"}>
              <Link {...linkLayout}>{t("call_us")}</Link>
            </NextLink>
          </Space>
        </Col>
        <Col lg={6} md={8} sm={10} xs={24}>
          <Link href="/">
            <Button size="small" type="text" style={{ height: "fit-content", width: "fit-content" }}>
              <Image width={"60%"} preview={false} src="/assets/Logo.png" />
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};
export default HelpfulLinks;
