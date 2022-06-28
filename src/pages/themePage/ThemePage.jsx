import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './themePage.scss';

const ThemePage = () => {
    return (
    <div className='theme-page'>
        <Sidebar />
        <div className="theme-page__container">
            <Navbar/> 
        </div>
    </div>
    );
};

export default ThemePage;