import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import isValidPhoneNumber from 'libphonenumber-js';
import { useDispatch, useSelector } from 'react-redux';
import { useIsMount } from '../../utils/helpers/is-mount';
import useTranslation from 'next-translate/useTranslation';
import { styledInput } from '../../constants/layout/responsive';
import { Form, Input, Row, Col, notification, Button, Select } from 'antd';
import { registerAsync, selectRegStatus, selectErrorMess } from '../../redux/app';

import './style.less';
import { FetchCitiesAsync, selectCities } from '../../redux';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const Register: FC = () => {
  const { t, lang } = useTranslation('login');
  const dispatch = useDispatch();
  const { replace } = useRouter();
  const isMount = useIsMount();

  const { status: cities_status, cities } = useSelector(selectCities);
  const status = useSelector(selectRegStatus);
  const error = useSelector(selectErrorMess);
  const [form] = useForm();

  const onFinish = (values: any) => {
    if (String(values.phone).charAt(0) === '0') {
      values.phone = values.phone.substring(1);
    }
    values = {
      ...values,
      phone: `${values.code}${(values.phone as string).replace(/\s/g, '')}`,
    };
    delete values.code;
    dispatch(registerAsync(values));
  };

  useEffect(() => {
    form.resetFields();
  }, [lang]);

  useEffect(() => {
    if (status === 'error' && error === 'The email has already been taken') {
      notification['error']({
        message: t('emailTaken'),
      });
    }
    if (status === 'error' && error === 'The phone has already been taken') {
      notification['error']({
        message: t('phoneTaken'),
      });
    }
  }, [error, status]);

  useEffect(() => {
    if (!isMount && status === 'data') {
      replace('/verfiy-email');
    }
  }, [status]);

  useEffect(() => {
    form.setFieldsValue({ code: '+963' });
    dispatch(FetchCitiesAsync());
  }, [lang]);

  return (
    <>
      {/* <Row justify='center'>
        <Col style={{ backgroundColor: '#fff', borderRadius: 55, padding: '37px 33px', boxShadow: '0px 2px 15px -5px #a29f9f' }} xxl={24} xl={24} lg={18} md={24} xs={24} sm={24}> */}

      <Form name='basic' onFinish={onFinish} form={form}>
        <Row>
          <Col span='24'>
            <Row gutter={{ lg: 12, xl: 8 }}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <Form.Item name='first_name' rules={[{ required: true, message: t('fname') }]}>
                  <Input {...styledInput} placeholder={t('firstName')} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <Form.Item name='last_name' rules={[{ required: true, message: t('Lname') }]}>
                  <Input {...styledInput} placeholder={t('lastName')} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <Form.Item name='email' rules={[{ required: true, message: t('emailReq') }]}>
          <Input {...styledInput} placeholder={t('email')} type='email' />
        </Form.Item>

        <div className='city_select'>
          <Form.Item name='city_id' rules={[{ required: true, message: t('cityReq') }]}>
            <Select direction='ltr' loading={cities_status === 'loading'} placeholder={t`city`}>
              {cities.map(
                (city) =>
                  city.id === 1 && (
                    <Option value={city.id}>
                      <span dir='ltr'>{city.name}</span>
                    </Option>
                  )
              )}
            </Select>
          </Form.Item>
        </div>

        <div>
          <Row style={{ direction: 'ltr' }}>
            <Col span={4}>
              <div className='select_code'>
                <Form.Item name='code'>
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
                hasFeedback
                // help={<span dir='ltr'>{t`form-validation.phone-help`}</span>}
                rules={[
                  { required: true, message: t('phoneN') },
                  {
                    pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
                    message: t`form-validation.invalid-phone-number`,
                  },
                  () => ({
                    validator(_, value) {
                      if (!value || isValidPhoneNumber(`+963${(value as string).replace(/\s/g, '')}`, 'SY'))
                        return Promise.resolve();
                      return Promise.reject(new Error(t`form-validation.invalid-uae-number`));
                    },
                  }),
                ]}
              >
                <Input
                  style={{ ...styledInput.style, borderRadius: '0 30px 30px 0' }}
                  // prefix={lang === 'en' ? '+963' : undefined}
                  // suffix={lang === 'en' ? undefined : <span dir='ltr'>+963</span>}
                  placeholder={t('phone')}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>

        {/* addresses */}
        <Form.List
          name='addresses'
          rules={[
            {
              validator: async (_, addresses) => {
                if (!addresses || addresses.length === 0) {
                  return Promise.reject(new Error(t`You should add one address at least`));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Row justify='space-between' align='middle'>
                  <Col span={23}>
                    <Form.Item
                      {...restField}
                      name={[name]}
                      fieldKey={[fieldKey]}
                      rules={[{ required: true, message: t`Please, input address or delete this field` }]}
                    >
                      <Input {...styledInput} placeholder={t`address`} />
                    </Form.Item>
                  </Col>

                  <MinusCircleOutlined style={{ marginBottom: 26 }} onClick={() => remove(name)} />
                </Row>
              ))}
              <Form.Item>
                <Button style={{ borderRadius: 20 }} type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                  {t`Add new address`}
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          style={{ marginTop: 10 }}
          name={['password']}
          rules={[
            { required: true, message: t('req', { name: t('password') }) },
            () => ({
              validator(_, value) {
                if (value && value.length < 8) {
                  return Promise.reject(t('passwordLength'));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input.Password {...styledInput} placeholder={t('password')} type='password' />
        </Form.Item>

        <Form.Item
          style={{ margin: '0px' }}
          name='confirm_password'
          hasFeedback
          rules={[
            {
              required: true,
              message: t`confirm_pass`,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(t('confirm_pass'));
              },
            }),
          ]}
        >
          <Input.Password {...styledInput} placeholder={t('confirm')} type='password' />
        </Form.Item>
        <Row style={{ paddingTop: '30px' }}>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              style={{ minHeight: 40, minWidth: 100 }}
              shape='round'
              type='primary'
              htmlType='submit'
              loading={status === 'loading'}
            >
              {t('register')}
            </Button>
          </Form.Item>
        </Row>
      </Form>
      {/* </Col>
      </Row> */}
    </>
  );
};

export default Register;
