import React, { useState } from 'react';
import CN from 'classnames';
import { RiEyeLine, RiInformationLine, RiEyeOffLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import TextField from '../TextField/TextField';
import Button from '../Button/Button';

import zeroLogo from '../../assets/zeroLogo.png';
import useMediaQuery from '../../config/customHooks/useMediaQuery';

import './NavBar.scss';

export const NavBar = ({
  className,
  handleToggle,
  handleSignIn,
  handleFundModal,
  ...restProps
}) => {
  const NavBarClasses = CN(
    'nav-bar h-[72px] flex flex-col container max-w-screen-xl px-1 md:px-3',
    className,
    {}
  );

  const [passwordShow, setPasswordShow] = useState(false);

  const isSmallWide = useMediaQuery('(max-width: 640px)');

  if (isSmallWide) {
    return (
      <motion.div
        className={CN(NavBarClasses, 'px-3')}
        {...restProps}
        initial={{ y: -250 }}
        animate={{ y: -10 }}
        transition={{ stiffness: 120 }}
      >
        <div className="flex flex-col items-center pt-5">
          <div className="mr-1 logo lg:mr-3">
            <Link to="/" className="flex justify-center">
              <img src={zeroLogo} alt="Logo" className="object-fill w-1/2" />
            </Link>
          </div>
          <div className="text-xs italic logo_text text-G-dark">
            Environmental Socially gifts
          </div>
        </div>
        <div className="flex pb-2 mt-2 text-sm italic nav-bar-buttom text-G-dark">
          your one-shop shop for giving - 20% of every sale donated to the
          charity fo your choice
        </div>
        <div>
          <form action="" method="post">
            <div className="flex justify-around flex-grow mb-2">
              <div className="flex-1 mr-1 email-field">
                <TextField placeholder="Email" />
              </div>
              <div className="flex-1 password-field">
                <TextField
                  placeholder="Password"
                  onClickIconAfter={() => {
                    setPasswordShow(!passwordShow);
                  }}
                  type={passwordShow ? 'text' : 'password'}
                  iconAfter={
                    passwordShow ? (
                      <RiEyeOffLine size={20} />
                    ) : (
                      <RiEyeLine size={20} />
                    )
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-center ml-9">
              <div className="mr-1 signIn-btn lg:mr-3">
                <Button
                  children="Sign In"
                  className="items-center px-5 py-1 text-xs text-white border-2 h-7 w-max md:h-8 lg:h-10 md:py-2 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark"
                  onClick={handleSignIn}
                />
              </div>
              <div className="signUp-btn">
                <Button
                  children="Sign Up"
                  className="items-center px-5 py-1 text-xs text-white border-2 h-7 w-max md:h-8 lg:h-10 md:py-2 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark"
                  onClick={handleToggle}
                />
              </div>
              <div className="ml-1">
                <RiInformationLine size={26} className="text-G-dark" />
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={NavBarClasses}
      {...restProps}
      initial={{ y: -250 }}
      animate={{ y: -10 }}
      transition={{ stiffness: 120 }}
    >
      <div className="flex flex-col items-center pt-5">
        <form action="submit" method="post" className="flex w-full">
          <div className="mr-1 logo lg:mr-3">
            <Link to="/" className="flex justify-center">
              <img
                src={zeroLogo}
                alt="Logo"
                className="object-fill h-7 sm:h-8 lg:h-10 sm:w-full"
              />
            </Link>
          </div>
          <div className="flex justify-around flex-grow mr-1 lg:mr-3">
            <div className="flex-1 mr-1 email-field lg:mr-3">
              <TextField placeholder="Email" />
            </div>
            <div className="flex-1 password-field">
              <TextField
                placeholder="Password"
                onClickIconAfter={() => {
                  setPasswordShow(!passwordShow);
                }}
                type={passwordShow ? 'text' : 'password'}
                iconAfter={
                  passwordShow ? (
                    <RiEyeOffLine size={20} />
                  ) : (
                    <RiEyeLine size={20} />
                  )
                }
              />
            </div>
          </div>
          <div className="flex">
            <div className="mr-1 signIn-btn lg:mr-3">
              <Button
                children="Sign In"
                className="items-center px-3 py-1 text-xs text-white border-2 h-7 w-max md:h-8 lg:h-10 md:py-2 xl:px-8 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark"
                onClick={handleSignIn}
              />
            </div>
            <div className="signUp-btn">
              <Button
                children="Sign Up"
                className="items-center px-3 py-1 text-xs text-white border-2 h-7 w-max md:h-8 lg:h-10 md:py-2 xl:px-8 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark"
                onClick={handleToggle}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="flex items-center mt-2 text-base italic nav-bar-buttom text-G-dark lg:text-base 2xl:text-xl">
        Environmental Socially responsible gifts - your one-shop shop for giving
        - 20% of every sale donated to the charity fo your choice&nbsp;
        <RiInformationLine onClick={handleFundModal} size={24} />
      </div>
    </motion.div>
  );
};

NavBar.defaultProps = {
  className: undefined,
};

export default NavBar;
