import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import React from 'react';
// import {  } from '../../constants/layout/responsive';
export const styledButtom: {
  style: React.CSSProperties;
} = {
  style: {
    //   backgroundColor: "#fff",
    color: 'rgb(140 137 137)',
    borderRadius: 30,
    outline: 'none',
    border: 0,
    fontWeight: 'bold',
    height: '65px',
  },
};
const SButton: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Button type='default' {...styledButtom} {...rest}>
    {children}
  </Button>
);

export default SButton;
