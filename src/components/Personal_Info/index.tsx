import { Typography, Col, Form, Input, Row, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { styledInputNotBorderd } from '../../constants/layout/responsive';
import PButton from '../PButton/Buttom';
import useTranslation from 'next-translate/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserInfoAsync,
  selectUser,
  updateUserInfo,
  selectGetInfoStatus,
  selectUpdateInfoStatus,
} from '../../redux/app';
import updateUserInfoReq from '../../models/update-user-info/update-req';
import { PoweroffOutlined } from '@ant-design/icons';

const { Text } = Typography;
const PersonalInfo: React.FC = () => {
  const { t } = useTranslation('personal-collection');

  const [borderd, setborderd] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const [cancel, setCancel] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const status = useSelector(selectGetInfoStatus);
  const statusUpdate = useSelector(selectUpdateInfoStatus);

  useEffect(() => {
    dispatch(getUserInfoAsync());
  }, []);

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
    console.log(user);
  }, [form, user]);
  useEffect(() => {
    if (statusUpdate === 'data') {
      notification['success']({
        message: t('update'),
      });
      setborderd(false);
      setdisabled(true);
      setCancel(false);
    }
  }, [statusUpdate]);

  // useEffect(() => {
  //   form.resetFields();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [lang]);

  const onFinish = (values: any) => {
    if (!borderd) {
      setborderd(true);
      setdisabled(false);
      setCancel(true);
    } else {
      let res: updateUserInfoReq = {
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
        password: values.password,
      };

      dispatch(updateUserInfo(res));
      form.resetFields(['password', 'confirm']);

      console.log(status);
    }
  };

  const canceledHandler = () => {
    setborderd(false);
    setdisabled(true);
    setCancel(false);
  };
  const labelStyled = (text: string) => {
    return <Text style={{ color: '#8d2cd3', fontWeight: 'bold' }}>{text}</Text>;
  };
  return (
    <>
      <Form labelAlign='right' layout='vertical' onFinish={onFinish} form={form}>
        <Row justify='start' gutter={{ lg: 18, xl: 25 }} style={{ padding: '26px 35px 21px 59px' }}>
          <Col sm={12} xs={24} >
            <Form.Item name='first_name' label={labelStyled(t('firstName'))} >
              <Input disabled={disabled} bordered={borderd} {...styledInputNotBorderd} />
            </Form.Item>
            <Form.Item name='email' label={labelStyled(t('email'))}>
              <Input disabled={disabled} bordered={borderd} {...styledInputNotBorderd} />
            </Form.Item>
            <Form.Item
              name='password'
              label={labelStyled(t('password'))}
              rules={
                [
                  // {
                  //   required: true,
                  //   message: 'Please input your password!',
                  // },
                  // () => ({
                  //   validator(rule, value) {
                  //       if (value.length >= 8) {
                  //         return Promise.resolve();
                  //       }
                  //       return Promise.reject(t('passwordLength'));
                  //     }
                  // }),
                ]
              }
            >
              <Input.Password
                disabled={disabled}
                bordered={borderd}
                {...styledInputNotBorderd}
                minLength={8}
                placeholder='********'
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24} >
            <Form.Item name='last_name' label={labelStyled(t('lastName'))}>
              <Input disabled={disabled} bordered={borderd} {...styledInputNotBorderd} />
            </Form.Item>
            <Form.Item name='phone' label={labelStyled(t('phone'))}>
              <Input disabled={disabled} bordered={borderd} {...styledInputNotBorderd} />
            </Form.Item>
            {cancel ? (
              <Form.Item
                name='confirm'
                label={labelStyled(t('confirmpass'))}
                rules={[
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
                <Input.Password disabled={disabled} bordered={borderd} {...styledInputNotBorderd} />
              </Form.Item>
            ) : null}
          </Col>
        </Row>
        <Row style={{ justifyContent: 'flex-end', padding: '0 30px' }} gutter={{ lg: 8, xl: 16 }}>
          <Col>
            <Form.Item>
              <PButton
                ttype={cancel ? 'success' : undefined}
                loading={statusUpdate === 'loading'}
                icon={statusUpdate === 'loading' ? <PoweroffOutlined /> : ''}
                htmlType='submit'
              >
                {t('edit')}
              </PButton>
            </Form.Item>
          </Col>

          {cancel ? (
            <Col>
              <Form.Item>
                <PButton ttype='danger' onClick={() => canceledHandler()} htmlType='button'>
                  {t('cancel')}
                </PButton>
              </Form.Item>
            </Col>
          ) : null}
        </Row>
      </Form>
    </>
  );
};

export default PersonalInfo;
