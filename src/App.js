import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register/register';
import Login from './pages/auth/login';
import Navbar from './pages/panel/navbar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/nav" element={<Navbar/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
