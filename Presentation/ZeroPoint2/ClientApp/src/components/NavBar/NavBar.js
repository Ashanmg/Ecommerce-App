import React, { useEffect, useState } from 'react';
import CN from 'classnames';
import { RiEyeLine, RiInformationLine, RiEyeOffLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flip, toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import {
  loginPending,
  loginFail,
  loginSuccess,
} from '../../features/userSlice';

import { RiSearchLine } from 'react-icons/ri';

import { emailValidation } from '../../config/utils/emailValidation';
import { userLogin } from '../../api/userApi';

import TextField from '../TextField/TextField';
import Button from '../Button/Button';

import zeroLogo from '../../assets/zeroLogo1.svg';
import useMediaQuery from '../../config/customHooks/useMediaQuery';

import './NavBar.scss';

export const NavBar = ({
  className,
  handleToggle,
  handleToggleSignIn,
  handleSignIn,
  handleFundModal,
  progressed,
  setProgressed,
  isScrolling,
  ...restProps
}) => {
  const NavBarClasses = CN(
    'nav-bar h-[72px] flex flex-col container max-w-screen-xl px-1 md:px-3 fixed top-0 left-0 right-0 z-10 bg-white',
    className,
    { 'shadow-md': isScrolling === true }
  );

  const [passwordShow, setPasswordShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isSmallWide = useMediaQuery('(max-width: 640px)');

  const dispatch = useDispatch();
  const location = useLocation();

  const { isLoading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const errorToast = (message) => {
    toast(message, {
      position: 'top-right',
      type: 'error',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      progress: false,
      theme: 'colored',
      transition: Flip,
    });
  };

  const SuccessToast = (message) => {
    toast(message, {
      position: 'top-right',
      type: 'success',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      progress: false,
      theme: 'colored',
      transition: Flip,
    });
  };

  const handleSubmit = async (e) => {
    setProgressed(progressed + 80);
    if (email === '' || password === '') {
      errorToast('Please fill the required fields');
      setProgressed(100);
      return;
    } else if (!emailValidation(email)) {
      errorToast('Please enter a valid email');
      setProgressed(100);
      return;
    } else if (password.length < 6) {
      errorToast('Password must be at least 6 characters');
      setProgressed(100);
      return;
    }
    e.preventDefault();
    dispatch(loginPending());

    try {
      const isAuth = await userLogin({ email, password });
      setProgressed(progressed + 100);
      dispatch(loginSuccess());
      SuccessToast('Login successful.');
    } catch (error) {
      errorToast('login failed, please try again.');
      setProgressed(100);
      dispatch(loginFail(error.message));
    }
  };

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, [location]);

  if (isSmallWide) {
    return (
      <motion.div
        className={CN(NavBarClasses, 'px-3')}
        {...restProps}
        initial={{ y: -250 }}
        animate={{ y: -10 }}
        transition={{ stiffness: 120 }}
      >
        <div className="flex flex-row items-start justify-around pt-5">
          <div className="mr-1 signIn-btn lg:mr-3">
            <Button
              children={!isLoading ? 'Sign-in' : ''}
              className="items-center px-5 text-xs text-white border-2 h-7 w-max md:h-8 lg:h-10 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark"
              isLoading={isLoading}
              onClick={handleToggleSignIn}
              // type="submit"
            />
          </div>
          <div>
            <div className="mr-1 logo lg:mr-3">
              <Link to="/" className="flex justify-center">
                <img
                  src={zeroLogo}
                  alt="Logo"
                  className="object-fill w-auto h-7"
                />
              </Link>
            </div>
            <div
              className="italic logo_text text-G-dark"
              style={{ fontSize: '9px' }}
            >
              Sustainable, socially responsible gifts
            </div>
          </div>
          <div className="signUp-btn">
            <Button
              children="Sign-up"
              className="items-center px-5 text-xs text-white border-2 h-7 w-max md:h-8 lg:h-10 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark"
              onClick={handleToggle}
            />
          </div>
        </div>
        <div style={{ backgroundColor: '#80bf9b' }} className="flex pb-2 mt-2 text-sm italic text-white nav-bar-buttom">
          20% of every sale donated to the charity of your choice.
        </div>
        <div>
          <form>
            <div className="flex justify-around flex-grow mb-2">
              {/* <div className="flex-1 mr-1 email-field">
                <TextField
                  placeholder="Email"
                  autoComplete="off"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex-1 password-field">
                <TextField
                  placeholder="Password"
                  onClickIconAfter={() => {
                    setPasswordShow(!passwordShow);
                  }}
                  autoComplete="new-password"
                  type={passwordShow ? 'text' : 'password'}
                  iconAfter={
                    passwordShow ? (
                      <RiEyeOffLine size={20} />
                    ) : (
                      <RiEyeLine size={20} />
                    )
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div> */}
            </div>
            {/* <div className="flex items-center justify-center ml-9">
              <div className="mr-1 signIn-btn lg:mr-3">
                <Button
                  children={!isLoading ? 'Sign In' : ''}
                  className="items-center px-5 py-1 text-xs text-white border-2 h-7 w-max md:h-8 lg:h-10 md:py-2 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark"
                  isLoading={isLoading}
                  // onClick={handleSignIn}
                  // type="submit"
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
                <RiInformationLine
                  onClick={handleFundModal}
                  size={26}
                  className="cursor-pointer text-G-dark"
                />
              </div>
            </div> */}
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
      <div className="flex items-center w-full pt-5">
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
          <div className="mr-1 signIn-btn lg:mr-3">
            <Button
              children={'Sign-in'}
              className="items-center px-3 py-1 text-xs text-white border-2 h-7 w-max md:h-8 lg:h-10 md:py-2 xl:px-8 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark"
              color="text-G-dark"
              // type="submit"
              onClick={handleToggleSignIn}
            />
          </div>
          <div className="signUp-btn">
            <Button
              children="Sign-up"
              className="items-center px-3 py-1 text-xs text-white border-2 h-7 w-max md:h-8 lg:h-10 md:py-2 xl:px-8 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark"
              onClick={handleToggle}
            />
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: '#80bf9b', height: '41px' }} className="flex items-center justify-center mt-2 text-base italic text-center text-white nav-bar-buttom lg:text-xs xl:text-base">
        <span>
          Sustainable, socially responsible gifts - 20% of every sale donated to
          the charity of your choice.
        </span>
        <RiInformationLine
          className="cursor-pointer"
          onClick={handleFundModal}
          size={24}
        />
      </div>
    </motion.div>
  );
};

NavBar.defaultProps = {
  className: undefined,
};

export default NavBar;
