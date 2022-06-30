import React, { useEffect, useState } from 'react';
import './cabinet.scss';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cabinet = () => {
    const [oneUser, setOneUser] = useState([]);

    const accessToken = localStorage.getItem('accessToken');
    const userEmail = localStorage.getItem('email');

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

    console.log(oneUser)

    useEffect(() => {
        getOneUser();
    }, []);

    return (
        <div className='cabinet'>
            <div className='cabinet-container'>
                <div className='user-information'>
                    <div className='top'>
                        <h1 className='title'>User Information</h1>
                    </div>
                    <div className='item'>
                        <div className='item-wrapper'>
                            <span className='item-wrapper__inner'>Name:</span>
                            <span className='name'>{oneUser.name}</span>
                        </div>
                        <div className='item-wrapper'>
                            <span className='item-wrapper__inner'>Email:</span>
                            <span className='email'>{oneUser.email}</span>
                        </div>
                        <div className='item-wrapper'>
                            <span className='item-wrapper__inner'>Role:</span>
                            <span className='id'>{oneUser.role}</span>
                        </div>
                        <div className='item-wrapper'>
                            <span className='item-wrapper__inner'>Status:</span>
                            <span className='id'>{oneUser.state}</span>
                        </div>
                    </div>
                </div>
                <div className='cabinet-btn'>
                    <Link to='/personalCabinet/createCollections'>
                        <button className='btn btn-success'>My Collections</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cabinet;
