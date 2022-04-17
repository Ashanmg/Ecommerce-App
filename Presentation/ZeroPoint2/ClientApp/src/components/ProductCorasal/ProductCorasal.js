import React, { useEffect, useState } from 'react';
import CN from 'classnames';
import Slider from 'react-slick';

import './ProductCorasal.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const ProductCorasal = ({ className, images, ...restProps }) => {
  const ProductCorasalClasses = CN(
    'product-corasal flex relative',
    {'justify-center': images?.length === 1},
    className,
    {}
  );

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider2, slider1]);

  const settingsMain = {
    dots: false,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const settingsSlide = {
    dots: false,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    vertical: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    verticalSwiping: true,
  };

  console.log(images);

  return (
    <div className={ProductCorasalClasses} {...restProps}>
      <div className="w-10/12">
        <Slider
          {...settingsMain}
          asNavFor={nav2}
          ref={(slider) => setSlider1(slider)}
        >
          {images?.map((image) => (
            <div className="product-corasal__main-img">
              <img src={image?.imageUrl} alt="" />
            </div>
          ))}
        </Slider>
      </div>
      {images?.length > 1 && (
        <div className="absolute right-0 flex items-center w-2/12 h-full overflow-y-auto">
          <Slider
            {...settingsSlide}
            asNavFor={nav1}
            ref={(slider) => setSlider2(slider)}
            slidesToShow={images?.length}
            swipeToSlide={true}
            focusOnSelect={true}
          >
            {images?.map((image) => (
              <div>
                <img src={image?.imageUrl} alt="" />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

ProductCorasal.defaultProps = {
  className: undefined,
};

export default ProductCorasal;
