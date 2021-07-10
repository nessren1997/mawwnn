import { Typography } from 'antd';
const { Text } = Typography;

interface propsInterface {
  name: string;
  value: string | number;
  total?: boolean;
}
const Entry: React.FC<propsInterface> = ({ name, value, total }) => {
  return (
    <Text
      style={{
        borderBottom: total ? 'none' : '1px solid #333',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '13px 0',
        marginBottom: '5px',
      }}
    >
      <span>{name}</span>
      <span
        style={{
          color: total ? 'red' : 'inherit',
          fontWeight: total ? 'bold' : 'normal',
        }}
      >
        {typeof value === 'string' ? value : value + ' S.P'}
      </span>
    </Text>
  );
};

export default Entry;
