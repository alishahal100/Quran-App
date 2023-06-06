
import './App.css';
import Home from './Components/Home/Home';
import {BrowserRouter as Router , Route,Routes} from 'react-router-dom'
import Surah from './Components/Home/surah/Surah';
import Pages from './Components/Surahpages/Pages';
import Login from './Components/Login/Login';
import Signup from './Components/Login/Signup';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/surah' element={<Surah/>} />
          <Route path='/pages' element={<Pages/>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/Signup' element={<Signup/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
