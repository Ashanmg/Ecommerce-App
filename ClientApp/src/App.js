import { HomeScreen } from './screens/HomeScreen';

import NavBar from './components/NavBar/NavBar';
import Riban from './components/Riban/Riban';

import './App.css';


function App() {
  return (
    <div className="App font-sans">
      <NavBar />
      <div className="max-w-screen-xl container">
        <Riban />
        <HomeScreen />
      </div>
    </div>
  );
}

export default App;
