import React from 'react';
import CN from 'classnames';
import AliceCarousel from 'react-alice-carousel';

import 'react-alice-carousel/lib/alice-carousel.css';
import './ProductCorasal.scss';

export const ProductCorasal = ({ className, ...restProps }) => {
  const ProductCorasalClasses = CN('product-corasal', className, {});

  return (
    <div className={ProductCorasalClasses} {...restProps}>
      ProductCorasal is working...
    </div>
  );
};

ProductCorasal.defaultProps = {
  className: undefined,
};

export default ProductCorasal;
