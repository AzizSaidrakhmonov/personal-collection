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
import Collections from './components/collectionItems/CollectionItems';
import Fields from './components/fields/Fields';
import SingleItem from './components/singleItem/SingleItem';
import Language from './components/Language/Language';

const App = () => {
    return (
        <div className='app'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}>
                        <Route path='/' element={<TopCollections />} />
                        <Route path='/allCollections' element={<AllCollections />} />
                        <Route path='/allCollections/items' element={<Collections />} />
                        <Route path='/allCollections/items/item' element={<SingleItem/>}/>
                        <Route path='/fields' element={<Fields />} />
                        <Route path='/allUsers' element={<Users />} />
                        <Route path='/tags' element={<Tags />} />
                        <Route path='/personalCabinet' element={<Cabinet />} />
                        <Route path='/personalCabinet/createCollections' element={<CabinetCreateCollections />} />
                        <Route path='/personalCabinet/createTags' element={<CabinetCreateTags />} />
                        <Route path='/personalCabinet/createTopics' element={<CabinetCreateTopics />} />
                        <Route path='/language' element={<Language/>}/>
                    </Route>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
