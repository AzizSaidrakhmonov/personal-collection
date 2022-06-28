import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './usersPage.scss';
import Users from '../../components/users/Users';

const UsersPage = () => {
    return (
        <div className='users-page'>
            <Sidebar />
            <div className="users-page__container">
                <Navbar/> 
                <Users/>
            </div>
        </div>
    );
};

export default UsersPage;