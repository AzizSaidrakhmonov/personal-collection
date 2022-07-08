import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './cabinet.scss';

const Cabinet = () => {
    const { oneUser } = useContext(UserContext);

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
                    <Link
                        to='/personalCabinet/createTags'
                        className={`${oneUser.role === 'ROLE_ADMIN' ? 'admin' : 'user'}`}
                    >
                        <button className='btn btn-success mx-5 cabinet-btn__create-tags'>Tags</button>
                    </Link>
                    <Link
                        to='/personalCabinet/createTopics'
                        className={`${oneUser.role === 'ROLE_ADMIN' ? 'admin' : 'user'}`}
                    >
                        <button className='btn btn-success cabinet-btn__create-topics'>Topics</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cabinet;
