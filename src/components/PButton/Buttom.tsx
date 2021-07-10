import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import React from 'react';
import { successColor, warningColor } from '../../constants/layout/color';
// import {  } from '../../constants/layout/responsive';
export const styledButtom: React.CSSProperties = {
  width: 142,
  height: 40,
  color: '#fff',
  borderRadius: 30,
  outline: 'none',
  border: 0,
  fontWeight: 'bold',
};

interface Props extends ButtonProps {
  ttype?: 'success' | 'warning' | 'danger';
}

const PButton: React.FC<Props> = ({ children, ...rest }) => {
  switch (rest.ttype) {
    case 'danger':
      return (
        <Button danger type='primary' style={{ ...styledButtom, ...rest.style }} {...rest}>
          {children}
        </Button>
      );
    case 'warning':
      return (
        <Button type='primary' style={{ ...styledButtom, ...rest.style, backgroundColor: warningColor }} {...rest}>
          {children}
        </Button>
      );
    case 'success':
      return (
        <Button type='primary' style={{ ...styledButtom, ...rest.style, backgroundColor: successColor }} {...rest}>
          {children}
        </Button>
      );

    default:
      return (
        <Button type='primary' style={{ ...styledButtom, ...rest.style }} {...rest}>
          {children}
        </Button>
      );
      break;
  }
};
export default PButton;
