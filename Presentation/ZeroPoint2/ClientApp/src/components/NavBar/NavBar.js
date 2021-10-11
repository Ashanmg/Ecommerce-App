import React from 'react';
import CN from 'classnames';
import { RiEyeLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import TextField from '../TextField/TextField';
import Button from '../Button/Button';

import zeroLogo from '../../assets/zeroLogo.png';
import './NavBar.scss';

export const NavBar = ({ className, ...restProps }) => {
  const NavBarClasses = CN('nav-bar h-[72px]', className, {});

  return (
    <motion.div
      className={NavBarClasses}
      {...restProps}
      initial={{ y: -250 }}
      animate={{ y: -10 }}
      transition={{ stiffness: 120 }}
    >
      <div className="container max-w-screen-xl flex flex-col sm:flex-col md:flex-col lg:flex-row pt-5 items-center md:items-center lg:items-start lg:justify-between">
        <div className="logo flex-initial mb-4 lg:mb-0">
          <Link to="/">
            <img
              src={zeroLogo}
              alt="Logo"
              className="object-cover h-14 md:h-14 lg:h-9 w-auto"
            />
          </Link>
          <div className="logo_description text-G-dark text-xs italic">
            Environmentally conscious gifts
          </div>
        </div>
        <div className="auth_form">
          <form
            action="submit"
            className="flex flex-col md:flex-col lg:flex-row items-center md:justify-between"
          >
            <div className="flex mb-2">
              <TextField placeholder="Email" className="mx-3 md:mr-5" />
              <TextField placeholder="Password" className="mx-3 md:mr-5" />
            </div>
            <div className="flex">
              <Button
                beforeIcon={<RiEyeLine size={32} color="#005C27" />}
                className="h-9 py-2 px-3 flex items-center mr-5"
              />
              <Button
                children="Sign In"
                className="h-7 md:h-9 py-1 md:py-2 px-5 bg-G-light text-sm mr-5 hover:text-white"
              />
              <Button
                children="Sign Up"
                className="h-7 md:h-9 py-1 md:py-2 px-5 bg-G-light text-sm mr-5 hover:text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

NavBar.defaultProps = {
  className: undefined,
};

export default NavBar;
