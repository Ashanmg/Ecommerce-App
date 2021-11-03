import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { HomeScreen } from './screens/HomeScreen';
import ContactInfo from './screens/ContactInfo/ContactInfo';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import { useState } from 'react';

import ProductUploadScreen from './screens/ProductUploadScreen/ProductUploadScreen';

import NavBar from './components/NavBar/NavBar';
import LoginNavBar from './components/LoginNavBar/LoginNavBar';
import Footer from './components/Footer/Footer';
import { Modal } from './components/Modal/Modal';

import './App.css';

function App() {
  const [showModal, setshowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleToggle = () => {
    setshowModal(!showModal);
  };

  return (
    <Router>
      <div className="h-screen font-sans App">
        <header>
          {!isLogin ? <NavBar handleToggle={handleToggle} /> : <LoginNavBar />}
        </header>
        <main className="container max-w-screen-xl">
          {/* <Riban /> */}
          <Switch>
            <Route path="/product-upload">
              <ProductUploadScreen />
            </Route>
            <Route path="/contact-info">
              <ContactInfo />
            </Route>
            <Route path="/">
              <HomeScreen />
            </Route>
          </Switch>
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
