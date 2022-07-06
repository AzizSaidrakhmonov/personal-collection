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
    const [allCollections, setAllCollections] = useState([]);

    const userEmail = localStorage.getItem('email');
    const accessToken = localStorage.getItem('accessToken');

    const getAllUsers = async () => {
        try {
            const res = await axios.get('http://itransitionlasttask.herokuapp.com/api/user/get_all_users', {
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
            const res2 = await axios.get(`http://itransitionlasttask.herokuapp.com/api/user/get/${userEmail}`, {
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

    const getAllCollections = async () => {
        try{
            const res = await axios.get('http://itransitionlasttask.herokuapp.com/api/collection/get_all', {
                headers: {
                    accessToken: `${accessToken}`
                }
            });
            setAllCollections(res.data.data);
            console.log(res.data.data)
        }catch(err){
            console.log(err)
        }
    };

    const getTopics = async () => {
        try {
            const res = await axios.get('http://itransitionlasttask.herokuapp.com/api/topic/get_all', {
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
            const res = await axios.get('http://itransitionlasttask.herokuapp.com/api/topic/tag/get_all', {
                headers: {
                    Authorization: accessToken,
                },
            });

            setTags(res.data.data);
            // console.log(res.data.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getAllUsers();
        getOneUser();
        getAllCollections();
        getTopics();
        getTags()
    }, []);

    return (
        <div className='home'>
            <Sidebar />
            <div className='home-container'>
                <Navbar />
                <div className='home-collections'>
                    <UserContext.Provider value={{ users: users, oneUser: oneUser, allCollections: allCollections, topics: topics, tags: tags }}>
                        <Outlet />
                    </UserContext.Provider>
                </div>
            </div>
        </div>
    );
};

export default Home;
