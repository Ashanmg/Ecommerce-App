import React from 'react';
import CN from 'classnames';
import { RiEyeLine } from 'react-icons/ri';

import TextField from '../TextField/TextField';
import Button from '../Button/Button';

import zeroLogo from '../../assets/zeroLogo.png';

import './NavBar.scss';
import { motion } from 'framer-motion';

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
      <div className="container max-w-screen-xl flex pt-5 justify-around">
        <div className="logo flex-initial">
          <img src={zeroLogo} alt="Logo" className="object-cover h-9 w-auto" />
          <div className="logo_description text-G-dark text-xs italic">
            Environmentally conscious gifts
          </div>
        </div>
        <div className="auth_form">
          <form action="submit" className="flex justify-between">
            <TextField placeholder="Email" className="mr-5" />
            <TextField placeholder="Password" className="mr-5" />
            <Button
              beforeIcon={<RiEyeLine size={32} color="#005C27" />}
              className="h-9 py-2 px-3 flex items-center mr-5"
            />
            <Button
              children="Sing In"
              className="h-9 py-2 px-5 bg-G-light text-sm mr-5 hover:text-white"
            />
            <Button
              children="Sing Up"
              className="h-9 py-2 px-5 bg-G-light text-sm mr-5 hover:text-white"
            />
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
