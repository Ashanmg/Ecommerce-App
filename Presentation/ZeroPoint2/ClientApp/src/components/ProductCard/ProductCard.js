import React, { useState } from 'react';
import CN from 'classnames';

import { motion } from 'framer-motion';

import './ProductCard.scss';

export const ProductCard = ({
  className,
  isAuthenticated,
  moveProduct,
  thumbnail,
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
      {!isAuthenticated && !moveProduct && (
        <div
          className="absolute py-6 italic font-bold top-1/4 text-G-dark"
          style={{ backgroundColor: '#edf6f1' }}
        >
          <span>Please Sign-In or Sign-Up to see the product</span>
        </div>
      )}
      <img
        className="object-fill w-full h-fill md:h-full"
        src={thumbnail}
        alt=""
      />
      <div
        className="bottom-0 flex flex-col w-full py-2 text-sm italic h-13 product-card__description text-G-dark"
        style={{ transition: 'height 1s ease-in' }}
      >
        {/* {isFocus && ( */}
        <span className="text-sm product-card__description__title">
          Leather Dog Collar with Hand Made Ornament
        </span>
        {/* )} */}
        {isAuthenticated && (
          <span className="font-bold product-card__description__price text-G-dark">
            {price}
          </span>
        )}
      </div>
    </motion.div>
  );
};

ProductCard.defaultProps = {
  className: undefined,
};

export default ProductCard;
