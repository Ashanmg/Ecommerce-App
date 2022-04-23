import React, { useState } from 'react';
import CN from 'classnames';
import { Link } from 'react-router-dom';
import { toast, Flip } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { emailValidation } from '../../config/utils/emailValidation';

import TextField from '../TextField/TextField';
import CheckBox from '../CheckBox/CheckBox';
import Button from '../Button/Button';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import './SignInFrom.scss';
import {
  loginFail,
  loginPending,
  loginSuccess,
} from '../../features/userSlice';
import { userLogin } from '../../api/userApi';

export const SignInFrom = ({
  className,
  OnClickModalClose,
  showSignUpModal,
  ...restProps
}) => {
  const SignInFromClasses = CN(
    'sign-in-from w-full h-4/6 flex justify-center items-center',
    className,
    {}
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

  const dispatch = useDispatch();

  const { isLoading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [forgetPasswordShow, setForgetPasswordShow] = useState(false);

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
      OnClickModalClose();
    } catch (error) {
      console.log(error);
      errorToast('Login failed.');
      dispatch(loginFail(error.message));
    }
  };

  const ForgetPasswordSubmit = async (e) => {
    if (forgotEmail == '') {
      errorToast('Your email is required.');
      return;
    }
  }

  return (
    <div
      className={SignInFromClasses}
      {...restProps}
      style={{ backgroundColor: '#01a45300' }}
    >
      { forgetPasswordShow && <div className="flex items-center justify-center w-full h-full p-5 sign-up-screen__wrapper">
        <div className="flex flex-col justify-center flex-1 h-full p-10 bg-white border-4 sign-up-screen__left border-G-light">
          <div className="mb-6 text-2xl font-semibold text-center sign-up-screen__left__title text-G-dark">
            Sign-in
          </div>
          <div className="text-xs sign-up-screen__left__form">
            <form action="submit">
              <TextField
                placeholder="Email"
                autoComplete="off"
                className="mb-4"
                alue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                placeholder="Password"
                className="mb-4"
                type={passwordShow ? 'text' : 'password'}
                autoComplete="new-password"
                onClickIconAfter={() => {
                  setPasswordShow(!passwordShow);
                }}
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
              {/* <div className="mb-4 text-justify">
                Newsletter subscribers stay up to date with recent projects
                product reviews, interviews with amazing sustainability people
                around the world. new product listings, and of course, the cause
                we are funding right now.
              </div> */}
              <div className="text-center">
                <Button
                  children={!isLoading ? 'Sign in' : ''}
                  className="items-center w-full px-6 py-1 text-sm text-white border-2 h-7 md:h-10 md:py-2 xl:px-8 bg-G-light border-G-light hover:bg-white hover:text-G-dark"
                  onClick={(e) => handleSubmit(e)}
                  isLoading={isLoading}
                />
              </div>
              <div className="mt-4 text-center">
                <span
                  onKeyPress={() => {
                    setForgetPasswordShow(!forgetPasswordShow);
                  }}
                  onClick={() => {
                    setForgetPasswordShow(!forgetPasswordShow);
                  }}
                  role="link"
                  tabIndex="0"
                  className="text-sm text-center text-G-dark font-bold hover:bg-white hover:text-G-light"
                >
                  Forgot Password?{' '}
                </span>
              </div>
              <div className="mt-1 text-center">
                <span className="text-xs text-center text-G-dark">
                  If you don't have an account, you can{' '}
                  <span
                    onKeyPress={() => {
                      showSignUpModal();
                    }}
                    onClick={() => {
                      showSignUpModal();
                    }}
                    role="link"
                    tabIndex="0"
                    className="italic font-bold underline"
                  >
                    Sign-up{' '}
                  </span>
                  for free.
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>}
      {!forgetPasswordShow && <div className="flex items-center justify-center w-full h-full p-5 sign-up-screen__wrapper">
        <div className="flex flex-col justify-center flex-1 h-full p-10 bg-white border-4 sign-up-screen__left border-G-light">
          <div className="mb-6 text-2xl font-semibold text-center sign-up-screen__left__title text-G-dark">
            Forgot Password?
          </div>
          <div className="mb-4 text-justify">
            <span className="text-xs">
              Don’t worry. We will send you a password reset link right away.
              Check your mailbox and click on the reset link to get a new
              password.
            </span>
          </div>
          <div className="text-xs sign-up-screen__left__form">
            <form action="submit">
              <TextField
                placeholder="Email"
                autoComplete="off"
                className="mb-4"
                alue={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
              <div className="text-center">
                <Button
                  children={!isLoading ? 'Send Password Reset Link' : ''}
                  className="items-center w-full px-6 py-1 text-sm text-white border-2 h-7 md:h-10 md:py-2 xl:px-8 bg-G-light border-G-light hover:bg-white hover:text-G-dark"
                  onClick={(e) => ForgetPasswordSubmit(e)}
                  isLoading={isLoading}
                />
              </div>
              <div className="mt-4 text-center">
                <span
                  onKeyPress={() => {
                    setForgetPasswordShow(!forgetPasswordShow);
                  }}
                  onClick={() => {
                    setForgetPasswordShow(!forgetPasswordShow);
                  }}
                  role="link"
                  tabIndex="0"
                  className="text-sm text-center text-G-dark font-bold hover:bg-white hover:text-G-light"
                >
                  Back to Login{' '}
                </span>
              </div>
              <div className="mt-1 text-center">
                <span className="text-xs text-center text-G-dark">
                  If you don't have an account, you can{' '}
                  <span
                    onKeyPress={() => {
                      showSignUpModal();
                    }}
                    onClick={() => {
                      showSignUpModal();
                    }}
                    role="link"
                    tabIndex="0"
                    className="italic font-bold underline"
                  >
                    Sign-up{' '}
                  </span>
                  for free.
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>}
    </div>
  );
};

SignInFrom.defaultProps = {
  className: undefined,
};

export default SignInFrom;
