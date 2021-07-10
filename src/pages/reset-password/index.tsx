import React, { useEffect } from 'react';
import PButton from '../../components/PButton/Buttom';
import useTranslation from 'next-translate/useTranslation';
import { styledInput } from '../../constants/layout/responsive';
import ContainerShadow from '../../components/container-shadow';
import { Col, Form, Input, message, notification, Row, Select, Typography } from 'antd';
import { responsive_constant } from '../../constants/layout/responsive';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { resetPassAsync, selectResetStatus } from '../../redux/resete-password/index';
import { PoweroffOutlined } from '@ant-design/icons';

const { Option } = Select;

const { Text } = Typography;

const Index: React.FC = () => {
  const { replace } = useRouter();
  const { t, lang } = useTranslation('reset-password');

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const status = useSelector(selectResetStatus);

  const onFinish = (values: any) => {
    values = {
      ...values,
      phone: `${values.code}${(values.phone as string).replace(/\s/g, '')}`,
    };
    delete values.code;
    dispatch(resetPassAsync(values));
  };

  useEffect(() => {
    if (status === 'data') {
      // replace('/reset-password');
      replace('/login');
      message.info(t('check'));
    } else if (status === 'error') {
      notification['error']({
        message: t('invalidNumber'),
      });
    }
  }, [status]);

  useEffect(() => {
    form.resetFields();
  }, [lang]);

  return (
    <>
      <Row justify='center' style={{ padding: '30px 0px' }}>
        <Col {...responsive_constant}>
          <Row justify='center'>
            <ContainerShadow>
              <Form onFinish={onFinish} form={form}>
                <Row gutter={[0, 24]}>
                  <Col span={24}>
                    <Text>{t`enter your number please`} </Text>
                  </Col>
                  <Col span={24}>
                    <Row style={{ direction: 'ltr' }}>
                      <Col span={4}>
                        <div className='select_code'>
                          <Form.Item name='code' initialValue='+963'>
                            <Select direction='ltr'>
                              <Option value='+963'>
                                <span dir='ltr'>+963</span>
                              </Option>
                              <Option value='+971'>
                                <span dir='ltr'>+971</span>
                              </Option>
                            </Select>
                          </Form.Item>
                        </div>
                      </Col>
                      <Col span={20}>
                        <Form.Item
                          name='phone'
                          rules={[{ required: true, message: t`enter your number please` }]}
                          validateStatus='validating'
                        >
                          <Input
                            style={{ ...styledInput.style, borderRadius: '0 30px 30px 0' }}
                            onKeyPress={(e) => {
                              /[^0-9]/.test(e.key) && e.preventDefault();
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Form.Item>
                  <PButton
                    htmlType='submit'
                    loading={status === 'loading'}
                    icon={status === 'loading' ? <PoweroffOutlined /> : ''}
                  >
                    {t('send')}
                  </PButton>
                </Form.Item>
              </Form>
            </ContainerShadow>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Index;
