import { Row, Col } from "antd";
import RelatedProductCard from "./RelatedProductCard";
import styles from "./styles.module.css";

const RelatedProductsSection = () => {
  return (
    <Row justify="center">
      <Col span={20}>
        <div className={styles.container}>
          <header dir="rtl" className={styles.pageBanner}>
            <span className={styles.something}></span>
            منتجات ذات صلة
          </header>
          <RelatedProductCard
            src="./assets/product_1.png"
            description="مسحوق غسيل خارق حارق متفجر"
          />
          <RelatedProductCard
            src="./assets/product_2.png"
            description="مسحوق غسيل خارق حارق متفجر"
          />
          <RelatedProductCard
            src="./assets/product_3.png"
            description="مسحوق غسيل خارق حارق متفجر"
          />
        </div>
      </Col>
    </Row>
  );
};

export default RelatedProductsSection;
