import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { HomeScreen } from './screens/HomeScreen';
import ContactInfo from './screens/ContactInfo/ContactInfo';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import FundRaiseScreen from './screens/FundRaiseScreen/FundRaiseScreen';

import ProductUploadScreen from './screens/ProductUploadScreen/ProductUploadScreen';

import NavBar from './components/NavBar/NavBar';
import LoginNavBar from './components/LoginNavBar/LoginNavBar';
import Footer from './components/Footer/Footer';
import { Modal } from './components/Modal/Modal';
import SignInFrom from './components/SignInFrom/SignInFrom';
import ProductScreen from './screens/ProductScreen/ProductScreen';

import './App.css';

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    <Router>
      <div className="h-screen font-sans App">
        <LoadingBar
          color="#01A453"
          progress={progressed}
          onLoaderFinished={() => setProgressed(0)}
        />
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
        <main className="container max-w-screen-xl">
          {/* <Riban /> */}
          <Routes>
            <Route
              path="/product/:id"
              element={isAuthenticated ? <ProductScreen /> : <HomeScreen />}
            />
            <Route
              path="/product-upload"
              element={<ProductUploadScreen />}
            ></Route>
            <Route path="/contact-info" element={<ContactInfo />}></Route>
            <Route
              path="/"
              element={<HomeScreen isAuthenticated={isAuthenticated} />}
            ></Route>
          </Routes>
        </main>
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
      {/* <Switch>
        <Route path="/signup">
          <SignUpScreen />
        </Route>
      </Switch> */}
      <ToastContainer autoClose={5000} />
    </Router>
  );
}

export default App;
