import React from 'react';
import CN from 'classnames';
import { Link } from 'react-router-dom';
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

  // const history = useHistory();

  // const handleOnClick = () => {
  //   history.push('/');
  // };

  return (
    <div
      className={SignUpScreenClasses}
      {...restProps}
      style={{ backgroundColor: '#01a45300' }}
    >
      <div className="flex items-center justify-center w-full h-full p-5 sign-up-screen__wrapper">
        <div className="flex flex-col justify-center flex-1 h-full p-10 bg-white border-4 sign-up-screen__left border-G-light">
          <div className="mb-8 text-2xl font-semibold text-center sign-up-screen__left__title text-G-dark">
            Create Account
          </div>
          <div className="text-xs sign-up-screen__left__form">
            <form action="submit">
              <TextField placeholder="Name" className="mb-4" />
              <TextField placeholder="Email" autocomplete='off' className="mb-4" />
              <TextField
                placeholder="Password"
                className="mb-4"
                type="password"
                autocomplete='new-password'
              />
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
                  className="items-center w-full px-6 py-1 text-sm text-white border-2 h-7 md:h-10 md:py-2 xl:px-8 bg-G-light border-G-light hover:bg-white hover:text-G-dark"
                />
              </div>
            </form>
          </div>
        </div>
        {/* <div className="flex flex-col items-center justify-center flex-1 h-full p-10 sign-up-screen__right">
          <div className="flex flex-col items-center flex-initial mb-8 logo">
            <Link to="/" className="flex justify-center">
              <img
                src={zeroLogo}
                alt="Logo"
                className="object-cover w-1/2 h-auto mb-1 lg:h-10 lg:w-auto"
              />
            </Link>
            <div className="text-xs italic font-semibold logo_description text-G-dark">
              Environmentally conscious gifts
            </div>
          </div>
          <div className="flex flex-row items-center mb-8 italic font-medium text-center h-7 md:h-10 text-G-dark text-md md:text-base xl:text-lg">
            Your one-stop shop for giving - 20% of every sale donated to the
            charity of your choice.&nbsp;{' '}
            <RiInformationLine className="hidden lg:flex" />
          </div>
          <div className="text-center">
            <Button
              children="Sign In"
              className="items-center w-full px-6 py-1 text-sm font-medium bg-white border-2 h-7 md:h-10 md:py-2 xl:px-8 hover:bg-G-light border-G-light hover:border-white hover:border-2 text-G-dark hover:text-white"
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
