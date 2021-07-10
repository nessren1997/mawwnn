import { Col } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { selectIsMobile } from '../../../redux';
import { useSelector } from 'react-redux';
import { primaryColor } from '../../../constants/layout/color';

interface PropsInterface {
  text: string;
  isActive: boolean;
}

const index: React.FC<PropsInterface> = ({ text, isActive }) => {
  const isMobile = useSelector(selectIsMobile);
  return (
    <Col
      flex='1 1 49%'
      className='step'
      style={{
        borderBottom: '4px solid transparent',
        borderColor: isActive ? primaryColor : '#aaa',
        margin: '0 2px',
        flex: '0 0 49%',
        paddingTop: 10,
      }}
    >
      <span
        className='text_and_icon_container'
        style={{
          color: isActive ? '#000' : '#b3b3b3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginBottom: 15,
          position: 'relative',
        }}
      >
        <CheckCircleOutlined
          style={{
            fontSize: isMobile ? '1.2em' : '1.6em',
            color: isActive ? primaryColor : '#aaa',
            margin: '0px 3px',
          }}
        />
        <span
          style={{
            marginRight: isMobile ? 2 : 5,
            marginTop: 1,
            fontSize: isMobile ? '0.9em' : '1.4em',
            color: isActive ? primaryColor : '#b3b3b3',
          }}
        >
          {text}
        </span>
      </span>
    </Col>
  );
};

export default index;
