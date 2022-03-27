import React from 'react';
import CN from 'classnames';

import './Error404.scss';

export const Error404 = ({ className, ...restProps }) => {
  const Error404Classes = CN('error404', className, {});

  return (
    <div className={Error404Classes} {...restProps}>
      Error404 is working...
    </div>
  );
};

Error404.defaultProps = {
  className: undefined,
};

export default Error404;
