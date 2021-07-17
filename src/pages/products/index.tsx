import React, { FC, useEffect } from "react";
import { Col, Row, Typography } from "antd";
import OurProducts from "../../components/our-products";
import useTranslation from "next-translate/useTranslation";
import { responsive_constant } from "../../constants/layout/responsive";
import Brands from "../../components/home/brands";
import { useRouter } from "next/router";
import { selectUser } from "../../redux/app";
import { useSelector } from "react-redux";
const { Title } = Typography;

const Produtcs: FC = () => {
  const { replace } = useRouter();
  const user = useSelector(selectUser);
  useEffect(() => {
    if (user?.missing_params) replace("/personal-collection");
  }, [user]);

  const { t } = useTranslation("single-product");
  return (
    <Row justify="center" gutter={[0, 40]} style={{ marginTop: 20 }}>
      <Col {...responsive_constant}>
        <Brands />
        <Title level={2}>{t("our_products")} </Title>
        <OurProducts />
      </Col>
    </Row>
  );
};

export default Produtcs;
