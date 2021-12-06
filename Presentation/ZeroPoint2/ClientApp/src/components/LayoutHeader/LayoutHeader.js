import React from 'react';
import CN from 'classnames';
import { Link } from 'react-router-dom';

import useMediaQuery from '../../config/customHooks/useMediaQuery';

import './LayoutHeader.scss';

export const LayoutHeader = ({ className, ...restProps }) => {
  const LayoutHeaderClasses = CN(
    'layout-header px-1 lg:px-3 mb-1 w-auto justify-between text-xs md:text-base text-G-dark flex overflow-scroll',
    className,
    {}
  );

  const isSmallWide = useMediaQuery('(max-width: 640px)');

  return (
    <div className={LayoutHeaderClasses} {...restProps}>
      <Link className="text-" to="./">
        Favorites
      </Link>
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
