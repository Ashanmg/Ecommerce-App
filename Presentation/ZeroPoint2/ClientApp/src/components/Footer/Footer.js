import React from 'react';
import CN from 'classnames';

import { Link, useLocation } from 'react-router-dom';
import useMediaQuery from '../../config/customHooks/useMediaQuery';

import './Footer.scss';

export const Footer = ({ className, isScrolling, ...restProps }) => {
  const FooterClasses = CN(
    'footer container max-w-screen-xl flex px-1 md:px-3 flex-row flex-wrap justify-center md:justify-between items-center lg:items-end max-w-screen-xl pb-0 fixed bottom-0 left-0 right-0 w-full z-10 bg-white pt-1',
    className,
    {}
  );

  const isSmallWide = useMediaQuery('(max-width: 640px)');

  if (isSmallWide) {
    return (
      <div
        className={CN(FooterClasses, { 'shadow-md': isScrolling === true })}
        {...restProps}
      >
        <div
          className="flex flex-col items-center justify-between w-full"
          style={{ backgroundColor: '#80bf9b' }}
        >
          <div className="my-1 text-xs italic copyRight text-white">
            Copyright © 2022 zeropoint2.com. All rights reserved.
          </div>
          <div className="mb-3 mr-0 text-sm font-medium md:mb-0 md:mr-5">
            <Link to="./contact-info" className="italic text-white hover:text-G-dark">
              About
            </Link>
            <a href="./" className="italic text-white hover:text-G-dark px-7">
              Support
            </a>
            <a href="./" className="italic text-white hover:text-G-dark">
              Connect
            </a>
          </div>
        </div>
        <hr
          style={{ width: '100%', height: '4px', border: 'none' }}
          size="3"
          color="white"
        />
      </div>
    );
  }

  return (
    <div className={FooterClasses} {...restProps}>
      <div
        className="flex flex-row items-center justify-between w-full px-2 py-2"
        style={{ backgroundColor: '#80bf9b' }}
      >
        <div className="text-xs italic copyRight text-white">
          Copyright © 2022 zeropoint2.com. All rights reserved.
        </div>
        <div className="mb-3 mr-0 text-sm font-medium md:mb-0 md:mr-5">
          <Link to="/contact-info" className="italic text-white hover:text-G-dark">
            About
          </Link>
          <a href="./" className="italic text-white hover:text-G-dark px-7">
            Support
          </a>
          <a href="./" className="italic text-white hover:text-G-dark">
            Connect
          </a>
        </div>
      </div>
      <hr
        style={{ width: '100%', height: '5px', border: 'none' }}
        size="3"
        color="white"
      />
    </div>
  );
};

Footer.defaultProps = {
  className: undefined,
};

export default Footer;
