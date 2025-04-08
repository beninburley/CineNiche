import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminMoviesPage from './pages/AdminMoviesPage';
import Homepage from './pages/Homepage';
import MovieDetailPage from './pages/MovieDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='adminmovies' element={<AdminMoviesPage />} />
          <Route path='/home' element={<Homepage />} />
          <Route path='/' element={<Homepage />} />
          <Route path='/movie/:id' element={<MovieDetailPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
