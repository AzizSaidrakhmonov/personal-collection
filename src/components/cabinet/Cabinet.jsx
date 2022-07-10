import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './cabinet.scss';

import { useTranslation } from 'react-i18next';

const Cabinet = () => {
    const { oneUser } = useContext(UserContext);

    const { t, i18n } = useTranslation();

    return (
        <div className='cabinet'>
            <div className='cabinet-container'>
                <div className='user-information'>
                    <div className='top'>
                        <h1 className='title'>{t('user information')}</h1>
                    </div>
                    <div className='item'>
                        <div className='item-wrapper'>
                            <span className='item-wrapper__inner'>{t('user information name')}:</span>
                            <span className='name'>{oneUser.name}</span>
                        </div>
                        <div className='item-wrapper'>
                            <span className='item-wrapper__inner'>{t('user information email')}:</span>
                            <span className='email'>{oneUser.email}</span>
                        </div>
                        <div className='item-wrapper'>
                            <span className='item-wrapper__inner'>{t('user information role')}:</span>
                            <span className='id'>{oneUser.role}</span>
                        </div>
                        <div className='item-wrapper'>
                            <span className='item-wrapper__inner'>{t('user information state')}:</span>
                            <span className='id'>{oneUser.state}</span>
                        </div>
                    </div>
                </div>
                <div className='cabinet-btn'>
                    <Link to='/personalCabinet/createCollections'>
                        <button className='btn btn-success'>{t('user collections')}</button>
                    </Link>
                    <Link
                        to='/personalCabinet/createTags'
                        className={`${oneUser.role === 'ROLE_ADMIN' ? 'admin' : 'user'}`}
                    >
                        <button className='btn btn-success mx-5 cabinet-btn__create-tags'>{t('admin tag control')}</button>
                    </Link>
                    <Link
                        to='/personalCabinet/createTopics'
                        className={`${oneUser.role === 'ROLE_ADMIN' ? 'admin' : 'user'}`}
                    >
                        <button className='btn btn-success cabinet-btn__create-topics'>{t('admin topic control')}</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cabinet;
