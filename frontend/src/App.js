import React from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Users from './pages/Users'
import Navbar from './components/Navbar';
import Instruction from './components/Instruction'
import Topic from './pages/Topic';
import RestorePasswordInput from './pages/RestorePasswordInput';
import RestorePassword from './pages/RestorePassword';
import GoogleAuthPoint from './pages/GoogleAuthPoint'

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
            <Route path="/restorePassword" element={ <RestorePasswordInput /> } />
            <Route path="/restorePassword/:email/:restoreLink" element={ <RestorePassword /> } />
            <Route path="/retrieveGoogleAuthToken" element={ <GoogleAuthPoint /> } />
      </Routes>
      <Instruction />
    </div>
  );
}

export default App;
