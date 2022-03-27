import React, { useState } from 'react';
import CN from 'classnames';

import { motion } from 'framer-motion';

import './ProductCard.scss';

export const ProductCard = ({
  className,
  isAuthenticated,
  moveProduct,
  thumbnail,
  shortDescription,
  price,
  ...restProps
}) => {
  const ProductCardClasses = CN(
    'product-card cursor-pointer flex flex-col items-center border-G-200 border-solid border-[1px] shadow-sm',
    className,
    {}
  );

  const [isFocus, setIsFocus] = useState(false);

  return (
    <motion.div
      className={ProductCardClasses}
      initial={{ x: '100%', width: '100%', height: '100%' }}
      animate={{ x: '0', width: '100%', height: '100%' }}
      transition={{ transition: 'width 0.45s ease-in-out' }}
      {...restProps}
      onMouseEnter={() => setIsFocus(true)}
      onMouseLeave={() => setIsFocus(false)}
    >
      {/* {!isAuthenticated && !moveProduct && (
        <div
          className="absolute py-2 text-xs italic font-medium md:text-base md:py-6 top-5 md:top-10 text-G-dark"
          style={{ backgroundColor: '#edf6f1' }}
        >
          <span>
            Please sign-in or sign-up to see product details and pricing.
          </span>
        </div>
      )} */}
      <img
        className="object-fill w-full h-fill"
        style={{ height: '77%' }}
        src={thumbnail}
        alt=""
      />
      <div
        className="bottom-0 flex flex-col w-full py-2 text-sm h-13 product-card__description text-G-dark"
        style={{ transition: 'height 1s ease-in', height: '35%', backgroundColor: '#ffffff' }}
      >
        <span className="text-sm product-card__description__title">
          {shortDescription}
        </span>
        <span className="font-bold product-card__description__price text-G-dark">
          {price}
        </span>
      </div>
    </motion.div>
  );
};

ProductCard.defaultProps = {
  className: undefined,
};

export default ProductCard;
