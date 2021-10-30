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
      <img className='object-scale-down h-auto md:h-40 lf w-full' src={thumbnail} alt="" />
    </motion.div>
  );
};

ProductCard.defaultProps = {
  className: undefined,
};

export default ProductCard;
