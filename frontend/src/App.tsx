import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminMoviesPage from './pages/AdminMoviesPage';
import Homepage from './Homepage/Homepage';
import LandingPage from './LandingPage/LandingPage';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import MovieDetailPage from './pages/MovieDetailPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Unauthorized from './pages/Unauthorized';
import SearchPage from './SearchPage/SearchPage';
import AuthorizeView from './components/AuthorizeView';
import CookieAsk from './LandingPage/CookieAsk'; // ✅ import it

function App() {
  return (
    <>
      <Router>
        <CookieAsk /> {/* ✅ shows on all pages */}
        <Routes>
          <Route path='adminmovies' element={<AdminMoviesPage />} />
          <Route
            path='/home'
            element={
              <AuthorizeView>
                <Homepage />
              </AuthorizeView>
            }
          />
          <Route path='/' element={<LandingPage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/movie/:id'
            element={
              <AuthorizeView>
                <MovieDetailPage />
              </AuthorizeView>
            }
          />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='/search' element={<SearchPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
