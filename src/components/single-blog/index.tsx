import React, { FC } from 'react';
import { Blog } from '../../models';
import { Row, Typography, Image, Col, Space } from 'antd';

import './style.less';

const { Title, Text } = Typography;

interface props {
  blog: Blog;
}

const SingleBlog: FC<props> = ({ blog }) => {
  return (
    <>
      <div className='single-blog-card'>
        <Image
          preview={false}
          className='single-blog-img'
          width='100%'
          src={blog?.image_path}
        />
        <div className='single-blog-content'>
          <Title level={2}>{blog?.article_title}</Title>
          <Row
            justify='center'
            style={{
              fontSize: '1.1em',
              fontWeight: 500,
              lineHeight: 2.6,
            }}
          >
            <Col span={23}>
              <Space direction='vertical' size='small'>
                <Text type='secondary'>
                  <p dangerouslySetInnerHTML={{ __html: blog?.article_body }} />
                </Text>
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
export default SingleBlog;
