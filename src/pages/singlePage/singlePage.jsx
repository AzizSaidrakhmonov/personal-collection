import React from 'react';
import './singlePage.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const SinglePage = () => {
    return (
        <div className='single'>
            <Sidebar />
            <div className='single-container'>
                <Navbar />
                <div className="user-information">
                    <div className="top">
                        <h1 className='title'>User Information</h1>
                        <button className='edit-btn'>Edit</button>
                    </div>
                    <div className="item">
                        <div className='item-wrapper'>
                            <span className="item-wrapper__inner">Name:</span><span className='name'>Aziz</span>
                        </div>
                        <div className='item-wrapper'>
                            <span className="item-wrapper__inner">Id:</span><span className='id'>00000</span>
                        </div>
                        <div className='item-wrapper'>
                            <span className="item-wrapper__inner">Email:</span><span className='email'>asaydraxmonov@gmail.com</span>
                        </div>
                        <div className='item-wrapper'>
                            <span className="item-wrapper__inner">Password:</span><span className='password'>012102901290</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePage;