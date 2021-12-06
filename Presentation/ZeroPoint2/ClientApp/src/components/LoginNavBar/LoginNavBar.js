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
import { useDispatch } from 'react-redux';

import zeroLogo from '../../assets/zeroLogo.png';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';

import { logOut } from '../../features/userSlice';
import useMediaQuery from '../../config/customHooks/useMediaQuery';

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

  const dispatch = useDispatch();

  const isSmallWide = useMediaQuery('(max-width: 640px)');

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.clear();
    dispatch(logOut());
  };

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
                  afterIcon={<RiFilter2Fill size={ !isSmallWide ? 32 : 24} />}
                />
              </div>
              <div className="search-btn">
                <Button
                  children=""
                  className="items-center py-1 text-xs text-G-dark h-7 w-max md:h-8 lg:h-10 md:py-2"
                  afterIcon={<RiShoppingCartFill size={ !isSmallWide ? 32 : 24} />}
                  onClick={handleSignIn}
                />
              </div>
              <div className="search-btn">
                <Button
                  children=""
                  className="items-center py-1 text-xs text-G-dark h-7 w-max md:h-8 lg:h-10 md:py-2"
                  afterIcon={<RiLogoutCircleRLine size={ !isSmallWide ? 32 : 24} />}
                  onClick={handleLogout}
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
