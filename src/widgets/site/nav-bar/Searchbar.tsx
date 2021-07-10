import React from 'react';
import { Input, Button, Col, Spin } from 'antd';
import styles from './navbar.module.css';
import { useSelector } from 'react-redux';
import CustomeSelect from './CustomeSelect';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import useTranslation from 'next-translate/useTranslation';
import { selectRequestedProductsStatus } from '../../../redux';

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

interface propsInterface {
  searchCategoryHandler: (val: number) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  searchString: string;
  styleObj?: {};
}

const Searchbar: React.FC<propsInterface> = ({
  searchCategoryHandler,
  handleSearchChange,
  handleSearchSubmit,
  searchString,
  styleObj,
}) => {
  const { t } = useTranslation('navbar');

  const requested_products_status = useSelector(selectRequestedProductsStatus);

  return (
    <Col dir='rtl' span={24}>
      <form
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          outline: 'none',
          ...styleObj,
        }}
        onSubmit={handleSearchSubmit}
      >
        <Button
          htmlType='submit'
          className={`${styles.searchBarBtn} ${styles.searchBtn}`}
        >
          {requested_products_status === 'loading' ? (
            <Spin indicator={antIcon} />
          ) : (
            <SearchOutlined />
          )}
        </Button>
        <Input
          dir='rtl'
          placeholder={t`search-product`}
          style={{
            border: 'none',
            borderRadius: 0,
            padding: '10px 15px 10px 10px',
            width: 340,
            height: 42,
            outline: 'none',
          }}
          value={searchString}
          onChange={handleSearchChange}
        />
        <CustomeSelect searchCategoryHandler={searchCategoryHandler} />
      </form>
    </Col>
  );
};

export default Searchbar;
