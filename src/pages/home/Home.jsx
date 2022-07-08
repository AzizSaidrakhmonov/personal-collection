import React, { useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Outlet } from 'react-router';
import axios from 'axios';
import './home.scss';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [oneUser, setOneUser] = useState([]);
    const [topics, setTopics] = useState([]);
    const [tags, setTags] = useState([]);
    const [allCollections, setAllCollections] = useState([]);
    const [fields, setFields] = useState([]);
    const [items, setItems] = useState([]);
    const [singleItem, setSingleItem] = useState([]);

    const userEmail = localStorage.getItem('email');
    const accessToken = localStorage.getItem('accessToken');
    const collectionId = localStorage.getItem('id');
    const itemId = localStorage.getItem('itemId');

    const getAllUsers = async () => {
        try {
            const res = await axios.get('http://10.10.2.168:8080/api/user/get_all_users', {
                headers: {
                    accessToken: `${accessToken}`,
                },
            });

            setUsers(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const getOneUser = async () => {
        try {
            const res2 = await axios.get(`http://10.10.2.168:8080/api/user/get/${userEmail}`, {
                headers: {
                    accessToken: `${accessToken}`,
                },
            });

            setOneUser(res2.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getAllCollections = async () => {
        try {
            const res = await axios.get('http://10.10.2.168:8080/api/collection/get_all', {
                headers: {
                    accessToken: `${accessToken}`,
                },
            });
            setAllCollections(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getTopics = async () => {
        try {
            const res = await axios.get('http://10.10.2.168:8080/api/topic/get_all', {
                headers: {
                    Authorization: accessToken,
                },
            });

            setTopics(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const getTags = async () => {
        try {
            const res = await axios.get('http://10.10.2.168:8080/api/tag/get_all', {
                headers: {
                    Authorization: accessToken,
                },
            });

            setTags(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    localStorage.setItem('oneUserId', oneUser.id);
    const oneUserId = localStorage.getItem('oneUserId');

    useEffect(() => {
        if (oneUserId !== undefined) {
            getFields();
        }
    }, [oneUserId]);

    const getFields = async () => {
        try {
            const res = await axios.get(`http://10.10.2.168:8080/api/field/get_all/${oneUserId}/${collectionId}`, {
                headers: {
                    Authorization: accessToken,
                },
            });

            setFields(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getItems = async () => {
        try{
            const res = await axios.get(`http://10.10.2.168:8080/api/item/get_all/${collectionId}`, {
                headers: {
                    Authorization: accessToken,
                }
            })

            setItems(res.data.data)
        }
        catch(err){
            console.log(err);
        }
    }

    const getSingleItem = async () => {
        try {
            const res = await axios.get(`http://10.10.2.168:8080/api/item/get/${collectionId}/${itemId}`, {
                headers: {
                    Authorization: accessToken
                }
            })

            setSingleItem(res.data.data);

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getOneUser();
        getAllUsers();
        getAllCollections();
        getTopics();
        getTags();
        getFields();
        getItems();
        getSingleItem();
    }, []);

    return (
        <div className='home'>
            <Sidebar />
            <div className='home-container'>
                <Navbar />
                <div className='home-collections'>
                    <UserContext.Provider
                        value={{
                            users: users,
                            oneUser: oneUser,
                            allCollections: allCollections,
                            topics: topics,
                            tags: tags,
                            fields: fields,
                            items: items,
                            singleItem: singleItem,
                        }}
                    >
                        <Outlet />
                    </UserContext.Provider>
                </div>
            </div>
        </div>
    );
};

export default Home;
