import React, { useEffect } from 'react';
import CN from 'classnames';

import { Link, useLocation } from 'react-router-dom';
import useMediaQuery from '../../config/customHooks/useMediaQuery';

import './Footer.scss';

export const Footer = ({ className, ...restProps }) => {
  const FooterClasses = CN(
    'footer container max-w-screen-xl flex px-1 md:px-3 flex-row flex-wrap justify-center md:justify-between items-center lg:items-end max-w-screen-xl',
    className,
    {}
  );

  const isSmallWide = useMediaQuery('(max-width: 640px)');

  if (isSmallWide) {
    return (
      <div className={FooterClasses} {...restProps}>
        <div className="flex flex-col items-center justify-between w-full">
          <div className="my-1 text-xs italic copyRight text-G-dark">
            Copyright © 2021 zeropoint2.com. All rights reserved.
          </div>
          <div className="mb-3 mr-0 text-sm font-medium md:mb-0 md:mr-5 md:text-lg">
            <Link to="./contact-info" className="italic text-G-dark">
              Info
            </Link>
            <a href="./" className="italic text-G-dark px-7">
              Support
            </a>
            <a href="./" className="italic text-G-dark">
              Connect
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={FooterClasses} {...restProps}>
      <div className="flex flex-row items-center justify-between w-full">
        <div className="text-xs italic copyRight text-G-dark">
          Copyright © 2021 zeropoint2.com. All rights reserved.
        </div>
        <div className="mb-3 mr-0 text-sm font-medium md:mb-0 md:mr-5 md:text-lg">
          <Link to="./contact-info" className="italic text-G-dark">
            Info
          </Link>
          <a href="./" className="italic text-G-dark px-7">
            Support
          </a>
          <a href="./" className="italic text-G-dark">
            Connect
          </a>
        </div>
      </div>
    </div>
  );
};

Footer.defaultProps = {
  className: undefined,
};

export default Footer;
