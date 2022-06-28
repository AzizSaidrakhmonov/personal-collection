import React from 'react';
import './cabinet.scss';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Cabinet = () => {
    return (
        <div className='cabinet'>
            <div className='cabinet-container'>
                <div className="user-information">
                    <div className="top">
                        <h1 className='title'>User Information</h1>
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
                <div className="cabinet-btn">
                    <Link to='/cabinetPage2'>
                        <button className='btn btn-success'>My Collections</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cabinet;