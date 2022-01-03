import React, { useEffect, useState } from 'react';
import CN from 'classnames';
import Slider from 'react-slick';
import product1 from '../../assets/products/1.JPG';
import product2 from '../../assets/products/2.JPG';
import product3 from '../../assets/products/3.JPG';
import product4 from '../../assets/products/4.JPG';
import product5 from '../../assets/products/5.JPG';
import product6 from '../../assets/products/6.JPG';

import './ProductCorasal.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const ProductCorasal = ({ className, ...restProps }) => {
  const ProductCorasalClasses = CN('product-corasal flex', className, {});

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

  return (
    <div className={ProductCorasalClasses} {...restProps}>
      <div className="w-10/12">
        <Slider
          {...settingsMain}
          asNavFor={nav2}
          ref={(slider) => setSlider1(slider)}
        >
          <div className="product-corasal__main-img">
            <img src={product1} alt="" />
          </div>
          <div className="product-corasal__main-img">
            <img src={product2} alt="" />
          </div>
          <div className="product-corasal__main-img">
            <img src={product3} alt="" />
          </div>
          <div className="product-corasal__main-img">
            <img src={product4} alt="" />
          </div>
        </Slider>
      </div>
      <div className="w-2/12 flex items-center">
        <Slider
          {...settingsSlide}
          asNavFor={nav1}
          ref={(slider) => setSlider2(slider)}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          <div>
            <img src={product1} alt="" />
          </div>
          <div>
            <img src={product2} alt="" />
          </div>
          <div>
            <img src={product3} alt="" />
          </div>
          <div>
            <img src={product4} alt="" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

ProductCorasal.defaultProps = {
  className: undefined,
};

export default ProductCorasal;
