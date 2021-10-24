import React from 'react';
import CN from 'classnames';
import {useHistory} from 'react-router-dom';
import { RiEyeLine, RiInformationLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import TextField from '../TextField/TextField';
import Button from '../Button/Button';

import zeroLogo from '../../assets/zeroLogo.png';
import './NavBar.scss';

export const NavBar = ({ className, ...restProps }) => {
  const NavBarClasses = CN('nav-bar h-[72px]', className, {});

  const history = useHistory();

  const handleOnClick = () => {
    history.push('/signup');
  };

  return (
    <motion.div
      className={NavBarClasses}
      {...restProps}
      initial={{ y: -250 }}
      animate={{ y: -10 }}
      transition={{ stiffness: 120 }}
    >
      <div className="container max-w-screen-xl flex flex-col sm:flex-col md:flex-col lg:flex-row pt-5 items-center md:items-center md:justify-center lg:items-start lg:justify-center px-0 lg:px-1">
        <div className="logo flex-initial mb-4 mr-0 lg:mr-7 lg:mb-0">
          <Link to="/" className="flex justify-center">
            <img
              src={zeroLogo}
              alt="Logo"
              className="object-cover w-1/2 h-auto lg:h-10 lg:w-auto mb-1"
            />
          </Link>
          <div className="logo_description text-G-dark text-xs italic font-semibold">
            Environmentally conscious gifts
          </div>
        </div>
        <div className="auth_form mb-5 sm:mb-0">
          <div className="flex flex-row h-7 md:h-10 items-center italic text-G-dark text-md md:text-base xl:text-lg font-medium mb-4 md:mb-2">
            Your one-stop shop for giving - 20% of every sale donated to the
            charity of your choice.&nbsp;{' '}
            <RiInformationLine className="hidden lg:flex" />
          </div>
          <form
            action="submit"
            className="flex flex-col md:flex-col lg:flex-row md:justify-between"
          >
            <div className="flex justify-center mb-2 mx-1">
              <TextField
                placeholder="Email"
                className="mr-4 w-auto md:w-auto xl:w-80"
              />
              <TextField
                placeholder="Password"
                className="w-auto md:w-auto xl:w-80"
              />
            </div>
            <div className="flex justify-center ml-16 lg:ml-0">
              <Button
                beforeIcon={<RiEyeLine size={32} color="#005C27" />}
                className={CN(
                  'hidden lg:flex h-7 md:h-10 py-2 px-3 items-center',
                  {}
                )}
              />
              <Button
                children="Sign In"
                className="h-7 md:h-10 py-1 md:py-2 px-6 xl:px-8 items-center bg-G-light text-sm mr-4 hover:text-white"
              />
              <Button
                children="Sign Up"
                className="h-7 md:h-10 py-1 md:py-2 px-6 xl:px-8 items-center bg-G-light text-sm hover:text-white"
                onClick={handleOnClick}
              />
              <Button
                beforeIcon={<RiInformationLine size={32} />}
                className={CN(
                  'flex lg:hidden h-7 md:h-10 py-2 px-3 items-center text-G-dark',
                  {}
                )}
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
