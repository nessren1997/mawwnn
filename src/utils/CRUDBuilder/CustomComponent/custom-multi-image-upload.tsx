import { PlusOutlined } from '@ant-design/icons';
import { Space, Typography, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import React from 'react';


const uploadButton = (
    <Space direction='vertical' size='small'>
        <PlusOutlined />
        <Typography.Text>Upload</Typography.Text>
    </Space>
);


interface Props {
    value?: UploadFile<any>[];
    onChange?: (value: UploadFile[]) => void;
    disabled?: boolean;
    onPreview?: (file: UploadFile<any>) => void
}

const CustomMultiImageUpload: React.FC<Props> = ({ onChange, value = [], disabled, onPreview }) => {

    const triggerChange = (changedValue: UploadFile[]) =>
        onChange && onChange(changedValue);

    const onFileChange = async (values: UploadChangeParam<UploadFile<any>>) =>
        triggerChange(values.fileList);

    return (
        <Upload fileList={value} disabled={disabled} listType="picture-card" onPreview={onPreview} onChange={onFileChange} beforeUpload={() => false}>
            {uploadButton}
        </Upload>
    )
}
export default CustomMultiImageUpload;