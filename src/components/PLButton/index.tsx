import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import React from 'react';
import { successColor, warningColor } from '../../constants/layout/color';
// import {  } from '../../constants/layout/responsive';
export const styledButtom: React.CSSProperties = {
  border: 0,
  width: 142,
  height: 40,
  color: '#fff',
  outline: 'none',
  borderRadius: 30,
  fontWeight: 'bold',
};

interface Props extends ButtonProps {
  ttype?: 'success' | 'warning' | 'danger';
}

const PLButton: React.FC<Props> = ({ children, ...rest }) => {
  // const [loading, setloading] = useState(false);

  switch (rest.ttype) {
    case 'danger':
      return (
        <Button
          danger
          type='primary'
          style={{ ...styledButtom, ...rest.style }}
          {...rest}
        >
          {children}
        </Button>
      );
    case 'warning':
      return (
        <Button
          type='primary'
          style={{
            ...styledButtom,
            ...rest.style,
            backgroundColor: warningColor,
          }}
          {...rest}
        >
          {children}
        </Button>
      );
    case 'success':
      return (
        <Button
          // onClick={() => setloading(true)}
          // loading={loading}
          // icon={loading ? <PoweroffOutlined /> : ''}
          type='primary'
          style={{
            ...styledButtom,
            ...rest.style,
            backgroundColor: successColor,
          }}
          {...rest}
        >
          {children}
        </Button>
      );
    // onClick={() => setloading(true)} loading={loading} icon={loading ? <PoweroffOutlined /> : ''}
    default:
      return (
        <Button
          type='primary'
          style={{ ...styledButtom, ...rest.style }}
          {...rest}
        >
          {children}
        </Button>
      );
      break;
  }
};
export default PLButton;
