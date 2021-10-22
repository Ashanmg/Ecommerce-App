import { HomeScreen } from './screens/HomeScreen';
import ContactInfo from './screens/ContactInfo/ContactInfo';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <SignUpScreen />
        </Route>
        <div className="App font-sans h-screen">
          <Route path="/signup">
            <SignUpScreen />
          </Route>
          <header>
            <NavBar />
          </header>
          <main className="max-w-screen-xl container">
            {/* <Riban /> */}
            <Route path="/contact-info">
              <ContactInfo />
            </Route>
            <Route path="/">
              <HomeScreen />
            </Route>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
