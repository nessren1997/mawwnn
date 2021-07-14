import { Layout } from "antd";
import React, { useState } from "react";
import Image from "next/image";
import MAWNSider from "./sider";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

const { Content, Sider } = Layout;

const DahsboardLayout: React.FC = ({ children }) => {
  const { lang } = useTranslation();

  const [marginContent, setMarginContent] = useState(80);

  const collapsed = marginContent === 80;

  return (
    <Layout className="site-layout" style={{ minHeight: "100vh" }} hasSider>
      <Head>
        <title>MAWN Dashboard</title>
      </Head>
      <Sider
        reverseArrow={lang === "ar"}
        style={{
          height: "100%",
          overflow: "auto",
          position: "fixed",
          left: lang === "en" ? 0 : undefined,
          right: lang === "en" ? undefined : 0,
        }}
        onCollapse={(isCol: boolean) => setMarginContent(() => (isCol ? 80 : 200))}
        theme="dark"
        defaultCollapsed
        collapsible
      >
        <div style={{ padding: 5 }}>
          <Image src="/assets/MAWN_logo.png" layout="responsive" width={289} height={159} />
        </div>
        <MAWNSider />
        <div style={{ padding: collapsed ? 10 : 5, position: "fixed", bottom: collapsed ? 25 : 50 }}>
          <Link href="https://its.sy">
            <a target="__black">
              {collapsed ? (
                <Image src="/assets/big-bang/BB-ICON.png" alt="BIG-BANG-LOGO" layout="intrinsic" height={60} width={60} />
              ) : (
                <Image src="/assets/big-bang/A-PBB-LOGO.svg" alt="BIG-BANG-LOGO" layout="intrinsic" height={50} width={190} />
              )}
            </a>
          </Link>
        </div>
      </Sider>

      <Content style={lang === "en" ? { marginLeft: marginContent } : { marginRight: marginContent }}>
        <div style={{ margin: "0 16px" }}>{children}</div>
      </Content>
    </Layout>
  );
};
export default DahsboardLayout;
