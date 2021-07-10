import React, { FC, useState } from 'react';
import { Col, Row, Select, Tabs } from 'antd';
import Login from '../../components/Login/index';
import Register from '../../components/Register/index';
import useTranslation from 'next-translate/useTranslation';
import ContainerShadow from '../../components/container-shadow';
import { responsive_constant } from '../../constants/layout/responsive';

import { primaryColor } from '../../constants/layout/color';
import { useWidth } from '../../utils/helpers/use-is-mobile';
import isAuth from '../../utils/helpers/is-auth';
import { GetServerSideProps } from 'next';

import './style.less';
import Cookies from 'cookies';
import { KEY_USER_COOKIE } from '../../constants/keys';
import { User } from '../../models';

const { Option } = Select;

const { TabPane } = Tabs;

const index: FC = () => {
  const { t } = useTranslation('login');
  const [activeTap, setactiveTap] = useState('1');
  const { outerWidth } = useWidth();

  return (
    <Row justify='center'>
      <Col {...responsive_constant}>
        <div className='login'>
          <Tabs
            defaultActiveKey='1'
            centered
            size='large'
            style={{ padding: 15 }}
            activeKey={outerWidth <= 420 ? activeTap : undefined}
            renderTabBar={
              outerWidth <= 420
                ? () => (
                    <Select
                      defaultValue='login'
                      onChange={(e: any) => setactiveTap(e)}
                      bordered={false}
                      style={{
                        margin: 30,
                        padding: 10,
                        fontSize: '1.6em',
                        color: primaryColor,
                      }}
                    >
                      <Option key='1' value='1'>{t`login`}</Option>
                      <Option key='2' value='2'>{t`register`}</Option>
                    </Select>
                  )
                : undefined
            }
          >
            <TabPane tab={t('register')} key='2'>
              <Row justify='center'>
                <ContainerShadow>
                  <Register />
                </ContainerShadow>
              </Row>
            </TabPane>
            <TabPane tab={t('login')} key='1'>
              <Row justify='center'>
                <ContainerShadow>
                  <Login />
                </ContainerShadow>
              </Row>
            </TabPane>
          </Tabs>
        </div>
      </Col>
    </Row>
  );
};
export default index;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const tmp = cookies.get(KEY_USER_COOKIE);
  const user = tmp && (JSON.parse(tmp) as User);

  if (user) return { redirect: { destination: '/', statusCode: 307 } };
  return { props: { message: 'nothing' } };
};
