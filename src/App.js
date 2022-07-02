import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Users from './components/users/Users';
import Cabinet from './components/cabinet/Cabinet';
import TopCollections from './components/topCollections/TopCollections';
import AllCollections from './components/allCollections/AllCollections';
import CabinetCreateCollections from './components/CabinetCreateCollections/CabinetCreateCollections';
import CabinetCreateTags from './components/CabinetCreateTags/CabinetCreateTags';
import CabinetCreateTopics from './components/CabinetCreateTopics/CabinetCreateTopics';
import Tags from './components/tags/Tags';


const App = () => {
    return (
        <div className='app'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}>
                        <Route path='/' element={<TopCollections />} />
                        <Route path='/allCollections' element={<AllCollections/>}/>
                        <Route path='/allUsers' element={<Users />} />
                        <Route path='/tags' element={<Tags />} />
                        <Route path='/personalCabinet' element={<Cabinet/>}/>
                        <Route path='/personalCabinet/createCollections' element={<CabinetCreateCollections/>}/>
                        <Route path='/personalCabinet/createTags' element={<CabinetCreateTags/>}/>
                        <Route path='/personalCabinet/createTopics' element={<CabinetCreateTopics/>}/>
                    </Route>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
