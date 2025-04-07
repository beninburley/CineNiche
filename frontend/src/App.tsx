import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminMoviesPage from './completedPagesJD/AdminMoviesPage';
import Homepage from './HomepageComplete/Homepage';
import { useState } from 'react';
      
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='adminmovies' element={<AdminMoviesPage />} />
          <Route path='/home' element={<Homepage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
