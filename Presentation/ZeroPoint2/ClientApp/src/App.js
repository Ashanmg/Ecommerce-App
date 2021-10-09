import { HomeScreen } from './screens/HomeScreen';

import NavBar from './components/NavBar/NavBar';
import Riban from './components/Riban/Riban';
import Footer from './components/Footer/Footer';

import './App.css';



function App() {
  return (
    <div className="App font-sans">
      <NavBar />
      <div className="max-w-screen-xl container">
        <Riban />
        <HomeScreen />
      </div>
      <Footer />
    </div>
  );
}

export default App;
