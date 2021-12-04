import React from 'react';
import CN from 'classnames';

import ProductCorasal from '../../components/ProductCorasal/ProductCorasal';

import './ProductScreen.scss';

export const ProductScreen = ({ className, ...restProps }) => {
  const ProductScreenClasses = CN(
    'product-screen container max-w-screen-xl px-1 lg:px-3 h-full',
    className,
    {}
  );

  return (
    <div className={ProductScreenClasses} {...restProps}>
      <div className="w-3/5 product-screen__corasal bg-G-200">
        <div className="h-auto m-2 product-screen__corasal__content bg-Y-100 ">
          <ProductCorasal />
        </div>
        <div className="m-2 h-1/5 product-screen__corasal__details bg-Y-400">
          details
        </div>
      </div>
      <div className="w-2/5 product-screen__details-cart bg-G-500">details</div>
    </div>
  );
};

ProductScreen.defaultProps = {
  className: undefined,
};

export default ProductScreen;
