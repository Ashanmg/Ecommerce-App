import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { HomeScreen } from './screens/HomeScreen';
import ContactInfo from './screens/ContactInfo/ContactInfo';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import FundRaiseScreen from './screens/FundRaiseScreen/FundRaiseScreen';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import ProductUploadScreen from './screens/ProductUploadScreen/ProductUploadScreen';

import NavBar from './components/NavBar/NavBar';
import LoginNavBar from './components/LoginNavBar/LoginNavBar';
import Footer from './components/Footer/Footer';
import { Modal } from './components/Modal/Modal';
import LayoutHeader from './components/LayoutHeader/LayoutHeader';
import { ToastContainer } from 'react-toastify';
import { AuthRoute, PrivateRoute } from './routes';
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

  return (
    <Router>
      <div className="h-screen font-sans App">
        <header>
          {!isAuthenticated ? (
            <NavBar
              handleToggle={handleToggle}
              handleFundModal={handleFundModal}
              handleSignIn={handleSignIn}
              handleToggleSignIn={handleToggleSignIn}
            />
          ) : (
            <>
              <LoginNavBar
                handleToggle={handleToggle}
                handleSignIn={handleSignIn}
              />
              <LayoutHeader />
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
        <footer className="flex mt-4">
          <Footer />
        </footer>
      </div>
      <Modal
        isOpen={showSignInModal}
        onClickOverlay={handleToggleSignIn}
        size="sm"
      >
        <SignInFrom OnClickModalClose={handleToggleSignIn} />
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
