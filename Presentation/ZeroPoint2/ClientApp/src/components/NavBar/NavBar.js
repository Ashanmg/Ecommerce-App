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
import { emailValidation } from '../../config/utils/emailValidation';
import { userLogin } from '../../api/userApi';

import TextField from '../TextField/TextField';
import Button from '../Button/Button';

import zeroLogo from '../../assets/zeroLogo.png';
import useMediaQuery from '../../config/customHooks/useMediaQuery';

import './NavBar.scss';

export const NavBar = ({
  className,
  handleToggle,
  handleToggleSignIn,
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

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
    if (email === '' || password === '') {
      errorToast('Please fill the required fields');
      return;
    } else if (!emailValidation(email)) {
      errorToast('Please enter a valid email');
      return;
    } else if (password.length < 6) {
      errorToast('Password must be at least 6 characters');
      return;
    }
    e.preventDefault();
    dispatch(loginPending());

    try {
      const isAuth = await userLogin({ email, password });
      dispatch(loginSuccess());
      SuccessToast('Login successful.');
    } catch (error) {
      errorToast('Login failed.');
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
                <img src={zeroLogo} alt="Logo" className="object-fill w-auto h-7" />
              </Link>
            </div>
            <div className="italic logo_text text-G-dark" style={{fontSize:'9px'}}>
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
        <div className="flex pb-2 mt-2 text-sm italic nav-bar-buttom text-G-dark">
          your one-shop shop for giving - 20% of every sale donated to the
          charity fo your choice
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
      <div className="flex flex-col items-center pt-5">
        <form className="flex w-full" onSubmit={(e) => handleSubmit(e)}>
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
              <TextField
                placeholder="Email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex-1 password-field">
              <TextField
                placeholder="Password"
                autoComplete="new-password"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex">
            <div className="mr-1 signIn-btn lg:mr-3">
              <Button
                children={!isLoading ? 'Sign-in' : ''}
                className="items-center px-3 py-1 text-xs text-white border-2 h-7 w-max md:h-8 lg:h-10 md:py-2 xl:px-8 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark"
                color="text-G-dark"
                // type="submit"
                onClick={handleSubmit}
                isLoading={isLoading}
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
        </form>
      </div>
      <div className="flex items-center justify-between mt-2 text-base italic text-left nav-bar-buttom text-G-dark lg:text-base 2xl:text-xl">
        <span>
          Sustainable, socially responsible gifts - your one stop shop for
          giving - 20% of every sale donated to the charity of your choice
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
