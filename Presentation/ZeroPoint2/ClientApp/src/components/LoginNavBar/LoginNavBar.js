import React from 'react';
import CN from 'classnames';

import './LoginNavBar.scss';

export const LoginNavBar = ({
  className,
  ...restProps
}) => {
  const LoginNavBarClasses = CN('login-nav-bar', className, {})

  return (
    <div className={LoginNavBarClasses} {...restProps}>
      LoginNavBar is working...
    </div>
  );
};

LoginNavBar.defaultProps = {
  className: undefined,
}

export default LoginNavBar;
