import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminMoviesPage from './pages/AdminMoviesPage';
import Homepage from './pages/Homepage';
import Privacy from './pages/Privacy';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='adminmovies' element={<AdminMoviesPage />} />
          <Route path='/home' element={<Homepage />} />
          <Route path='/Privacy' element={<Privacy />} />
          <Route path='/' element={<Homepage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
