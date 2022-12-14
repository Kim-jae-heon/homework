import {Route, Routes} from 'react-router-dom';
import Dashboard from './components/Dashboard.js';
import Login from './components/Login.js';
import Navbar from './components/Navbar.js';
import Register from './components/Register.js';

function App() {
  return(
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={[<Navbar />,<Dashboard />]} />
      </Routes>
  );
}

export default App;
