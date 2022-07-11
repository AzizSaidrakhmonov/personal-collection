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
    const [ownCollections, setOwnCollections] = useState([]);
    const [comments, setComments] = useState([]);
    const [topCollections, setTopCollections] = useState([]);

    const userEmail = localStorage.getItem('email');
    const accessToken = localStorage.getItem('accessToken');
    const collectionId = localStorage.getItem('id');
    const itemId = localStorage.getItem('itemId');

    const getAllUsers = async () => {
        try {
            const res = await axios.get('http://ec2-54-167-37-126.compute-1.amazonaws.com:8081/api/user/get_all_users', {
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
            const res2 = await axios.get(`http://ec2-54-167-37-126.compute-1.amazonaws.com:8081/api/user/get/${userEmail}`, {
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
            const res = await axios.get('http://ec2-54-167-37-126.compute-1.amazonaws.com:8081/api/collection/get_all', {
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
            const res = await axios.get('http://ec2-54-167-37-126.compute-1.amazonaws.com:8081/api/topic/get_all', {
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
            const res = await axios.get('http://ec2-54-167-37-126.compute-1.amazonaws.com:8081/api/tag/get_all', {
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
        if(oneUser.length > 0){
            setOneUser(oneUser.id)
        }
    }, [oneUser])
    
    useEffect(() => {
        if (oneUserId !== undefined) {
            getFields();
            getOwnCollections();
            getSingleItem();
        }
    },[oneUserId]);
    
    const getFields = async () => {
        try {
            const res = await axios.get(`http://ec2-54-167-37-126.compute-1.amazonaws.com:8081/api/field/get_all/${oneUser.id}/${collectionId}`, {
                headers: {
                    Authorization: accessToken,
                },
            });
            
            setFields(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };
    
    const getOwnCollections = async () => {
        try {
            const res = await axios.get(`http://ec2-54-167-37-126.compute-1.amazonaws.com:8081/api/collection/get/${oneUser.id}`, {
                headers: {
                    Authorization: accessToken,
                },
            });
            setOwnCollections(res.data.data);
            console.log(res.data.data)
        } catch (err) {
            console.log(err);
        }
    };

    const getItems = async () => {
        try{
            const res = await axios.get(`http://ec2-54-167-37-126.compute-1.amazonaws.com:8081/api/item/get_all/${collectionId}`, {
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
            const res = await axios.get(`http://ec2-54-167-37-126.compute-1.amazonaws.com:8081/api/item/get/${oneUser.id}/${collectionId}/${itemId}`, {
                headers: {
                    Authorization: accessToken
                }
            })

            setSingleItem(res.data.data);
            // setIsLike(res.data.data)

        } catch (err) {
            console.log(err)
        }
    }

    const getComments = async() => {
        try {
            const res = await axios.get(`http://ec2-54-167-37-126.compute-1.amazonaws.com:8081/api/comment/get/${itemId}`)
            setComments(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getTopCollections = async() => {
        try {
            const res = await axios.get(`http://ec2-54-167-37-126.compute-1.amazonaws.com:8081/api/user/get_main_page`)
            setTopCollections(res.data.data)
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
        getOwnCollections();
        getComments();
        getTopCollections();
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
                            getAllUsers: getAllUsers,
                            oneUser: oneUser,
                            getOneUser: getOneUser,
                            allCollections: allCollections,
                            getAllCollections: getAllCollections,
                            topics: topics,
                            getTopics: getTopics,
                            tags: tags,
                            getTags: getTags,
                            fields: fields,
                            getFields: getFields,
                            items: items,
                            getItems: getItems,
                            singleItem: singleItem,
                            getSingleItem: getSingleItem,
                            ownCollections: ownCollections,
                            getOwnCollections: getOwnCollections,
                            comments: comments,
                            getComments: getComments,
                            topCollections: topCollections,
                            getTopCollections: getTopCollections,
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
