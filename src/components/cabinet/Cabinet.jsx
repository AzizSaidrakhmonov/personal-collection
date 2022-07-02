import React, { useContext } from 'react';
import './cabinet.scss';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Cabinet = () => {
    const { oneUser } = useContext(UserContext);

    // console.log(oneUser);

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
                    <Link to='/personalCabinet/createTags'>
                        <button className='btn btn-success mx-5'>Tags</button>
                    </Link>
                    <Link to='/personalCabinet/createTopics'>
                        <button className='btn btn-success'>Topics</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cabinet;
