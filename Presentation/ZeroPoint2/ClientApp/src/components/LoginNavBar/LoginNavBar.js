import React, { useState } from 'react';
import CN from 'classnames';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  RiSearchLine,
  RiLogoutCircleRLine,
  RiShoppingCartFill,
  RiFilter2Fill,
} from 'react-icons/ri';

import zeroLogo from '../../assets/zeroLogo.png';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';

import './LoginNavBar.scss';

export const LoginNavBar = ({
  className,
  handleToggle,
  handleSignIn,
  ...restProps
}) => {
  const LoginNavBarClasses = CN(
    'login-nav-bar nav-bar h-[72px] flex flex-col container max-w-screen-xl px-1 md:px-3',
    className,
    {}
  );

  return (
    <motion.div
      className={LoginNavBarClasses}
      {...restProps}
      initial={{ y: -250 }}
      animate={{ y: -10 }}
      transition={{ stiffness: 120 }}
    >
      <div className="flex items-start pt-5">
        <div className="flex flex-col items-center">
          <div className="mr-1 logo lg:mr-3">
            <Link to="/" className="flex justify-center">
              <img
                src={zeroLogo}
                alt="Logo"
                className="object-fill h-7 sm:h-8 lg:h-10 sm:w-full"
              />
            </Link>
          </div>
          <div className="text-xs italic logo_text text-G-dark">
            Environmental Socially gifts
          </div>
        </div>
        <form
          action="submit"
          method="post"
          className="flex flex-col items-start justify-center w-full"
        >
          <div className="flex w-full">
            <div className="flex justify-around flex-grow mr-1 lg:mr-3">
              <div className="flex-1 mr-1 email-field lg:mr-3">
                <TextField
                  placeholder="Search"
                  iconAfter={<RiSearchLine size={24} />}
                />
              </div>
            </div>
            <div className="flex">
              <div className="search-btn">
                <Button
                  children=""
                  className="items-center px-2 py-1 text-xs text-G-dark h-7 w-max md:h-8 lg:h-10 md:py-2"
                  afterIcon={<RiFilter2Fill size={32} />}
                />
              </div>
              <div className="search-btn">
                <Button
                  children=""
                  className="items-center py-1 text-xs text-G-dark h-7 w-max md:h-8 lg:h-10 md:py-2"
                  afterIcon={<RiShoppingCartFill size={32} />}
                  onClick={handleSignIn}
                />
              </div>
              <div className="search-btn">
                <Button
                  children=""
                  className="items-center py-1 text-xs text-G-dark h-7 w-max md:h-8 lg:h-10 md:py-2"
                  afterIcon={<RiLogoutCircleRLine size={32} />}
                  onClick={handleSignIn}
                />
              </div>
            </div>
          </div>
          <div></div>
        </form>
      </div>
    </motion.div>
  );
};

LoginNavBar.defaultProps = {
  className: undefined,
};

export default LoginNavBar;
