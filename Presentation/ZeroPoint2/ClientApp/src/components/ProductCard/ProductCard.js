import React from 'react';
import CN from 'classnames';

import { motion } from 'framer-motion';

import './ProductCard.scss';

export const ProductCard = ({ className, thumbnail, ...restProps }) => {
  const ProductCardClasses = CN('product-card cursor-pointer', className, {});

  return (
    <motion.div
      className={ProductCardClasses}
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.45 }}
      {...restProps}
    >
      <img className='object-contain h-40 w-full' src={thumbnail} alt="" />
    </motion.div>
  );
};

ProductCard.defaultProps = {
  className: undefined,
};

export default ProductCard;
