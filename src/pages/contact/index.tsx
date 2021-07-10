import React, { FC, useEffect, useState } from 'react';
import { Button, Col, Form, Input, notification, Radio, Row, Select, Space } from 'antd';
import Map from '../../components/google-map/MapGoogle';
import { responsive_constant, styledInput } from '../../constants/layout/responsive';
import useTranslation from 'next-translate/useTranslation';
import ContactInfo from '../../components/contact-info/index';
import { useDispatch, useSelector } from 'react-redux';
import { FetchBranchesAsync, selectBranches, selectBranchesStatus } from '../../redux/branch';
import Loading from '../../components/LoadingData';
import { useWidth } from '../../utils/helpers/use-is-mobile';
import { useForm } from 'antd/lib/form/Form';
import { ContactUs_Req } from '../../models';
import { contactService } from '../../services';
import isError from '../../utils/helpers/is-error';

const { Option } = Select;
const { TextArea } = Input;

const styledButtom: {
  style: React.CSSProperties;
} = {
  style: {
    borderRadius: 30,
    outline: 'none',
    border: 0,
    fontWeight: 'bold',
    minHeight: '65px',
    lineHeight: '25px',
    height: 'auto',
    padding: 20,
    boxShadow: 'rgb(0 0 0 / 74%) 2px 3px 10px',
  },
};

const Contact: FC = () => {
  const { lang } = useTranslation();
  const dispatch = useDispatch();
  const branchs = useSelector(selectBranches);
  const [form] = useForm();
  const { outerWidth } = useWidth();
  const { t } = useTranslation('login');

  useEffect(() => {
    dispatch(FetchBranchesAsync());
  }, [lang]);

  const [selectedBranch, setselectedBranch] = useState(0);

  const handle_change_branch = (branch_index: number) => {
    setselectedBranch(branch_index);
  };

  const status = useSelector(selectBranchesStatus);

  const [loading, setloading] = useState(false);
  const onFinish = async (value: ContactUs_Req) => {
    console.log(value);

    setloading(true);
    const result = await contactService.Insert(value);
    if (isError(result)) {
      notification['error']({ message: t`contact.something went wrong` });
    } else {
      notification['success']({ message: t`contact.your message has been` });
    }
    setloading(false);
  };

  return (
    <Row
      align='middle'
      justify='center'
      style={{
        background: `url('/assets/contact-back.jpg')`,
        backgroundRepeat: 'round',
        minHeight: 650,
      }}
    >
      <Col {...responsive_constant}>
        <Loading loading={status === 'loading'} dataValid={() => (branchs ? true : false)}>
          <Row justify='center' gutter={[24, 32]} style={{ marginTop: 30 }}>
            <Col span={24}>
              <div
                style={{
                  overflow: 'auto',
                  width: '100%',
                  textAlign: 'center',
                  padding: 10,
                }}
              >
                {outerWidth <= 420 ? (
                  <Select
                    onChange={(val, obj: any) => {
                      handle_change_branch(obj.key);
                    }}
                    style={{ width: '100%', borderRadius: 100 }}
                    defaultValue={branchs[0]?.id}
                  >
                    {branchs.map((branch, index) => (
                      <Option key={index} value={branch.id}>
                        {branch.city.name} - {branch.region}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <Radio.Group defaultValue={1} buttonStyle='solid' style={{ width: 'max-content' }}>
                    <Space>
                      {branchs.map((branch, index) => (
                        <Radio.Button key={index} onClick={() => handle_change_branch(index)} {...styledButtom} value={branch.id}>
                          {branch.city.name} - {branch.region}
                        </Radio.Button>
                      ))}
                    </Space>
                  </Radio.Group>
                )}
              </div>
            </Col>
            <Col span={24}>
              <Row justify='center'>
                <Col xl={8} lg={10} xs={24}>
                  <ContactInfo branch={branchs[selectedBranch]!} />
                </Col>
                <Col xl={16} lg={14} xs={24}>
                  <Map branch={branchs[selectedBranch]!} />
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row justify='center' style={{ margin: '15px 0px' }}>
                {/* contact us form */}
                <Col xl={16} lg={14} xs={24}>
                  <Form onFinish={onFinish} form={form}>
                    <Row justify='space-between'>
                      <Col span={11}>
                        <Form.Item
                          name='full_name'
                          rules={[
                            {
                              required: true,
                              message: t('contact.required_msg'),
                            },
                          ]}
                        >
                          <Input {...styledInput} placeholder={t('contact.name')} />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          name='email'
                          rules={[
                            {
                              required: true,
                              message: t('contact.required_msg'),
                            },
                            {
                              type: 'email',
                              message: t`contact.email not valid`,
                            },
                          ]}
                        >
                          <Input {...styledInput} placeholder={t('contact.email')} type='email' />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          name='subject'
                          rules={[
                            {
                              required: true,
                              message: t('contact.required_msg'),
                            },
                          ]}
                        >
                          <Input {...styledInput} placeholder={t('contact.subject')} />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          name='phone'
                          rules={[
                            {
                              required: true,
                              message: t('contact.required_msg'),
                            },
                          ]}
                        >
                          <Input {...styledInput} placeholder={t('contact.phone')} />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          name='msg'
                          rules={[
                            {
                              required: true,
                              message: t('contact.required_msg'),
                            },
                          ]}
                        >
                          <TextArea {...styledInput} placeholder={t('contact.message')} autoSize={{ minRows: 3, maxRows: 5 }} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Form.Item style={{ marginBottom: 0 }}>
                        <Button
                          style={{ minHeight: 40, minWidth: 100 }}
                          shape='round'
                          type='primary'
                          htmlType='submit'
                          loading={loading}
                        >
                          {t('contact.submit')}
                        </Button>
                      </Form.Item>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Loading>
      </Col>
    </Row>
  );
};

export default Contact;
