import React, { useEffect, useRef } from "react";
import { Button, Col, Row, Spin, Typography } from "antd";

import { responsive_constant } from "../constants/layout/responsive";
import SpecialProduct from "../components/home/special-products";
import SectionTitle from "../components/section-title/index";
import LastEvents from "../components/home/last-events";
import HomeCarousel from "../components/home/carousel";
import FuturesSite from "../components/home/futures-site";
import Brands from "../components/home/brands";
import Blog from "../components/home/blogs";
import useTranslation from "next-translate/useTranslation";
import { useDispatch, useSelector } from "react-redux";
import { ClearProducts, selectRequestedProducts, selectRequestedProductsStatus } from "../redux";
import ProductCard from "../components/product-card";
import { CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import Head from "next/head";
import { selectUser } from "../redux/app";
import { useRouter } from "next/router";
import { Product } from "../models";

const antIcon = <LoadingOutlined style={{ fontSize: 84 }} spin />;

export default function index() {
  const { t } = useTranslation("home");

  const { replace } = useRouter();

  const results_section = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const requested_products = useSelector(selectRequestedProducts);
  const requested_products_status = useSelector(selectRequestedProductsStatus);

  const user = useSelector(selectUser);
  useEffect(() => {
    if (requested_products_status === "data") {
      if (window) {
        window.scrollTo(0, results_section.current!.offsetTop);
      }
    }
  }, [requested_products_status]);

  useEffect(() => {
    dispatch(ClearProducts());
  }, []);

  useEffect(() => {
    if (user?.missing_params) replace("/personal-collection");
  }, [user]);
  return (
    <>
      <Head>
        <title>MAWN</title>
        <meta name="title" content="MAWN" />
        <meta
          name="description"
          content="أحدثت شركة MAWN في عام 2013  كشركة متخصصة في مجال صناعة وتجارة المنظفات بكافة أنواعها: (السوئل، الجل، المساحيق، والمطهرات).الشركة حائزة على شهادة الجودة العالمية ISO 9001:2015 في مجال تصنيع المنظفات. يقع المقر الرئيسي للشركة في سوريا ويتبع له عدة مراكز توزيع في عدة بلدان حول العالم."
        />
        <meta
          name="description"
          lang="en"
          content={`MAWN was established in 2013 as a specialized company in  manufacturing and trading all kinds of detergents: (liquids, gels, powders, and disinfectants).MAWN certificated ISO 9001: 2015 in the scope of detergents manufacturing. MAWNs headquarters of the company is located in Syria and has several distribution centers in several countries around the world.`}
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://demo.mawenapp.com/" />

        <meta property="og:title" content="MAWN" />
        <meta
          property="og:description"
          content="أحدثت شركة MAWN في عام 2013  كشركة متخصصة في مجال صناعة وتجارة المنظفات بكافة أنواعها: (السوئل، الجل، المساحيق، والمطهرات).الشركة حائزة على شهادة الجودة العالمية ISO 9001:2015 في مجال تصنيع المنظفات. يقع المقر الرئيسي للشركة في سوريا ويتبع له عدة مراكز توزيع في عدة بلدان حول العالم."
        />
        <meta
          property="og:description"
          lang="en"
          content={`MAWN was established in 2013 as a specialized company in  manufacturing and trading all kinds of detergents: (liquids, gels, powders, and disinfectants). MAWN certificated ISO 9001: 2015 in the scope of detergents manufacturing. MAWNs headquarters of the company is located in Syria and has several distribution centers in several countries around the world.`}
        />
        <meta property="og:image" content="https://demo.mawenapp.com/assets/MAWN_logo.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://demo.mawenapp.com/" />

        <meta property="twitter:title" content="MAWN" />
        <meta
          property="twitter:description"
          content="أحدثت شركة MAWN في عام 2013  كشركة متخصصة في مجال صناعة وتجارة المنظفات بكافة أنواعها: (السوئل، الجل، المساحيق، والمطهرات).الشركة حائزة على شهادة الجودة العالمية ISO 9001:2015 في مجال تصنيع المنظفات. يقع المقر الرئيسي للشركة في سوريا ويتبع له عدة مراكز توزيع في عدة بلدان حول العالم."
        />
        <meta
          property="twitter:description"
          lang="en"
          content={`MAWN was established in 2013 as a specialized company in  manufacturing and trading all kinds of detergents: (liquids, gels, powders, and disinfectants). DTI'C certificated ISO 9001: 2015 in the scope of detergents manufacturing. MAWNs headquarters of the company is located in Syria and has several distribution centers in several countries around the world.`}
        />
        <meta property="twitter:image" content="https://demo.mawenapp.com/assets/MAWN_logo.png" />
      </Head>
      <Row justify="center" gutter={[0, 64]}>
        <Col span={24}>
          <HomeCarousel />
        </Col>

        {/* Start: Display Search Results Section */}
        {requested_products_status === "loading" ? (
          <Col span={24} {...responsive_constant} style={{ display: "flex", justifyContent: "center" }}>
            <Spin indicator={antIcon} />
          </Col>
        ) : null}
        {requested_products_status === "data" ? (
          <Col span={24} {...responsive_constant} style={{ minHeight: "30vh" }} ref={results_section}>
            <Col
              span={24}
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <SectionTitle title={t`search-results`} />
              <Button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                }}
                onClick={() => dispatch(ClearProducts())}
              >
                <CloseCircleOutlined style={{ position: "relative", top: 2 }} /> {t`clear-search-results`}
              </Button>
            </Col>
            <Col span={24}>
              {requested_products.length > 0 ? (
                <Row gutter={[0, 40]} justify="start">
                  {requested_products?.map((product: Product) => (
                    <Col
                      xxl={4}
                      xl={6}
                      lg={8}
                      md={8}
                      sm={12}
                      xs={24}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ProductCard key={product.id} product={product!} />
                    </Col>
                  ))}
                </Row>
              ) : (
                <Typography.Text
                  style={{
                    textAlign: "center",
                    color: "#333333",
                    display: "block !important",
                    fontSize: "1.4rem",
                  }}
                  className="noResultsText"
                >{t`no-search-results`}</Typography.Text>
              )}
            </Col>
          </Col>
        ) : null}
        {/* End: Display Search Results Section */}

        <Col {...responsive_constant}>
          <SectionTitle title={t("special_products")} />
          <SpecialProduct />
        </Col>
        <Col id={"EVENTS_SECTION"} {...responsive_constant}>
          <SectionTitle title={t("last_events")} />
          <LastEvents />
        </Col>
        <Col {...responsive_constant}>
          <SectionTitle title={t("brands")} />
          <Brands />
        </Col>
        <Col {...responsive_constant}>
          <FuturesSite />
        </Col>
      </Row>
    </>
  );
}
