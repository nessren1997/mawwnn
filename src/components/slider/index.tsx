import React, { FC, useRef } from 'react';
import { Button, Carousel } from 'antd';
import { CaretLeftOutlined, CaretRightFilled } from '@ant-design/icons';
import './style.less';

interface props {}

const SlickButtonFix = ({
  currentSlide,
  slideCount,
  children,
  ...props
}: any) => <span {...props}>{children}</span>;

const Slider: FC<props> = (props) => {
  const nextBtn = useRef<HTMLHeadingElement>(null);
  const prevBtn = useRef<HTMLHeadingElement>(null);

  return (
    <>
      <CaretLeftOutlined
        onClick={() => {
          prevBtn.current?.click();
        }}
        className='prev-arrow'
      />
      <div className='slider'>
        <Carousel
          draggable={true}
          arrows={true}
          nextArrow={
            <SlickButtonFix>
              <Button ref={nextBtn} />
            </SlickButtonFix>
          }
          prevArrow={
            <SlickButtonFix>
              <Button ref={prevBtn} />
            </SlickButtonFix>
          }
          dots={false}
          infinite={false}
          speed={1000}
          slidesToShow={3}
          slidesToScroll={1}
          initialSlide={0}
          pauseOnHover={false}
          swipeToSlide={true}
          responsive={[
            {
              breakpoint: 1064,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 770,
              settings: {
                slidesToShow: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
        >
          {props.children}
        </Carousel>
      </div>
      <CaretRightFilled
        onClick={() => nextBtn.current?.click()}
        className='next-arrow'
      />
    </>
  );
};
export default Slider;
