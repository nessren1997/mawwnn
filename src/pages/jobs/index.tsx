import React, { FC } from 'react';
import { Row } from 'antd';
import Jobs from '../../components/jobs';

const index: FC = () => {
  return (
    <Row justify='center' gutter={[0, 12]}>
      <Jobs />
    </Row>
  );
};
export default index;
