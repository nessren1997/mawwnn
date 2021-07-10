import { Input, Button } from 'antd';

interface propsInterface {
  placeholder: string;
  name: string;
  button_text: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  val?: string;
  isLoading: boolean;
}

const index: React.FC<propsInterface> = ({ placeholder, name, button_text, handleChange, handleSubmit, val, isLoading }) => {
  return (
    <form onSubmit={handleSubmit} dir='rtl'>
      <label
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          position: 'relative',
        }}
      >
        <Input
          placeholder={placeholder}
          className='input'
          onChange={handleChange}
          name={name}
          value={val}
          style={{
            width: '100%',
            borderRadius: 20,
            border: '1px solid #e3e3e3',
            padding: 10,
            margin: '15px 0',
          }}
        />
        <Button
          htmlType='submit'
          className='button verify'
          style={{
            position: 'absolute',
            left: '2%',
            top: '30%',
            border: 'none',
            backgroundColor: '#2b2e83',
            color: '#fff',
            padding: '5px 33px',
            borderRadius: 15,
          }}
          loading={isLoading}
        >
          <span style={{ position: 'relative', top: '-2px' }}>{button_text}</span>
        </Button>
      </label>
    </form>
  );
};

export default index;
