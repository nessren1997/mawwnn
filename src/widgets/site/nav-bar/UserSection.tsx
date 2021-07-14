import { Badge, Button, Space, Menu, Dropdown, Typography, Modal } from 'antd';
import Icon, { UserOutlined, ShoppingCartOutlined, LoadingOutlined } from '@ant-design/icons';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync, selectUser } from '../../../redux/app';
import { selectCart } from '../../../redux';
import { LanguageOutlined } from '../../../constants/svgs';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { appServices } from '../../../services';
import React, { useState } from 'react';
import { cartSvg } from '../Footer/social-icons';

const iconStyle: React.CSSProperties = { color: '#fff', fontSize: '1.2em' ,display:'flex', alignItems:'center'};

const { confirm } = Modal;

const UserSection: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { t, lang } = useTranslation('navbar');
  const en = lang === 'en';
  const dispatch = useDispatch();
  const { push, replace, asPath, pathname } = useRouter();

  const handleLang = async (key: string) => {
    setLoading(true);
    await appServices.changeLang({ lang: key as any });
    replace(asPath, undefined, { locale: key });
    setLoading(false);
  };

  const menuLang = (
    <Menu onClick={(e) => handleLang(e.key.toString())}>
      <Menu.Item key='en'>{t`nav-en`}</Menu.Item>
      <Menu.Item key='ar'>{t`nav-ar`}</Menu.Item>
    </Menu>
  );

  //-------------------------------------

  const onClick = async (key: string) => {
    switch (key) {
      case 'logout':
        confirm({
          title: t`confirm-logout`,
          onOk: () => {
            dispatch(logoutAsync());
            replace('/');
          },
          onCancel: () => {},
          centered: true,
        });
        break;

      case 'info':
        push('personal-collection');
        break;

      default:
        return null;
    }
  };

  const menu = (
    <Menu onClick={(e) => onClick(e.key.toString())}>
      <Menu.Item key='info'>{t`p-info`}</Menu.Item>
      <Menu.Item key='logout'>{t`sign-out`}</Menu.Item>
    </Menu>
  );

  const user = useSelector(selectUser);

  const cart = useSelector(selectCart);
  const totalNumberOfProducts = cart.reduce((acc, current) => acc + current.quantity, 0);

  const { Text } = Typography;

  return (
    <Space direction='horizontal' align='center' size='middle' className='userSectionSpace'>
      {user ? (
        <Dropdown overlay={menu} arrow={true} placement='bottomCenter' trigger={['hover']}>
          <Button type='text'  style={{display:'flex', alignItems:'center'}}>
            <Space direction='horizontal' size='small'>
              <Text style={{ fontSize: '1.1em', color: '#fff' }}>{user.first_name}</Text>
            </Space>
          </Button>
        </Dropdown>
      ) : (
        <Link href='/login'>
          <Button
            type='text'
            size='small'
            icon={<UserOutlined style={{ ...iconStyle, paddingTop: '2px' }} />}
            className='badge userButtonIcon'
            style={{display:'flex', alignItems:'center'}}
          />
        </Link>
      )}

      <>
        <Dropdown overlay={menuLang} arrow={true} placement='bottomCenter' trigger={['hover']}>
          <Button type='text' style={{ left: en ? -3 : 3 }}>
            <Space direction='horizontal' size='small'>
              {loading ? (
                <LoadingOutlined spin={loading} style={{...iconStyle ,marginTop:5}} />
              ) : (
                <LanguageOutlined style={{ ...iconStyle, cursor: 'pointer',marginTop:5 }} />
              )}
            </Space>
          </Button>
        </Dropdown>
      </>

      {!pathname.match(/\/cart/) && (
        <Badge
          count={totalNumberOfProducts}
          style={{
            border: 'none',
            boxShadow: 'none',
            top: '-6px',
            left: `${lang === 'ar' ? '25px' : '15px'}`,
            padding: '0.5px 1px 0 0',
          }}
        >
          <Link href='/cart'>
            <Button type='text' size='small' style={{ top: -3 }} icon={<Icon component={cartSvg} style={{...iconStyle ,marginTop:10  }} />}></Button>
          </Link>
        </Badge>
      )}
    </Space>
  );
};

export default UserSection;
