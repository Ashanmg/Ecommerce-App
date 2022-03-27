import React from 'react';
import CN from 'classnames';

import './Loading.scss';

export const Loading = ({ className, ...restProps }) => {
  const LoadingClasses = CN('loading', className, {});

  return (
    <div className={LoadingClasses} {...restProps}>
      Loading is working...
    </div>
  );
};

Loading.defaultProps = {
  className: undefined,
};

export default Loading;
