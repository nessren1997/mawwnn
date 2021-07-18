import React, { CSSProperties, FC, useEffect, useState } from "react";
import { Button, Image, Row, Typography, notification } from "antd";
import { MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { primaryColor } from "../../constants/layout/color";
import useTranslation from "next-translate/useTranslation";
import { Product } from "../../models/product";
import { useDispatch } from "react-redux";
import { InsertItem } from "../../redux";
import Link from "next/link";

import "./style.less";

const { Paragraph } = Typography;

const button_layout: {
  size: "small";
  type: "text";
  shape: "circle";
  style: CSSProperties;
} = {
  size: "small",
  type: "text",
  shape: "circle",
  style: {
    padding: 0,
    width: "auto",
    height: "auto",
  },
};

interface product_props {
  product: Product;
}

const ProductCard: FC<product_props> = ({ product }) => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const [amount, setamount] = useState(1);

  const cartNotification = (msg: string, description: string, type: string) => {
    notification[type === "success" ? "success" : "warning"]({
      message: msg,
      description: description,
      placement: "bottomRight",
      duration: 3,
    });
  };

  const onClick = () => {
    if (amount < 1) {
      cartNotification(t`error.added-to-cart-failed`, t`error.added-to-cart-failed-desc`, "fail");
    } else {
      cartNotification(t`added-to-cart`, t`added-to-cart-desc`, "success");
      dispatch(InsertItem({ product, quantity: amount }));
      setamount(1);
    }
  };

  return (
    <div className='card-container'>
      <Link href={`/products/${product.id}`}>
        <Image preview={false} className='card-image' src={product.product_images[0].thumbnail_250} />
      </Link>
      <Row className='discreption-card'>
        <Paragraph style={{ margin: 0 }} ellipsis={{ rows: 2, symbol: '...' }}>

          {product.name}
        </Paragraph>
      </Row>
      <Row justify="space-between" className="amount">
        <Button
          {...button_layout}
          danger
          onClick={() => {
            setamount((amount) => amount && amount - 1);
          }}
          icon={<MinusCircleFilled style={{ fontSize: "1.8rem" }} />}
        />
        {amount}
        <Button
          {...button_layout}
          onClick={() => {
            setamount((amount) => amount + 1);
          }}
          icon={<PlusCircleFilled style={{ color: primaryColor, fontSize: "1.8rem" }} />}
        />
      </Row>

      <Row className="add-to-cart-btn" onClick={onClick}>
        {t("add_to_card")}
      </Row>
    </div>
  );
};
export default ProductCard;
