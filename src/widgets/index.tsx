import React, { FC, useEffect, useState } from "react";
import { Layout as AntLayout, Spin } from "antd";
import Head from "next/head";

import DTICHeader from "./site/nav-bar";
import DTICFooter from "./site/Footer";
import { useRouter } from "next/router";
import DahsboardLayout from "./dashboard";
import { appServices } from "../services";
import isError from "../utils/helpers/is-error";
import { useDispatch, useSelector } from "react-redux";
import { SetScreenSize, setUser } from "../redux";
import { RootState } from "../redux/store";
import { LoadingOutlined } from "@ant-design/icons";

const { Header, Footer, Content } = AntLayout;

const DTICLayout: FC<{ children: React.ReactNode; title?: string }> = ({ children, title = "DTIC" }) => {
  const dispatch = useDispatch();
  const { route } = useRouter();
  const arr = route.match(/dashboard/g);
  const isDash = arr && arr.length !== 0;

  const {
    Events: { status: eventS },
    Products: { status: productS },
    Sliders: { status: sliderS },
    Blogs: { status: blogS },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    appServices.getUser().then((result) => {
      if (!isError(result)) {
        dispatch(setUser(result.data));
      }
    });
  }, []);

  const detect_isMobile = () => {
    if (window)
      if (window.innerWidth < 970) {
        dispatch(SetScreenSize(true));
      } else {
        dispatch(SetScreenSize(false));
      }
  };

  useEffect(() => {
    window && window.addEventListener("resize", detect_isMobile);
    detect_isMobile();
  }, []);

  const [loadingPage, setloadingPage] = useState(true);
  useEffect(() => {
    setloadingPage(
      (eventS === "loading" || productS === "loading" || sliderS === "loading" || blogS === "loading") && route === "/"
        ? true
        : false
    );
  }, [eventS, productS, sliderS, blogS]);

  useEffect(() => {
    document.body.style.overflowY = loadingPage ? "hidden" : "auto";
  }, [loadingPage]);

  const isQR = route === "/generate-qr";

  const filtertoken = route === "/filter-token";

  let res =
    isQR || filtertoken ? (
      <> {children}</>
    ) : isDash ? (
      <DahsboardLayout>{children}</DahsboardLayout>
    ) : (
      <AntLayout style={{ minHeight: "100vh" }}>
        <Header style={{ padding: 0, height: "100%" }}>
          <DTICHeader />
        </Header>
        <Content
          style={{
            minHeight: "85vh",
            overflowX: "hidden",
            background: "#fff",
          }}
        >
          {children}
        </Content>
        <Footer style={{ padding: "10px 0px", background: "#fff" }}>
          <DTICFooter />
        </Footer>
      </AntLayout>
    );

  return (
    <Spin
      spinning={loadingPage}
      indicator={<LoadingOutlined style={{ fontSize: "2em" }} />}
      style={{
        background: "#fff",
        minHeight: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {res}
    </Spin>
  );
};
export default DTICLayout;
