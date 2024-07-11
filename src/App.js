import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Audio from './Components/Audio';
import LandingPage from './Components/LandingPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path='/audio' element={<Audio />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
