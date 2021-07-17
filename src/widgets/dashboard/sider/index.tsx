import { EditOutlined, HomeOutlined, LogoutOutlined, TranslationOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync, selectApp } from "../../../redux";
import { appServices } from "../../../services";
import { PermissionToMenuItem } from "../../../utils/helpers/permission-to-menu-item";

const Sider: FC = () => {
  const dispatch = useDispatch();
  const { t: translate } = useTranslation("dashboard");

  const { replace, asPath, pathname } = useRouter();

  const { user } = useSelector(selectApp);

  return (
    <Menu theme="dark" selectedKeys={[pathname]} mode="vertical">
      <Menu.Item key="/dashboard" icon={<HomeOutlined />}>
        <Link href="/dashboard">{translate`Home`}</Link>
      </Menu.Item>

      <Menu.SubMenu key="sub1" title={translate`Manage`} icon={<EditOutlined />}>
        {user?.permissions.map((el) => {
          const t = PermissionToMenuItem(el.name);
          if (t) {
            if (Array.isArray(t)) {
              return t.map((el) => {
                if (el.title === "Winners") {
                  return (
                    <Menu.SubMenu key={el.path} title={translate(`${el.title}`)}>
                      <Menu.Item key={`${el.path}`}>
                        <Link href={`${el.path}`}>{translate(`all_winners`)}</Link>
                      </Menu.Item>
                      <Menu.Item key={`${el.path}/pending`}>
                        <Link href={`${el.path}/pending`}>{translate(`pending_winners`)}</Link>
                      </Menu.Item>
                      <Menu.Item key={`${el.path}/contacted`}>
                        <Link href={`${el.path}/contacted`}>{translate(`contacted_winners`)}</Link>
                      </Menu.Item>
                      <Menu.Item key={`${el.path}/delivered`}>
                        <Link href={`${el.path}/delivered`}>{translate(`delivered_winners`)}</Link>
                      </Menu.Item>
                      <Menu.Item key={`${el.path}/closed-number`}>
                        <Link href={`${el.path}/closed-number`}>{translate(`closed_number_winners`)}</Link>
                      </Menu.Item>
                      <Menu.Item key={`${el.path}/wrong-number`}>
                        <Link href={`${el.path}/wrong-number`}>{translate(`wrong_number_winners`)}</Link>
                      </Menu.Item>
                    </Menu.SubMenu>
                  );
                } else if (el.title === "Cities") {
                  return (
                    <Menu.SubMenu key={el.path} title={translate(`${el.title}`)}>
                      <Menu.Item key={`${el.path}`}>
                        <Link href={`${el.path}`}>{translate(`All_Cities`)}</Link>
                      </Menu.Item>
                      <Menu.Item key={`${el.path}/cities-allowed-to-shipped`}>
                        <Link href={`${el.path}/cities-allowed-to-shipped`}>{translate(`cities_allowed`)}</Link>
                      </Menu.Item>
                    </Menu.SubMenu>
                  );
                } else
                  return (
                    <Menu.Item key={el.path}>
                      <Link href={el.path}>{translate(`${el.title}`)}</Link>
                    </Menu.Item>
                  );
              });
            } else
              return (
                <Menu.Item key={t.path}>
                  <Link href={t.path}>{translate(`${t.title}`)}</Link>
                </Menu.Item>
              );
          }
        })}
      </Menu.SubMenu>
      <Menu.SubMenu title={translate`Language`} icon={<TranslationOutlined />}>
        <Menu.Item
          key="arabic"
          title={translate`ar`}
          onClick={async () => {
            await appServices.changeLang({ lang: "ar" });
            replace(asPath, undefined, { locale: "ar" });
          }}
        >
          {translate`ar`}
        </Menu.Item>
        <Menu.Item
          key="english"
          title={translate`en`}
          onClick={async () => {
            await appServices.changeLang({ lang: "en" });
            replace(asPath, undefined, { locale: "en" });
          }}
        >
          {translate`en`}
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item
        icon={<LogoutOutlined />}
        key="LogOut"
        onClick={() => {
          dispatch(logoutAsync());
          replace("/login");
        }}
      >
        {translate`LogOut`}
      </Menu.Item>
    </Menu>
  );
};
export default Sider;
