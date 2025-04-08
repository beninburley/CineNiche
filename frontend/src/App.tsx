import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminMoviesPage from './pages/AdminMoviesPage';
import Homepage from './pages/Homepage';
import MovieDetailPage from './pages/MovieDetailPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='adminmovies' element={<AdminMoviesPage />} />
          <Route path='/home' element={<Homepage />} />
          <Route path='/' element={<Homepage />} />
          <Route path='/movie/:id' element={<MovieDetailPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
