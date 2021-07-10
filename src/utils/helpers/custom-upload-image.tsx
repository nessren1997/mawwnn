import { UploadFile } from 'antd/es/upload/interface';
import { Space, Upload } from 'antd';
import React, { useState } from 'react';
import { CameraFilled } from '@ant-design/icons';
import FileToBase64 from './file-to-base64';

interface UploadProps {
  value?: UploadFile | string;
  onChange?: (value: UploadFile) => void;
  disabled?: boolean;
  width?: string;
  height?: string;
}

export const CustomUploadImage: React.FC<UploadProps> = ({ onChange, value, disabled, height = '100%', width = '100%' }) => {
  const [preview, setPreview] = useState<string>();

  const uploadButton = (
    <Space direction='vertical' size='small'>
      <CameraFilled style={{ color: 'gray', opacity: 0.2, fontSize: '4em' }} />
    </Space>
  );

  return (
    <Upload
      disabled={disabled}
      className='avatar-uploader'
      listType='picture-card'
      showUploadList={false}
      style={{ height: 300, width: 300, background: 'red' }}
      onChange={(newFile) => {
        FileToBase64(newFile.file as any).then((res) => setPreview(res));
        onChange && onChange(newFile.file);
      }}
      beforeUpload={() => false}
    >
      {preview || value ? (
        <img src={preview ?? value?.toString()} height={height} width={width} style={{ objectFit: 'cover' }} alt='Avatar' />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};
