import { UploadChangeParam, UploadFile, RcFile } from 'antd/es/upload/interface';
import { Typography, Image, Space, Upload } from 'antd';
import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import FileToBase64 from '../../helpers/file-to-base64';

interface UploadProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  dontConvertToBase?: Boolean;
}

export const CustomUpload: React.FC<UploadProps> = ({ onChange, value, disabled, dontConvertToBase }) => {
  const [file, setFile] = useState<string>();

  useEffect(() => {
    if (value) {
      setFile(value);
      triggerChange(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const triggerChange = (changedValue: string) => {
    if (onChange) onChange(changedValue);
  };

  const onFileChange = async (newFile: UploadChangeParam<UploadFile<any>>) => {
    let res = await FileToBase64(newFile.file as any);
    setFile(res);
    triggerChange(res);
  };

  const beforeUpload = (newFile: RcFile) => {
    FileToBase64(newFile).then((res) => {
      setFile(res);
      triggerChange(res);
    });
    return false;
  };

  const uploadButton = (
    <Space direction='vertical' size='small'>
      <PlusOutlined />
      <Typography.Text>Upload</Typography.Text>
    </Space>
  );

  return (
    <Upload
      disabled={disabled}
      className='avatar-uploader'
      listType='picture-card'
      showUploadList={false}
      onChange={onFileChange}
      beforeUpload={beforeUpload}
    >
      {file ? <Image preview={false} src={file} alt='Avatar' /> : uploadButton}
    </Upload>
  );
};
