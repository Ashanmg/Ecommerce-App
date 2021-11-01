import React from 'react';
import CN from 'classnames';

import { motion } from 'framer-motion';

import './ProductCard.scss';

export const ProductCard = ({ className, thumbnail, ...restProps }) => {
  const ProductCardClasses = CN('product-card cursor-pointer flex items-center', className, {});

  return (
    <motion.div
      className={ProductCardClasses}
      initial={{ width: '0', height: '100%' }}
      animate={{ width: '100%', height: '100%' }}
      transition={{ transition: 'width 0.45s ease-in-out' }}
      {...restProps}
    >
      <img
        className="object-fill w-full h-auto md:h-40 lf"
        src={thumbnail}
        alt=""
      />
    </motion.div>
  );
};

ProductCard.defaultProps = {
  className: undefined,
};

export default ProductCard;
