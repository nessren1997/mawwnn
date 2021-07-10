// React and React Components
import React, { useEffect, useState } from "react";
import NavSection from "./NavSection";
import UserSection from "./UserSection";
import Searchbar from "./Searchbar";
// Next
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
// Ant
import { Row, Col, Select, Drawer, Button, Modal, Space, Dropdown, Menu, Badge } from "antd";
const { confirm } = Modal;
import Icon, { MenuOutlined, SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
// Style sheets
import styles from "./navbar.module.css";
// other imports
import useTranslation from "next-translate/useTranslation";
import { responsive_constant } from "../../../constants/layout/responsive";
import { appServices } from "../../../services";
import { primaryColor } from "../../../constants/layout/color";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchBrandsAsync,
  logoutAsync,
  selectBrands,
  selectCart,
  selectRequestedProductsStatus,
  selectUser,
} from "../../../redux";
import { emailSvg, whatsappSvg } from "../Footer/social-icons";
import { linerBackground } from "../../../constants/layout";

// interface
interface propsInterface {
  imgSrc?: string;
  searchCategoryHandler: (val: number) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  searchString: string;
}

// ======================================
// Large screens navbar

export const LargeNav: React.FC<propsInterface> = ({
  searchCategoryHandler,
  handleSearchChange,
  handleSearchSubmit,
  searchString,
}) => {
  const { t, lang } = useTranslation("navbar");
  const { push } = useRouter();
  const brands = useSelector(selectBrands);
  const dispatch = useDispatch();

  const handlePageNavigation = async (val: string) => {
    push(`/brand/${val}`);
  };

  useEffect(() => {
    dispatch(FetchBrandsAsync());
  }, [lang]);

  const brands_menu = (
    <Menu onClick={(e) => handlePageNavigation(e.key.toString())}>
      {brands.map((el) => (
        <Menu.Item icon={<img width={75} src={el.logo} />} key={el.id}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{
          background: linerBackground,
          padding: "5px 0",
        }}
      >
        {/* Top Section */}
        <Col {...responsive_constant}>
          <Row justify="space-between" align="middle">
            <Col flex="1 1 150px">
              <Link href="/">
                <img src="/assets/MWAN_logo.png" alt="mawn logo" style={{ maxWidth: "130px", cursor: "pointer" }} />
              </Link>
            </Col>
            <Col style={{ flex: "1 1 50%" }}>
              <Searchbar
                searchCategoryHandler={searchCategoryHandler}
                handleSearchChange={handleSearchChange}
                handleSearchSubmit={handleSearchSubmit}
                searchString={searchString}
              />
            </Col>
            <Col
              flex="1 1 150px"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "0 7px",
              }}
            >
              <UserSection />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Bottom Section */}

      <Row justify="center" style={{ background: linerBackground }}>
        <Col xl={18} xs={22}>
          <Row justify="space-between" align="middle" style={{ fontSize: "0.9rem", position: "relative", zIndex: 999 }}>
            <Col
              style={{
                flex: "1 1 70px",
                justifyContent: "end",
                height: 50,
                display: "flex",
                paddingTop: 3,
              }}
            >
              <Dropdown overlay={brands_menu} arrow={true} placement="bottomCenter" trigger={["hover"]}>
                <Space direction="horizontal" size="middle">
                  <MenuOutlined style={{ color: "#fff", fontSize: "1.6em", marginTop: 24 }} />
                  <Button
                    style={{
                      backgroundColor: "transparent",
                      color: "#fff",
                      border: "none",
                      padding: 0,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {t`shop-by-brand`}
                  </Button>
                </Space>
              </Dropdown>
            </Col>
            <Col
              style={{
                height: 40,
                flex: "1 1 50%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <NavSection />
            </Col>
            <Col
              style={{
                flex: "1 1 150px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                color: "#fff",
                fontSize: "1rem",
                height: 40,
              }}
            >
              <span>
                <a
                  style={{
                    color: "#fff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    minWidth: "130px",
                    direction: "ltr",
                  }}
                  target="_blank"
                  href="https://wa.me/00963991999690"
                >
                  <Icon style={{ marginBottom: 2 }} component={whatsappSvg} />
                  +963991999690
                </a>
              </span>
              <span style={{ margin: 8 }} className={styles.divider}></span>
              <span style={{ position: "relative", top: "-1px" }}>
                <a
                  style={{
                    color: "#fff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    minWidth: "175px",
                    direction: "ltr",
                  }}
                  href="mailto:Customercare@dtic.co"
                >
                  <Icon style={{ marginBottom: 2 }} component={emailSvg} />
                  Customercare@dtic.co
                </a>
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

// ======================================
// small screens navbar

export const SmallNav: React.FC<propsInterface> = ({
  searchCategoryHandler,
  handleSearchChange,
  handleSearchSubmit,
  searchString,
}) => {
  const { lang } = useTranslation();
  const user = useSelector(selectUser);
  const { replace, route, push } = useRouter();
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("navbar");
  const requested_products_status = useSelector(selectRequestedProductsStatus);
  const brands = useSelector(selectBrands);
  const dispatch = useDispatch();
  // Drawer controllers
  const [visible, setVisible] = useState(false);

  const { pathname } = useRouter();

  const cart = useSelector(selectCart);
  const totalNumberOfProducts = cart.reduce((acc, current) => acc + current.quantity, 0);

  const openDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  // Modal controllers
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (requested_products_status === "data" && isModalVisible) {
      setIsModalVisible(false);
    }
  }, [requested_products_status]);

  useEffect(() => {
    dispatch(FetchBrandsAsync());
  }, [lang]);

  useEffect(() => {
    onClose();
  }, [route]);

  const handlePageNavigation = async (val: string) => {
    push(`/brand/${val}`);
    setVisible(false);
  };

  const brands_menu = (
    <Menu onClick={(e) => handlePageNavigation(e.key.toString())}>
      {brands.map((el) => (
        <Menu.Item key={el.id}>{el.name}</Menu.Item>
      ))}
    </Menu>
  );

  const userMenu = (
    <Menu onClick={(e) => onClick(e.key.toString())}>
      <Menu.Item key="info">{t`p-info`}</Menu.Item>
      <Menu.Item key="logout">{t`sign-out`}</Menu.Item>
    </Menu>
  );

  const onClick = async (key: string) => {
    switch (key) {
      case "logout":
        confirm({
          title: t`confirm-logout`,
          onOk: () => {
            dispatch(logoutAsync());
          },
          onCancel: () => {},
          centered: true,
        });
        break;

      case "info":
        push("personal-collection");
        break;

      default:
        return null;
    }
  };

  return (
    <>
      <Row justify="space-between" align="middle" style={{ margin: "4px 10px" }} wrap={false}>
        <Col>
          <Button
            type="primary"
            onClick={openDrawer}
            style={{ height: 35, width: 35 }}
            icon={<MenuOutlined style={{ paddingTop: 3, fontSize: "1.3rem" }} />}
          />
        </Col>

        <Col>
          <Row align="middle">
            <Link href="/">
              <img src="/assets/DTIC_logo.png" width={90} />
            </Link>
          </Row>
        </Col>

        <Col>
          <Space align="center" size="large">
            {!pathname.match(/\/cart/) && (
              <Badge
                count={totalNumberOfProducts}
                style={{
                  border: "none",
                  boxShadow: "none",
                  top: 0,
                  left: `${lang === "ar" ? "25px" : 35}`,
                  padding: "0.5px 1px 0 0",
                }}
              >
                <Link href="/cart">
                  <Button
                    type="text"
                    size="small"
                    style={{ height: 35, width: 35 }}
                    icon={<ShoppingCartOutlined style={{ paddingTop: 3, color: "#fff", fontSize: "1.8rem" }} />}
                  />
                </Link>
              </Badge>
            )}

            <Button
              size="small"
              style={{ height: 35, width: 35 }}
              type="primary"
              onClick={showModal}
              icon={<SearchOutlined style={{ paddingTop: 3, fontSize: "1.3rem" }} />}
            />
          </Space>
        </Col>
      </Row>

      <Drawer placement={lang === "ar" ? "right" : "left"} closable={false} onClose={onClose} visible={visible} mask={true}>
        <Col>
          {user ? (
            <Dropdown overlay={userMenu} arrow={true} placement="bottomCenter">
              <Button
                type="text"
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                  borderBottom: "1px solid #989898",
                  paddingBottom: 45,
                  margin: "10px auto 15px !important",
                  color: "#fff",
                }}
              >
                {user.first_name}
              </Button>
            </Dropdown>
          ) : (
            <Link href="/login">
              <a className={styles.drawer_link}>{t`login`}</a>
            </Link>
          )}
        </Col>

        <Dropdown overlay={brands_menu} arrow={true} placement="bottomCenter" trigger={["click"]} className={styles.drawer_link}>
          <Button
            type="text"
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              borderBottom: "1px solid #989898",
              paddingBottom: 45,
              margin: "10px auto 15px !important",
              color: "#fff",
            }}
          >
            {t`shop-by-category`}{" "}
          </Button>
        </Dropdown>

        <Col>
          <Link href="/cart">
            <a className={styles.drawer_link}>{t`links.cart`}</a>
          </Link>

          <Link href="/">
            <a className={styles.drawer_link}>{t`links.home`}</a>
          </Link>

          <Link href="/about">
            <a className={styles.drawer_link}>{t`links.about-us`}</a>
          </Link>

          <Link href="/products">
            <a className={styles.drawer_link}>{t`links.our-products`}</a>
          </Link>

          <Link href="/contact">
            <a className={styles.drawer_link}>{t`links.contact-us`}</a>
          </Link>

          <Link href="/jobs">
            <a className={styles.drawer_link}>{t`links.jobs`}</a>
          </Link>

          <Link href="/check-order">
            <a className={styles.drawer_link}>{t`links.check-order`}</a>
          </Link>
        </Col>
        <Col style={{ position: "relative" }} dir="rtl">
          <Select
            onSelect={async (val: string) => {
              setLoading(true);
              await appServices.changeLang({ lang: val as any });
              replace(route, route, { locale: val });
              setLoading(false);
            }}
            defaultValue={lang}
            loading={loading}
            style={{ width: "100%", margin: "10px 0px 80px 0px" }}
          >
            <Option value="ar">عربي</Option>
            <Option value="en">English</Option>
          </Select>
        </Col>
      </Drawer>

      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} bodyStyle={{ padding: "50px 20px" }}>
        <Searchbar
          searchCategoryHandler={searchCategoryHandler}
          handleSearchChange={handleSearchChange}
          handleSearchSubmit={handleSearchSubmit}
          searchString={searchString}
          styleObj={{
            boxShadow: "0px 0px 8px 4px #33333330",
            borderRadius: 20,
          }}
        />
      </Modal>
    </>
  );
};
