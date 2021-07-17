import React, { FC, useEffect } from "react";
import { Col, Row } from "antd";
import ProductCard from "../../product-card";
import { Product } from "../../../models/product";
import useTranslation from "next-translate/useTranslation";
import { useDispatch, useSelector } from "react-redux";
import { FetchSiteProductsAsync, selectProducts, selectProductsStatus } from "../../../redux/product";
import "./style.less";
import LoadingData from "../../LoadingData";

const SpecialProduct: FC = () => {
  const { lang } = useTranslation();
  const dispatch = useDispatch();
  const status = useSelector(selectProductsStatus);
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(FetchSiteProductsAsync());
  }, [lang]);

  return (
    <LoadingData dataValid={() => (products ? true : false)} loading={status === "loading"}>
      <Row gutter={[0, 40]} justify="start">
        {products?.map((product: Product) => (
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
    </LoadingData>
  );
};
export default SpecialProduct;
