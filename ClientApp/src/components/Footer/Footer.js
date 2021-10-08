import React from 'react';
import CN from 'classnames';

import './Footer.scss';

export const Footer = ({ className, ...restProps }) => {
  const FooterClasses = CN('footer container flex justify-end max-w-screen-xl py-2', className, {});

  return (
    <div className={FooterClasses} {...restProps}>
      <a href="./" className="text-G-dark italic px-5">
        Company info
      </a>
      <a href="./" className="text-G-dark italic px-5">
        Support
      </a>
      <a href="./" className="text-G-dark italic px-5">
        Connect
      </a>
    </div>
  );
};

Footer.defaultProps = {
  className: undefined,
};

export default Footer;
