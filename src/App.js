import React from 'react';
import Login from './components/login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/register/Register';
import Main from './components/mainPage/Main';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/mainPage' element={<Main/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;