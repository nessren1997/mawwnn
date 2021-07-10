import React from 'react';
import FollowUs from './follow-us';
import CopyRight from './copyright';
import { Col, Row, Divider } from 'antd';
import HelpfulLinks from './helpful-links';
import { responsive_constant } from '../../../constants/layout/responsive';

import './style.less';

export default function Footer() {
  return (
    <Row style={{ fontWeight: 'normal' }} justify='center' gutter={[0, 4]}>
      <Col {...responsive_constant}>
        <Divider className='divider' />
        <HelpfulLinks />
        <Divider className='divider' />
        <FollowUs />
        <Divider className='divider' />
        <CopyRight />
      </Col>
    </Row>
  );
}
