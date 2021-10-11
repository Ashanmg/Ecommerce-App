import React from 'react';
import CN from 'classnames';

import { Link } from 'react-router-dom';

import './Footer.scss';

export const Footer = ({ className, ...restProps }) => {
  const FooterClasses = CN(
    'footer container flex justify-between max-w-screen-xl py-2',
    className,
    {}
  );

  return (
    <div className={FooterClasses} {...restProps}>
      <div className="copyRight text-G-dark italic text-xs">
        Copyright © 2021 artizanshub.com. All rights reserved.
      </div>
      <div className="">
        <Link to="./contact-info" className="text-G-dark italic px-5">
          Company info
        </Link>
        <a href="./" className="text-G-dark italic px-5">
          Support
        </a>
        <a href="./" className="text-G-dark italic p-5">
          Connect
        </a>
      </div>
    </div>
  );
};

Footer.defaultProps = {
  className: undefined,
};

export default Footer;
