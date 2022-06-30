import React, { useEffect, useState } from 'react';
import './home.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Outlet } from 'react-router';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

const Home = () => {

    const [users, setUsers] = useState([]);
    const [oneUser, setOneUser] = useState([]);

    const accessToken = localStorage.getItem('accessToken');
    const userEmail = localStorage.getItem('email');

    const getOneUser = async () => {

        try {
            const res2 = await axios.get(`http://itransitionlasttask.herokuapp.com/api/user/get/${userEmail}`, {
                headers: {
                    accessToken: `${accessToken}`,
                },
            })

            setOneUser(res2.data);
            console.log(res2.data);

        } catch(err) {
            console.log(err);
        }
    }

    const getAllUsers = async () => {

        try {
            const res = await axios.get('http://itransitionlasttask.herokuapp.com/api/admin/get_all_users', {
                headers: {
                    accessToken: `${accessToken}`,
                },
            });

            setUsers(res.data.data);
            console.log(res.data.data)

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllUsers();
        getOneUser();
    }, []);

    return (
        <div className='home'>
            <Sidebar />
            <div className='home-container'>
                <Navbar />
                <div className='home-collections'>
                    <UserContext.Provider value={users}>
                        <Outlet />
                    </UserContext.Provider>
                </div>
            </div>
        </div>
    );
};

export default Home;
