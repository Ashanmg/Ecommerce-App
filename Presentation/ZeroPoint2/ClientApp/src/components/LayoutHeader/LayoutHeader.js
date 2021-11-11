import React from 'react';
import CN from 'classnames';
import { Link } from 'react-router-dom';

import './LayoutHeader.scss';

export const LayoutHeader = ({ className, ...restProps }) => {
  const LayoutHeaderClasses = CN(
    'layout-header container max-w-screen-xl px-1 lg:px-3 mb-1 w-full justify-between text-base text-G-dark',
    className,
    {}
  );

  return (
    <div className={LayoutHeaderClasses} {...restProps}>
      <Link to="./">Favorites</Link>
      <a href="./">New</a>
      <a href="./">Home & Living</a>
      <a href="./">Beauty & Wellness</a>
      <a href="./">Jewelry</a>
      <a href="./">Women</a>
      <a href="./">Men</a>
      <a href="./">Pets</a>
    </div>
  );
};

LayoutHeader.defaultProps = {
  className: undefined,
};

export default LayoutHeader;
