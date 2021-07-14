import React, { FC, useEffect, useState } from 'react';
import { Carousel, Image } from 'antd';
import './style.less';
import { useDispatch, useSelector } from 'react-redux';
import {
  FetchSlidersAsync,
  selectSliders,
  selectSlidersStatus,
} from '../../../redux';
import useTranslation from 'next-translate/useTranslation';
import LoadingData from '../../LoadingData';
import { primaryColor } from '../../../constants/layout/color';

const HomeCarousel: FC = () => {
  const [ActiveImage, setActiveImage] = useState(0);
  const { lang } = useTranslation();
  const dispatch = useDispatch();
  const status = useSelector(selectSlidersStatus);
  const sliders = useSelector(selectSliders);

  useEffect(() => {
    dispatch(FetchSlidersAsync());
  }, [lang]);

  return (
    <LoadingData
      dataValid={() => (sliders ? true : false)}
      loading={status === 'loading'}
    >
      <Carousel
        customPaging={(i) => (
          <div
            style={{ background: ActiveImage === i ? primaryColor : '#f5f5f5' }}
            className='dot'
          />
        )}
        pauseOnHover={false}
        afterChange={(next) => {
          setActiveImage(next);
        }}
        autoplay
      >
        {sliders.map((image) => (
          <div>
            <Image
              width='100%'
              preview={false}
              key={image.id}
              src={image.image_path}
            />
          </div>
        ))}
      </Carousel>
    </LoadingData>
  );
};
export default HomeCarousel;
