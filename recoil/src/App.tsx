import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Async from './pages/async';
import Main from './pages/main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/async' element={<Async />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
