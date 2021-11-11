import React, { useState } from 'react';
import CN from 'classnames';

import { motion } from 'framer-motion';

import './ProductCard.scss';

export const ProductCard = ({ className, thumbnail, price, ...restProps }) => {
  const ProductCardClasses = CN(
    'product-card cursor-pointer flex flex-col items-center',
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
      <img
        className="object-fill w-full h-fill md:h-full"
        src={thumbnail}
        alt=""
      />
      <div
        className="bottom-0 flex flex-col w-full h-10 py-2 text-sm italic product-card__description text-G-dark"
        style={{ transition: 'height 1s ease-in'}}
      >
        {isFocus && (
          <span className="text-sm product-card__description__title">
            Leather Dog Collar with Hand Made Ornament
          </span>
        )}
        <span className="font-bold product-card__description__price text-G-dark">{price}</span>
      </div>
    </motion.div>
  );
};

ProductCard.defaultProps = {
  className: undefined,
};

export default ProductCard;
