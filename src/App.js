import React from 'react';
import Home from './pages/home/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import List from './pages/usersPage/UsersPage';
import CabinetPage from './pages/cabinetPage/CabinetPage';
import CollectionsPage from './pages/collectionsPage/CollectionsPage';
import SinglePage from './pages/singlePage/singlePage';
import LanguagePage from './pages/languagePage/LanguagePage';
import ThemePage from './pages/themePage/ThemePage';
import CabinetPage2 from './pages/cabinetPage2/CabinetPage2';

const App = () => {

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/:accessToken' element={<Home />} />
          <Route path='/collections' element={<CollectionsPage />}/>
          <Route path='/allUsers' element={<List />} />
          <Route path='/cabinetPage' element={<CabinetPage/>}/>
          <Route path='/cabinetPage2' element={<CabinetPage2/>}/>
          <Route path='/language' element={<LanguagePage />} />
          <Route path='/theme' element={<ThemePage/>}/>
          <Route path=':userId' element={<SinglePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
};

export default App;