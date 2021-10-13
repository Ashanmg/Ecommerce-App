import { HomeScreen } from './screens/HomeScreen';
import ContactInfo from './screens/ContactInfo/ContactInfo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Riban from './components/Riban/Riban';
import Footer from './components/Footer/Footer';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App font-sans h-screen">
        <header>
          <NavBar />
        </header>
        <main className="max-w-screen-xl container">
          {/* <Riban /> */}
          <Switch>
            <Route path="/contact-info">
              <ContactInfo />
            </Route>
            <Route path="/">
              <HomeScreen />
            </Route>
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
