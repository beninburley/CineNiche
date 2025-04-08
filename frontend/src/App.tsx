import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminMoviesPage from './pages/AdminMoviesPage';
import Homepage from './Homepage/Homepage';
import LandingPage from './LandingPage/LandingPage';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='adminmovies' element={<AdminMoviesPage />} />
          <Route path='/home' element={<Homepage />} />
          <Route path='/' element={<LandingPage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
