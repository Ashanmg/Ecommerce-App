import React, { useEffect, useState } from 'react';
import CN from 'classnames';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  RiSearchLine,
  RiLogoutCircleRLine,
  RiShoppingCartFill,
  RiFilter2Fill,
} from 'react-icons/ri';

import zeroLogo from '../../assets/zeroLogo1.svg';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import LayoutHeader from '../LayoutHeader/LayoutHeader';
import useMediaQuery from '../../config/customHooks/useMediaQuery';

import './LoginNavBar.scss';

export const LoginNavBar = ({
  className,
  handleLogout,
  handleToggle,
  handleSignIn,
  isScrolling,
  ...restProps
}) => {
  const LoginNavBarClasses = CN(
    'login-nav-bar nav-bar h-[72px] flex flex-col container max-w-screen-xl px-1 md:px-3 fixed left-0 right-0 w-full z-10 bg-white',
    className,
    { 'shadow-md': isScrolling === true }
  );

  const isSmallWide = useMediaQuery('(max-width: 640px)');

  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const data = JSON.parse(localStorage.getItem('user'));

  return (
    <motion.div
      className={LoginNavBarClasses}
      {...restProps}
      initial={{ y: -250 }}
      animate={{ y: -10 }}
      transition={{ stiffness: 120 }}
    >
      { isAuthenticated && data.user.userRoleId === 1 &&
        <Link to='/admin/product-upload' className="text-white hover:text-G-dark"
          style = {{padding: '5px' , marginTop: '15px', marginBottom: '10px', backgroundColor: '#80bf9b', cursor: 'pointer'}}>
          Administrator
        </Link>
      } 
      <div className={"flex items-start" +  (isAuthenticated && data.user.userRoleId != 1 ? " pt-5" : "") }>
        <div className="flex flex-col items-center">
          <div className="mr-1 logo lg:mr-3">
            <Link to="/" className="flex justify-center">
              <img
                src={zeroLogo}
                alt="Logo"
                className="object-fill w-auto h-7 sm:h-8 lg:h-10 sm:w-full"
              />
            </Link>
          </div>
          <div
            className="text-xs italic text-left logo_text text-G-dark"
            style={{ fontSize: '10px' }}
          >
            Sustainable, socially responsible gifts
          </div>
        </div>
        <form
          action="submit"
          method="post"
          className="flex flex-col items-start justify-center w-full"
        >
          <div className="flex w-full">
            <div className="flex justify-around flex-grow mr-1 lg:mr-3">
              <div className="flex-1 mr-1 email-field">
                <TextField
                  placeholder={
                    !isSmallWide
                      ? 'Search for sustainable, socially responsible gifts'
                      : 'Search'
                  }
                  iconAfter={<RiSearchLine size={!isSmallWide ? 24 : 16} />}
                />
              </div>
            </div>
            <div className="flex">
              <div className="search-btn">
                <Button
                  children=""
                  className="items-center py-1 text-xs text-G-dark h-7 w-max md:h-8 lg:h-10 md:py-2"
                  afterIcon={<RiFilter2Fill size={!isSmallWide ? 32 : 24} />}
                />
              </div>
              <div className="search-btn">
                <Button
                  children=""
                  className="items-center py-1 text-xs text-G-dark h-7 w-max md:h-8 lg:h-10 md:py-2"
                  afterIcon={
                    <RiShoppingCartFill size={!isSmallWide ? 32 : 24} />
                  }
                  onClick={handleSignIn}
                />
              </div>
              <div className="search-btn">
                <Button
                  children=""
                  className="items-center py-1 text-xs text-G-dark h-7 w-max md:h-8 lg:h-10 md:py-2"
                  afterIcon={
                    <RiLogoutCircleRLine size={!isSmallWide ? 32 : 24} />
                  }
                  onClick={handleLogout}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="layout-hader">
        <LayoutHeader />
      </div>
    </motion.div>
  );
};

LoginNavBar.defaultProps = {
  className: undefined,
};

export default LoginNavBar;
