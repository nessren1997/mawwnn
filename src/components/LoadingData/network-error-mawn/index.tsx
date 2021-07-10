import React from "react";
import { Button, Result } from "antd";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

const NetworkErrorMAWN: React.FC = () => {
  const { t } = useTranslation("not-found");

  return (
    <Result
      icon={<img src={"/assets/404.svg"} width={"100%"} height={300} />}
      title={t("network_error")}
      subTitle={t("network_error_des")}
      extra={
        <Link href="/">
          <Button type="primary" size="large" shape="round">{t`back-home`}</Button>
        </Link>
      }
    />
  );
};
export default NetworkErrorMAWN;
