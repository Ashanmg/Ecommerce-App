import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { HomeScreen } from './screens/HomeScreen';
import ContactInfo from './screens/ContactInfo/ContactInfo';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import { useState } from 'react';

import ProductUploadScreen from './screens/ProductUploadScreen/ProductUploadScreen';

import NavBar from './components/NavBar/NavBar';
import LoginNavBar from './components/LoginNavBar/LoginNavBar';
import Footer from './components/Footer/Footer';
import { Modal } from './components/Modal/Modal';
import { AuthRoute, PrivateRoute } from './routes';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  const [showModal, setshowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleToggle = () => {
    setshowModal(!showModal);
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
          {!isLogin ? (
            <NavBar handleToggle={handleToggle} handleSignIn={handleSignIn} />
          ) : (
            <LoginNavBar
              handleToggle={handleToggle}
              handleSignIn={handleSignIn}
            />
          )}
        </header>
        <main className="container max-w-screen-xl">
          {/* <Riban /> */}
          <Routes>
            <Route
              path="/product-upload"
              element={<ProductUploadScreen />}
            ></Route>
            <Route path="/contact-info" element={<ContactInfo />}></Route>
            <Route path="/" element={<HomeScreen />}></Route>
          </Routes>
        </main>
        <footer className="flex">
          <Footer />
        </footer>
      </div>
      <Modal isOpen={showModal} onClickOverlay={handleToggle} size="sm">
        <SignUpScreen />
      </Modal>
      {/* <Switch>
        <Route path="/signup">
          <SignUpScreen />
        </Route>
      </Switch> */}
    </Router>
  );
}

export default App;
