import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { Col, message, Row, Typography, Image, Form, Input, Button } from 'antd';
import { useRouter } from 'next/router';
import LoadingData from '../../LoadingData';
import { Applicant_I_Req } from '../../../models';
import { FilePdfOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';
import { primaryColor } from '../../../constants/layout/color';
import { selectApplicantsStatus } from '../../../redux/applicant';
import { selectJob, selectJobsStatus, ShowJobAsync, clearStatus } from '../../../redux/job';

import './style.less';

interface props {
  onSubmit: (req: Applicant_I_Req) => void;
}

const { Title } = Typography;

const input_layout: { style: CSSProperties } = {
  style: { height: 60, borderRadius: 30 },
};

const upload_btn: { type: 'dashed'; style: CSSProperties } = {
  type: 'dashed',
  style: {
    padding: 10,
    height: 140,
    width: '100%',
    borderRadius: 30,
    marginBottom: -25,
    background: 'whitesmoke',
  },
};

const ApplyForm: FC<props> = ({ onSubmit }) => {
  const { t } = useTranslation('jobs');
  const [CV, setCV] = useState<any>();
  let file_ref = useRef<HTMLInputElement>(null);
  const status = useSelector(selectApplicantsStatus);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const formData = new FormData();
    for (const key in values)
      if (Object.prototype.hasOwnProperty.call(values, key)) if (key !== 'cv_path') formData.append(key, values[key]);
    formData.append('cv_path', CV);
    onSubmit(formData as any);
  };

  useEffect(() => {
    if (status === 'data') {
      message.success(t('apply_done'));
      form.resetFields();
      dispatch(clearStatus());
    }
  }, [status]);

  const { lang } = useTranslation();
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { id } = query;
  const job = useSelector(selectJob);
  const job_status = useSelector(selectJobsStatus);

  useEffect(() => {
    dispatch(ShowJobAsync({ id: parseInt(id as string) }));
  }, [lang]);

  return (
    <>
      <Row gutter={[0, 64]} style={{ marginTop: 30 }}>
        <Title style={{ color: primaryColor }} level={4}>
          {t('apply_for_job')}
        </Title>
      </Row>
      <LoadingData dataValid={() => (job ? true : false)} loading={job_status === 'loading'}>
        <Row justify='space-around' align='middle' style={{ margin: '10px 0px' }}>
          <Col
            lg={8}
            md={18}
            style={{
              display: 'grid',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Image preview={false} style={{ maxWidth: 170, margin: 'auto' }} src={job?.image_path} />
            <Title style={{ color: primaryColor }} level={3}>
              {job?.title}
            </Title>
          </Col>
          <Col lg={14} md={18} sm={22} xs={24}>
            <div className='job-form'>
              <Form form={form} style={{ width: '100%' }} name='nest-messages' onFinish={onFinish}>
                <Row justify='space-between'>
                  <Col span={11}>
                    <Form.Item
                      name={['first_name']}
                      rules={[
                        {
                          required: true,
                          message: t('required_messege', { name: t('f_name') }),
                        },
                      ]}
                    >
                      <Input style={{ ...input_layout.style, width: '100%' }} placeholder={t('f_name')} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={['last_name']}
                      rules={[
                        {
                          required: true,
                          message: t('required_messege', {
                            name: t('l_name'),
                          }),
                        },
                      ]}
                    >
                      <Input style={{ ...input_layout.style, width: '100%' }} placeholder={t('l_name')} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name={['email']}
                  rules={[
                    {
                      type: 'email',
                      message: t('type_messege', { name: t('email') }),
                    },
                    {
                      required: true,
                      message: t('required_messege', { name: t('email') }),
                    },
                  ]}
                >
                  <Input {...input_layout} placeholder={t('email')} />
                </Form.Item>

                <Form.Item name={['description']}>
                  <Input.TextArea
                    style={{ ...input_layout.style, paddingTop: 12 }}
                    autoSize={{ minRows: 6 }}
                    placeholder={t('description')}
                  />
                </Form.Item>
                <Button
                  {...upload_btn}
                  onClick={() => {
                    file_ref.current?.click();
                  }}
                >
                  <p style={{ fontSize: '2.2em', margin: 0 }}>
                    <FilePdfOutlined />
                  </p>
                  <p>{!CV ? t('upload_cv') : CV?.name}</p>
                </Button>
                <Form.Item
                  name={['cv_path']}
                  rules={[
                    {
                      required: true,
                      message: t('required_messege', { name: 'cv' }),
                    },
                  ]}
                >
                  <input
                    style={{ display: 'none' }}
                    ref={file_ref}
                    type='file'
                    accept='.pdf'
                    onChange={(e: any) => {
                      setCV(e.target.files[0]);
                    }}
                  />
                </Form.Item>

                <Form.Item>
                  <Button block type='primary' htmlType='submit' {...input_layout} loading={status === 'loading'}>
                    {t('submit')}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </LoadingData>
    </>
  );
};
export default ApplyForm;
