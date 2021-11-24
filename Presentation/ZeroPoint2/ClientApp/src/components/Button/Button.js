import React from 'react';
import CN from 'classnames';

import './Button.scss';

export const Button = ({
  className,
  children,
  type,
  afterIcon,
  beforeIcon,
  ...restProps
}) => {
  const ButtonClasses = CN('button', className, {});

  return (
    <button type={type} className={ButtonClasses} {...restProps}>
      {beforeIcon && beforeIcon}
      {children}
      {afterIcon && afterIcon}
    </button>
  );
};

Button.defaultProps = {
  className: undefined,
  type: 'button',
};

export default Button;
