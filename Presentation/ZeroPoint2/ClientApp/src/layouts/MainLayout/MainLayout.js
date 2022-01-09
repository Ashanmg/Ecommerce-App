import React, { useCallback, useEffect, useState } from 'react';
import CN from 'classnames';
import { useSelector } from 'react-redux';

import NavBar from '../../components/NavBar/NavBar';
import LoginNavBar from '../../components/LoginNavBar/LoginNavBar';
import Footer from '../../components/Footer/Footer';
import { Modal } from '../../components/Modal/Modal';
import SignInFrom from '../../components/SignInFrom/SignInFrom';
import SignUpScreen from '../../screens/SignUpScreen/SignUpScreen';
import FundRaiseScreen from '../../screens/FundRaiseScreen/FundRaiseScreen';

import './MainLayout.scss';

export const MainLayout = ({
  hasSidebar,
  hasSubHeading,
  children,
  ...restProps
}) => {
  const [userData, setUserData] = useState(null);

  const [showSignUpModal, setshowSingUpModal] = useState(false);
  const [showSignInModal, setshowSignInModal] = useState(false);
  const [showFundModal, setshowFundModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [progressed, setProgressed] = useState(0);

  const { isAuthenticated } = useSelector((state) => state.user);

  const handleToggle = () => {
    setshowSingUpModal(!showSignUpModal);
  };

  const handleToggleSignIn = () => {
    setshowSignInModal(!showSignInModal);
  };

  const handleFundModal = () => {
    setshowFundModal(!showFundModal);
  };

  const handleSignup = (data) => {
    setUserData(data);
    setIsAuthenticated(true);
  };

  const handleLogout = (data) => {
    setUserData(null);
    setIsAuthenticated(false);
  };

  const handleSignIn = () => {
    setIsLogin(!isLogin);
  };

  const [y, setY] = useState(window.scrollY);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleNavigation = useCallback(
    (e) => {
      const window = e.currentTarget;

      if (y > window.scrollY) {
        setIsScrolling(true);
        if (window.scrollY === 0) {
          setIsScrolling(false);
        }
      } else if (y < window.scrollY) {
        setIsScrolling(true);
        if (window.scrollY === 0) {
          setIsScrolling(false);
        }
      }
      setY(window.scrollY);
    },
    [y]
  );

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener('scroll', handleNavigation);

    return () => {
      window.removeEventListener('scroll', handleNavigation);
    };
  }, [handleNavigation]);

  return (
    <>
      <div className="App">
        <header>
          {!isAuthenticated ? (
            <NavBar
              handleToggle={handleToggle}
              handleFundModal={handleFundModal}
              handleSignIn={handleSignIn}
              handleToggleSignIn={handleToggleSignIn}
              setProgressed={setProgressed}
              progressed={progressed}
              isScrolling={isScrolling}
            />
          ) : (
            <>
              <LoginNavBar
                handleToggle={handleToggle}
                handleSignIn={handleSignIn}
                isScrolling={isScrolling}
              />
            </>
          )}
        </header>
        <div className="main-layout__container flex">
          <main className="container max-w-screen-xl">{children}</main>
        </div>
        <footer className="flex mt-4 mb-4">
          <Footer isScrolling={isScrolling} />
        </footer>
      </div>
      <Modal
        isOpen={showSignInModal}
        onClickOverlay={handleToggleSignIn}
        size="sm"
      >
        <SignInFrom
          OnClickModalClose={handleToggleSignIn}
          showSignUpModal={handleToggle}
        />
      </Modal>
      <Modal isOpen={showSignUpModal} onClickOverlay={handleToggle} size="sm">
        <SignUpScreen OnClickModalClose={handleToggle} />
      </Modal>
      <Modal isOpen={showFundModal} onClickOverlay={handleFundModal} size="sm">
        <FundRaiseScreen />
      </Modal>
    </>
  );
};

MainLayout.defaultProps = {
  className: undefined,
};

export default MainLayout;
