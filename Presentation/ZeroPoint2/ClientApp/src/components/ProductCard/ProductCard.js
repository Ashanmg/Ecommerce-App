import React from 'react';
import CN from 'classnames';

import { motion } from 'framer-motion';

import './ProductCard.scss';

export const ProductCard = ({ className, thumbnail, ...restProps }) => {
  const ProductCardClasses = CN(
    'product-card min-w-[20%] w-1/2 md:w-1/4 lg:w-1/5 p-5 cursor-pointer',
    className,
    {}
  );

  return (
    <motion.div
      className={ProductCardClasses}
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.45 }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      {...restProps}
    >
      <img src={thumbnail} alt="" />
    </motion.div>
  );
};

ProductCard.defaultProps = {
  className: undefined,
};

export default ProductCard;
