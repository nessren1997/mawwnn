import React, { FC } from 'react';
import { Col, Row } from 'antd';
import { responsive_constant } from '../../../constants/layout/responsive';
import ApplyForm from '../../../components/jobs/apply-form';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import {
  InsertApplicantAsync,
} from '../../../redux/applicant';
import { Applicant_I_Req } from '../../../models';


const ApplyForJob: FC = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();

  const { id } = query;

  const onSubmit = (req: Applicant_I_Req) => {
    dispatch(InsertApplicantAsync(parseInt(id as string), req));
  };

  return (
    <Row justify='center' gutter={[0, 64]}>
      <Col {...responsive_constant}>
        <ApplyForm onSubmit={onSubmit} />
      </Col>
    </Row>
  );
};
export default ApplyForJob;
