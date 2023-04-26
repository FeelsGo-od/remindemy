import React from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Users from './pages/Users'
import Navbar from './components/Navbar';
import Topic from './pages/Topic';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes className="navbar">
            <Route exact path="/" element={ <Home /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/users" element={ <Users /> } />
            <Route path="/topics/:id" element={ <Topic /> } />
      </Routes>
    </div>
  );
}

export default App;
