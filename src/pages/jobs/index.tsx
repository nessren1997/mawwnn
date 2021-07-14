import React, { FC,useEffect } from 'react';
import { Row } from 'antd';
import Jobs from '../../components/jobs';
import { useSelector } from 'react-redux';
import {selectUser} from "../../redux/app"
import {useRouter} from "next/router"
const index: FC = () => {

  const user=useSelector(selectUser);
  const {replace}=useRouter();

  useEffect(()=>{
    if(user?.missing_params)
    replace("/personal-collection");
  },[user])
  return (
    <Row justify='center' gutter={[0, 12]}>
      <Jobs />
    </Row>
  );
};
export default index;
