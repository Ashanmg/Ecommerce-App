import React from 'react';
import CN from 'classnames';

import { Link } from 'react-router-dom';

import './Footer.scss';

export const Footer = ({ className, ...restProps }) => {
  const FooterClasses = CN(
    'footer container max-w-screen-xl flex px-1 md:px-3 flex-row flex-wrap justify-center md:justify-end items-center lg:items-center max-w-screen-xl',
    className,
    {}
  );

  return (
    <div className={FooterClasses} {...restProps}>
      <div className="mb-3 mr-0 text-sm font-medium md:mb-0 md:mr-5 md:text-lg">
        <Link to="./contact-info" className="italic text-G-dark">
          Company info
        </Link>
        <a href="./" className="italic text-G-dark px-7">
          Support
        </a>
        <a href="./" className="italic text-G-dark">
          Connect
        </a>
      </div>
      <div className="text-xs italic copyRight text-G-dark">
        Copyright © 2021 zeropoint2.com. All rights reserved.
      </div>
    </div>
  );
};

Footer.defaultProps = {
  className: undefined,
};

export default Footer;
