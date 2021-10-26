import React from 'react';
import CN from 'classnames';

import './ProductUploadScreen.scss';

export const ProductUploadScreen = ({ className, ...restProps }) => {
  const ProductUploadScreenClasses = CN('product-upload-screen', className, {});

  return (
    <div className={ProductUploadScreenClasses} {...restProps}>
      ProductUploadScreen is working...
    </div>
  );
};

ProductUploadScreen.defaultProps = {
  className: undefined,
};

export default ProductUploadScreen;
