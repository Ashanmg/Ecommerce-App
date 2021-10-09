import React from 'react';
import CN from 'classnames';

import './Button.scss';

export const Button = ({
  className,
  children,
  afterIcon,
  beforeIcon,
  ...restProps
}) => {
  const ButtonClasses = CN('button', className, {});

  return (
    <button type="button" className={ButtonClasses} {...restProps}>
      {beforeIcon && beforeIcon}
      {children}
      {afterIcon && afterIcon}
    </button>
  );
};

Button.defaultProps = {
  className: undefined,
};

export default Button;
