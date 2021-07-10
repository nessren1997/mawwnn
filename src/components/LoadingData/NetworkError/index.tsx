import React from 'react';
import { Result } from 'antd';
import useTranslation from 'next-translate/useTranslation';

const NetworkError: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <Result
      status='500'
      title={t('error.network_error')}
      subTitle={t('error.network_error_des')}
    />
  );
};
export default NetworkError;
