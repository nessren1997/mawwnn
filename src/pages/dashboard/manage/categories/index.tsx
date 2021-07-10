import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UploadChangeParam, UploadFile, RcFile } from 'antd/es/upload/interface';
import CRUDBuilder from '../../../../utils/CRUDBuilder/CRUDBuilder';
import { ItemType } from '../../../../utils/CRUDBuilder/types';

import {
  DeleteCategoryAsync,
  FetchCategoriesAsync,
  InsertCategoryAsync,
  selectCategories,
  selectCategoriesStatus,
  UpdateCategoryAsync,
} from '../../../../redux/category';
import { GetServerSideProps } from 'next';
import { Category, Category_Req, Category_U_Req } from '../../../../models';
import { Button, Col, Form, Input, Modal, Row, Select, Upload, Image, Space, Typography } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { CustomUpload } from '../../../../utils/CRUDBuilder/CustomComponent/CustomUpload';
import { DashboardAuthenticated } from '../../../../utils/helpers/dashboard-authenticated';
import FileToBase64 from '../../../../utils/helpers/file-to-base64';

const mapper = async (req: any) => {
  console.log(req);

  if (req.image) req.image = await FileToBase64(req.image.file?.originFileObj);
  if (req.image2) req.image2 = await FileToBase64(req.image2.file?.originFileObj);
  req._method = 'put';
  return req;
};

const uploadButton = (
  <Space direction='vertical' size='small'>
    <PlusOutlined />
    <Typography.Text>Upload</Typography.Text>
  </Space>
);

const ManageCategorys: FC = () => {
  const { t, lang } = useTranslation('dashboard');
  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);
  const status = useSelector(selectCategoriesStatus);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(FetchCategoriesAsync());
  }, [dispatch]);

  const onFinishAdd = (category: Category_Req) => {
    setVisible(false);
    dispatch(InsertCategoryAsync({ category }));
  };

  const [file1, setFile1] = useState<string>();
  const [file2, setFile2] = useState<string>();

  const onFile1Change = async (newFile: UploadChangeParam<UploadFile<any>>) => {
    let res = await FileToBase64(newFile.file.originFileObj);
    setFile1(res);
  };

  const onFile2Change = async (newFile: UploadChangeParam<UploadFile<any>>) => {
    let res = await FileToBase64(newFile.file.originFileObj);
    setFile2(res);
  };

  const columnsCategorys: ItemType[] = [
    {
      columnType: {
        title: t`id`,
        dataIndex: 'id',
        fixed: 'left',
        width: 100,
      },
      type: 'primary-key',
    },
    {
      columnType: {
        title: t`name`,
        dataIndex: 'name',
        width: 200,
      },
      type: 'text',
      trans: true,
    },
  ];

  const tmp: ItemType[] = [
    {
      columnType: {
        title: t`Image 1`,
        dataIndex: 'image_path',
        width: 300,
      },
      type: 'image',
      customFormItem: (
        <Col span={12}>
          <Form.Item name='image' label='Image 1'>
            <Upload className='avatar-uploader' listType='picture-card' showUploadList={false} onChange={onFile2Change}>
              {file2 ? <Image preview={false} src={file2} alt='Avatar' /> : uploadButton}
            </Upload>
          </Form.Item>
        </Col>
      ),
    },
    {
      columnType: {
        title: t`Image 2`,
        dataIndex: 'image_path2',
        width: 300,
      },
      type: 'image',
      customFormItem: (
        <Col span={12}>
          <Form.Item name='image2' label='Image 2'>
            <Upload className='avatar-uploader' listType='picture-card' showUploadList={false} onChange={onFile1Change}>
              {file1 ? <Image preview={false} src={file1} alt='Avatar' /> : uploadButton}
            </Upload>
          </Form.Item>
        </Col>
      ),
    },
    {
      columnType: {
        title: t`Sub Categories`,
        dataIndex: 'sub_categories',
        width: 300,
        render: (val: Category[]) => (
          <Select style={{ width: '100%' }}>
            {val?.map((el) => (
              <Select.Option value={el.id}>{lang === 'en' ? el['name:en'] : el['name:ar']}</Select.Option>
            ))}
          </Select>
        ),
      },
      type: 'selectable-multi-foreign-key',
    },
  ];

  return (
    <>
      <Button loading={status === 'loading'} size='large' type='primary' onClick={() => setVisible(true)}>
        Add
      </Button>
      <CRUDBuilder
        lang={lang === 'en' ? 'en' : 'ar'}
        items={categories}
        loading={status === 'loading'}
        DeleteAsync={(el) => DeleteCategoryAsync({ id: el.id })}
        UpdateAsync={(el) => UpdateCategoryAsync({ id: el.id, category: el.item })}
        itemsHeader={[...columnsCategorys, ...tmp]}
        Mapper={mapper}
      />
      <Modal
        width={800}
        footer={false}
        title={
          <React.Fragment>
            <EditOutlined />
            {`  Add`}
          </React.Fragment>
        }
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <Form encType='multipart/form-data' scrollToFirstError={true} name='Add' layout='vertical' onFinish={onFinishAdd}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name='category_id' label='Parent Category'>
                <Select style={{ width: '100%' }} allowClear>
                  {categories.map(
                    (el) =>
                      el.parent_category_id === null && (
                        <Select.Option key={el.id} value={el.id}>
                          {lang === 'ar' ? el['name:ar'] : el['name:en']}
                        </Select.Option>
                      )
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='name:ar' label='Name AR' rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='name:en' label='Name EN' rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='image' label='Image 1' rules={[{ required: true }]}>
                <CustomUpload />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='image2' label='Image 2' rules={[{ required: true }]}>
                <CustomUpload />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button size='large' htmlType='submit' type='primary'>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ManageCategorys;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;
