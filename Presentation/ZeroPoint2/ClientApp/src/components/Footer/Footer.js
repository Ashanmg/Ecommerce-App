import React from 'react';
import CN from 'classnames';

import { Link } from 'react-router-dom';

import './Footer.scss';

export const Footer = ({ className, ...restProps }) => {
  const FooterClasses = CN(
    'footer container flex flex-col flex-wrap justify-center md:justify-between item-center lg:items-end max-w-screen-xl px-12',
    className,
    {}
  );

  return (
    <div className={FooterClasses} {...restProps}>
      <div className="mb-3 text-sm md:text-lg font-medium">
        <Link to="./contact-info" className="text-G-dark italic">
          Company info
        </Link>
        <a href="./" className="text-G-dark italic px-7">
          Support
        </a>
        <a href="./" className="text-G-dark italic">
          Connect
        </a>
      </div>
      <div className="copyRight text-G-dark italic text-xs">
        Copyright © 2021 zeropoint2.com. All rights reserved.
      </div>
    </div>
  );
};

Footer.defaultProps = {
  className: undefined,
};

export default Footer;
