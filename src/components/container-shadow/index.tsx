import Col, { ColProps } from 'antd/lib/col';
import React from 'react';
// import {  } from '../../constants/layout/responsive';
import './style.less';
export const styledContainerShadow: {
  style: React.CSSProperties;
} = {
  style: {
    backgroundColor: '#fff',
    borderRadius: 55,
    padding: '40px 35px',
    boxShadow: '0px 2px 15px -5px #a29f9f',
  },
};
const ContainerShadow: React.FC<ColProps> = ({ children, ...rest }) => (
  <Col xxl={14} xl={12} lg={14} md={18} xs={24} {...styledContainerShadow} {...rest}>
    {children}
  </Col>
);

export default ContainerShadow;
