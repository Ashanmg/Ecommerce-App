import React, { useState } from 'react';
import CN from 'classnames';
import { useHistory } from 'react-router-dom';
import {
  RiEyeLine,
  RiInformationLine,
  RiShoppingCartFill,
  RiMenuFill,
} from 'react-icons/ri';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import TextField from '../TextField/TextField';
import Button from '../Button/Button';

import zeroLogo from '../../assets/zeroLogo.png';
import './NavBar.scss';

export const NavBar = ({ className, handleToggle, ...restProps }) => {
  const NavBarClasses = CN(
    'nav-bar h-[72px] flex flex-col container max-w-screen-xl px-1 md:px-3',
    className,
    {}
  );

  const [isLogin, setIsLogin] = useState(false);

  return (
    <motion.div
      className={NavBarClasses}
      {...restProps}
      initial={{ y: -250 }}
      animate={{ y: -10 }}
      transition={{ stiffness: 120 }}
    >
      <div className="flex flex-col pt-5 items-center">
        <form action="submit" method="post" className="flex w-full">
          <div className="logo mr-1 lg:mr-3">
            <Link to="/" className="flex justify-center">
              <img
                src={zeroLogo}
                alt="Logo"
                className="object-fill h-7 sm:h-8 lg:h-10 sm:w-full"
              />
            </Link>
          </div>
          <div className="flex flex-grow justify-around mr-1 lg:mr-3">
            <div className="email-field flex-1 mr-1 lg:mr-3">
              <TextField placeholder="Email" />
            </div>
            <div className="password-field flex-1">
              <TextField placeholder="Password" />
            </div>
          </div>
          <div className="flex">
            <div className="signIn-btn mr-1 lg:mr-3">
              <Button
                children="Sign Up"
                className="h-7 w-max md:h-8 lg:h-10 py-1 md:py-2 px-3 xl:px-8 items-center bg-G-light text-xs lg:text-sm border-2 border-G-light hover:bg-white text-white hover:text-G-dark"
              />
            </div>
            <div className="signUp-btn">
              <Button
                children="Sign Up"
                className="h-7 w-max md:h-8 lg:h-10 py-1 md:py-2 px-3 xl:px-8 items-center bg-G-light text-xs lg:text-sm border-2 border-G-light hover:bg-white text-white hover:text-G-dark"
                onClick={handleToggle}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="nav-bar-buttom text-G-dark text-base lg:text-base 2xl:text-xl mt-2 italic flex">
        Environmental Socially responsible gifts - your one-shop shop for giving
        -20% of every sale donated to the charity fo your choice
        <RiInformationLine size={24} />
      </div>
    </motion.div>
  );
};

NavBar.defaultProps = {
  className: undefined,
};

export default NavBar;
