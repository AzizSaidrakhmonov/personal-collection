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
    const [topics, setTopics] = useState([]);
    const [tags, setTags] = useState([]);

    const userEmail = localStorage.getItem('email');
    const accessToken = localStorage.getItem('accessToken');

    const getAllUsers = async () => {
        try {
            const res = await axios.get('http://10.10.2.195:8080/api/user/get_all_users', {
                headers: {
                    accessToken: `${accessToken}`,
                },
            });

            setUsers(res.data.data);
            // console.log(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const getOneUser = async () => {
        try {
            const res2 = await axios.get(`http://10.10.2.195:8080/api/user/get/${userEmail}`, {
                headers: {
                    accessToken: `${accessToken}`,
                },
            });

            setOneUser(res2.data.data);
            // console.log(res2.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getTopics = async () => {
        try {
            const res = await axios.get('http://10.10.2.195:8080/api/topic/get_all', {
                headers: {
                    Authorization: accessToken,
                },
            });

            setTopics(res.data.data);
            // console.log(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const getTags = async () => {
        try {
            const res = await axios.get('http://10.10.2.195:8080/api/tag/get_all', {
                headers: {
                    Authorization: accessToken,
                },
            });

            setTopics(res.data.data);
            console.log(res.data.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getAllUsers();
        getOneUser();
        getTopics();
        getTags()
    }, []);

    return (
        <div className='home'>
            <Sidebar />
            <div className='home-container'>
                <Navbar />
                <div className='home-collections'>
                    <UserContext.Provider value={{ users: users, oneUser: oneUser, topics: topics, tags: tags }}>
                        <Outlet />
                    </UserContext.Provider>
                </div>
            </div>
        </div>
    );
};

export default Home;
