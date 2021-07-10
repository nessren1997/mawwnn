import { Button, Result, Space } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { FC } from 'react';

const auth: FC = () => {
  const { t } = useTranslation('common');

  const { back } = useRouter();

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Result
        icon={<img src={'/assets/404.svg'} width={'100%'} height={300} />}
        title={t`not-auth`}
        subTitle={t`need-auth`}
        extra={
          <Space direction='horizontal' size='middle'>
            <Link href='/login'>
              <Button size='large' type='primary' shape='round' block>{t`login`}</Button>
            </Link>
            <Button onClick={() => back()} size='large' shape='round' block>{t`back`}</Button>
          </Space>
        }
      />
    </div>
  );
};
export default auth;
