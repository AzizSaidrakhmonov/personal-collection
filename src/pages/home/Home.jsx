import React, {useEffect, useState} from 'react';
import './home.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import TopCollections from '../../components/topCollections/TopCollections';
import { useParams } from 'react-router';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from '../../components/users/Users';

const Home = () => {
    const [users, setUsers] = useState([]);
    const {accessToken} = useParams();
    // const navigate = useNavigate();

    const getAllUsers = async() => {
        try {
            const res = await axios.get('http://itransitionlasttask.herokuapp.com/api/admin/get_all_users', {
                    headers: {
                        accessToken: `${accessToken}`
                    }
                })
                
            setUsers(res.data.users);
            console.log(res.data);
            
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getAllUsers();
    }, [])

    return (
        <div className='home'>
            <Sidebar />
            <div className="home-container">
                <Navbar />
                <div className="home-collections">
                    <TopCollections/>
                </div>
            </div>
                {/* <Routes>
                    <UserContext.Provider value={users}>
                        <Route path='/user' element={<Users/>}/>
                    </UserContext.Provider>
                </Routes> */}
        </div>
    );
};

export default Home;