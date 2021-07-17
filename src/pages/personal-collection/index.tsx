import { Col, Row, Tabs } from "antd";
import React from "react";
import MyOrder from "../../components/myOrder/index";

import PersonalInfo from "../../components/Personal_Info/index";
import useTranslation from "next-translate/useTranslation";
import "./personal.less";
import { backGroundShadow } from "../../constants/layout/responsive";
import DeleteIF from "../../components/DeleteIF";
const { TabPane } = Tabs;

const PersonCollection: React.FC = () => {
  const { t } = useTranslation("personal-collection");

  return (
    <>
      <div className="par">
        <Row justify="center">
          <Col span={24} xxl={8} xl={14} lg={12} md={24} xs={24}>
            <Tabs defaultActiveKey="1" size="large" style={{ padding: 15 }}>
              <TabPane tab={t("orders")} key="2" id="tab1">
                <Row>
                  <Col
                    xxl={24}
                    xl={24}
                    lg={24}
                    md={24}
                    xs={24}
                    style={{
                      backgroundColor: "#fff",
                      // boxShadow: '0px 2px 15px -5px #a29f9f',
                      boxShadow: " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                      borderTopLeftRadius: 50,
                      borderBottomLeftRadius: 50,
                      borderBottomRightRadius: 50,
                      padding: "26px 35px 26px 35px",
                    }}
                  >
                    <MyOrder />
                  </Col>
                </Row>
              </TabPane>

              {/* <TabPane tab={t("deleteIF")} key="3" id="tab2">
                <Row>
                  <Col
                    xxl={24}
                    xl={24}
                    lg={24}
                    md={24}
                    xs={24}
                    style={{
                      backgroundColor: "#fff",
                      boxShadow: " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                      borderTopLeftRadius: 50,
                      borderBottomLeftRadius: 50,
                      borderBottomRightRadius: 50,
                      padding: "26px 35px 26px 35px",
                    }}
                  >
                    <DeleteIF />
                  </Col>
                </Row>
              </TabPane> */}

              <TabPane tab={t("myaccount")} key="1">
                <Row>
                  <Col {...backGroundShadow} xxl={24} xl={24} lg={24} md={24}>
                    <PersonalInfo />
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PersonCollection;

// export const getServerSideProps: GetServerSideProps = Authenticated;
