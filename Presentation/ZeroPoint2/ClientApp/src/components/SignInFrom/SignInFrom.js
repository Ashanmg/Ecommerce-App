import React, { useState } from 'react';
import CN from 'classnames';
import { Link } from 'react-router-dom';

import TextField from '../TextField/TextField';
import CheckBox from '../CheckBox/CheckBox';
import Button from '../Button/Button';

import './SignInFrom.scss';

export const SignInFrom = ({ className, ...restProps }) => {
  const SignInFromClasses = CN(
    'sign-in-from w-full h-4/6 flex justify-center items-center',
    className,
    {}
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      className={SignInFromClasses}
      {...restProps}
      style={{ backgroundColor: '#01a45300' }}
    >
      <div className="flex items-center justify-center w-full h-full p-5 sign-up-screen__wrapper">
        <div className="flex flex-col justify-center flex-1 h-full p-10 bg-white border-4 sign-up-screen__left border-G-light">
          <div className="mb-6 text-2xl font-semibold text-center sign-up-screen__left__title text-G-dark">
            Sign-In
          </div>
          <div className="text-xs sign-up-screen__left__form">
            <form action="submit">
              <span className="mb-4 font-bold text-G-dark">Email</span>
              <TextField
                placeholder="Email"
                autoComplete="off"
                className="mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="mb-4 font-bold text-G-dark">Password</span>
              <TextField
                placeholder="Password"
                className="mb-4"
                type="password"
                autoComplete="new-password"
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
                  children={!isLoading ? 'Sign-in' : ''}
                  className="items-center w-full px-6 py-1 text-sm text-white border-2 h-7 md:h-10 md:py-2 xl:px-8 bg-G-light border-G-light hover:bg-white hover:text-G-dark"
                  // onClick={(e) => handleSubmit(e)}
                  isLoading={isLoading}
                />
              </div>
              <div className="mt-1 text-center">
                <span className="text-xs text-center text-G-dark">
                  If you don't have an account, you can{' '}
                  <Link to="/" className="italic font-bold underline">
                    Sign-up{' '}
                  </Link>
                  for free
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

SignInFrom.defaultProps = {
  className: undefined,
};

export default SignInFrom;
