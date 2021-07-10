import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Image, Typography, Input, Button } from "antd";
import {
  FetchBrandsAsync,
  FetchProductsByNameAsync,
  selectBrands,
  selectBrandsStatus,
  selectRequestedProducts,
  selectRequestedProductsStatus,
} from "../../redux";
import LoadingData from "../../components/LoadingData";
import ProductCard from "../../components/product-card";
import useTranslation from "next-translate/useTranslation";
import { responsive_constant } from "../../constants/layout/responsive";

const { Title } = Typography;

const id: FC = () => {
  const { t } = useTranslation("common");
  const { lang } = useTranslation();
  const { query } = useRouter();
  const dispatch = useDispatch();
  const status = useSelector(selectBrandsStatus);
  const brands = useSelector(selectBrands);
  const [searched, setsearched] = useState<string>();

  let products = useSelector(selectRequestedProducts);
  const products_status = useSelector(selectRequestedProductsStatus);

  const { id } = query;

  const brand = brands.find((brand) => brand.id === parseInt(id as string));

  useEffect(() => {
    dispatch(FetchBrandsAsync());
  }, [id, lang]);

  useEffect(() => {
    brand && dispatch(FetchProductsByNameAsync(undefined, brand?.name));
  }, [id, brand, lang]);

  //search product
  const handleSearch = (e: any) => {
    setsearched(e.target.value);
  };

  let product_name = searched?.trim().toLowerCase();
  if (product_name && product_name.length > 0) {
    products = products.filter((val) => val.name.toLowerCase().match(product_name!));
  }

  return (
    <Row justify="center">
      <Col {...responsive_constant} style={{ minHeight: 400 }}>
        <LoadingData
          dataValid={() => (products && brands ? true : false)}
          loading={products_status === "loading" || status === "loading"}
        >
          <Row justify="space-around" style={{ alignItems: "center" }}>
            <Title>{brand?.name}</Title>
            <Image src={brand?.logo} width={200} height={200} preview={false} />
          </Row>

          <div className="input-container" style={{ margin: 16 }}>
            <Button
              className="send-email-btn"
              style={{
                width: "20%",
                top: 0,
                borderRadius: lang === "en" ? "22px 0 0 22px" : "",
              }}
              onClick={handleSearch}
              type="primary"
            >
              {t("search")}
            </Button>
            <Input
              placeholder={t("input_product_name")}
              className="send-email-input"
              style={{
                width: "100%",
                borderRadius: lang === "en" ? "0 22px 22px 0" : "",
              }}
              onChange={handleSearch}
              allowClear
            />
          </div>
          <Row gutter={[0, 40]} justify="start">
            {products.map((product) => (
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
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </LoadingData>
      </Col>
    </Row>
  );
};
export default id;
