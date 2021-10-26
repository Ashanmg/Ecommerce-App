import React from 'react';
import CN from 'classnames';
import { Link, useHistory } from 'react-router-dom';
import { RiInformationLine } from 'react-icons/ri';

import zeroLogo from '../../assets/zeroLogo.png';

import TextField from '../../components/TextField/TextField';
import CheckBox from '../../components/CheckBox/CheckBox';
import Button from '../../components/Button/Button';

import './SignUpScreen.scss';

export const SignUpScreen = ({ className, ...restProps }) => {
  const SignUpScreenClasses = CN(
    'sign-up-screen w-full h-4/6 flex justify-center items-center',
    className,
    {}
  );

  const history = useHistory();

  const handleOnClick = () => {
    history.push('/');
  };

  return (
    <div
      className={SignUpScreenClasses}
      {...restProps}
      style={{ backgroundColor: '#01a45300' }}
    >
      <div className="sign-up-screen__wrapper flex justify-center items-center w-full h-full p-5">
        <div className="sign-up-screen__left flex-1 bg-white p-10 border-G-light border-4 h-full flex flex-col justify-center">
          <div className="sign-up-screen__left__title text-G-dark text-2xl font-semibold text-center mb-8">
            Create Account
          </div>
          <div className="sign-up-screen__left__form text-xs">
            <form action="submit">
              <TextField placeholder="Name" className="mb-4" />
              <TextField placeholder="Email" className="mb-4" />
              <TextField placeholder="Password" className="mb-4" type='password' />
              <CheckBox title="Please subscribe me to the monthly newsletter." />
              <div className="mb-4 text-justify">
                Newsletter subscribers stay up to date with recent projects
                product reviews, interviews with amazing sustainability people
                around the world. new product listings, and of course, the cause
                we are funding right now.
              </div>
              <CheckBox title="Maybe later." className="mb-4" />
              <div className="text-center">
                <Button
                  children="Sign Up"
                  className="h-7 w-full md:h-10 py-1 md:py-2 px-6 xl:px-8 items-center bg-G-light text-sm border-2 border-G-light hover:bg-white text-white hover:text-G-dark"
                />
              </div>
            </form>
          </div>
        </div>
        {/* <div className="sign-up-screen__right flex-1 flex flex-col items-center justify-center h-full  p-10">
          <div className="logo flex-initial flex flex-col items-center mb-8">
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
          <div className="flex flex-row h-7 md:h-10 items-center text-center italic text-G-dark text-md md:text-base xl:text-lg font-medium mb-8">
            Your one-stop shop for giving - 20% of every sale donated to the
            charity of your choice.&nbsp;{' '}
            <RiInformationLine className="hidden lg:flex" />
          </div>
          <div className="text-center">
            <Button
              children="Sign In"
              className="h-7 w-full md:h-10 py-1 md:py-2 px-6 xl:px-8 items-center bg-white hover:bg-G-light border-G-light hover:border-white border-2 hover:border-2 text-sm text-G-dark hover:text-white font-medium"
              onClick={handleOnClick}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

SignUpScreen.defaultProps = {
  className: undefined,
};

export default SignUpScreen;
